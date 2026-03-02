import { AnimIn, dividerStyle, titleStyle } from '@/components/wedding/shared'

export function RsvpSection({ form, submitted, setSubmitted, setForm }) {
  return (
    <div style={{ background: '#5C0A18', padding: '0 32px 38px', textAlign: 'center' }}>
      <AnimIn type="fadeUp">
        <h2 style={titleStyle(true, 20)}>Xác Nhận Tham Dự</h2>
        <div className="shimmer-line" style={dividerStyle(true)} />
      </AnimIn>

      {submitted ? (
        <AnimIn type="zoomIn" delay={0.05}>
          <div style={{ marginTop: 26 }}>
            <p style={{ fontFamily: "var(--font-script)", fontSize: 30, color: '#FAF6E8' }}>Cảm ơn bạn!</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: 'rgba(250,246,232,0.52)', marginTop: 6 }}>
              Hẹn gặp lại trong ngày vui.
            </p>
          </div>
        </AnimIn>
      ) : (
        <AnimIn type="fadeUp" delay={0.15} style={{ textAlign: 'left' }}>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} style={{ marginTop: 22 }}>
            <p style={{ fontFamily: "var(--font-script)", fontSize: 20, color: 'rgba(250,246,232,0.56)', marginBottom: 18, textAlign: 'center' }}>
              Hãy xác nhận sự có mặt của bạn để chúng mình
              <br />
              chuẩn bị đón tiếp một cách chu đáo nhất.
              <br />
              Trân trọng!
            </p>
            <input
              type="text"
              placeholder="Họ và tên"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={{
                display: 'block',
                width: '100%',
                boxSizing: 'border-box',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid rgba(250,246,232,0.28)',
                color: '#FAF6E8',
                fontSize: 13,
                padding: '7px 0',
                outline: 'none',
                fontFamily: "var(--font-body)",
                marginBottom: 18,
                transition: 'border-color 0.25s',
              }}
              onFocus={(e) => { e.target.style.borderBottomColor = 'rgba(250,246,232,0.7)' }}
              onBlur={(e) => { e.target.style.borderBottomColor = 'rgba(250,246,232,0.28)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
              {[
                { val: 'yes', label: 'Vâng, tôi sẽ tham dự!' },
                { val: 'no', label: 'Rất tiếc, tôi không thể' },
              ].map((opt) => (
                <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="attending"
                    value={opt.val}
                    checked={form.attending === opt.val}
                    onChange={(e) => setForm((f) => ({ ...f, attending: e.target.value }))}
                    style={{ accentColor: '#FAF6E8', width: 14, height: 14, flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'rgba(250,246,232,0.76)' }}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
            <button
              type="submit"
              style={{
                display: 'block',
                width: '100%',
                background: '#FAF6E8',
                color: '#5C0A18',
                fontSize: 11,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                padding: '11px 0',
                border: 'none',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)' }}
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)' }}
            >
              Gửi xác nhận
            </button>
          </form>
        </AnimIn>
      )}
    </div>
  )
}

