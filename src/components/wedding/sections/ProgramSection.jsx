import { AnimIn, dividerStyle, titleStyle } from '@/components/wedding/shared'

export function ProgramSection({ program }) {
  return (
    <div style={{ background: '#5C0A18', padding: '36px 32px 38px', textAlign: 'center' }}>
      <AnimIn type="fadeUp">
        <h2 style={titleStyle(true, 22)}>Chương Trình</h2>
        <div className="shimmer-line" style={dividerStyle(true)} />
      </AnimIn>

      <div style={{ marginTop: 28, position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 89,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'rgba(250,246,232,0.22)',
            zIndex: 0,
          }}
        />
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
                minHeight: 44,
                marginBottom: i < program.length - 1 ? 12 : 0,
              }}
            >
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, color: '#FAF6E8', fontWeight: 300, letterSpacing: '0.04em', lineHeight: 1 }}>
                  {item.time}
                </span>
              </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: '100%', position: 'relative', zIndex: 1 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid rgba(250,246,232,0.65)', background: '#5C0A18', flexShrink: 0 }} />
            </div>

            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'rgba(250,246,232,0.78)', lineHeight: 1.35, margin: 0 }}>
                {item.label}
              </p>
            </div>
          </AnimIn>
        ))}
      </div>
    </div>
  )
}
