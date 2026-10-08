type P = { size?: number }

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const ArrowRight = ({ size = 16 }: P) => (
  <svg width={size} height={size} {...base} strokeWidth='2'>
    <line x1='5' y1='12' x2='19' y2='12' />
    <polyline points='12 5 19 12 12 19' />
  </svg>
)

export const ArrowLeft = ({ size = 16 }: P) => (
  <svg width={size} height={size} {...base} strokeWidth='2'>
    <line x1='19' y1='12' x2='5' y2='12' />
    <polyline points='12 19 5 12 12 5' />
  </svg>
)

export const Check = () => (
  <svg className='check' width='16' height='16' {...base} strokeWidth='2'>
    <polyline points='20 6 9 17 4 12' />
  </svg>
)

export const Copy = () => (
  <svg width='16' height='16' {...base} strokeWidth='1.75'>
    <rect x='9' y='9' width='12' height='12' rx='2' />
    <path d='M5 15V5a2 2 0 0 1 2-2h10' />
  </svg>
)

export const LinkIcon = () => (
  <svg width='16' height='16' {...base} strokeWidth='1.75'>
    <path d='M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5' />
    <path d='M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5' />
  </svg>
)

export const Close = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.75'
    strokeLinecap='round'
  >
    <line x1='18' y1='6' x2='6' y2='18' />
    <line x1='6' y1='6' x2='18' y2='18' />
  </svg>
)

export const Sun = () => (
  <svg
    data-ticon='1'
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.9'
    strokeLinecap='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' />
  </svg>
)

export const Moon = () => (
  <svg data-ticon='1' width='14' height='14' {...base} strokeWidth='1.9' aria-hidden='true'>
    <path d='M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z' />
  </svg>
)
