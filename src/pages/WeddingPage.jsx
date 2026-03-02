import { useEffect, useRef, useState } from 'react'
import { GallerySection } from '@/components/wedding/sections/GallerySection'
import { HeroSection } from '@/components/wedding/sections/HeroSection'
import { InvitationDetailsSection } from '@/components/wedding/sections/InvitationDetailsSection'
import { ProgramSection } from '@/components/wedding/sections/ProgramSection'
import { RsvpSection } from '@/components/wedding/sections/RsvpSection'
import { ThanksSection } from '@/components/wedding/sections/ThanksSection'
import { ImageLightbox } from '@/components/wedding/ui/ImageLightbox'
import { MusicToggleButton } from '@/components/wedding/ui/MusicToggleButton'
import FloatingHearts from '@/components/shared/FloatingHearts'
import {
  BG_MUSIC,
  BRIDE,
  CAL_WEEKS,
  CAROUSEL_IMGS,
  DATE_LUNAR,
  DATE_SOLAR,
  GROOM,
  IMG,
  MAP_LINK,
  PROGRAM,
  VENUE,
  WEDDING_DAY,
} from '@/components/wedding/data'
import { TornDivider } from '@/components/wedding/shared'

export default function WeddingPage({ revealState = 'revealed' }) {
  const [form, setForm] = useState({ name: '', attending: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isMusicOn, setIsMusicOn] = useState(false)
  const [lightbox, setLightbox] = useState({ items: [], index: -1 })
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const enableSound = async () => {
      audio.muted = false
      if (!audio.paused) {
        setIsMusicOn(true)
        return
      }
      try {
        await audio.play()
        setIsMusicOn(true)
      } catch {
        setIsMusicOn(false)
      }
    }

    window.addEventListener('wedding:unlock-audio', enableSound)
    return () => {
      window.removeEventListener('wedding:unlock-audio', enableSound)
    }
  }, [])

  const toggleMusic = async () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      try {
        audioRef.current.muted = false
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

  const openLightbox = (items, index = 0) => {
    if (!items?.length) return
    setLightbox({ items, index })
  }

  const closeLightbox = () => {
    setLightbox({ items: [], index: -1 })
  }

  const showPrev = () => {
    setLightbox((s) => {
      if (!s.items.length) return s
      return { ...s, index: (s.index - 1 + s.items.length) % s.items.length }
    })
  }

  const showNext = () => {
    setLightbox((s) => {
      if (!s.items.length) return s
      return { ...s, index: (s.index + 1) % s.items.length }
    })
  }

  useEffect(() => {
    if (lightbox.index < 0 || !lightbox.items.length) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft' && lightbox.items.length > 1) showPrev()
      if (e.key === 'ArrowRight' && lightbox.items.length > 1) showNext()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow || ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightbox.index, lightbox.items.length])

  return (
    <div
      className="wedding-page-root"
      data-reveal={revealState}
      style={{ background: '#5C0A18', minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <FloatingHearts variant="page" />
      <audio ref={audioRef} src={BG_MUSIC} loop preload="auto" playsInline />
      <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <HeroSection image={IMG.hero} bride={BRIDE} groom={GROOM} onOpenImage={openLightbox} />
        <ProgramSection program={PROGRAM} />
        <TornDivider fromColor="#5C0A18" toColor="#FAF6E8" />
        <InvitationDetailsSection
          dateSolar={DATE_SOLAR}
          dateLunar={DATE_LUNAR}
          calWeeks={CAL_WEEKS}
          weddingDay={WEDDING_DAY}
          venue={VENUE}
          mapLink={MAP_LINK}
          venueImages={[IMG.venue1, IMG.venue2]}
          onOpenImage={openLightbox}
        />
        <TornDivider fromColor="#FAF6E8" toColor="#5C0A18" />
        <GallerySection images={CAROUSEL_IMGS} onOpenImage={openLightbox} />
        <RsvpSection
          form={form}
          submitted={submitted}
          setSubmitted={setSubmitted}
          setForm={setForm}
        />
        <ThanksSection dateSolar={DATE_SOLAR} />
      </div>
      <MusicToggleButton isMusicOn={isMusicOn} onToggle={toggleMusic} />
      <ImageLightbox
        items={lightbox.items}
        index={lightbox.index}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
      />
    </div>
  )
}

