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
  nodes: SkillNode[];
  edges: SkillEdge[];
}

export const RUNES: Rune[] = [
  {
    id: 'morning-brief',
    slug: 'morning-brief',
    name: 'Morning Brief',
    purpose: '매일 아침 날씨·일정·뉴스를 종합해 음성 브리핑 생성',
    category: 'Productivity',
    emoji: '🌅',
    useCase: '기상 후 "오늘 브리핑 해줘" → 날씨(12°C, 비), 일정(회의 2건), 주요 뉴스 3건을 자연스러운 음성으로 전달',
    nodes: [
      { id: 'weather-api', label: 'Weather API', category: 'api' },
      { id: 'calendar-fetch', label: 'Calendar Fetch', category: 'input' },
      { id: 'news-headlines', label: 'News Headlines', category: 'api' },
      { id: 'llm-summarize', label: 'LLM Summarize', category: 'llm' },
      { id: 'tts-speak', label: 'TTS Speak', category: 'output' },
    ],
    edges: [
      { source: 'weather-api', target: 'llm-summarize', label: 'weather data' },
      { source: 'calendar-fetch', target: 'llm-summarize', label: 'events' },
      { source: 'news-headlines', target: 'llm-summarize', label: 'headlines' },
      { source: 'llm-summarize', target: 'tts-speak', label: 'briefing text' },
    ],
  },
  {
    id: 'deep-research',
    slug: 'deep-research',
    name: 'Deep Research',
    purpose: '키워드로 웹 리서치 → 요약 → Notion에 자동 저장',
    category: 'Research',
    emoji: '🔬',
    useCase: '"AI agent framework 트렌드 조사해줘" → 상위 10개 결과 스크래핑 → 핵심 인사이트 요약 → Notion DB에 자동 저장',
    nodes: [
      { id: 'web-search', label: 'Web Search', category: 'api' },
      { id: 'web-scrape', label: 'Web Scrape', category: 'api' },
      { id: 'llm-summarize', label: 'LLM Summarize', category: 'llm' },
      { id: 'notion-save', label: 'Notion Save', category: 'output' },
    ],
    edges: [
      { source: 'web-search', target: 'web-scrape', label: 'urls' },
      { source: 'web-scrape', target: 'llm-summarize', label: 'raw content' },
      { source: 'llm-summarize', target: 'notion-save', label: 'summary' },
    ],
  },
  {
    id: 'blog-forge',
    slug: 'blog-forge',
    name: 'Blog Forge',
    purpose: '키워드에서 SEO 최적화된 블로그 포스트 자동 생성',
    category: 'Content',
    emoji: '✍️',
    useCase: '"Next.js 15 새 기능" 키워드 → 롱테일 키워드 분석 → 아웃라인 → 3000자 초안 → 대표 이미지 생성 → MD 파일 출력',
    nodes: [
      { id: 'keyword-research', label: 'Keyword Research', category: 'api' },
      { id: 'llm-outline', label: 'LLM Outline', category: 'llm' },
      { id: 'llm-draft', label: 'LLM Draft', category: 'llm' },
      { id: 'image-gen', label: 'Image Generate', category: 'output' },
      { id: 'markdown-export', label: 'Markdown Export', category: 'output' },
    ],
    edges: [
      { source: 'keyword-research', target: 'llm-outline', label: 'keywords' },
      { source: 'llm-outline', target: 'llm-draft', label: 'outline' },
      { source: 'llm-draft', target: 'markdown-export', label: 'draft text' },
      { source: 'llm-draft', target: 'image-gen', label: 'image prompt' },
      { source: 'image-gen', target: 'markdown-export', label: 'image url' },
    ],
  },
  {
    id: 'code-sentinel',
    slug: 'code-sentinel',
    name: 'Code Sentinel',
    purpose: 'PR diff를 분석해 보안·성능·스타일 이슈를 자동 리포트',
    category: 'Dev',
    emoji: '🛡️',
    useCase: 'PR 올라오면 → diff 추출 → LLM이 로직/보안 리뷰 + ESLint 정적분석 → Slack에 리뷰 결과 알림',
    nodes: [
      { id: 'github-diff', label: 'GitHub Diff', category: 'api' },
      { id: 'llm-code-review', label: 'LLM Code Review', category: 'llm' },
      { id: 'eslint-check', label: 'ESLint Check', category: 'api' },
      { id: 'slack-notify', label: 'Slack Notify', category: 'output' },
    ],
    edges: [
      { source: 'github-diff', target: 'llm-code-review', label: 'diff text' },
      { source: 'github-diff', target: 'eslint-check', label: 'changed files' },
      { source: 'llm-code-review', target: 'slack-notify', label: 'review comments' },
      { source: 'eslint-check', target: 'slack-notify', label: 'lint results' },
    ],
  },
  {
    id: 'data-insight',
    slug: 'data-insight',
    name: 'Data Insight',
    purpose: 'CSV 업로드 → 자동 분석 → 차트 + 인사이트 PDF 리포트',
    category: 'Data',
    emoji: '📊',
    useCase: '매출 CSV 업로드 → 통계 분석 → 트렌드 차트 생성 + "전월 대비 12% 성장" 인사이트 → PDF 리포트',
    nodes: [
      { id: 'csv-parse', label: 'CSV Parse', category: 'input' },
      { id: 'python-analyze', label: 'Python Analyze', category: 'api' },
      { id: 'chart-gen', label: 'Chart Generate', category: 'output' },
      { id: 'llm-interpret', label: 'LLM Interpret', category: 'llm' },
      { id: 'pdf-export', label: 'PDF Export', category: 'output' },
    ],
    edges: [
      { source: 'csv-parse', target: 'python-analyze', label: 'parsed data' },
      { source: 'python-analyze', target: 'chart-gen', label: 'stats' },
      { source: 'python-analyze', target: 'llm-interpret', label: 'stats' },
      { source: 'chart-gen', target: 'pdf-export', label: 'chart images' },
      { source: 'llm-interpret', target: 'pdf-export', label: 'insight text' },
    ],
  },
  {
    id: 'support-sage',
    slug: 'support-sage',
    name: 'Support Sage',
    purpose: '고객 문의를 분류하고 FAQ 매칭 또는 자동 답변 초안 생성',
    category: 'Support',
    emoji: '🎧',
    useCase: '"결제가 안 돼요" 티켓 → 카테고리: billing → FAQ에서 유사 답변 검색 → 맞춤 답변 초안 → Zendesk에 내부 노트 등록',
    nodes: [
      { id: 'ticket-ingest', label: 'Ticket Ingest', category: 'input' },
      { id: 'llm-classify', label: 'LLM Classify', category: 'llm' },
      { id: 'faq-search', label: 'FAQ Search', category: 'api' },
      { id: 'llm-reply-draft', label: 'LLM Reply Draft', category: 'llm' },
      { id: 'zendesk-update', label: 'Zendesk Update', category: 'output' },
    ],
    edges: [
      { source: 'ticket-ingest', target: 'llm-classify', label: 'ticket text' },
      { source: 'llm-classify', target: 'faq-search', label: 'category + intent' },
      { source: 'faq-search', target: 'llm-reply-draft', label: 'matched FAQs' },
      { source: 'llm-reply-draft', target: 'zendesk-update', label: 'draft reply' },
    ],
  },
  {
    id: 'social-pulse',
    slug: 'social-pulse',
    name: 'Social Pulse',
    purpose: '트렌드 감지 → 포스트 생성 → 멀티 플랫폼 예약 발행',
    category: 'Social',
    emoji: '📱',
    useCase: 'AI 관련 트렌드 감지 → 플랫폼별 톤에 맞는 카피 생성 → 대표 이미지 → Twitter/LinkedIn 동시 예약 발행',
    nodes: [
      { id: 'trend-monitor', label: 'Trend Monitor', category: 'api' },
      { id: 'llm-copywrite', label: 'LLM Copywrite', category: 'llm' },
      { id: 'image-gen', label: 'Image Generate', category: 'output' },
      { id: 'twitter-post', label: 'Twitter Post', category: 'output' },
      { id: 'linkedin-post', label: 'LinkedIn Post', category: 'output' },
    ],
    edges: [
      { source: 'trend-monitor', target: 'llm-copywrite', label: 'trend data' },
      { source: 'llm-copywrite', target: 'image-gen', label: 'image prompt' },
      { source: 'llm-copywrite', target: 'twitter-post', label: 'tweet text' },
      { source: 'llm-copywrite', target: 'linkedin-post', label: 'post text' },
      { source: 'image-gen', target: 'twitter-post', label: 'image' },
      { source: 'image-gen', target: 'linkedin-post', label: 'image' },
    ],
  },
  {
    id: 'inbox-zero',
    slug: 'inbox-zero',
    name: 'Inbox Zero',
    purpose: '이메일 분류 → 중요도 판단 → 자동 답장 초안 + 요약',
    category: 'Email',
    emoji: '📧',
    useCase: '읽지 않은 메일 30통 → 긴급 3통에 답장 초안 생성 → 나머지 27통 3줄 요약 → Gmail 임시저장함에 초안 등록',
    nodes: [
      { id: 'gmail-fetch', label: 'Gmail Fetch', category: 'input' },
      { id: 'llm-classify', label: 'LLM Classify', category: 'llm' },
      { id: 'llm-reply-draft', label: 'LLM Reply Draft', category: 'llm' },
      { id: 'llm-summarize', label: 'LLM Summarize', category: 'llm' },
      { id: 'gmail-draft', label: 'Gmail Draft', category: 'output' },
    ],
    edges: [
      { source: 'gmail-fetch', target: 'llm-classify', label: 'emails' },
      { source: 'llm-classify', target: 'llm-reply-draft', label: 'urgent emails' },
      { source: 'llm-classify', target: 'llm-summarize', label: 'normal emails' },
      { source: 'llm-reply-draft', target: 'gmail-draft', label: 'reply draft' },
      { source: 'llm-summarize', target: 'gmail-draft', label: 'summary digest' },
    ],
  },
  {
    id: 'alpha-watch',
    slug: 'alpha-watch',
    name: 'Alpha Watch',
    purpose: '포트폴리오 자산 가격 모니터링 → 이상 감지 → 즉시 알림',
    category: 'Finance',
    emoji: '📈',
    useCase: 'BTC 10% 급등 감지 → 포트폴리오 영향도 분석 → "BTC +10.2%, 포트폴리오 +3.4%, 리밸런싱 권고" → Telegram 알림',
    nodes: [
      { id: 'market-data', label: 'Market Data', category: 'api' },
      { id: 'portfolio-fetch', label: 'Portfolio Fetch', category: 'api' },
      { id: 'llm-analyze', label: 'LLM Analyze', category: 'llm' },
      { id: 'alert-rules', label: 'Alert Rules', category: 'api' },
      { id: 'telegram-notify', label: 'Telegram Notify', category: 'output' },
    ],
    edges: [
      { source: 'market-data', target: 'llm-analyze', label: 'price data' },
      { source: 'portfolio-fetch', target: 'llm-analyze', label: 'holdings' },
      { source: 'llm-analyze', target: 'alert-rules', label: 'analysis' },
      { source: 'alert-rules', target: 'telegram-notify', label: 'triggered alerts' },
    ],
  },
  {
    id: 'standup-sync',
    slug: 'standup-sync',
    name: 'Standup Sync',
    purpose: 'Slack+GitHub+Jira에서 팀 활동 수집 → 데일리 스탠드업 요약 자동 포스팅',
    category: 'Team',
    emoji: '🤝',
    useCase: '매일 오전 9시 → 어제 Slack 대화 + GitHub 커밋/PR + Jira 상태변경 수집 → "PR 5건 머지, 이슈 3건 완료" 요약 → #standup 채널 자동 포스팅',
    nodes: [
      { id: 'slack-history', label: 'Slack History', category: 'api' },
      { id: 'github-activity', label: 'GitHub Activity', category: 'api' },
      { id: 'jira-updates', label: 'Jira Updates', category: 'api' },
      { id: 'llm-summarize', label: 'LLM Summarize', category: 'llm' },
      { id: 'slack-notify', label: 'Slack Notify', category: 'output' },
    ],
    edges: [
      { source: 'slack-history', target: 'llm-summarize', label: 'messages' },
      { source: 'github-activity', target: 'llm-summarize', label: 'commits/PRs' },
      { source: 'jira-updates', target: 'llm-summarize', label: 'issue changes' },
      { source: 'llm-summarize', target: 'slack-notify', label: 'standup summary' },
    ],
  },
];

// Full integrated graph (all nodes + edges from all runes)
export const FULL_GRAPH = {
  nodes: [
    { id: 'weather-api', label: 'Weather API', category: 'api' as SkillCategory },
    { id: 'calendar-fetch', label: 'Calendar Fetch', category: 'input' as SkillCategory },
    { id: 'news-headlines', label: 'News Headlines', category: 'api' as SkillCategory },
    { id: 'web-search', label: 'Web Search', category: 'api' as SkillCategory },
    { id: 'web-scrape', label: 'Web Scrape', category: 'api' as SkillCategory },
    { id: 'keyword-research', label: 'Keyword Research', category: 'api' as SkillCategory },
    { id: 'github-diff', label: 'GitHub Diff', category: 'api' as SkillCategory },
    { id: 'eslint-check', label: 'ESLint Check', category: 'api' as SkillCategory },
    { id: 'csv-parse', label: 'CSV Parse', category: 'input' as SkillCategory },
    { id: 'python-analyze', label: 'Python Analyze', category: 'api' as SkillCategory },
    { id: 'ticket-ingest', label: 'Ticket Ingest', category: 'input' as SkillCategory },
    { id: 'faq-search', label: 'FAQ Search', category: 'api' as SkillCategory },
    { id: 'trend-monitor', label: 'Trend Monitor', category: 'api' as SkillCategory },
    { id: 'gmail-fetch', label: 'Gmail Fetch', category: 'input' as SkillCategory },
    { id: 'market-data', label: 'Market Data', category: 'api' as SkillCategory },
    { id: 'portfolio-fetch', label: 'Portfolio Fetch', category: 'api' as SkillCategory },
    { id: 'alert-rules', label: 'Alert Rules', category: 'api' as SkillCategory },
    { id: 'slack-history', label: 'Slack History', category: 'api' as SkillCategory },
    { id: 'github-activity', label: 'GitHub Activity', category: 'api' as SkillCategory },
    { id: 'jira-updates', label: 'Jira Updates', category: 'api' as SkillCategory },
    { id: 'llm-summarize', label: 'LLM Summarize', category: 'llm' as SkillCategory },
    { id: 'llm-classify', label: 'LLM Classify', category: 'llm' as SkillCategory },
    { id: 'llm-code-review', label: 'LLM Code Review', category: 'llm' as SkillCategory },
    { id: 'llm-interpret', label: 'LLM Interpret', category: 'llm' as SkillCategory },
    { id: 'llm-reply-draft', label: 'LLM Reply Draft', category: 'llm' as SkillCategory },
    { id: 'llm-copywrite', label: 'LLM Copywrite', category: 'llm' as SkillCategory },
    { id: 'llm-analyze', label: 'LLM Analyze', category: 'llm' as SkillCategory },
    { id: 'llm-outline', label: 'LLM Outline', category: 'llm' as SkillCategory },
    { id: 'llm-draft', label: 'LLM Draft', category: 'llm' as SkillCategory },
    { id: 'image-gen', label: 'Image Generate', category: 'output' as SkillCategory },
    { id: 'tts-speak', label: 'TTS Speak', category: 'output' as SkillCategory },
    { id: 'notion-save', label: 'Notion Save', category: 'output' as SkillCategory },
    { id: 'slack-notify', label: 'Slack Notify', category: 'output' as SkillCategory },
    { id: 'zendesk-update', label: 'Zendesk Update', category: 'output' as SkillCategory },
    { id: 'twitter-post', label: 'Twitter Post', category: 'output' as SkillCategory },
    { id: 'linkedin-post', label: 'LinkedIn Post', category: 'output' as SkillCategory },
    { id: 'gmail-draft', label: 'Gmail Draft', category: 'output' as SkillCategory },
    { id: 'telegram-notify', label: 'Telegram Notify', category: 'output' as SkillCategory },
    { id: 'pdf-export', label: 'PDF Export', category: 'output' as SkillCategory },
    { id: 'chart-gen', label: 'Chart Generate', category: 'output' as SkillCategory },
    { id: 'markdown-export', label: 'Markdown Export', category: 'output' as SkillCategory },
  ] as SkillNode[],
  edges: [
    { source: 'weather-api', target: 'llm-summarize', label: 'weather data', rune: 'morning-brief' },
    { source: 'calendar-fetch', target: 'llm-summarize', label: 'events', rune: 'morning-brief' },
    { source: 'news-headlines', target: 'llm-summarize', label: 'headlines', rune: 'morning-brief' },
    { source: 'llm-summarize', target: 'tts-speak', label: 'briefing text', rune: 'morning-brief' },
    { source: 'web-search', target: 'web-scrape', label: 'urls', rune: 'deep-research' },
    { source: 'web-scrape', target: 'llm-summarize', label: 'raw content', rune: 'deep-research' },
    { source: 'llm-summarize', target: 'notion-save', label: 'summary', rune: 'deep-research' },
    { source: 'keyword-research', target: 'llm-outline', label: 'keywords', rune: 'blog-forge' },
    { source: 'llm-outline', target: 'llm-draft', label: 'outline', rune: 'blog-forge' },
    { source: 'llm-draft', target: 'markdown-export', label: 'draft text', rune: 'blog-forge' },
    { source: 'llm-draft', target: 'image-gen', label: 'image prompt', rune: 'blog-forge' },
    { source: 'image-gen', target: 'markdown-export', label: 'image url', rune: 'blog-forge' },
    { source: 'github-diff', target: 'llm-code-review', label: 'diff text', rune: 'code-sentinel' },
    { source: 'github-diff', target: 'eslint-check', label: 'changed files', rune: 'code-sentinel' },
    { source: 'llm-code-review', target: 'slack-notify', label: 'review', rune: 'code-sentinel' },
    { source: 'eslint-check', target: 'slack-notify', label: 'lint results', rune: 'code-sentinel' },
    { source: 'csv-parse', target: 'python-analyze', label: 'parsed data', rune: 'data-insight' },
    { source: 'python-analyze', target: 'chart-gen', label: 'stats', rune: 'data-insight' },
    { source: 'python-analyze', target: 'llm-interpret', label: 'stats', rune: 'data-insight' },
    { source: 'chart-gen', target: 'pdf-export', label: 'chart images', rune: 'data-insight' },
    { source: 'llm-interpret', target: 'pdf-export', label: 'insight text', rune: 'data-insight' },
    { source: 'ticket-ingest', target: 'llm-classify', label: 'ticket text', rune: 'support-sage' },
    { source: 'llm-classify', target: 'faq-search', label: 'category', rune: 'support-sage' },
    { source: 'faq-search', target: 'llm-reply-draft', label: 'matched FAQs', rune: 'support-sage' },
    { source: 'llm-reply-draft', target: 'zendesk-update', label: 'draft reply', rune: 'support-sage' },
    { source: 'trend-monitor', target: 'llm-copywrite', label: 'trend data', rune: 'social-pulse' },
    { source: 'llm-copywrite', target: 'image-gen', label: 'image prompt', rune: 'social-pulse' },
    { source: 'llm-copywrite', target: 'twitter-post', label: 'tweet text', rune: 'social-pulse' },
    { source: 'llm-copywrite', target: 'linkedin-post', label: 'post text', rune: 'social-pulse' },
    { source: 'image-gen', target: 'twitter-post', label: 'image', rune: 'social-pulse' },
    { source: 'image-gen', target: 'linkedin-post', label: 'image', rune: 'social-pulse' },
    { source: 'gmail-fetch', target: 'llm-classify', label: 'emails', rune: 'inbox-zero' },
    { source: 'llm-classify', target: 'llm-reply-draft', label: 'urgent emails', rune: 'inbox-zero' },
    { source: 'llm-classify', target: 'llm-summarize', label: 'normal emails', rune: 'inbox-zero' },
    { source: 'llm-reply-draft', target: 'gmail-draft', label: 'reply draft', rune: 'inbox-zero' },
    { source: 'llm-summarize', target: 'gmail-draft', label: 'summary digest', rune: 'inbox-zero' },
    { source: 'market-data', target: 'llm-analyze', label: 'price data', rune: 'alpha-watch' },
    { source: 'portfolio-fetch', target: 'llm-analyze', label: 'holdings', rune: 'alpha-watch' },
    { source: 'llm-analyze', target: 'alert-rules', label: 'analysis', rune: 'alpha-watch' },
    { source: 'alert-rules', target: 'telegram-notify', label: 'triggered alerts', rune: 'alpha-watch' },
    { source: 'slack-history', target: 'llm-summarize', label: 'messages', rune: 'standup-sync' },
    { source: 'github-activity', target: 'llm-summarize', label: 'commits/PRs', rune: 'standup-sync' },
    { source: 'jira-updates', target: 'llm-summarize', label: 'issue changes', rune: 'standup-sync' },
    { source: 'llm-summarize', target: 'slack-notify', label: 'standup summary', rune: 'standup-sync' },
  ] as SkillEdge[],
};

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  input: '#3B82F6',
  api: '#10B981',
  llm: '#8B5CF6',
  output: '#F59E0B',
};

export const HUB_SKILLS = ['llm-summarize', 'llm-classify', 'image-gen', 'slack-notify', 'llm-reply-draft'];
