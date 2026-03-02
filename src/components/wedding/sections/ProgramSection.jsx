import { AnimIn, dividerStyle, titleStyle } from '@/components/wedding/shared'

export function ProgramSection({ program }) {
  return (
    <div style={{ background: '#5C0A18', padding: '36px 32px 38px', textAlign: 'center' }}>
      <AnimIn type="fadeUp">
        <h2 style={titleStyle(true, 22)}>Chương Trình</h2>
        <div className="shimmer-line" style={dividerStyle(true)} />
      </AnimIn>

      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' }}>
        {program.map((item, i) => (
          <AnimIn
            key={item.time}
            type="fadeLeft"
            delay={i * 0.15}
            style={{
              display: 'grid',
              gridTemplateColumns: '64px 18px 1fr',
              columnGap: 16,
              alignItems: 'center',
              minHeight: 42,
            }}
          >
            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: '#FAF6E8', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1 }}>
                {item.time}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18, height: '100%' }}>
              {i > 0 ? <div style={{ width: 1, flexGrow: 1, background: 'rgba(250,246,232,0.2)', minHeight: 14 }} /> : <div style={{ flexGrow: 1 }} />}
              <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid rgba(250,246,232,0.65)', background: '#5C0A18', flexShrink: 0 }} />
              {i < program.length - 1 ? <div style={{ width: 1, flexGrow: 1, background: 'rgba(250,246,232,0.2)', minHeight: 22 }} /> : <div style={{ flexGrow: 1 }} />}
            </div>

            <div style={{ paddingBottom: i < program.length - 1 ? 18 : 0 }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: 'rgba(250,246,232,0.78)', lineHeight: 1.35, margin: 0 }}>
                {item.label}
              </p>
            </div>
          </AnimIn>
        ))}
      </div>
    </div>
  )
}
