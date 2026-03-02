import { useLayoutEffect, useState } from 'react'
import InvitationCard from './components/invitation/InvitationCard'
import WeddingPage from './pages/WeddingPage'

export default function App() {
  const [showGate, setShowGate] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useLayoutEffect(() => {
    if (showGate) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [showGate])

  const startReveal = () => {
    window.dispatchEvent(new Event('wedding:unlock-audio'))
    setIsTransitioning(true)
  }

  const revealState = showGate ? (isTransitioning ? 'revealing' : 'covered') : 'revealed'

  return (
    <>
      <WeddingPage revealState={revealState} />
      {showGate && (
        <InvitationCard
          onUnlock={startReveal}
          onDone={() => setShowGate(false)}
          coverImage="/images/z7561870190071_5e6e98404ee3fad9b2cb59f714806a16.jpg"
        />
      )}
    </>
  )
}
