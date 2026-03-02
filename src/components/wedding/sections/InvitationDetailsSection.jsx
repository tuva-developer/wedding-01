import { FaMapMarkerAlt } from 'react-icons/fa'
import { AnimIn, dividerStyle, titleStyle } from '@/components/wedding/shared'

export function InvitationDetailsSection({
  dateSolar,
  dateLunar,
  calWeeks,
  weddingDay,
  venue,
  mapLink,
  venueImages,
  onOpenImage,
}) {
  return (
    <div style={{ background: '#FAF6E8' }}>
      <div style={{ padding: '32px 32px 22px', textAlign: 'center' }}>
        <AnimIn type="fadeUp">
          <h2 style={titleStyle(false, 22)}>Kính Mời Quý Khách</h2>
          <div className="shimmer-line" style={dividerStyle(false)} />
        </AnimIn>
        <AnimIn type="fadeUp" delay={0.15}>
          <p style={{ fontFamily: "var(--font-script)", fontSize: 24, color: '#3D1A10', margin: '16px 0 10px' }}>
            Trân trọng kính mời Quý khách đến chung vui trong ngày trọng đại lễ thành hôn của chúng tôi.
          </p>
        </AnimIn>
        <AnimIn type="fadeUp" delay={0.28}>
          <p className="heartbeat" style={{ fontFamily: "var(--font-display)", fontSize: 40, color: '#5C0A18', fontWeight: 600, letterSpacing: '0.15em', margin: '4px 0 2px' }}>
            {dateSolar}
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'rgba(92,10,24,0.7)', letterSpacing: '0.03em', margin: 0 }}>
            {dateLunar}
          </p>
        </AnimIn>
      </div>

      <AnimIn type="zoomIn" delay={0.1} style={{ padding: '4px 32px 26px' }}>
        <div style={{ background: '#5C0A18', padding: '7px 0', textAlign: 'center' }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: '#FAF6E8', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Tháng 3 — 2026
          </span>
        </div>
        <div style={{ background: '#EFE5CA', padding: '9px 6px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 5 }}>
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: 9, color: '#5C0A18', fontWeight: 600, fontFamily: "var(--font-body)" }}>
                {d}
              </div>
            ))}
          </div>
          {calWeeks.map((week, wi) => (
            <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {week.map((day, di) => {
                const isWedding = day === weddingDay
                return (
                  <div
                    key={di}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      padding: '3px 0',
                      fontFamily: "var(--font-body)",
                      color: isWedding ? '#FAF6E8' : '#2C1810',
                      background: isWedding ? '#5C0A18' : 'transparent',
                      borderRadius: 0,
                      clipPath: isWedding
                        ? 'polygon(50% 92%, 10% 58%, 2% 38%, 12% 20%, 28% 16%, 40% 24%, 50% 34%, 60% 24%, 72% 16%, 88% 20%, 98% 38%, 90% 58%)'
                        : 'none',
                      fontWeight: isWedding ? 700 : 400,
                      width: isWedding ? 24 : 'auto',
                      height: isWedding ? 24 : 'auto',
                      margin: isWedding ? 'auto' : 0,
                      visibility: day === 0 ? 'hidden' : 'visible',
                    }}
                  >
                    {day || ''}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </AnimIn>

      <div style={{ padding: '0 32px 34px', textAlign: 'center' }}>
        <AnimIn type="fadeUp">
          <h2 style={titleStyle(false, 20)}>Địa Điểm</h2>
          <div className="shimmer-line" style={dividerStyle(false)} />
        </AnimIn>
        <AnimIn type="fadeUp" delay={0.12}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: '#3D1A10', lineHeight: 1.7, margin: '14px 0 5px' }}>
            Chúng tôi mong được đón tiếp Quý khách tại:
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 17, color: '#5C0A18', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.06em', margin: '4px 0 18px' }}>
            {venue}
          </p>
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              height: 38,
              padding: '0 16px',
              borderRadius: 999,
              border: '1px solid rgba(92,10,24,0.25)',
              background: '#5C0A18',
              color: '#FAF6E8',
              textDecoration: 'none',
              fontFamily: "var(--font-body)",
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            <FaMapMarkerAlt size={13} />
            <span>Xem trên Google Maps</span>
          </a>
        </AnimIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
          <AnimIn type="zoomIn" delay={0.05}>
            <img
              src={venueImages[0]}
              alt="Venue"
              onClick={() => onOpenImage?.([venueImages[0]], 0)}
              style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 3, display: 'block', cursor: 'zoom-in' }}
            />
          </AnimIn>
          <AnimIn type="zoomIn" delay={0.18}>
            <img
              src={venueImages[1]}
              alt="Venue"
              onClick={() => onOpenImage?.([venueImages[1]], 0)}
              style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 3, display: 'block', cursor: 'zoom-in' }}
            />
          </AnimIn>
        </div>
      </div>
    </div>
  )
}

