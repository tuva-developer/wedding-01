import { FaMusic, FaVolumeMute } from 'react-icons/fa'

export function MusicToggleButton({ isMusicOn, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 1200,
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '1px solid rgba(250,246,232,0.3)',
        background: 'rgba(92,10,24,0.88)',
        color: '#FAF6E8',
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        padding: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
      }}
    >
      <span style={{ display: 'inline-flex', transform: 'translateY(-1px)' }}>
        {isMusicOn ? <FaMusic size={17} /> : <FaVolumeMute size={17} />}
      </span>
    </button>
  )
}
