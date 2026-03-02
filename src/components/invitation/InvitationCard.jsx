import { useState } from 'react'
import FloatingHearts from '@/components/shared/FloatingHearts'

export default function InvitationCard({ onUnlock, onDone }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    onUnlock?.()
    setOpening(true)
    window.setTimeout(() => onDone?.(), 1450)
  }

  return (
    <div
      className={[
        'fixed inset-0 z-[3000] flex items-center justify-center overflow-hidden p-5',
        'bg-[#5C0A18]',
        'transition-all duration-[980ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        opening ? 'pointer-events-none scale-[1.05] opacity-0 blur-[4px] delay-[420ms]' : 'scale-100 opacity-100 blur-0',
      ].join(' ')}
    >
      <span
        className={[
          'pointer-events-none absolute inset-0 z-[1] opacity-0',
          opening ? 'gate-reveal-flash is-active' : '',
        ].join(' ')}
      />
      {!opening && <FloatingHearts variant="gate" />}
      <div
        className="absolute aspect-square w-[min(95vw,470px)] rounded-full"
        style={{ '--gate-delay': '0.06s' }}
      />
      <div className="relative z-[2] flex w-full max-w-[560px] flex-col items-center gap-8">
        <div
          className={[
            'pointer-events-none w-full px-6 text-center text-white transition-all duration-300 ease-out gate-fade-down',
            opening ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0',
          ].join(' ')}
          style={{ '--gate-delay': '0.14s' }}
        >
          <p
            className="font-body text-[13px] uppercase tracking-[0.38em] text-[rgba(246,233,203,0.72)] gate-fade-up mb-8"
            style={{ '--gate-delay': '0.22s' }}
          >
            Lễ Thành Hôn
          </p>
          <h2
            className="font-script text-[clamp(32px,9vw,56px)] leading-none gate-fade-up text-left"
            style={{ '--gate-delay': '0.32s' }}
          >
            Kiều Anh
          </h2>
          <h2
            className="sm:-mt-4 mt-0 font-script text-[clamp(18px,6vw,32px)] leading-none gate-fade-up text-center"
            style={{ '--gate-delay': '0.32s' }}
          >
            &
          </h2>
          <h2
            className="sm:-mt-4 mt-0 font-script text-[clamp(32px,9vw,56px)] leading-none gate-fade-up text-right"
            style={{ '--gate-delay': '0.32s' }}
          >
            Văn Mẫn
          </h2>
        </div>
        <button
          type="button"
          className={[
            'relative z-[1] block w-[min(90vw,560px)] cursor-pointer border-0 bg-transparent p-0',
            'transition-transform duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)] gate-zoom-in',
            opening ? 'scale-[0.96] -translate-y-1' : 'scale-100 translate-y-0',
          ].join(' ')}
          style={{ '--gate-delay': '0.24s' }}
          onClick={handleOpen}
          aria-label="Open wedding invitation"
        >
          <span className="relative block w-full overflow-hidden rounded-[20px]">
            <span
              className={[
                'pointer-events-none absolute inset-0 z-[2] opacity-0',
                opening ? 'gate-card-light is-active' : '',
              ].join(' ')}
            />
            <img
              src="/images/wedding_invitation.png"
              alt="Wedding invitation"
              className={[
                'block h-auto w-full transition-all duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                opening ? 'scale-[1.04] opacity-90' : 'scale-100 opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-1/2 top-[70%] z-[3] h-[128px] w-[128px] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out sm:h-[144px] sm:w-[144px]',
                opening ? 'opacity-0 scale-[0.95]' : 'opacity-100 scale-100',
              ].join(' ')}
            >
              <img
                src="/images/wax_seal.png"
                alt="Wax seal"
                className={[
                  'relative z-[2] block h-full w-full object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)] transition-[filter,transform] duration-300 ease-out hover:scale-[1.02] hover:brightness-105 hover:drop-shadow-[0_0_12px_rgba(248,113,113,0.7)] hover:[filter:drop-shadow(0_0_12px_rgba(248,113,113,0.75))_drop-shadow(0_0_26px_rgba(239,68,68,0.55))]',
                  opening ? '' : 'wax-blink',
                ].join(' ')}
              />
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}

