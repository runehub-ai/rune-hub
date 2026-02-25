# Monorepo Design Choices

## Architecture Overview

rune-hub is a monorepo with the following structure:

```
rune-hub/
├── package.json                        # bun workspaces root
├── skill-packages/                     # Skill Packages (service bundles, JSON)
│   ├── gmail/SKILL.json
│   ├── slack/SKILL.json
│   ├── claude/SKILL.json
│   └── .../SKILL.json
├── skills/                             # Skills (individual atomic operations)
│   ├── gmail-fetch/SKILL.md
│   ├── gmail-send/SKILL.md
│   ├── slack-post/SKILL.md
│   └── .../SKILL.md
├── runes/                              # Rune definitions (graph data)
│   ├── morning-brief/RUNE.json
│   ├── content-pipeline/RUNE.json
│   └── .../RUNE.json
├── packages/
│   ├── web/                            # @rune-hub/web (Next.js frontend)
│   └── cli/                            # @rune-hub/cli (commander CLI)
└── _docs/
```

Data directories (`skill-packages/`, `skills/`, `runes/`) live at the monorepo
root — not inside any package. The two packages load this data differently:

- **Web**: reads from **local filesystem** at build time (`next build`) and in
  dev server. Since web is always built from the monorepo (locally or in Vercel
  CI), it has direct filesystem access.

- **CLI**: **clones the repo from GitHub** to an OS cache directory at startup,
  then parses from the cached clone. The CLI may be installed globally via npm
  and has no access to the monorepo filesystem.

---

## Terminology: Skill Package vs. Skill

### The Problem

The current frontend codebase uses "Skill" to refer to two different things:

- `SkillPackage` — a service-level bundle (e.g., Gmail, Slack, Claude)
- `Action` (aliased as `Skill`) — a single atomic operation (e.g., gmail-fetch,
  slack-post)

This causes confusion in both code and conversation. The type file even has
`export type Skill = Action` as a backwards-compatibility shim.

### The Solution

Two clearly separated concepts, each with its own directory:

| Concept | Directory | What it is | Example | CLI usage |
|---------|-----------|------------|---------|-----------|
| **Skill Package** | `skill-packages/` | A service-level bundle. The installable unit that groups related skills. | Gmail, Slack, Claude | `rune skill add slack` |
| **Skill** | `skills/` | A single atomic operation. What runes wire together as nodes. | gmail-fetch, slack-post, claude-summarize | Referenced by id in runes |

**Analogy**: A Skill Package is an npm package. A Skill is an exported function
from that package. You install the package; the rune calls the function.

### How They Relate

```
skill-packages/slack/SKILL.json
  → declares skills: [slack-post, slack-read, slack-react]

skills/slack-post/SKILL.md
  → atomic operation: post a message to a Slack channel

runes/morning-brief/RUNE.json
  → nodes: [..., { id: "slack-post" }, ...]
  → the rune references skills (not packages)
```

Rune nodes reference **skills** (atomic operations), not packages. Packages
exist for discovery, installation, and grouping. Skills exist for composition
into rune pipelines.

---

## Decision Log

### D1. Skill packages as JSON; skills as Markdown (SKILL.md)

**Decision**: Skill packages use `SKILL.json` (pure structured data). Skills use
`SKILL.md` with YAML frontmatter (documentation format). Runes use `RUNE.json`.

**Context**: Skill packages are registry metadata — name, vendor, category, skill
list. They contain no prose and no documentation body. Skills, on the other hand,
are actual skill documents following the [Agent Skills spec](https://agentskills.io/specification)
format, where the Markdown body can contain usage docs, parameters, examples, and
setup instructions.

**Reasoning**:
- Skill packages are **pure data** — `JSON.parse` is simpler and faster than YAML
  frontmatter parsing. No `gray-matter` dependency needed for packages.
- Skills are **documentation** — Markdown body is the right format for human-readable
  skill docs that may grow over time (parameters, examples, configuration).
- Runes are **graph data** (nodes + edges) — JSON is the natural format.
- This gives a clean separation: JSON for data, Markdown for docs.
- `gray-matter` is still used for skill SKILL.md files in the web loader.
- The CLI only loads skill-packages and runes (both JSON), so the CLI loader
  needs no YAML parsing at all — just `JSON.parse`.

**Result**: Three formats matching their purpose:

| Directory | Format | Why |
|-----------|--------|-----|
| `skill-packages/` | `SKILL.json` | Pure registry metadata |
| `skills/` | `SKILL.md` | Skill documentation (Agent Skills format) |
| `runes/` | `RUNE.json` | Graph/pipeline data |

### D2. Runes as graph data (JSON, not Markdown)

**Decision**: Rune definitions are `RUNE.json` files, not `RUNE.md`. The schema
is the existing `Rune` TypeScript interface from the web frontend.

**Context**: Runes are AI orchestration pipelines — directed acyclic graphs of
skill nodes and edges. The web frontend defines the canonical TypeScript
interface:

```typescript
// packages/web/src/lib/loader.ts
interface SkillNode {
  id: string          // references a skill id (e.g. "gmail-fetch")
  label: string
  category: 'input' | 'api' | 'llm' | 'output'
}

interface SkillEdge {
  source: string
  target: string
  label: string
  rune?: string
}

interface Rune {
  id: string
  slug: string
  name: string
  purpose: string
  category: string
  emoji: string
  useCase: string
  description?: string
  nodes: SkillNode[]
  edges: SkillEdge[]
}
```

**Reasoning**:
- Runes are **graph data** (nodes + edges), not prose. Markdown adds nothing.
- The frontend already defines the canonical shape. Using it as the file format
  means zero conversion between disk and runtime.
- JSON is natively parseable — `JSON.parse()` is faster and simpler than
  `gray-matter` + YAML. No additional dependencies.
- React Flow consumes nodes/edges natively. JSON ↔ React Flow is direct.
- JSON files get schema validation for free (TypeScript types + JSON schema).

**Result**: Each rune is `runes/{slug}/RUNE.json` following the existing `Rune`
interface. The frontend types ARE the spec.

### D3. Web reads local filesystem; CLI clones from GitHub

**Decision**: The web app reads from the local filesystem. The CLI clones the
GitHub repo to an OS cache directory and reads from the cached clone.

**Context**: The two packages run in fundamentally different environments:

| | Web | CLI |
|---|---|---|
| **Runs where** | Inside monorepo (dev server, Vercel CI) | Anywhere (global npm install) |
| **Has fs access** | Yes — always built from monorepo checkout | No — installed as standalone package |
| **Load time** | Build time (`next build`) or dev server start | CLI invocation (`rune-hub skills`) |

**Reasoning for web = local filesystem**:
- The web app is always built from the monorepo — either `bun run dev` locally
  or Vercel cloning the repo for production builds.
- `./skill-packages`, `./skills`, and `./runes` are in the same repo, so
  `fs.readdir` + `fs.readFile` just works. No network requests, no caching
  logic, no failure modes.
- Build-time filesystem reads are the simplest possible architecture.

**Reasoning for CLI = git clone to OS cache**:
- When a user installs `@rune-hub/cli` globally (`npm i -g @rune-hub/cli`), the
  package has no access to the monorepo's directories. It needs to fetch data
  from somewhere.
- **Why git clone, not GitHub API**: One `git clone` (shallow, sparse) gets
  everything in a single operation. `git pull` for updates is efficient (delta
  only). No API rate limits (GitHub REST API: 60 req/hr unauthenticated). No
  complex per-file caching logic. The full directory tree is available locally.
- **Why OS cache dir**: `~/.cache/rune-hub/` (or `$XDG_CACHE_HOME/rune-hub/`)
  is the standard location for cached data on Unix. It persists across CLI
  invocations, survives reboots, and can be safely deleted to force a fresh
  clone. Same pattern as package managers (npm cache, cargo registry cache).
- **Offline capability**: After the first clone, the CLI works fully offline.
  `git pull` updates when network is available; stale cache still works if not.
- **Phase 2 transition**: When data moves to a separate repo, the only change
  is the clone URL. The entire loading mechanism stays identical.

**Clone source**: `https://github.com/runehub-ai/rune-hub` (the public monorepo).
Sparse checkout of `skill-packages/`, `skills/`, and `runes/` only.

**Result**:

```
Web:  fs.readdir('./skill-packages')  →  parse  →  render
CLI:  git clone → ~/.cache/rune-hub/repo/  →  fs.readdir  →  parse  →  render
```

### D4. Separate `skill-packages/` and `skills/` directories

**Decision**: Split the current `skills/` directory into two: `skill-packages/`
for service bundles and `skills/` for individual atomic operations.

**Context**: The current codebase defines two layers:
- `SkillPackage` — a service-level bundle (Gmail, Slack). The installable unit.
- `Action` (aliased as `Skill`) — an individual atomic operation (gmail-fetch,
  slack-post). What rune nodes reference.

Both were previously called "Skill" in different parts of the code, causing
confusion. The type file has `export type Skill = Action` as a shim.

**Reasoning**:
- **Naming clarity**: "skill package" and "skill" are two distinct concepts with
  different roles. Conflating them in one directory (and one name) makes the data
  model harder to understand for contributors and consumers.
- **Contributor ergonomics**: External contributors adding a new service
  integration create a folder in `skill-packages/` with the bundle metadata, and
  separate folders in `skills/` for each operation. The separation makes the
  PR structure clear — "I'm adding 1 package with 3 skills."
- **Rune composition**: Rune nodes reference skill ids (e.g., `slack-post`),
  not package ids (e.g., `slack`). Having skills as their own directory makes
  this relationship explicit — a rune wires together entries from `skills/`,
  not from `skill-packages/`.
- **Future flexibility**: Skills could exist without a parent package (standalone
  utility skills), or a single skill could belong to multiple packages.

**Result**: Two directories at monorepo root. Packages reference skills by id;
runes reference skills by id. Packages are for humans (install/discover); skills
are for runes (compose/execute).

### D5. Three-phase migration path

**Decision**: Start with data in the monorepo, evolve to separate repo, then to
database registry.

**Context**: We researched three models:
1. `anthropics/skills` — plain GitHub repo with SKILL.md files
2. `openclaw/clawhub` — full registry service (TanStack Start + Convex DB +
   vector search + CLI publish)
3. Hardcoded TypeScript arrays (what we have now)

**Reasoning**:
- **Phase 1 (now)**: Data as files in the monorepo is the simplest thing that
  works. Like `anthropics/skills` but collocated with the app code. No separate
  repo to manage, no API to maintain. Git history tracks all changes. PRs review
  skill additions. Encourages early external contributions to grow the registry.
- **Phase 2 (when scale demands)**: When data grows beyond what's comfortable in
  the app repo, or when external contributors need to add skills without touching
  app code, move data directories to a dedicated `runehub-ai/skills` repo. The
  web app clones at build time (like CLI does now). The CLI changes its clone
  URL. Minimal code change.
- **Phase 3 (when git doesn't scale)**: When we need versioning, search, install
  counts, moderation, or vector search — build a registry service. Reference:
  `openclaw/clawhub` (TanStack Start + Convex + OpenAI embeddings). Archive the
  git repo. Publish via CLI (`runehub publish`).

Each phase is an incremental step, not a rewrite. Phase 1 → 2 is changing a
URL. Phase 2 → 3 is adding a backend.

---

## Skill Packages: `./skill-packages/{name}/SKILL.json`
A skill package is a service-level bundle — the installable unit that groups
related skills. Stored as JSON since it's pure structured data with no prose.

### SKILL.json Format (Skill Package)

```json
{
  "name": "gmail",
  "displayName": "Gmail",
  "description": "Full Gmail integration — read inbox with query filters, send transactional emails, and manage labels.",
  "vendor": "Google",
  "emoji": "📧",
  "tagline": "Fetch, send, and label emails via the Gmail API.",
  "category": "communication",
  "version": "1.0.0",
  "verified": true,
  "docsUrl": "https://developers.google.com/gmail/api",
  "downloads": 265000,
  "stars": 4070,
  "skills": ["gmail-fetch", "gmail-send", "gmail-label"]
}
```

**Key field**: `skills` is an array of skill ids that this package bundles.
**Categories**: `ai` | `communication` | `productivity` | `dev` | `data` | `finance` | `marketing` | `iot` | `media` | `utility`

---

## Skills: `./skills/{name}/SKILL.md`

A skill is a single atomic operation — what rune nodes reference and execute.

### SKILL.md Format (Skill)

```yaml
---
name: gmail-fetch
description: "Fetch emails from a Gmail inbox using label or query filters."
label: "Gmail Fetch Emails"
category: input
icon: "📧"
package: gmail
---

# gmail-fetch

Fetch emails from a Gmail inbox using label or query filters.
```

**Key fields**:
- `category`: `input` | `api` | `llm` | `output` (matches `SkillNode.category`)
- `package`: which skill package this belongs to (back-reference)

### Directory Structure

```
skill-packages/                 skills/
├── gmail/                      ├── gmail-fetch/
│   └── SKILL.json              │   └── SKILL.md
├── slack/                      ├── gmail-send/
│   └── SKILL.json              │   └── SKILL.md
├── claude/                     ├── gmail-label/
│   └── SKILL.json              │   └── SKILL.md
└── ...                         ├── slack-post/
                                │   └── SKILL.md
                                ├── claude-summarize/
                                │   └── SKILL.md
                                └── ...
```

---

## Runes: `./runes/{name}/RUNE.json`

Each rune is a JSON file following the existing `Rune` TypeScript interface from
the web frontend (see [D2](#d2-runes-as-graph-data-json-not-markdown)).

Rune nodes reference **skill ids** — entries from `./skills/`, not packages.
Example (truncated — see `runes/morning-brief/RUNE.json` for full version):

```json
{
  "id": "rune-morning-brief",
  "slug": "morning-brief",
  "name": "Morning Brief",
  "purpose": "...",
  "category": "Productivity",
  "emoji": "🌅",
  "useCase": "...",
  "nodes": [
    { "id": "gcal-list-events",  "label": "Google Calendar",  "category": "input"  },
    { "id": "gmail-fetch",       "label": "Gmail Inbox",       "category": "input"  },
    { "id": "claude-triage",     "label": "Claude Triage",     "category": "llm"    },
    "..."
  ],
  "edges": [
    { "source": "gcal-list-events", "target": "claude-triage",  "label": "schedule"   },
    { "source": "gmail-fetch",      "target": "claude-triage",  "label": "emails"     },
    "..."
  ]
}
```

---

## How Both Packages Load Data

### Web (`packages/web`) — Local filesystem

```typescript
// packages/web/src/lib/loader.ts (simplified — see actual file for full implementation)
import { existsSync } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'  // only needed for skills (SKILL.md)

export async function loadSkillPackages(): Promise<SkillPackage[]> {
  const root = getMonorepoRoot()
  const dir = path.join(root, 'skill-packages')
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const packages = await Promise.all(
    entries.filter(e => e.isDirectory()).map(async (entry) => {
      const raw = await fs.readFile(path.join(dir, entry.name, 'SKILL.json'), 'utf8')
      const data = JSON.parse(raw)
      return {
        id: data.name,
        name: data.displayName,
        // ... maps remaining SKILL.json fields to SkillPackage interface
      } as SkillPackage
    })
  )
  return packages
}

export async function loadSkills(preloadedPackages?: SkillPackage[]): Promise<Skill[]> {
  const root = getMonorepoRoot()
  const dir = path.join(root, 'skills')
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const packages = preloadedPackages ?? await loadSkillPackages()
  const skills = await Promise.all(
    entries.filter(e => e.isDirectory()).map(async (entry) => {
      const raw = await fs.readFile(path.join(dir, entry.name, 'SKILL.md'), 'utf8')
      const { data } = matter(raw)
      return {
        id: data.name,
        label: data.label,
        category: data.category,
        // ... maps remaining frontmatter fields to Skill interface
      } as Skill
    })
  )
  return skills
}

export async function loadRunes(): Promise<Rune[]> {
  const root = getMonorepoRoot()
  const dir = path.join(root, 'runes')
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const runes = await Promise.all(
    entries.filter(e => e.isDirectory()).map(async (entry) => {
      const raw = await fs.readFile(path.join(dir, entry.name, 'RUNE.json'), 'utf8')
      return JSON.parse(raw) as Rune
    })
  )
  return runes.map(rune => ({
    ...rune,
    description: rune.description ?? rune.purpose,
  }))
}
```

### CLI (`packages/cli`) — Git clone to OS cache

```typescript
// packages/cli/src/loaders/repo.ts (simplified — see actual file for full implementation)
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import os from 'os'
import path from 'path'

const REPO_URL = 'https://github.com/runehub-ai/rune-hub.git'
const CACHE_DIR = path.join(
  process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache'),
  'rune-hub', 'repo'
)

export function ensureRepoCache(): string {
  // For local development, RUNE_HUB_DATA_DIR overrides to read from local repo
  if (process.env.RUNE_HUB_DATA_DIR) {
    return process.env.RUNE_HUB_DATA_DIR
  }

  mkdirSync(path.dirname(CACHE_DIR), { recursive: true })

  if (existsSync(path.join(CACHE_DIR, '.git'))) {
    try {
      execSync('git pull --ff-only', { cwd: CACHE_DIR, stdio: 'ignore' })
    } catch (e) {
      console.error('warning: git pull failed, cache may be stale:', (e as Error).message)
    }
    return CACHE_DIR
  }

  try {
    execSync(
      `git clone --depth=1 --filter=blob:none --sparse ${REPO_URL} ${CACHE_DIR}`,
      { stdio: 'ignore' }
    )
  } catch (e) {
    console.error('warning: git clone failed, data may be unavailable:', (e as Error).message)
    return CACHE_DIR
  }

  try {
    execSync('git sparse-checkout set skill-packages skills runes', {
      cwd: CACHE_DIR, stdio: 'ignore'
    })
  } catch (e) {
    console.error('warning: git sparse-checkout failed, some data may be missing:', (e as Error).message)
  }

  return CACHE_DIR
}

// Then: loadSkillPackages() and loadRunes() read JSON from CACHE_DIR
```

```
First run:   git clone --sparse → ~/.cache/rune-hub/repo/
Next runs:   git pull --ff-only (fast, delta only)
Offline:     works from cached clone
Local dev:   RUNE_HUB_DATA_DIR=../.. bun x tsx src/index.ts (skips git entirely)
```

---

## Migration from Hardcoded Data (completed)

The original `packages/web/src/data/skills-registry.ts` and `runes.ts` contained
all skill packages, actions, and runes as hardcoded TypeScript arrays. These have
been fully migrated to file-based data and the source files deleted.

### Steps (all completed)

1. **Generated `./skill-packages/*/SKILL.json`** from `SkillPackage` entries
2. **Generated `./skills/*/SKILL.md`** from `Action` entries (one per action)
3. **Generated `./runes/*/RUNE.json`** from `Rune` entries
4. **Created web loader** (`packages/web/src/lib/loader.ts`) using `JSON.parse` (packages, runes) + `gray-matter` (skills)
5. **Updated web pages** — replaced static imports with loader calls
6. **Updated CLI** — replaced symlink import with cache-based loader
7. **Deleted `skills-registry.ts`** and **`runes.ts`**
8. **Removed CLI → web symlink** (`packages/cli/src/data`)

---

## Migration Path (Three Phases)

### Phase 1: Monorepo (current)
- Skill packages, skills, and runes are plain files in monorepo root
- Web reads local filesystem; CLI clones from GitHub
- Like `anthropics/skills` format — simple, git-native, PR-friendly
- Encourages early external skill contributions to grow the registry

### Phase 2: Separate Registry Repo
- Move data to [`runehub-ai/skills`](https://github.com/runehub-ai/skills)
- Web clones at build time (same mechanism CLI uses now)
- CLI changes clone URL. One-line diff.

### Phase 3: Database Registry (like ClawHub)
- Archive the git repo
- Build a registry service ([`openclaw/clawhub`](https://github.com/openclaw/clawhub) as reference)
- Stack: TanStack Start + Convex (DB + file storage) + vector search
- Publish via CLI (`runehub publish`), browse via web app
- Full versioning, semver tags, install counts, moderation

---

## References

- [`anthropics/skills`](https://github.com/anthropics/skills) — Anthropic's Agent Skills repo (reference for Phase 1)
- [Agent Skills Specification](https://agentskills.io/specification) — The SKILL.md format standard
- [`runehub-ai/skills`](https://github.com/runehub-ai/skills) — Future external registry (Phase 2)
- [`openclaw/clawhub`](https://github.com/openclaw/clawhub) — ClawHub registry (Phase 3 reference)
- [OpenClaw Skills Docs](https://docs.openclaw.ai/skills) — OpenClaw's runtime loading model
- [`runehub-ai/rune-hub`](https://github.com/runehub-ai/rune-hub) — CLI clone source
