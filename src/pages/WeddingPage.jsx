import { useEffect, useRef, useState } from 'react'
import { FaMusic, FaVolumeMute } from 'react-icons/fa'
import { useInView } from '@/hooks/useInView'
import { Carousel } from '@/components/Carousel'

/* ─── Images ─────────────────────────────────────────────────────────────── */
const IMG = {
  hero:   '/images/z7561870190071_5e6e98404ee3fad9b2cb59f714806a16.jpg',
  venue1: '/images/z7561885287882_b977f479c3d8145c3729fc060f945426.jpg',
  venue2: '/images/z7561885297161_d70cf8646744884ddeab49ac3a1dc342.jpg',
}

const CAROUSEL_IMGS = [
  '/images/z7561870185620_0fca0b9e720bdfea9502a91f273e7e31.jpg',
  '/images/z7561870183143_b9eab5aec3257f07fa33ca3183443b84.jpg',
  '/images/z7561870208113_8bca0d149b2f25a52d515bbf1052796f.jpg',
  '/images/z7561870224812_141706f60582a61d83f792d6ad8b91b0.jpg',
  '/images/z7561885333059_28defe6f502a375961cd4b3a253e9e1f.jpg',
  '/images/z7561885362838_29025423b9d36bb2ab735490353bf22d.jpg',
  '/images/z7561885334313_e94d2df5bd429bb694abe7bbe314d815.jpg',
  '/images/z7561885316340_48da5993cfa978ab0259a13c8ec8e4a4.jpg',
]
const BG_MUSIC = '/audio/bai103.mp3'

/* ─── Wedding data ────────────────────────────────────────────────────────── */
const GROOM     = 'Văn Mẫn'
const BRIDE     = 'Kiều Anh'
const DATE_SOLAR = '27 · 03 · 2026'
const DATE_LUNAR = 'Nhằm ngày 9 tháng 2 năm Bính Ngọ'
const VENUE      = 'Ấp 6B'

const PROGRAM = [
  { time: '10:30', label: 'Đón tiếp quý khách' },
  { time: '11:00', label: 'Khai tiệc mừng cưới' },
  { time: '13:30', label: 'Tiễn quý khách' },
]

// March 2026: March 1 = Sunday → Mon–Sun layout
const CAL_WEEKS = [
  [0,  0,  0,  0,  0,  0,  1],
  [2,  3,  4,  5,  6,  7,  8],
  [9,  10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, 0,  0,  0,  0,  0],
]
const WEDDING_DAY = 27

/* ─── Helper: animated class string ─────────────────────────────────────── */
function animCls(type, visible) {
  const base = `anim anim-${type}`
  if (!visible) return base
  return `${base} visible`
}
function animStyle(delay = 0) {
  return delay ? { '--delay': `${delay}s` } : {}
}

/* ─── Reusable: AnimateIn wrapper ────────────────────────────────────────── */
function AnimIn({ type = 'fadeUp', delay = 0, style = {}, children }) {
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

/* ─── SVG Flower ─────────────────────────────────────────────────────────── */
function Flower({ style = {}, opacity = 0.32, className = '' }) {
  return (
    <svg viewBox="0 0 50 82" fill="none" style={style} className={className}>
      <ellipse cx="25" cy="22" rx="9"   ry="19" fill="white" fillOpacity={opacity} />
      <ellipse cx="12" cy="30" rx="7.5" ry="15" transform="rotate(-28 12 30)" fill="white" fillOpacity={opacity * 0.8} />
      <ellipse cx="38" cy="30" rx="7.5" ry="15" transform="rotate(28 38 30)"  fill="white" fillOpacity={opacity * 0.8} />
      <line x1="25" y1="43" x2="25" y2="78" stroke="white" strokeWidth="1.5" strokeOpacity={opacity} />
      <path d="M25,62 Q34,56 37,46" stroke="white" strokeWidth="1.2" strokeOpacity={opacity * 0.85} fill="none" />
    </svg>
  )
}

/* ─── Torn-paper SVG divider ─────────────────────────────────────────────── */
function TornDivider({ fromColor, toColor }) {
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

/* ─── Style helpers ──────────────────────────────────────────────────────── */
const titleStyle = (light, size = 22) => ({
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: size, fontWeight: 400,
  letterSpacing: '0.22em', textTransform: 'uppercase',
  lineHeight: 1.25, margin: 0,
  color: light ? '#FAF6E8' : '#5C0A18',
})
const dividerStyle = (light) => ({
  width: 32, height: 1, margin: '10px auto 0',
  background: light ? 'rgba(250,246,232,0.35)' : 'rgba(92,10,24,0.3)',
})

/* ═══════════════════════════════════════════════════════════════════════════
   Main page
═══════════════════════════════════════════════════════════════════════════ */
export default function WeddingPage() {
  const [form, setForm]           = useState({ name: '', attending: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isMusicOn, setIsMusicOn] = useState(false)
  const audioRef                  = useRef(null)

  useEffect(() => {
    const tryStart = async () => {
      if (!audioRef.current) return
      try {
        await audioRef.current.play()
        setIsMusicOn(true)
      } catch {
        setIsMusicOn(false)
      }
    }

    tryStart()
    document.addEventListener('pointerdown', tryStart, { once: true })
    return () => document.removeEventListener('pointerdown', tryStart)
  }, [])

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      try {
        await audioRef.current.play()
        setIsMusicOn(true)
      } catch {
        setIsMusicOn(false)
      }
      return
    }
    audioRef.current.pause()
    setIsMusicOn(false)
  }

  return (
    <div style={{ background: '#5C0A18', minHeight: '100vh', width: '100%' }}>
      <audio ref={audioRef} src={BG_MUSIC} loop preload="auto" />
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', overflow: 'hidden' }}>

        {/* ══════════════════════════════════════════════════
            1.  HERO  —  full-width photo + overlay
        ══════════════════════════════════════════════════ */}
        <div style={{ position: 'relative', height: '100vh', minHeight: 500, maxHeight: 780, overflow: 'hidden' }}>

          {/* Ken Burns photo */}
          <img
            src={IMG.hero}
            alt="Kiều Anh & Văn Mẫn"
            className="hero-photo"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 30%, transparent 52%, rgba(0,0,0,0.78) 100%)',
          }} />

          {/* "Nhà Gái" — fade in down */}
          <div className="hero-label" style={{ position: 'absolute', top: 28, width: '100%', textAlign: 'center', zIndex: 2 }}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, color: 'rgba(250,246,232,0.62)', letterSpacing: '0.36em', textTransform: 'uppercase', margin: 0 }}>
              Nhà Gái
            </p>
          </div>

          {/* Title + flower — fade in right */}
          <div className="hero-title" style={{ position: 'absolute', top: '50%', right: 28, transform: 'translateY(-60%)', textAlign: 'center', zIndex: 2 }}>
            <Flower style={{ width: 38, height: 64, margin: '0 auto 10px' }} />
            <h1 style={{ ...titleStyle(true, 32), fontWeight: 300 }}>
              THIỆP<br />CƯỚI
            </h1>
          </div>

          {/* Names — fade in up */}
          <div className="hero-names" style={{ position: 'absolute', bottom: 32, left: 28, zIndex: 2 }}>
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 42, color: '#FAF6E8', lineHeight: 1, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>
              {BRIDE}
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(250,246,232,0.62)', letterSpacing: '0.55em', textTransform: 'uppercase', margin: '7px 0' }}>
              &amp;
            </p>
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 42, color: '#FAF6E8', lineHeight: 1, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>
              {GROOM}
            </p>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════
            2.  PROGRAM  (dark)
        ══════════════════════════════════════════════════ */}
        <div style={{ background: '#5C0A18', padding: '36px 32px 38px', textAlign: 'center' }}>

          <AnimIn type="fadeUp">
            <h2 style={titleStyle(true, 22)}>Chương Trình</h2>
            <div className="shimmer-line" style={dividerStyle(true)} />
          </AnimIn>

          {/* Timeline items — stagger left */}
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' }}>
            {PROGRAM.map((item, i) => (
              <AnimIn key={i} type="fadeLeft" delay={i * 0.15} style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Time */}
                <div style={{ width: 64, textAlign: 'right', paddingRight: 16, paddingTop: 2, flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: '#FAF6E8', fontWeight: 300, letterSpacing: '0.04em' }}>
                    {item.time}
                  </span>
                </div>

                {/* Dot + connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18, flexShrink: 0 }}>
                  {i > 0
                    ? <div style={{ width: 1, flexGrow: 1, background: 'rgba(250,246,232,0.2)', minHeight: 14 }} />
                    : <div style={{ flexGrow: 1 }} />
                  }
                  <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1.5px solid rgba(250,246,232,0.65)', background: '#5C0A18', flexShrink: 0 }} />
                  {i < PROGRAM.length - 1
                    ? <div style={{ width: 1, flexGrow: 1, background: 'rgba(250,246,232,0.2)', minHeight: 22 }} />
                    : <div style={{ flexGrow: 1 }} />
                  }
                </div>

                {/* Label */}
                <div style={{ flex: 1, paddingLeft: 16, paddingTop: 2, paddingBottom: i < PROGRAM.length - 1 ? 18 : 0 }}>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: 'rgba(250,246,232,0.78)', lineHeight: 1.4, margin: 0 }}>
                    {item.label}
                  </p>
                </div>
              </AnimIn>
            ))}
          </div>
        </div>

        {/* Divider: dark → cream */}
        <TornDivider fromColor="#5C0A18" toColor="#FAF6E8" />

        {/* ══════════════════════════════════════════════════
            3.  INVITATION + CALENDAR + VENUE  (cream)
        ══════════════════════════════════════════════════ */}
        <div style={{ background: '#FAF6E8' }}>

          {/* — Invitation — */}
          <div style={{ padding: '32px 32px 22px', textAlign: 'center' }}>
            <AnimIn type="fadeUp">
              <h2 style={titleStyle(false, 22)}>Kính Mời Quý Khách</h2>
              <div className="shimmer-line" style={dividerStyle(false)} />
            </AnimIn>
            <AnimIn type="fadeUp" delay={0.15}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12.5, color: '#3D1A10', lineHeight: 1.85, margin: '16px 0 10px' }}>
                Trân trọng kính mời Quý khách đến chung vui trong ngày trọng đại — lễ thành hôn của chúng tôi.
              </p>
            </AnimIn>
            <AnimIn type="fadeUp" delay={0.28}>
              <p className="heartbeat" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: '#5C0A18', fontWeight: 600, letterSpacing: '0.15em', margin: '4px 0 2px' }}>
                {DATE_SOLAR}
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(92,10,24,0.5)', letterSpacing: '0.03em', margin: 0 }}>
                {DATE_LUNAR}
              </p>
            </AnimIn>
          </div>

          {/* — Calendar — */}
          <AnimIn type="zoomIn" delay={0.1} style={{ padding: '4px 32px 26px' }}>
            <div style={{ background: '#5C0A18', padding: '7px 0', textAlign: 'center' }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 9, color: '#FAF6E8', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                Tháng 3 — 2026
              </span>
            </div>
            <div style={{ background: '#EFE5CA', padding: '9px 6px' }}>
              {/* Day headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 5 }}>
                {['T2','T3','T4','T5','T6','T7','CN'].map(d => (
                  <div key={d} style={{ textAlign: 'center', fontSize: 9, color: '#5C0A18', fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>
                    {d}
                  </div>
                ))}
              </div>
              {/* Weeks */}
              {CAL_WEEKS.map((week, wi) => (
                <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                  {week.map((day, di) => {
                    const isWed = day === WEDDING_DAY
                    return (
                      <div key={di} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, padding: '3px 0',
                        fontFamily: "'Montserrat', sans-serif",
                        color: isWed ? '#FAF6E8' : '#2C1810',
                        background: isWed ? '#5C0A18' : 'transparent',
                        borderRadius: 0,
                        clipPath: isWed
                          ? 'polygon(50% 92%, 10% 58%, 2% 38%, 12% 20%, 28% 16%, 40% 24%, 50% 34%, 60% 24%, 72% 16%, 88% 20%, 98% 38%, 90% 58%)'
                          : 'none',
                        fontWeight: isWed ? 700 : 400,
                        width: isWed ? 24 : 'auto',
                        height: isWed ? 24 : 'auto',
                        margin: isWed ? 'auto' : 0,
                        visibility: day === 0 ? 'hidden' : 'visible',
                      }}>
                        {day || ''}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </AnimIn>

          {/* — Venue — */}
          <div style={{ padding: '0 32px 34px', textAlign: 'center' }}>
            <AnimIn type="fadeUp">
              <h2 style={titleStyle(false, 20)}>Địa Điểm</h2>
              <div className="shimmer-line" style={dividerStyle(false)} />
            </AnimIn>
            <AnimIn type="fadeUp" delay={0.12}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12.5, color: '#3D1A10', lineHeight: 1.7, margin: '14px 0 5px' }}>
                Chúng tôi mong được đón tiếp Quý khách tại:
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: '#5C0A18', fontWeight: 600, lineHeight: 1.5, letterSpacing: '0.06em', margin: '4px 0 18px' }}>
                {VENUE}
              </p>
            </AnimIn>
            {/* Venue photos — staggered zoom in */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <AnimIn type="zoomIn" delay={0.05}>
                <img src={IMG.venue1} alt="Venue" style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 3, display: 'block' }} />
              </AnimIn>
              <AnimIn type="zoomIn" delay={0.18}>
                <img src={IMG.venue2} alt="Venue" style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 3, display: 'block' }} />
              </AnimIn>
            </div>
          </div>
        </div>

        {/* Divider: cream → dark */}
        <TornDivider fromColor="#FAF6E8" toColor="#5C0A18" />

        {/* ══════════════════════════════════════════════════
            4.  PHOTO CAROUSEL  (dark)
        ══════════════════════════════════════════════════ */}
        <div style={{ background: '#5C0A18' }}>
          <div style={{ padding: '32px 32px 20px', textAlign: 'center' }}>
            <AnimIn type="fadeUp">
              <h2 style={titleStyle(true, 22)}>Khoảnh Khắc</h2>
              <div className="shimmer-line" style={dividerStyle(true)} />
            </AnimIn>
          </div>
          <AnimIn type="fadeIn" delay={0.2}>
            <Carousel images={CAROUSEL_IMGS} height={600} />
          </AnimIn>
          <div style={{ height: 32 }} />
        </div>

        {/* ══════════════════════════════════════════════════
            5.  RSVP  (dark)
        ══════════════════════════════════════════════════ */}
        <div style={{ background: '#5C0A18', padding: '0 32px 38px', textAlign: 'center' }}>
          <AnimIn type="fadeUp">
            <h2 style={titleStyle(true, 20)}>Xác Nhận Tham Dự</h2>
            <div className="shimmer-line" style={dividerStyle(true)} />
          </AnimIn>

          {submitted ? (
            <AnimIn type="zoomIn" delay={0.05}>
              <div style={{ marginTop: 26 }}>
                <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 30, color: '#FAF6E8' }}>Cảm ơn bạn!</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, color: 'rgba(250,246,232,0.52)', marginTop: 6 }}>
                  Hẹn gặp lại trong ngày vui.
                </p>
              </div>
            </AnimIn>
          ) : (
            <AnimIn type="fadeUp" delay={0.15} style={{ textAlign: 'left' }}>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} style={{ marginTop: 22 }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, color: 'rgba(250,246,232,0.56)', lineHeight: 1.7, marginBottom: 18, textAlign: 'center' }}>
                  Vui lòng xác nhận sự tham dự của Quý khách
                </p>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{
                    display: 'block', width: '100%', boxSizing: 'border-box',
                    background: 'transparent',
                    border: 'none', borderBottom: '1px solid rgba(250,246,232,0.28)',
                    color: '#FAF6E8', fontSize: 13, padding: '7px 0',
                    outline: 'none', fontFamily: "'Montserrat', sans-serif",
                    marginBottom: 18, transition: 'border-color 0.25s',
                  }}
                  onFocus={e => e.target.style.borderBottomColor = 'rgba(250,246,232,0.7)'}
                  onBlur={e => e.target.style.borderBottomColor = 'rgba(250,246,232,0.28)'}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
                  {[
                    { val: 'yes', label: 'Vâng, tôi sẽ tham dự!' },
                    { val: 'no',  label: 'Rất tiếc, tôi không thể' },
                  ].map(opt => (
                    <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="attending"
                        value={opt.val}
                        checked={form.attending === opt.val}
                        onChange={e => setForm(f => ({ ...f, attending: e.target.value }))}
                        style={{ accentColor: '#FAF6E8', width: 14, height: 14, flexShrink: 0 }}
                      />
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: 'rgba(250,246,232,0.76)' }}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  style={{
                    display: 'block', width: '100%',
                    background: '#FAF6E8', color: '#5C0A18',
                    fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
                    fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
                    padding: '11px 0', border: 'none', borderRadius: 3,
                    cursor: 'pointer', transition: 'opacity 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                >
                  Gửi xác nhận
                </button>
              </form>
            </AnimIn>
          )}
        </div>

        {/* ══════════════════════════════════════════════════
            6.  FOOTER
        ══════════════════════════════════════════════════ */}
        <div style={{
          background: '#5C0A18', padding: '30px 20px 48px',
          textAlign: 'center', borderTop: '1px solid rgba(250,246,232,0.12)',
        }}>
          <AnimIn type="fadeIn">
            <Flower className="flower-float" style={{ width: 46, height: 76, margin: '0 auto 16px' }} opacity={0.35} />
          </AnimIn>
          <AnimIn type="fadeUp" delay={0.2}>
            <h2 style={{ ...titleStyle(true, 38), fontWeight: 300 }}>
              HẸN GẶP<br />LẠI!
            </h2>
          </AnimIn>
          <AnimIn type="fadeIn" delay={0.45}>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(250,246,232,0.38)', letterSpacing: '0.38em', marginTop: 18 }}>
              {DATE_SOLAR}
            </p>
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 26, color: 'rgba(250,246,232,0.28)', marginTop: 10 }}>
              {BRIDE} &amp; {GROOM}
            </p>
          </AnimIn>
        </div>

      </div>
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isMusicOn ? 'Tat nhac' : 'Mo nhac'}
        title={isMusicOn ? 'Tat nhac' : 'Mo nhac'}
        style={{
          position: 'fixed', right: 16, bottom: 16, zIndex: 1200,
          width: 44, height: 44, borderRadius: '50%',
          border: '1px solid rgba(250,246,232,0.3)',
          background: 'rgba(92,10,24,0.88)', color: '#FAF6E8',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {isMusicOn ? <FaMusic size={17} /> : <FaVolumeMute size={17} />}
      </button>
    </div>
  )
}
