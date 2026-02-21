import type { Skill } from '@/data/skills-registry'

// Safety Score: 0-100 (higher = safer)
// Breakdown: Provider Trust + Action Risk + Data Sensitivity + Reversibility

const TIER1_SERVICES = ['Gmail', 'Google Calendar', 'Google Sheets', 'Google Docs', 'Slack', 'GitHub', 'Microsoft', 'Outlook', 'Notion', 'Stripe', 'Anthropic', 'OpenAI', 'Google', 'Cloudflare']
const TIER2_SERVICES = ['Discord', 'Telegram', 'Jira', 'Linear', 'Airtable', 'Supabase', 'Vercel', 'HubSpot', 'Zendesk', 'Intercom', 'Shopify', 'Twilio', 'SendGrid', 'Mailchimp']

const WRITE_KEYWORDS = ['send', 'post', 'create', 'publish', 'write', 'update', 'delete', 'remove', 'deploy', 'submit', 'push', 'execute', 'run', 'trigger']
const SENSITIVE_SERVICES = ['Stripe', 'Plaid', 'Coinbase', 'Binance', 'QuickBooks', 'Xero', 'Apple Health', 'Google Fit', 'Oura', 'OpenFDA', 'DocuSign']

export interface SafetyBreakdown {
  total: number
  providerTrust:    { score: number; max: number; label: string }
  actionRisk:       { score: number; max: number; label: string }
  dataSensitivity:  { score: number; max: number; label: string }
  reversibility:    { score: number; max: number; label: string }
}

export function getSafetyScore(skill: Skill): SafetyBreakdown {
  const idLower = skill.id.toLowerCase()
  const labelLower = skill.label.toLowerCase()
  const serviceName = skill.service

  // 1. Provider Trust (0-30)
  let providerTrust = 15
  if (TIER1_SERVICES.some(s => serviceName.includes(s))) providerTrust = 28
  else if (TIER2_SERVICES.some(s => serviceName.includes(s))) providerTrust = 22
  else if (skill.category === 'llm') providerTrust = 25 // LLMs are known providers

  // 2. Action Risk (0-30): read = safer, write = riskier
  const isWrite = WRITE_KEYWORDS.some(w => idLower.includes(w) || labelLower.includes(w))
  let actionRisk = isWrite ? 15 : 27
  if (skill.category === 'input') actionRisk = Math.max(actionRisk, 22) // reads are safer
  if (idLower.includes('delete') || idLower.includes('remove')) actionRisk = 8
  if (idLower.includes('fetch') || idLower.includes('read') || idLower.includes('get') || idLower.includes('list') || idLower.includes('search')) actionRisk = 27

  // 3. Data Sensitivity (0-25)
  let dataSensitivity = 18
  if (SENSITIVE_SERVICES.some(s => serviceName.includes(s))) dataSensitivity = 8
  if (skill.category === 'llm') dataSensitivity = 15 // data passes through LLM
  if (idLower.includes('health') || idLower.includes('medical') || idLower.includes('fda')) dataSensitivity = 7
  if (idLower.includes('public') || idLower.includes('search') || idLower.includes('news') || idLower.includes('weather')) dataSensitivity = 24

  // 4. Reversibility (0-15)
  let reversibility = 10
  if (isWrite && (idLower.includes('delete') || idLower.includes('remove'))) reversibility = 4
  else if (isWrite) reversibility = 8
  else reversibility = 14 // reads are fully reversible

  const total = Math.min(100, providerTrust + actionRisk + dataSensitivity + reversibility)

  return {
    total,
    providerTrust:   { score: providerTrust,  max: 30, label: 'Provider Trust' },
    actionRisk:      { score: actionRisk,      max: 30, label: 'Action Safety' },
    dataSensitivity: { score: dataSensitivity, max: 25, label: 'Data Sensitivity' },
    reversibility:   { score: reversibility,   max: 15, label: 'Reversibility' },
  }
}

export function safetyColor(score: number): string {
  if (score >= 80) return '#9ece6a'   // green
  if (score >= 60) return '#bb9af7'   // purple
  if (score >= 40) return '#ff9e64'   // orange
  return '#f7768e'                    // red
}

export function safetyLabel(score: number): string {
  if (score >= 80) return 'High Safety'
  if (score >= 60) return 'Moderate'
  if (score >= 40) return 'Caution'
  return 'High Risk'
}
