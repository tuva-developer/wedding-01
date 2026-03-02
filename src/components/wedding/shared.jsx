import { useInView } from '@/hooks/useInView'

function animCls(type, visible) {
  const base = `anim anim-${type}`
  if (!visible) return base
  return `${base} visible`
}

function animStyle(delay = 0) {
  return delay ? { '--delay': `${delay}s` } : {}
}

export function AnimIn({ type = 'fadeUp', delay = 0, style = {}, children }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className={animCls(type, visible)}
      style={{ ...animStyle(delay), ...style }}
    >
      {children}
    </div>
  )
}

export function Flower({ style = {}, opacity = 0.32, className = '' }) {
  return (
    <svg viewBox="0 0 50 82" fill="none" style={style} className={className}>
      <ellipse cx="25" cy="22" rx="9" ry="19" fill="white" fillOpacity={opacity} />
      <ellipse cx="12" cy="30" rx="7.5" ry="15" transform="rotate(-28 12 30)" fill="white" fillOpacity={opacity * 0.8} />
      <ellipse cx="38" cy="30" rx="7.5" ry="15" transform="rotate(28 38 30)" fill="white" fillOpacity={opacity * 0.8} />
      <line x1="25" y1="43" x2="25" y2="78" stroke="white" strokeWidth="1.5" strokeOpacity={opacity} />
      <path d="M25,62 Q34,56 37,46" stroke="white" strokeWidth="1.2" strokeOpacity={opacity * 0.85} fill="none" />
    </svg>
  )
}

export function TornDivider({ fromColor, toColor }) {
  return (
    <div style={{ height: 22, background: toColor, overflow: 'hidden' }}>
      <svg viewBox="0 0 480 22" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
        <path
          d="M0,0 Q25,17 55,10 Q85,3 115,15 Q145,22 175,11 Q205,0 235,14 Q260,22 290,9 Q320,0 350,15 Q378,22 408,10 Q435,0 460,13 L480,9 L480,0 Z"
          fill={fromColor}
        />
      </svg>
    </div>
  )
}

export const titleStyle = (light, size = 22) => ({
  fontFamily: "var(--font-display)",
  fontSize: size,
  fontWeight: 400,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  lineHeight: 1.25,
  margin: 0,
  color: light ? '#FAF6E8' : '#5C0A18',
})

export const dividerStyle = (light) => ({
  width: 32,
  height: 1,
  margin: '10px auto 0',
  background: light ? 'rgba(250,246,232,0.35)' : 'rgba(92,10,24,0.3)',
})

