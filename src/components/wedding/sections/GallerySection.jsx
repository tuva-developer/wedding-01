import { Carousel } from '@/components/shared/Carousel'
import { AnimIn, dividerStyle, titleStyle } from '@/components/wedding/shared'

export function GallerySection({ images, onOpenImage }) {
  return (
    <div style={{ background: '#5C0A18' }}>
      <div style={{ padding: '32px 32px 20px', textAlign: 'center' }}>
        <AnimIn type="fadeUp">
          <h2 style={titleStyle(true, 22)}>Khoảnh Khắc</h2>
          <div className="shimmer-line" style={dividerStyle(true)} />
        </AnimIn>
      </div>
      <AnimIn type="fadeIn" delay={0.2}>
        <Carousel
          images={images}
          height={600}
          onImageClick={(_, index, slideImages) => onOpenImage?.(slideImages, index)}
        />
      </AnimIn>
      <div style={{ height: 32 }} />
    </div>
  )
}
