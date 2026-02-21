export default function StrategyPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#E2E2E8', marginBottom: '0.5rem' }}>RuneGraph Strategy</h1>
        <p style={{ color: '#888', marginTop: 0, lineHeight: 1.6 }}>
          실행 가능한 AI 오케스트레이션을 위한 제품 설계, 커뮤니티 확산, 기술 성장의 3축 전략을 정리합니다.
        </p>
      </div>

      <section style={{ marginBottom: '1.25rem', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1rem' }}>
        <h2 style={{ color: '#E2E2E8', marginTop: 0 }}>1) Product Strategy</h2>
        <ul style={{ paddingLeft: '1.2rem', color: '#999', lineHeight: 1.8, marginTop: '0.75rem' }}>
          <li>런타임보다 그래프 탐색을 먼저 완성해, 사용자가 스킬 간 관계를 직관적으로 이해하도록 설계한다.</li>
          <li>단일 Rune 템플릿을 공개하고, 실제 사용 사례(이메일, 리서치, 콘텐츠, 인프라 알림) 중심으로 확장한다.</li>
          <li>그래프 편집기 이전에 "읽기 좋은 보기"와 "복사해 쓰기 좋은 문서"를 함께 제공한다.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '1.25rem', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1rem' }}>
        <h2 style={{ color: '#E2E2E8', marginTop: 0 }}>2) Go-to-Market Strategy</h2>
        <ul style={{ paddingLeft: '1.2rem', color: '#999', lineHeight: 1.8, marginTop: '0.75rem' }}>
          <li>오픈소스 철학을 유지하되, 배포 가능한 실사용 템플릿과 인증된 스택 가이드를 제공한다.</li>
          <li>개발자-제품팀-운영팀 공통 언어가 되도록 노드(입력/처리/출력) 사전을 단일화한다.</li>
          <li>공식 템플릿 레지스트리를 운영하여 검색/분류/별점 기반으로 우선순위를 만든다.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '1.25rem', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1rem' }}>
        <h2 style={{ color: '#E2E2E8', marginTop: 0 }}>3) Technical Strategy</h2>
        <ul style={{ paddingLeft: '1.2rem', color: '#999', lineHeight: 1.8, marginTop: '0.75rem' }}>
          <li>스킬 스키마를 표준 JSON-LD 형태로 확장해 LLM, API, 이벤트 스키마의 상호운용성을 확보한다.</li>
          <li>실행 트레이스(메타 로그)와 그래프 버전 히스토리를 연결해 디버깅/감사를 강화한다.</li>
          <li>다크 패턴을 없애기 위해 각 스킬의 책임, 입출력, 장애 모드, 비용 추정치를 명시한다.</li>
        </ul>
      </section>

      <section style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: '12px', padding: '1rem' }}>
        <h2 style={{ color: '#E2E2E8', marginTop: 0 }}>Roadmap (90일)</h2>
        <p style={{ color: '#999', lineHeight: 1.7 }}>
          Q1: 검색/필터와 사용성 개선, 스킬 태깅 품질 향상<br />
          Q2: Graph 버전관리, 임포트/익스포트, Team Collaboration<br />
          Q3: 런북 자동 생성기 + 실행 로그 뷰어 + 템플릿 검증 파이프라인
        </p>
      </section>
    </div>
  )
}
