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
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, letterSpacing: '0.02em' }}>MARK ARTISHUK</h1>
              <p style={{ fontSize: '0.85rem', color: '#555', margin: '0.2rem 0 0', fontWeight: 500 }}>
                Software Engineer
              </p>
              <p style={{ fontSize: '0.78rem', color: '#444', margin: '0.35rem 0 0' }}>
                <a href='mailto:markyshuk@gmail.com' style={{ color: '#444', textDecoration: 'none' }}>
                  markyshuk@gmail.com
                </a>
                {' • '}(916) 420-8178
              </p>
              <p style={{ fontSize: '0.78rem', color: '#444', margin: '0.15rem 0 0' }}>
                markartishuk.com • github.com/artish1 • linkedin.com/in/mark-artishuk
              </p>
            </div>
          </header>

          {/* ─── Summary ─────────────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Summary</SectionTitle>
            <p style={{ fontSize: '0.78rem', color: '#333', margin: 0, lineHeight: 1.6 }}>
              Senior Software Engineer with 6+ years of experience building scalable full-stack applications using
              TypeScript, React, Next.js, and Node.js. Expertise in designing distributed systems, GraphQL APIs, and
              high-performance backend architectures. Proven ability to lead end-to-end feature development, optimize
              system performance, and deliver production-ready solutions serving 200,000+ users.
            </p>
          </section>

          {/* ─── Technical Skills ────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Technical Skills</SectionTitle>
            <div style={{ fontSize: '0.78rem', lineHeight: 1.8 }}>
              <SkillRow label='Languages' value='TypeScript, JavaScript, SQL, Rust, C#, Java' />
              <SkillRow label='Frontend' value='React, Next.js, React Native, Tailwind CSS, Three.js, Framer Motion' />
              <SkillRow
                label='Backend'
                value='Node.js, GraphQL, tRPC, REST APIs, Express, Prisma ORM, PostgreSQL, Redis, BullMQ, Elasticsearch'
              />
              <SkillRow
                label='Infrastructure & Cloud'
                value='AWS (Lambda, Elastic Beanstalk, S3), Docker, CI/CD, Vercel, PM2'
              />
              <SkillRow
                label='Concepts'
                value='System Design, Distributed Systems, API Design, Microservices, Caching Strategies, Performance Optimization, Scalability, Technical Mentorship'
              />
            </div>
          </section>

          {/* ─── Experience ──────────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Experience</SectionTitle>
            <p style={{ fontSize: '0.68rem', color: '#999', margin: '0 0 0.6rem', fontStyle: 'italic' }}>
              Keywords: TypeScript, React, Next.js, Node.js, GraphQL, PostgreSQL, AWS, Redis, System Design, APIs,
              Scalability
            </p>

            <div className='experience-item' style={{ marginBottom: '0.9rem' }}>
              <ExperienceHeader
                company='American Poolplayers Association'
                location='Remote'
                role='Software Engineer'
                period='Feb 2021 – Present'
              />
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Led end-to-end development of core platform features supporting 200,000+ active users across league
                  play, tournament management, and internal operations
                </Li>
                <Li>
                  Drove architectural decisions across frontend and backend systems, improving scalability and
                  maintainability of high-traffic applications
                </Li>
                <Li>
                  Reduced critical endpoint latency by up to 77% and improved overall system responsiveness by ~20%
                  through advanced query optimization, indexing strategies, multi-layer caching, and re-architecting
                  idempotency handling to significantly reduce database load and improve request throughput
                </Li>
                <Li>
                  Spearheaded frontend performance improvements by eliminating unnecessary re-renders and restructuring
                  component architecture, resulting in significantly faster load times and improved mobile
                  responsiveness
                </Li>
                <Li>
                  Mentored engineers through code reviews, system design guidance, and enforcing modern development
                  standards across the team
                </Li>
                <Li>
                  Partnered with product and stakeholders to translate ambiguous requirements into scalable technical
                  solutions
                </Li>
              </ul>
            </div>

            <div className='experience-item' style={{ marginBottom: '0.9rem' }}>
              <ExperienceHeader company='HuntNHook' role='Co-Founder / Lead Engineer' period='2025 – Present' />
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Architected and built a two-sided marketplace for outdoor experiences (fishing, hunting, recreation),
                  owning all technical decisions from schema design to production deployment
                </Li>
                <Li>
                  Designed and implemented a full Stripe Connect payment system including escrow-style holds, delayed
                  payouts, dispute handling, and idempotent webhook processing
                </Li>
                <Li>
                  Built geospatial search using PostGIS with efficient bounding-box queries, distance sorting, and
                  multi-dimensional filtering
                </Li>
                <Li>
                  Designed distributed system architecture using PM2 clustering, BullMQ worker queues, and Redis Pub/Sub
                  for real-time GraphQL subscriptions across instances
                </Li>
                <Li>
                  Implemented a multi-layer caching strategy with intelligent invalidation to support scalable,
                  low-latency data access patterns
                </Li>
                <Li>
                  Established production-ready infrastructure and deployment workflows for a scalable marketplace
                  platform
                </Li>
              </ul>
            </div>
          </section>

          {/* ─── Projects ────────────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Projects</SectionTitle>

            <div className='project-item' style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.82rem', fontWeight: 700, margin: 0 }}>Rafa Sauna</h3>
                  <span style={{ fontSize: '0.7rem', color: '#888' }}>— Full-Stack Platform (Contract)</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>2025</span>
              </div>
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Designed and delivered a full-stack booking, membership, and POS platform, including admin dashboard,
                  customer-facing flows, and kiosk systems
                </Li>
                <Li>
                  Built NFC-based payment system using JWT-backed wristbands, enabling seamless contactless transactions
                  across devices
                </Li>
                <Li>
                  Architected a custom booking engine supporting capacity constraints, dynamic pricing, and real-time
                  availability management
                </Li>
                <Li>Integrated Stripe for subscriptions, one-time payments, Apple Pay, refunds, and promotions</Li>
                <Li>Delivered a production-ready system spanning web, mobile, and kiosk environments</Li>
              </ul>
            </div>

            <div className='project-item' style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.82rem', fontWeight: 700, margin: 0 }}>Construction Automation Platform</h3>
                  <span style={{ fontSize: '0.7rem', color: '#888' }}>— Contract</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>2025</span>
              </div>
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Engineered an internal automation system by reverse-engineering a closed third-party API to enable
                  programmatic data entry and workflow automation
                </Li>
                <Li>
                  Automated high-volume operational tasks (20+ daily records), reducing manual workload and improving
                  data accuracy
                </Li>
                <Li>
                  Built pipeline-to-invoice synchronization logic, transforming operational data into structured
                  financial outputs
                </Li>
                <Li>Implemented headless browser automation using Puppeteer on AWS Lambda for unsupported workflows</Li>
              </ul>
            </div>
          </section>

          {/* ─── Education ───────────────────────────────── */}
          <section>
            <SectionTitle>Education</SectionTitle>
            <div style={{ fontSize: '0.78rem' }}>
              <div>
                <span style={{ fontWeight: 600 }}>Lambda School</span>
                <span style={{ color: '#666' }}> — Full Stack Web Development</span>
              </div>
            </div>
            <div style={{ fontSize: '0.78rem', marginTop: '0.25rem' }}>
              <div>
                <span style={{ fontWeight: 600 }}>Sierra College</span>
                <span style={{ color: '#666' }}> — Computer Science</span>
              </div>
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

export default Resume
