import { useState, useEffect, useRef } from 'react'

export function Carousel({ images, height = 400 }) {
  const [cur, setCur]     = useState(0)
  const [prev, setPrev]   = useState(null)
  const [dir, setDir]     = useState(1)          // 1 = forward, -1 = backward
  const touchX            = useRef(null)
  const intervalRef       = useRef(null)
  const TRANSITION_MS     = 1100
  const TRANSITION_EASE   = 'cubic-bezier(0.22, 1, 0.36, 1)'

  /* ── Auto-play ─────────────────────────────────────────────────────── */
  const startTimer = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => goTo('next'), 4200)
  }
  useEffect(() => { startTimer(); return () => clearInterval(intervalRef.current) }, [images.length])

  /* ── Navigation ─────────────────────────────────────────────────────── */
  const goTo = (target) => {
    setCur(c => {
      let next
      if (target === 'next') next = (c + 1) % images.length
      else if (target === 'prev') next = (c - 1 + images.length) % images.length
      else next = target
      setDir(next > c || (c === images.length - 1 && next === 0) ? 1 : -1)
      setPrev(c)
      setTimeout(() => setPrev(null), TRANSITION_MS + 40)
      return next
    })
    startTimer()
  }

  /* ── Touch swipe ─────────────────────────────────────────────────────── */
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return
    const diff = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 44) goTo(diff > 0 ? 'next' : 'prev')
    touchX.current = null
  }

  /* ── Slide enter/exit transforms ────────────────────────────────────── */
  const slideStyle = (i) => {
    const isCur  = i === cur
    const isPrev = i === prev
    if (!isCur && !isPrev) return { opacity: 0, transform: 'scale(0.99)', zIndex: 0, transition: 'none' }
    if (isPrev) return {
      opacity: 0,
      transform: `translateX(${dir * -3}%) scale(1.01)`,
      zIndex: 1,
      transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_EASE}, transform ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
      willChange: 'opacity, transform',
    }
    // current
    return {
      opacity: 1,
      transform: 'translateX(0) scale(1)',
      zIndex: 2,
      transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_EASE}, transform ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
      willChange: 'opacity, transform',
      animation: 'kenBurns 12s ease-in-out infinite alternate',
    }
  }

  return (
    <div
      style={{ position: 'relative', height, overflow: 'hidden', background: '#1a0a0e', userSelect: 'none' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Slides ── */}
      {images.map((src, i) => (
        <div
          key={i}
          style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', ...slideStyle(i) }}
        >
          <img
            src={src}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.32) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      ))}

      {/* ── Top gradient scrim ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 60, zIndex: 5,
        background: 'linear-gradient(to bottom, rgba(92,10,24,0.55) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Bottom gradient scrim ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, zIndex: 5,
        background: 'linear-gradient(to top, rgba(92,10,24,0.7) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Prev arrow ── */}
      <button
        onClick={() => goTo('prev')}
        aria-label="Previous"
        style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(250,246,232,0.12)', border: '1px solid rgba(250,246,232,0.25)',
          color: '#FAF6E8', fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', transition: 'background 0.2s',
          paddingBottom: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(250,246,232,0.28)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(250,246,232,0.12)'}
      >‹</button>

      {/* ── Next arrow ── */}
      <button
        onClick={() => goTo('next')}
        aria-label="Next"
        style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(250,246,232,0.12)', border: '1px solid rgba(250,246,232,0.25)',
          color: '#FAF6E8', fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', transition: 'background 0.2s',
          paddingBottom: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(250,246,232,0.28)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(250,246,232,0.12)'}
      >›</button>

      {/* ── Dot indicators ── */}
      <div style={{
        position: 'absolute', bottom: 14, width: '100%',
        display: 'flex', justifyContent: 'center', gap: 7, zIndex: 10,
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === cur ? 22 : 7, height: 7, borderRadius: 4,
              background: i === cur ? '#FAF6E8' : 'rgba(250,246,232,0.35)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'all 0.35s ease',
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* ── Counter ── */}
      <div style={{
        position: 'absolute', top: 13, right: 16, zIndex: 10,
        fontFamily: "'Montserrat', sans-serif", fontSize: 9,
        color: 'rgba(250,246,232,0.5)', letterSpacing: '0.1em',
      }}>
        {String(cur + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>
    </div>
  )
}
