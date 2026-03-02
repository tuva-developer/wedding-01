export function ImageLightbox({ items, index, onClose, onPrev, onNext }) {
  if (!items?.length || index < 0) return null
  const src = items[index]
  const canNavigate = items.length > 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 4000,
        background: 'rgba(8, 3, 5, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: '1px solid rgba(250,246,232,0.34)',
          background: 'rgba(21, 7, 11, 0.6)',
          color: '#FAF6E8',
          fontSize: 22,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        <span style={{ display: 'block', transform: 'translateY(-1px)' }}>×</span>
      </button>
      {canNavigate && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev?.() }}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(250,246,232,0.34)',
            background: 'rgba(21, 7, 11, 0.6)',
            color: '#FAF6E8',
            fontSize: 26,
            lineHeight: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <span style={{ display: 'block', transform: 'translateY(-1px)' }}>‹</span>
        </button>
      )}
      {canNavigate && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext?.() }}
          aria-label="Next image"
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(250,246,232,0.34)',
            background: 'rgba(21, 7, 11, 0.6)',
            color: '#FAF6E8',
            fontSize: 26,
            lineHeight: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <span style={{ display: 'block', transform: 'translateY(-1px)' }}>›</span>
        </button>
      )}
      <img
        src={src}
        alt="Fullscreen preview"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: 'min(1100px, 96vw)',
          maxHeight: '92vh',
          objectFit: 'contain',
          borderRadius: 6,
          boxShadow: '0 14px 52px rgba(0,0,0,0.45)',
        }}
      />
    </div>
  )
}
