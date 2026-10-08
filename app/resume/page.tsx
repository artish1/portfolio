'use client'

/**
 * /resume — Print-optimized resume page.
 *
 * Designed to be saved as PDF via Cmd+P / Ctrl+P.
 * Uses semantic HTML so ATS systems can parse it correctly.
 * All text is real DOM content — selectable, searchable, copyable.
 */

import { yearsOfExperience } from '@/data/experience'

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
              {`Software Engineer with ${yearsOfExperience()}+ years of experience building full-stack products ` +
                `with TypeScript, React, Next.js, and Node.js. I lead features end to end on a platform serving ` +
                `200,000+ users, with a focus on backend performance, real-time systems, and payments.`}
            </p>
          </section>

          {/* ─── Technical Skills ────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Technical Skills</SectionTitle>
            <div style={{ fontSize: '0.78rem', lineHeight: 1.8 }}>
              <SkillRow label='Languages' value='TypeScript, JavaScript, Java, C#, VB.NET, SQL, Rust' />
              <SkillRow
                label='Frontend'
                value='React, Next.js, React Native, Expo, Tailwind CSS, Three.js, Framer Motion'
              />
              <SkillRow label='Backend' value='Node.js, Express, GraphQL, tRPC, REST APIs, Prisma ORM, BullMQ' />
              <SkillRow label='Databases' value='PostgreSQL, SQL Server, MongoDB, Redis, Elasticsearch' />
              <SkillRow
                label='Infrastructure & Cloud'
                value='AWS (Lambda, RDS, S3, Elastic Beanstalk), Cloudflare, Docker, Kubernetes, Terraform, CI/CD, Vercel, PM2'
              />
              <SkillRow
                label='Systems & Architecture'
                value='System Design, Distributed Systems, Event-Driven Architecture, Real-Time Systems, Caching Strategies, Query Optimization, Payment Systems'
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
                period='Feb 2021 – Present'
              />
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Lead end-to-end development of core features for 200,000+ active users across league play, tournament
                  management, and internal operations
                </Li>
                <Li>
                  Make architecture decisions across the frontend and backend for our highest-traffic applications
                </Li>
                <Li>
                  Cut latency on critical endpoints by up to 77% and improved overall response times by ~20% through
                  query tuning, indexing, multi-layer caching, and a redesign of idempotency handling that reduced
                  database load
                </Li>
                <Li>
                  Restructured components on the most-used screens to eliminate unnecessary re-renders, speeding up load
                  times and mobile responsiveness
                </Li>
                <Li>Mentor engineers through code reviews and system design guidance, and set development standards</Li>
                <Li>Work with product and stakeholders to turn loose requirements into shipped features</Li>
              </ul>
            </div>
          </section>

          {/* ─── Projects ────────────────────────────────── */}
          <section style={{ marginBottom: '1.1rem' }}>
            <SectionTitle>Projects</SectionTitle>

            <div className='project-item' style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '0.82rem', fontWeight: 700, margin: 0 }}>HuntNHook</h3>
                  <span style={{ fontSize: '0.7rem', color: '#888' }}>— Co-Founder / Lead Engineer</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>2025 – Present</span>
              </div>
              <ul style={{ margin: '0.3rem 0 0', paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#333' }}>
                <Li>
                  Co-founded and lead engineering for a live two-sided marketplace for guided outdoor trips (fishing,
                  hunting, recreation), owning every technical decision from schema design to production deployment
                </Li>
                <Li>
                  Built the Stripe Connect payment system: escrow-style holds, delayed payouts, dispute handling, and
                  idempotent webhook processing
                </Li>
                <Li>Built map search on PostGIS with bounding-box queries, distance sorting, and combined filters</Li>
                <Li>
                  Ran the backend as multiple PM2-clustered instances, with BullMQ workers for background jobs and Redis
                  Pub/Sub to keep real-time GraphQL subscriptions in sync across instances
                </Li>
                <Li>
                  Built multi-layer caching with invalidation to keep frequently read data fast without serving stale
                  results
                </Li>
              </ul>
            </div>

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
                  Built a booking, membership, and point-of-sale platform across web, mobile, and in-store kiosks, with
                  an admin dashboard for staff
                </Li>
                <Li>Built NFC wristband payments backed by signed JWTs, so guests can pay at any device on site</Li>
                <Li>Built a custom booking engine with capacity limits, dynamic pricing, and real-time availability</Li>
                <Li>Integrated Stripe for subscriptions, one-time payments, Apple Pay, refunds, and promotions</Li>
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
                <Li>Reverse-engineered a closed third-party API to automate data entry and internal workflows</Li>
                <Li>Automated entry of 20+ records a day, cutting manual work and data-entry errors</Li>
                <Li>Built a sync that turns pipeline data into invoices automatically</Li>
                <Li>Used Puppeteer on AWS Lambda to automate workflows the API didn&apos;t support</Li>
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
