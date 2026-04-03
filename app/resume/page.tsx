'use client'

/**
 * /resume — Print-optimized resume page.
 *
 * Designed to be saved as PDF via Cmd+P / Ctrl+P.
 * Uses semantic HTML so ATS systems can parse it correctly.
 * All text is real DOM content — selectable, searchable, copyable.
 */

const Resume = () => {
  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.45in 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .resume-container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-hide {
            display: none !important;
          }
          /* Prevent orphans in experience sections */
          .experience-item {
            break-inside: avoid;
          }
          .project-item {
            break-inside: avoid;
          }
        }

        /* Screen styles for preview */
        @media screen {
          .resume-page {
            background: #f5f5f5;
            min-height: 100vh;
            padding: 2rem 1rem;
          }
          .resume-container {
            background: white;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in 0.55in;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06);
          }
        }
      `}</style>

      <div className='resume-page'>
        {/* Print button — hidden when printing */}
        <div
          className='print-hide'
          style={{
            maxWidth: '8.5in',
            margin: '0 auto 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            href='/'
            style={{
              fontSize: '0.8rem',
              color: '#666',
              textDecoration: 'none',
            }}
          >
            &larr; Back to portfolio
          </a>
          <button
            onClick={() => window.print()}
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: '#28231F',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Save as PDF
          </button>
        </div>

        <div
          className='resume-container'
          style={{ fontFamily: "'Noto Sans', system-ui, -apple-system, sans-serif", color: '#1a1a1a', lineHeight: 1.5 }}
        >
          {/* ─── Header ──────────────────────────────────── */}
          <header style={{ marginBottom: '1.25rem', borderBottom: '1.5px solid #e0e0e0', paddingBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, letterSpacing: '0.02em' }}>
                  MARK ARTISHUK
                </h1>
                <p style={{ fontSize: '0.85rem', color: '#555', margin: '0.2rem 0 0', fontWeight: 500 }}>
                  Senior Software Engineer
                </p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#444', lineHeight: 1.7 }}>
                <div>markyshuk@gmail.com</div>
                <div>(916) 420-8178</div>
                <div>markartishuk.com</div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <span>github.com/artish1</span>
                  <span>linkedin.com/in/mark-artishuk</span>
                </div>
              </div>
            </div>
          </header>

          {/* ─── Technical Skills ────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Technical Skills</SectionTitle>
            <div style={{ fontSize: '0.78rem', lineHeight: 1.8 }}>
              <SkillRow label='Languages' value='TypeScript, JavaScript, SQL, Rust, C#, Java' />
              <SkillRow
                label='Frontend'
                value='React, Next.js, React Native, Tailwind CSS, Three.js, Framer Motion, Apollo Client'
              />
              <SkillRow
                label='Backend'
                value='Node.js, GraphQL, tRPC, Express, REST, Prisma, PostgreSQL, Redis, BullMQ, Elasticsearch'
              />
              <SkillRow label='Infrastructure' value='AWS (Lambda, EB, S3), Docker, CI/CD, Vercel, PM2, Puppeteer' />
              <SkillRow
                label='Practices'
                value='System Design, API Design, Performance Optimization, Code Review, Technical Mentorship'
              />
            </div>
          </section>

          {/* ─── Experience ──────────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Experience</SectionTitle>

            <div className='experience-item' style={{ marginBottom: '0.9rem' }}>
              <ExperienceHeader
                company='American Poolplayers Association'
                location='Remote'
                role='Software Engineer'
                period='Feb 2021 - Present'
              />
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Lead feature development and technical planning for web and mobile applications serving 200,000+
                  members nationwide, owning tickets from requirements through release
                </Li>
                <Li>
                  Architect and maintain scalable systems across member services, tournament management, league play,
                  and internal staff tools
                </Li>
                <Li>
                  Drive frontend performance improvements — reduced unnecessary re-renders, optimized component
                  architecture, and improved mobile responsiveness across the platform
                </Li>
                <Li>
                  Improve backend reliability through query optimization, caching strategies, and response time
                  reduction on high-traffic API endpoints
                </Li>
                <Li>
                  Enforce code quality through documentation, thorough code reviews, and mentoring engineers on best
                  practices and modern development patterns
                </Li>
              </ul>
            </div>

            <div className='experience-item' style={{ marginBottom: '0.9rem' }}>
              <ExperienceHeader company='HuntNHook' role='Co-Founder' period='2025 - Present' />
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Co-founded and sole-engineered a two-sided marketplace for fishing charters, hunting trips, and
                  outdoor recreation — owned every layer from schema design to deployment
                </Li>
                <Li>
                  Built full Stripe Connect integration: hold-based payments, cancellation compensation, dispute
                  handling, delayed host payouts with daily sweep jobs, and idempotent webhook processing
                </Li>
                <Li>
                  Implemented PostGIS spatial search with bounding-box filtering, distance sorting, and
                  multi-dimensional filters across species, techniques, price, and date availability
                </Li>
                <Li>
                  Architected PM2 cluster deployment with dedicated BullMQ worker processes, Redis PubSub for
                  cross-instance GraphQL subscriptions, and 3-tier cache invalidation
                </Li>
              </ul>
              <TechLine tech='Next.js, TypeScript, PostgreSQL/PostGIS, GraphQL, Stripe Connect, Redis/BullMQ, Prisma, Apollo Client' />
            </div>
          </section>

          {/* ─── Projects ────────────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Projects</SectionTitle>

            <div className='project-item' style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.82rem', fontWeight: 700, margin: 0 }}>Rafa Sauna</h3>
                  <span style={{ fontSize: '0.7rem', color: '#888' }}>— Solo Developer (Contract)</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>2025</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#444', margin: '0.2rem 0' }}>
                Full-stack booking, membership, and POS platform for a sauna house. Next.js admin dashboard, React
                Native NFC wristband app, and self-service kiosk for contactless food and drink orders.
              </p>
              <ul style={{ margin: '0.2rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Built NFC wristband pipeline: JWT generation, React Native writer, and kiosk reader for contactless
                  tab orders
                </Li>
                <Li>
                  Designed in-memory booking engine with party-aware capacity, dynamic pricing, and blockout rules
                </Li>
                <Li>
                  Integrated Stripe: subscriptions, one-time payments, Apple Pay, webhooks, refunds, and promo codes
                </Li>
              </ul>
              <TechLine tech='Next.js, TypeScript, Prisma/PostgreSQL, tRPC, Stripe, AWS EB, React Native, NFC' />
            </div>

            <div className='project-item' style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.82rem', fontWeight: 700, margin: 0 }}>Construction Automation Platform</h3>
                  <span style={{ fontSize: '0.7rem', color: '#888' }}>— Contract Developer</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>2025</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#444', margin: '0.2rem 0' }}>
                Internal automation tool for a construction company. Reverse-engineered a closed third-party API to
                enable data entry automation, sales pipeline syncing, and invoice generation.
              </p>
              <ul style={{ margin: '0.2rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Reverse-engineered an undocumented API to programmatically interface with the client&apos;s existing
                  vendor platform
                </Li>
                <Li>
                  Automated 20+ daily data entry records and built pipeline-to-invoice sync mapping construction models
                  into auto-generated invoices
                </Li>
                <Li>
                  Implemented headless browser automation via Puppeteer on AWS Lambda for workflows the API
                  couldn&apos;t cover
                </Li>
              </ul>
              <TechLine tech='Next.js, TypeScript, PostgreSQL, Puppeteer, AWS Lambda' />
            </div>
          </section>

          {/* ─── Education ───────────────────────────────── */}
          <section>
            <SectionTitle>Education</SectionTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <div>
                <span style={{ fontWeight: 600 }}>Lambda School</span>
                <span style={{ color: '#666' }}> — Full Stack Web Development</span>
              </div>
              <span style={{ color: '#888', fontSize: '0.72rem' }}>2020</span>
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginTop: '0.25rem' }}
            >
              <div>
                <span style={{ fontWeight: 600 }}>Sierra College</span>
                <span style={{ color: '#666' }}> — Computer Science</span>
              </div>
              <span style={{ color: '#888', fontSize: '0.72rem' }}>2018</span>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

// ─── Reusable components ──────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontSize: '0.72rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#1a1a1a',
      borderBottom: '1px solid #d0d0d0',
      paddingBottom: '0.25rem',
      marginBottom: '0.6rem',
      marginTop: 0,
    }}
  >
    {children}
  </h2>
)

const SkillRow = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', gap: '0.5rem' }}>
    <span style={{ fontWeight: 600, minWidth: '6.5rem', color: '#333' }}>{label}:</span>
    <span style={{ color: '#444' }}>{value}</span>
  </div>
)

const ExperienceHeader = ({
  company,
  location,
  role,
  period,
}: {
  company: string
  location?: string
  role: string
  period: string
}) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>{company}</h3>
        {location && <span style={{ fontSize: '0.72rem', color: '#888' }}>({location})</span>}
      </div>
      <span style={{ fontSize: '0.72rem', color: '#888' }}>{period}</span>
    </div>
    <p style={{ fontSize: '0.78rem', color: '#555', margin: '0.1rem 0 0', fontStyle: 'italic' }}>{role}</p>
  </div>
)

const Li = ({ children }: { children: React.ReactNode }) => (
  <li style={{ marginBottom: '0.15rem', lineHeight: 1.55, paddingLeft: '0.15rem' }}>{children}</li>
)

const TechLine = ({ tech }: { tech: string }) => (
  <p style={{ fontSize: '0.7rem', color: '#777', margin: '0.3rem 0 0', fontStyle: 'italic' }}>Tech: {tech}</p>
)

export default Resume
