const PETAL_PNG_SRC = '/images/rose-petal.png'

const GATE_PETALS = [
  { left: '3%', delay: '-8.7s', duration: '9.2s', size: '20px' },
  { left: '9%', delay: '-3.9s', duration: '8.6s', size: '18px' },
  { left: '15%', delay: '-6.8s', duration: '9.8s', size: '23px' },
  { left: '22%', delay: '-1.4s', duration: '8.9s', size: '19px' },
  { left: '29%', delay: '-5.6s', duration: '9.4s', size: '22px' },
  { left: '36%', delay: '-7.3s', duration: '8.7s', size: '18px' },
  { left: '43%', delay: '-2.5s', duration: '9.7s', size: '24px' },
  { left: '50%', delay: '-4.1s', duration: '8.8s', size: '19px' },
  { left: '57%', delay: '-6.2s', duration: '9.3s', size: '20px' },
  { left: '64%', delay: '-0.9s', duration: '8.5s', size: '18px' },
  { left: '71%', delay: '-5.1s', duration: '9.1s', size: '23px' },
  { left: '78%', delay: '-2.2s', duration: '8.4s', size: '19px' },
  { left: '85%', delay: '-7.8s', duration: '9.6s', size: '21px' },
  { left: '91%', delay: '-3.4s', duration: '8.95s', size: '20px' },
  { left: '96%', delay: '-6.0s', duration: '9.35s', size: '18px' },
]

const PAGE_PETALS = [
  { left: '6%', delay: '-11.2s', duration: '13.5s', size: '16px' },
  { left: '13%', delay: '-4.9s', duration: '14.2s', size: '14px' },
  { left: '20%', delay: '-9.6s', duration: '13.8s', size: '17px' },
  { left: '28%', delay: '-2.8s', duration: '12.9s', size: '16px' },
  { left: '36%', delay: '-6.3s', duration: '14.6s', size: '14px' },
  { left: '44%', delay: '-12.1s', duration: '13.2s', size: '16px' },
  { left: '52%', delay: '-7.4s', duration: '14.1s', size: '17px' },
  { left: '60%', delay: '-3.7s', duration: '13.7s', size: '16px' },
  { left: '68%', delay: '-10.5s', duration: '14.3s', size: '14px' },
  { left: '76%', delay: '-5.8s', duration: '13.4s', size: '16px' },
  { left: '84%', delay: '-8.2s', duration: '14.8s', size: '15px' },
  { left: '92%', delay: '-1.9s', duration: '13.6s', size: '14px' },
]

export default function FloatingRosePetals({ variant = 'gate' }) {
  const petals = variant === 'page' ? PAGE_PETALS : GATE_PETALS
  const tone = variant === 'page' ? 'bg-petal-page' : 'bg-petal-gate'
  const wrapperClass =
    variant === 'page'
      ? 'pointer-events-none fixed inset-0 z-[3] overflow-hidden'
      : 'pointer-events-none absolute inset-0 z-[1] overflow-hidden'

  return (
    <div className={wrapperClass} aria-hidden="true">
      {petals.map((petal, i) => (
        <img
          key={`${variant}-${i}`}
          className={`bg-petal ${tone}`}
          src={PETAL_PNG_SRC}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            left: petal.left,
            '--petal-delay': petal.delay,
            '--petal-duration': petal.duration,
            '--petal-size': petal.size,
          }}
        />
      ))}
    </div>
  )
}
