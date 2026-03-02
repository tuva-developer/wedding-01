import { AnimIn, Flower, titleStyle } from '@/components/wedding/shared'

export function ThanksSection({ dateSolar }) {
  return (
    <div
      style={{
        background: '#5C0A18',
        padding: '30px 20px 48px',
        textAlign: 'center',
      }}
    >
      <AnimIn type="fadeIn">
        <Flower className="flower-float" style={{ width: 46, height: 76, margin: '0 auto 16px' }} opacity={0.35} />
      </AnimIn>
      <AnimIn type="fadeUp" delay={0.2}>
        <h2 style={{ ...titleStyle(true, 38), fontWeight: 300 }} className="font-script">
          Thank you
        </h2>
      </AnimIn>
      <AnimIn type="fadeIn" delay={0.45}>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, color: 'rgba(250,246,232,0.38)', letterSpacing: '0.38em', marginTop: 18 }}>
          {dateSolar}
        </p>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 26, color: 'rgba(250,246,232,0.45)', marginTop: 10 }}>
          Cảm ơn bạn đã dành tình cảm cho chúng mình!
          <br />
          Sự hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.
        </p>
      </AnimIn>
    </div>
  )
}
