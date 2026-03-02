const GATE_HEARTS = [
  { left: '5%', delay: '0s', duration: '9.2s', size: '14px' },
  { left: '12%', delay: '1.1s', duration: '8.6s', size: '12px' },
  { left: '19%', delay: '2.2s', duration: '9.8s', size: '16px' },
  { left: '28%', delay: '0.8s', duration: '8.9s', size: '13px' },
  { left: '36%', delay: '1.7s', duration: '9.4s', size: '15px' },
  { left: '45%', delay: '2.8s', duration: '8.7s', size: '12px' },
  { left: '54%', delay: '0.4s', duration: '9.7s', size: '17px' },
  { left: '62%', delay: '1.5s', duration: '8.8s', size: '13px' },
  { left: '70%', delay: '2.6s', duration: '9.3s', size: '14px' },
  { left: '79%', delay: '0.9s', duration: '8.5s', size: '12px' },
  { left: '88%', delay: '2s', duration: '9.1s', size: '16px' },
  { left: '95%', delay: '1.3s', duration: '8.4s', size: '13px' },
]

const PAGE_HEARTS = [
  { left: '7%', delay: '0.6s', duration: '13.5s', size: '10px' },
  { left: '15%', delay: '3.1s', duration: '14.2s', size: '9px' },
  { left: '23%', delay: '1.9s', duration: '13.8s', size: '11px' },
  { left: '34%', delay: '4.2s', duration: '12.9s', size: '10px' },
  { left: '46%', delay: '2.8s', duration: '14.6s', size: '9px' },
  { left: '57%', delay: '0.3s', duration: '13.2s', size: '10px' },
  { left: '68%', delay: '3.6s', duration: '14.1s', size: '11px' },
  { left: '79%', delay: '1.4s', duration: '13.7s', size: '10px' },
  { left: '90%', delay: '2.4s', duration: '14.3s', size: '9px' },
]

export default function FloatingHearts({ variant = 'gate' }) {
  const hearts = variant === 'page' ? PAGE_HEARTS : GATE_HEARTS
  const tone = variant === 'page' ? 'bg-heart-page' : 'bg-heart-gate'
  const wrapperClass =
    variant === 'page'
      ? 'pointer-events-none fixed inset-0 z-[3] overflow-hidden'
      : 'pointer-events-none absolute inset-0 z-[1] overflow-hidden'

  return (
    <div className={wrapperClass} aria-hidden="true">
      {hearts.map((heart, i) => (
        <span
          key={`${variant}-${i}`}
          className={`bg-heart ${tone}`}
          style={{
            left: heart.left,
            '--heart-delay': heart.delay,
            '--heart-duration': heart.duration,
            '--heart-size': heart.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}
