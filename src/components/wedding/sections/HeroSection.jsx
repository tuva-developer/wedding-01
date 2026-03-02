import { Flower, titleStyle } from '@/components/wedding/shared'

export function HeroSection({ image, bride, groom, onOpenImage }) {
  return (
    <div
      onClick={() => onOpenImage?.([image], 0)}
      style={{ position: 'relative', height: '100vh', minHeight: 500, maxHeight: 780, overflow: 'hidden', cursor: 'zoom-in' }}
    >
      <img
        src={image}
        alt={`${bride} & ${groom}`}
        className="hero-photo"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 30%, transparent 52%, rgba(0,0,0,0.78) 100%)',
        }}
      />
      <div className="hero-title" style={{ position: 'absolute', top: '50%', right: 28, textAlign: 'center', zIndex: 2 }}>
        <Flower style={{ width: 38, height: 64, margin: '0 auto 10px' }} />
        <h1 style={{ ...titleStyle(true, 32), fontWeight: 300 }}>
          NHÀ
          <br />
          GÁI
        </h1>
      </div>
      <div className="hero-names" style={{ position: 'absolute', bottom: 32, left: 28, zIndex: 2 }}>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 42, color: '#FAF6E8', lineHeight: 1, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>
          {bride}
        </p>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(250,246,232,0.62)', letterSpacing: '0.55em', textTransform: 'uppercase', margin: '7px 0' }}>
          &amp;
        </p>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 42, color: '#FAF6E8', lineHeight: 1, margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>
          {groom}
        </p>
      </div>
    </div>
  )
}
