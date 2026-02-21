export type SkillCategory = 'input' | 'api' | 'llm' | 'output';

export interface SkillNode {
  id: string;
  label: string;
  category: SkillCategory;
}

export interface SkillEdge {
  source: string;
  target: string;
  label: string;
  rune?: string;
}

export interface Rune {
  id: string;
  slug: string;
  name: string;
  purpose: string;
  category: string;
  emoji: string;
  useCase: string;
  description?: string;
  nodes: SkillNode[];
  edges: SkillEdge[];
}

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  input: '#34d399',
  api: '#60a5fa',
  llm: '#a78bfa',
  output: '#f472b6',
}

// ═══════════════════════════════════════════════════════════════
// 30 RUNES — 10 Updated Originals + 20 New
// ═══════════════════════════════════════════════════════════════

const BASE_RUNES: Rune[] = [
  // ── 1. Morning Brief (updated) ─────────────────────────────
  {
    id: 'rune-morning-brief',
    slug: 'morning-brief',
    name: 'Morning Brief',
    purpose: 'Compile a personalized daily briefing from calendar, news, and weather into a concise summary.',
    category: 'Productivity',
    emoji: '🌅',
    useCase: 'Start every morning with a 2-minute briefing that covers your schedule, top headlines, and weather forecast.',
    nodes: [
      { id: 'gcal-list-events', label: 'Google Calendar List Events', category: 'input' },
      { id: 'brave-search', label: 'Brave Web Search', category: 'api' },
      { id: 'openweather-fetch', label: 'OpenWeatherMap Fetch', category: 'api' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'gcal-list-events', target: 'claude-summarize', label: 'calendar events' },
      { source: 'brave-search', target: 'claude-summarize', label: 'top headlines' },
      { source: 'openweather-fetch', target: 'claude-summarize', label: 'weather data' },
      { source: 'claude-summarize', target: 'slack-post', label: 'morning brief' },
    ],
  },

  // ── 2. Deep Research (updated) ─────────────────────────────
  {
    id: 'rune-deep-research',
    slug: 'deep-research',
    name: 'Deep Research',
    purpose: 'Conduct multi-source research on a topic using web search, academic papers, and AI synthesis.',
    category: 'Research',
    emoji: '🔬',
    useCase: 'Research any topic thoroughly with sources from the web, arXiv, and Wikipedia, then get a structured report.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'perplexity-search', label: 'Perplexity Search', category: 'api' },
      { id: 'arxiv-search', label: 'arXiv Search Papers', category: 'api' },
      { id: 'exa-search', label: 'Exa Semantic Search', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'perplexity-search', label: 'research query' },
      { source: 'user-input', target: 'arxiv-search', label: 'research query' },
      { source: 'user-input', target: 'exa-search', label: 'research query' },
      { source: 'perplexity-search', target: 'claude-analyze', label: 'web results' },
      { source: 'arxiv-search', target: 'claude-analyze', label: 'papers' },
      { source: 'exa-search', target: 'claude-analyze', label: 'semantic results' },
      { source: 'claude-analyze', target: 'notion-write', label: 'research report' },
    ],
  },

  // ── 3. Blog Forge (updated) ────────────────────────────────
  {
    id: 'rune-blog-forge',
    slug: 'blog-forge',
    name: 'Blog Forge',
    purpose: 'Generate a polished blog post from a topic with SEO optimization and publish it.',
    category: 'Content',
    emoji: '📝',
    useCase: 'Turn a simple topic into a fully researched, SEO-optimized blog post ready for publishing on WordPress or Ghost.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'brave-search', label: 'Brave Web Search', category: 'api' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'dalle3-generate', label: 'DALL-E 3 Generate Image', category: 'llm' },
      { id: 'wordpress-publish', label: 'WordPress Publish Post', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'brave-search', label: 'topic' },
      { source: 'brave-search', target: 'claude-draft', label: 'research data' },
      { source: 'user-input', target: 'claude-draft', label: 'topic + tone' },
      { source: 'claude-draft', target: 'dalle3-generate', label: 'image prompt' },
      { source: 'claude-draft', target: 'wordpress-publish', label: 'blog post' },
      { source: 'dalle3-generate', target: 'wordpress-publish', label: 'featured image' },
    ],
  },

  // ── 4. Code Sentinel (updated) ─────────────────────────────
  {
    id: 'rune-code-sentinel',
    slug: 'code-sentinel',
    name: 'Code Sentinel',
    purpose: 'Automatically review pull requests for bugs, style issues, and security vulnerabilities.',
    category: 'DevOps',
    emoji: '🛡️',
    useCase: 'Get instant AI-powered code reviews on every GitHub PR with actionable feedback posted as comments.',
    nodes: [
      { id: 'github-list-prs', label: 'GitHub List PRs', category: 'input' },
      { id: 'github-get-diff', label: 'GitHub Get Diff', category: 'input' },
      { id: 'eslint-check', label: 'ESLint Check', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'github-post-comment', label: 'GitHub Post PR Comment', category: 'output' },
    ],
    edges: [
      { source: 'github-list-prs', target: 'github-get-diff', label: 'PR reference' },
      { source: 'github-get-diff', target: 'eslint-check', label: 'code diff' },
      { source: 'github-get-diff', target: 'claude-analyze', label: 'code diff' },
      { source: 'eslint-check', target: 'claude-analyze', label: 'lint results' },
      { source: 'claude-analyze', target: 'github-post-comment', label: 'review feedback' },
    ],
  },

  // ── 5. Data Insight (updated) ──────────────────────────────
  {
    id: 'rune-data-insight',
    slug: 'data-insight',
    name: 'Data Insight',
    purpose: 'Analyze spreadsheet or database data and generate visual insights with AI interpretation.',
    category: 'Analytics',
    emoji: '📊',
    useCase: 'Connect to Google Sheets or BigQuery, analyze trends, and get plain-English insights posted to Slack.',
    nodes: [
      { id: 'gsheets-read', label: 'Google Sheets Read', category: 'input' },
      { id: 'bigquery-query', label: 'BigQuery Run Query', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'gsheets-read', target: 'claude-analyze', label: 'spreadsheet data' },
      { source: 'bigquery-query', target: 'claude-analyze', label: 'query results' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'analysis tables' },
      { source: 'claude-analyze', target: 'slack-post', label: 'insight summary' },
    ],
  },

  // ── 6. Support Sage (updated) ──────────────────────────────
  {
    id: 'rune-support-sage',
    slug: 'support-sage',
    name: 'Support Sage',
    purpose: 'Auto-classify and draft replies for customer support tickets using AI.',
    category: 'Customer Support',
    emoji: '🧙',
    useCase: 'Triage Zendesk tickets automatically — classify urgency, draft responses, and escalate critical issues.',
    nodes: [
      { id: 'zendesk-list-tickets', label: 'Zendesk List Tickets', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'zendesk-reply', label: 'Zendesk Reply Ticket', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'zendesk-list-tickets', target: 'claude-classify', label: 'tickets' },
      { source: 'claude-classify', target: 'claude-draft', label: 'classified tickets' },
      { source: 'claude-draft', target: 'zendesk-reply', label: 'draft reply' },
      { source: 'claude-classify', target: 'slack-post', label: 'escalation alerts' },
    ],
  },

  // ── 7. Social Pulse (updated) ──────────────────────────────
  {
    id: 'rune-social-pulse',
    slug: 'social-pulse',
    name: 'Social Pulse',
    purpose: 'Monitor brand mentions and sentiment across Twitter, Reddit, and news sources.',
    category: 'Marketing',
    emoji: '📡',
    useCase: 'Track what people are saying about your brand across social media and get a daily sentiment report.',
    nodes: [
      { id: 'twitter-search', label: 'Twitter/X Search', category: 'input' },
      { id: 'brave-search', label: 'Brave Web Search', category: 'api' },
      { id: 'hackernews-fetch', label: 'Hacker News Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'twitter-search', target: 'claude-analyze', label: 'tweets' },
      { source: 'brave-search', target: 'claude-analyze', label: 'news mentions' },
      { source: 'hackernews-fetch', target: 'claude-analyze', label: 'HN discussions' },
      { source: 'claude-analyze', target: 'notion-write', label: 'sentiment report' },
      { source: 'claude-analyze', target: 'slack-post', label: 'pulse summary' },
    ],
  },

  // ── 8. Inbox Zero (updated) ────────────────────────────────
  {
    id: 'rune-inbox-zero',
    slug: 'inbox-zero',
    name: 'Inbox Zero',
    purpose: 'Automatically triage, categorize, and draft replies for email overload.',
    category: 'Productivity',
    emoji: '📨',
    useCase: 'Let AI classify your Gmail inbox, draft quick replies, and label everything so you hit inbox zero daily.',
    nodes: [
      { id: 'gmail-fetch', label: 'Gmail Fetch Emails', category: 'input' },
      { id: 'claude-classify', label: 'Claude Classify', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'gmail-label', label: 'Gmail Apply Label', category: 'api' },
      { id: 'gmail-send', label: 'Gmail Send Email', category: 'output' },
    ],
    edges: [
      { source: 'gmail-fetch', target: 'claude-classify', label: 'unread emails' },
      { source: 'claude-classify', target: 'gmail-label', label: 'category labels' },
      { source: 'claude-classify', target: 'claude-draft', label: 'needs-reply emails' },
      { source: 'claude-draft', target: 'gmail-send', label: 'draft replies' },
    ],
  },

  // ── 9. Alpha Watch (updated) ───────────────────────────────
  {
    id: 'rune-alpha-watch',
    slug: 'alpha-watch',
    name: 'Alpha Watch',
    purpose: 'Monitor crypto markets, DeFi protocols, and on-chain activity for alpha opportunities.',
    category: 'Finance',
    emoji: '🐺',
    useCase: 'Get real-time alerts on crypto price movements, whale transactions, and DeFi yield opportunities.',
    nodes: [
      { id: 'coingecko-price', label: 'CoinGecko Get Price', category: 'api' },
      { id: 'defillama-tvl', label: 'DeFiLlama Get TVL', category: 'api' },
      { id: 'etherscan-txns', label: 'Etherscan Get Transactions', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'telegram-send', label: 'Telegram Send Message', category: 'output' },
    ],
    edges: [
      { source: 'coingecko-price', target: 'claude-analyze', label: 'price data' },
      { source: 'defillama-tvl', target: 'claude-analyze', label: 'TVL changes' },
      { source: 'etherscan-txns', target: 'claude-analyze', label: 'whale txns' },
      { source: 'claude-analyze', target: 'telegram-send', label: 'alpha alert' },
    ],
  },

  // ── 10. Standup Sync (updated) ─────────────────────────────
  {
    id: 'rune-standup-sync',
    slug: 'standup-sync',
    name: 'Standup Sync',
    purpose: 'Auto-generate daily standup updates from GitHub activity, Linear issues, and Slack messages.',
    category: 'DevOps',
    emoji: '🤝',
    useCase: 'Never write a standup again — let AI compile your commits, tickets, and messages into a standup post.',
    nodes: [
      { id: 'github-list-prs', label: 'GitHub List PRs', category: 'input' },
      { id: 'linear-fetch-issues', label: 'Linear Fetch Issues', category: 'input' },
      { id: 'slack-fetch', label: 'Slack Read Channel', category: 'input' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'github-list-prs', target: 'claude-summarize', label: 'PR activity' },
      { source: 'linear-fetch-issues', target: 'claude-summarize', label: 'ticket updates' },
      { source: 'slack-fetch', target: 'claude-summarize', label: 'discussion context' },
      { source: 'claude-summarize', target: 'slack-post', label: 'standup update' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // 20 NEW RUNES
  // ══════════════════════════════════════════════════════════════

  // ── 11. Release Radar ──────────────────────────────────────
  {
    id: 'rune-release-radar',
    slug: 'release-radar',
    name: 'Release Radar',
    purpose: 'Monitor GitHub releases for tracked repositories and notify the team with changelogs.',
    category: 'DevOps',
    emoji: '📡',
    useCase: 'Stay on top of dependency updates and framework releases with auto-generated changelog summaries in Slack.',
    nodes: [
      { id: 'github-list-releases', label: 'GitHub List Releases', category: 'input' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'discord-post', label: 'Discord Send Message', category: 'output' },
    ],
    edges: [
      { source: 'github-list-releases', target: 'claude-summarize', label: 'release notes' },
      { source: 'claude-summarize', target: 'slack-post', label: 'changelog summary' },
      { source: 'claude-summarize', target: 'discord-post', label: 'changelog summary' },
    ],
  },

  // ── 12. Vuln Sentinel ──────────────────────────────────────
  {
    id: 'rune-vuln-sentinel',
    slug: 'vuln-sentinel',
    name: 'Vuln Sentinel',
    purpose: 'Scan code for vulnerabilities across multiple security tools and generate a unified security report.',
    category: 'Security',
    emoji: '🔐',
    useCase: 'Run Snyk, SonarQube, and VirusTotal scans and get a single prioritized security report with remediation advice.',
    nodes: [
      { id: 'snyk-scan', label: 'Snyk Vulnerability Scan', category: 'api' },
      { id: 'sonarqube-scan', label: 'SonarQube Code Analysis', category: 'api' },
      { id: 'virustotal-scan', label: 'VirusTotal Scan', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'github-create-issue', label: 'GitHub Create Issue', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'snyk-scan', target: 'claude-analyze', label: 'dependency vulns' },
      { source: 'sonarqube-scan', target: 'claude-analyze', label: 'code issues' },
      { source: 'virustotal-scan', target: 'claude-analyze', label: 'malware results' },
      { source: 'claude-analyze', target: 'github-create-issue', label: 'critical issues' },
      { source: 'claude-analyze', target: 'slack-post', label: 'security report' },
    ],
  },

  // ── 13. Price Hawk ─────────────────────────────────────────
  {
    id: 'rune-price-hawk',
    slug: 'price-hawk',
    name: 'Price Hawk',
    purpose: 'Monitor competitor prices against your Shopify catalog and alert on significant changes.',
    category: 'E-Commerce',
    emoji: '🦅',
    useCase: 'Track competitor pricing daily, compare against your Shopify products, and get alerts when prices shift.',
    nodes: [
      { id: 'shopify-list-products', label: 'Shopify List Products', category: 'input' },
      { id: 'apify-scraper', label: 'Apify Web Scraper', category: 'api' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'shopify-list-products', target: 'claude-analyze', label: 'your prices' },
      { source: 'apify-scraper', target: 'claude-analyze', label: 'competitor prices' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'price comparison' },
      { source: 'claude-analyze', target: 'slack-post', label: 'price alerts' },
    ],
  },

  // ── 14. Learn Forge ────────────────────────────────────────
  {
    id: 'rune-learn-forge',
    slug: 'learn-forge',
    name: 'Learn Forge',
    purpose: 'Convert articles, PDFs, or audio content into study flashcards for spaced repetition.',
    category: 'Education',
    emoji: '🎓',
    useCase: 'Paste any article or upload a PDF, and get Anki-compatible flashcards generated by AI.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'pdf-parse', label: 'PDF Parse', category: 'api' },
      { id: 'whisper-transcribe', label: 'Whisper Transcribe Audio', category: 'llm' },
      { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm' },
      { id: 'anki-export', label: 'Anki Export Deck', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'claude-extract', label: 'article text' },
      { source: 'pdf-parse', target: 'claude-extract', label: 'parsed PDF' },
      { source: 'whisper-transcribe', target: 'claude-extract', label: 'transcript' },
      { source: 'claude-extract', target: 'anki-export', label: 'flashcards' },
    ],
  },

  // ── 15. Wellness Log ───────────────────────────────────────
  {
    id: 'rune-wellness-log',
    slug: 'wellness-log',
    name: 'Wellness Log',
    purpose: 'Aggregate sleep and health data from wearables, generate insights, and log to a journal.',
    category: 'Healthcare',
    emoji: '💚',
    useCase: 'Combine Oura Ring sleep data with Apple Health metrics to get daily AI wellness insights in Notion.',
    nodes: [
      { id: 'oura-sleep', label: 'Oura Ring Sleep Data', category: 'input' },
      { id: 'apple-health-fetch', label: 'Apple Health Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'oura-sleep', target: 'claude-analyze', label: 'sleep data' },
      { source: 'apple-health-fetch', target: 'claude-analyze', label: 'health metrics' },
      { source: 'claude-analyze', target: 'notion-write', label: 'wellness journal' },
    ],
  },

  // ── 16. Contract Guard ─────────────────────────────────────
  {
    id: 'rune-contract-guard',
    slug: 'contract-guard',
    name: 'Contract Guard',
    purpose: 'Parse contracts, extract key clauses, flag risks, and prepare for signing.',
    category: 'Legal',
    emoji: '⚖️',
    useCase: 'Upload a PDF contract, get AI analysis of risky clauses and obligations, then send via DocuSign if approved.',
    nodes: [
      { id: 'pdf-parse', label: 'PDF Parse', category: 'api' },
      { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
      { id: 'docusign-send', label: 'DocuSign Send Envelope', category: 'output' },
    ],
    edges: [
      { source: 'pdf-parse', target: 'claude-extract', label: 'contract text' },
      { source: 'claude-extract', target: 'claude-analyze', label: 'extracted clauses' },
      { source: 'claude-analyze', target: 'notion-write', label: 'risk report' },
      { source: 'claude-analyze', target: 'docusign-send', label: 'approved contract' },
    ],
  },

  // ── 17. Talent Scout ───────────────────────────────────────
  {
    id: 'rune-talent-scout',
    slug: 'talent-scout',
    name: 'Talent Scout',
    purpose: 'Source, enrich, and rank candidates from LinkedIn profiles for open positions.',
    category: 'HR',
    emoji: '🔎',
    useCase: 'Scrape LinkedIn profiles, parse resumes with AI, rank candidates by fit, and push top picks to HubSpot.',
    nodes: [
      { id: 'linkedin-scrape', label: 'LinkedIn Profile Scrape', category: 'api' },
      { id: 'pdf-parse', label: 'PDF Parse', category: 'api' },
      { id: 'claude-score', label: 'Claude Score & Rank', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'hubspot-create-contact', label: 'HubSpot Create Contact', category: 'output' },
    ],
    edges: [
      { source: 'linkedin-scrape', target: 'claude-score', label: 'profile data' },
      { source: 'pdf-parse', target: 'claude-score', label: 'resume data' },
      { source: 'claude-score', target: 'gsheets-write', label: 'ranked candidates' },
      { source: 'claude-score', target: 'hubspot-create-contact', label: 'top candidates' },
    ],
  },

  // ── 18. Campaign Pulse ─────────────────────────────────────
  {
    id: 'rune-campaign-pulse',
    slug: 'campaign-pulse',
    name: 'Campaign Pulse',
    purpose: 'Aggregate ad performance from Google and Meta, analyze with AI, and generate optimization recommendations.',
    category: 'Marketing',
    emoji: '📣',
    useCase: 'Pull Google Ads and Meta Ads data together, get AI analysis of what is working, and export optimization tips.',
    nodes: [
      { id: 'google-ads-fetch', label: 'Google Ads Fetch Report', category: 'input' },
      { id: 'meta-ads-fetch', label: 'Meta Ads Fetch Report', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'google-ads-fetch', target: 'claude-analyze', label: 'Google Ads data' },
      { source: 'meta-ads-fetch', target: 'claude-analyze', label: 'Meta Ads data' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'performance report' },
      { source: 'claude-analyze', target: 'slack-post', label: 'optimization tips' },
    ],
  },

  // ── 19. UX Audit ───────────────────────────────────────────
  {
    id: 'rune-ux-audit',
    slug: 'ux-audit',
    name: 'UX Audit',
    purpose: 'Capture screenshots of web pages, analyze UX and accessibility with AI vision, and report findings.',
    category: 'Design',
    emoji: '🎨',
    useCase: 'Screenshot any website, get GPT-4o Vision analysis for accessibility and UX issues, with a report saved to Notion.',
    nodes: [
      { id: 'screenshot-capture', label: 'Screenshot Capture', category: 'input' },
      { id: 'gpt4o-vision', label: 'GPT-4o Vision', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'screenshot-capture', target: 'gpt4o-vision', label: 'page screenshot' },
      { source: 'gpt4o-vision', target: 'claude-draft', label: 'UX findings' },
      { source: 'claude-draft', target: 'notion-write', label: 'audit report' },
    ],
  },

  // ── 20. Pod Notes ──────────────────────────────────────────
  {
    id: 'rune-pod-notes',
    slug: 'pod-notes',
    name: 'Pod Notes',
    purpose: 'Transcribe podcast episodes and generate structured show notes for publishing.',
    category: 'Media',
    emoji: '🎙️',
    useCase: 'Fetch a podcast episode from RSS, transcribe with Whisper, generate show notes, and draft on Substack.',
    nodes: [
      { id: 'podcast-rss-fetch', label: 'Podcast RSS Fetch', category: 'input' },
      { id: 'whisper-transcribe', label: 'Whisper Transcribe Audio', category: 'llm' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'substack-draft', label: 'Substack Create Draft', category: 'output' },
    ],
    edges: [
      { source: 'podcast-rss-fetch', target: 'whisper-transcribe', label: 'audio file' },
      { source: 'whisper-transcribe', target: 'claude-summarize', label: 'transcript' },
      { source: 'claude-summarize', target: 'claude-draft', label: 'key points' },
      { source: 'claude-draft', target: 'substack-draft', label: 'show notes post' },
    ],
  },

  // ── 21. Deal Engine ────────────────────────────────────────
  {
    id: 'rune-deal-engine',
    slug: 'deal-engine',
    name: 'Deal Engine',
    purpose: 'Source leads, enrich with company data, score with AI, and push qualified leads to CRM.',
    category: 'Sales',
    emoji: '💼',
    useCase: 'Find leads on Apollo, enrich with Clearbit, AI-score for fit, and auto-create deals in HubSpot CRM.',
    nodes: [
      { id: 'apollo-search', label: 'Apollo People Search', category: 'api' },
      { id: 'clearbit-enrich', label: 'Clearbit Enrich Company', category: 'api' },
      { id: 'claude-score', label: 'Claude Score & Rank', category: 'llm' },
      { id: 'hubspot-create-contact', label: 'HubSpot Create Contact', category: 'output' },
      { id: 'hubspot-update-deal', label: 'HubSpot Update Deal', category: 'output' },
    ],
    edges: [
      { source: 'apollo-search', target: 'clearbit-enrich', label: 'lead data' },
      { source: 'clearbit-enrich', target: 'claude-score', label: 'enriched profile' },
      { source: 'claude-score', target: 'hubspot-create-contact', label: 'qualified leads' },
      { source: 'claude-score', target: 'hubspot-update-deal', label: 'deal score' },
    ],
  },

  // ── 22. Trip Planner ───────────────────────────────────────
  {
    id: 'rune-trip-planner',
    slug: 'trip-planner',
    name: 'Trip Planner',
    purpose: 'Plan a complete trip itinerary with flights, hotels, and local attractions.',
    category: 'Travel',
    emoji: '✈️',
    useCase: 'Enter a destination and dates, get flight options from Skyscanner, hotels from Booking.com, and a full AI itinerary.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'skyscanner-search', label: 'Skyscanner Search Flights', category: 'api' },
      { id: 'booking-search', label: 'Booking.com Search Hotels', category: 'api' },
      { id: 'google-maps-places', label: 'Google Maps Places', category: 'api' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'skyscanner-search', label: 'dates + destination' },
      { source: 'user-input', target: 'booking-search', label: 'dates + destination' },
      { source: 'user-input', target: 'google-maps-places', label: 'destination' },
      { source: 'skyscanner-search', target: 'claude-draft', label: 'flight options' },
      { source: 'booking-search', target: 'claude-draft', label: 'hotel options' },
      { source: 'google-maps-places', target: 'claude-draft', label: 'attractions' },
      { source: 'claude-draft', target: 'notion-write', label: 'trip itinerary' },
    ],
  },

  // ── 23. Meta Coach ─────────────────────────────────────────
  {
    id: 'rune-meta-coach',
    slug: 'meta-coach',
    name: 'Meta Coach',
    purpose: 'Analyze gaming performance stats and generate strategy improvement tips.',
    category: 'Gaming',
    emoji: '🎮',
    useCase: 'Pull your Steam or Riot Games stats, get AI-powered strategy advice, and share tips to Discord.',
    nodes: [
      { id: 'steam-player-stats', label: 'Steam Player Stats', category: 'input' },
      { id: 'riot-match-history', label: 'Riot Games Match History', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'discord-post', label: 'Discord Send Message', category: 'output' },
    ],
    edges: [
      { source: 'steam-player-stats', target: 'claude-analyze', label: 'game stats' },
      { source: 'riot-match-history', target: 'claude-analyze', label: 'match data' },
      { source: 'claude-analyze', target: 'claude-draft', label: 'analysis' },
      { source: 'claude-draft', target: 'discord-post', label: 'strategy tips' },
    ],
  },

  // ── 24. Habit Loop ─────────────────────────────────────────
  {
    id: 'rune-habit-loop',
    slug: 'habit-loop',
    name: 'Habit Loop',
    purpose: 'Track daily habits with streak counting and AI-generated reflections.',
    category: 'Personal',
    emoji: '🔄',
    useCase: 'Check in daily, maintain streaks, and get personalized AI reflections on your progress in a Notion journal.',
    nodes: [
      { id: 'user-input', label: 'User Text Input', category: 'input' },
      { id: 'streak-tracker', label: 'Streak Tracker', category: 'api' },
      { id: 'claude-reflect', label: 'Claude Reflect', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'user-input', target: 'streak-tracker', label: 'daily check-in' },
      { source: 'streak-tracker', target: 'claude-reflect', label: 'streak data' },
      { source: 'claude-reflect', target: 'notion-write', label: 'journal entry' },
    ],
  },

  // ── 25. Traffic Watch ──────────────────────────────────────
  {
    id: 'rune-traffic-watch',
    slug: 'traffic-watch',
    name: 'Traffic Watch',
    purpose: 'Detect anomalies in Google Analytics traffic and explain them with AI.',
    category: 'Analytics',
    emoji: '🚦',
    useCase: 'Automatically detect traffic spikes or drops in GA4, get AI explanations, and receive Slack alerts.',
    nodes: [
      { id: 'ga4-fetch', label: 'Google Analytics 4 Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
    ],
    edges: [
      { source: 'ga4-fetch', target: 'claude-analyze', label: 'traffic data' },
      { source: 'claude-analyze', target: 'slack-post', label: 'anomaly alert' },
      { source: 'claude-analyze', target: 'gsheets-write', label: 'anomaly log' },
    ],
  },

  // ── 26. Churn Shield ───────────────────────────────────────
  {
    id: 'rune-churn-shield',
    slug: 'churn-shield',
    name: 'Churn Shield',
    purpose: 'Predict customer churn by combining support interactions with billing data.',
    category: 'Customer Success',
    emoji: '🛡️',
    useCase: 'Combine Intercom engagement events with Stripe MRR data, predict churn risk, and flag at-risk accounts in CRM.',
    nodes: [
      { id: 'intercom-fetch-events', label: 'Intercom Fetch Events', category: 'input' },
      { id: 'stripe-get-mrr', label: 'Stripe Get MRR', category: 'input' },
      { id: 'claude-predict', label: 'Claude Predict', category: 'llm' },
      { id: 'hubspot-update-deal', label: 'HubSpot Update Deal', category: 'output' },
      { id: 'slack-post', label: 'Slack Post Message', category: 'output' },
    ],
    edges: [
      { source: 'intercom-fetch-events', target: 'claude-predict', label: 'user events' },
      { source: 'stripe-get-mrr', target: 'claude-predict', label: 'MRR data' },
      { source: 'claude-predict', target: 'hubspot-update-deal', label: 'churn risk flag' },
      { source: 'claude-predict', target: 'slack-post', label: 'churn alert' },
    ],
  },

  // ── 27. Smart Home Brief ───────────────────────────────────
  {
    id: 'rune-smart-home-brief',
    slug: 'smart-home-brief',
    name: 'Smart Home Brief',
    purpose: 'Create a spoken morning briefing from smart home sensors, weather, and calendar.',
    category: 'IoT',
    emoji: '🏠',
    useCase: 'Wake up to an AI-narrated briefing that covers your home status, weather, and schedule via ElevenLabs TTS.',
    nodes: [
      { id: 'homeassistant-states', label: 'Home Assistant Get States', category: 'input' },
      { id: 'openweather-fetch', label: 'OpenWeatherMap Fetch', category: 'api' },
      { id: 'gcal-list-events', label: 'Google Calendar List Events', category: 'input' },
      { id: 'claude-summarize', label: 'Claude Summarize', category: 'llm' },
      { id: 'elevenlabs-tts', label: 'ElevenLabs Text-to-Speech', category: 'output' },
    ],
    edges: [
      { source: 'homeassistant-states', target: 'claude-summarize', label: 'sensor data' },
      { source: 'openweather-fetch', target: 'claude-summarize', label: 'weather' },
      { source: 'gcal-list-events', target: 'claude-summarize', label: 'schedule' },
      { source: 'claude-summarize', target: 'elevenlabs-tts', label: 'morning brief text' },
    ],
  },

  // ── 28. Doc Forge ──────────────────────────────────────────
  {
    id: 'rune-doc-forge',
    slug: 'doc-forge',
    name: 'Doc Forge',
    purpose: 'Auto-generate documentation from a GitHub repository by scanning code and comments.',
    category: 'Documentation',
    emoji: '📚',
    useCase: 'Point at a GitHub repo, scan the codebase, and auto-generate a README and API documentation.',
    nodes: [
      { id: 'github-scan-repo', label: 'GitHub Scan Repository', category: 'input' },
      { id: 'claude-extract', label: 'Claude Extract Data', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'github-create-issue', label: 'GitHub Create Issue', category: 'output' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'github-scan-repo', target: 'claude-extract', label: 'code files' },
      { source: 'claude-extract', target: 'claude-draft', label: 'extracted docs' },
      { source: 'claude-draft', target: 'github-create-issue', label: 'doc PR suggestion' },
      { source: 'claude-draft', target: 'notion-write', label: 'API documentation' },
    ],
  },

  // ── 29. Rank Tracker ───────────────────────────────────────
  {
    id: 'rune-rank-tracker',
    slug: 'rank-tracker',
    name: 'Rank Tracker',
    purpose: 'Monitor SEO rankings and backlinks, identify content gaps, and generate improvement reports.',
    category: 'SEO',
    emoji: '📈',
    useCase: 'Combine SEMrush ranking data with Ahrefs backlink analysis to find content gaps and SEO opportunities.',
    nodes: [
      { id: 'semrush-fetch', label: 'SEMrush Fetch Rankings', category: 'input' },
      { id: 'ahrefs-fetch', label: 'Ahrefs Fetch Backlinks', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'gsheets-write', label: 'Google Sheets Write', category: 'output' },
    ],
    edges: [
      { source: 'semrush-fetch', target: 'claude-analyze', label: 'ranking data' },
      { source: 'ahrefs-fetch', target: 'claude-analyze', label: 'backlink data' },
      { source: 'claude-analyze', target: 'claude-draft', label: 'content gaps' },
      { source: 'claude-draft', target: 'gsheets-write', label: 'SEO report' },
    ],
  },

  // ── 30. Rival Watch ────────────────────────────────────────
  {
    id: 'rune-rival-watch',
    slug: 'rival-watch',
    name: 'Rival Watch',
    purpose: 'Monitor competitors across web, social media, and product launches to generate battlecards.',
    category: 'Competitive Intel',
    emoji: '🕵️',
    useCase: 'Crawl competitor websites, track their Twitter, monitor Product Hunt launches, and get AI-generated battlecards.',
    nodes: [
      { id: 'firecrawl-scrape', label: 'Firecrawl Scrape Page', category: 'api' },
      { id: 'twitter-search', label: 'Twitter/X Search', category: 'input' },
      { id: 'producthunt-fetch', label: 'Product Hunt Fetch', category: 'input' },
      { id: 'claude-analyze', label: 'Claude Analyze', category: 'llm' },
      { id: 'claude-draft', label: 'Claude Draft Text', category: 'llm' },
      { id: 'notion-write', label: 'Notion Create Page', category: 'output' },
    ],
    edges: [
      { source: 'firecrawl-scrape', target: 'claude-analyze', label: 'competitor pages' },
      { source: 'twitter-search', target: 'claude-analyze', label: 'competitor tweets' },
      { source: 'producthunt-fetch', target: 'claude-analyze', label: 'new launches' },
      { source: 'claude-analyze', target: 'claude-draft', label: 'competitive analysis' },
      { source: 'claude-draft', target: 'notion-write', label: 'battlecard' },
    ],
  },
];

const buildHubSkills = (runes: Rune[]) => {
  const useMap = new Map<string, number>();
  for (const rune of runes) {
    const seen = new Set<string>();
    for (const node of rune.nodes) {
      if (seen.has(node.id)) {
        continue
      }
      seen.add(node.id)
      useMap.set(node.id, (useMap.get(node.id) ?? 0) + 1)
    }
  }

  return Array.from(useMap.entries())
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count >= 2)
    .slice(0, 24)
    .map(([id]) => id);
}

export const RUNES: Rune[] = BASE_RUNES.map((rune) => ({
  ...rune,
  description: rune.description ?? rune.purpose,
}));

export const HUB_SKILLS = buildHubSkills(RUNES);

export const runes = RUNES;

function buildFullGraph() {
  const nodeMap = new Map<string, SkillNode>();
  const allEdges: SkillEdge[] = [];

  for (const rune of RUNES) {
    for (const node of rune.nodes) {
      if (!nodeMap.has(node.id)) {
        nodeMap.set(node.id, node);
      }
    }
    for (const edge of rune.edges) {
      allEdges.push({ ...edge, rune: rune.slug });
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges: allEdges,
  };
}

export const FULL_GRAPH = buildFullGraph();
