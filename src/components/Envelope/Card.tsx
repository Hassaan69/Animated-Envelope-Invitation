import { useState, useEffect, useRef } from 'react'
import './Card.css'

interface CardProps {
  isOpen: boolean
}

type CardState = 'closed' | 'opening' | 'open' | 'focus-left' | 'focus-right' | 'full-view' | 'closing' | 'show-back' | 'flip-to-cover'

function Card({ isOpen }: CardProps) {
  const [cardState, setCardState] = useState<CardState>('closed')
  const animationStarted = useRef(false)

  // Auto-run animation when envelope opens
  useEffect(() => {
    if (isOpen && !animationStarted.current) {
      animationStarted.current = true
      
      // Wait for envelope to slide down first (envelope has 2s delay + 0.6s animation + 0.5s buffer)
      const envelopeAnimationTime = 3100
      
      // Animation sequence with delays (in ms) - starting AFTER envelope is gone
      const sequence: { state: CardState; delay: number }[] = [
        { state: 'opening', delay: envelopeAnimationTime },           // Start opening
        { state: 'open', delay: envelopeAnimationTime + 800 },        // Show two pages
        { state: 'focus-left', delay: envelopeAnimationTime + 2500 }, // Focus left page only
        { state: 'focus-right', delay: envelopeAnimationTime + 4500 },// Focus right page only
        { state: 'full-view', delay: envelopeAnimationTime + 6500 },  // Show full two-page view
        { state: 'closing', delay: envelopeAnimationTime + 8500 },    // Close the card
        { state: 'show-back', delay: envelopeAnimationTime + 10000 }, // Show card back
        { state: 'flip-to-cover', delay: envelopeAnimationTime + 12000 }, // Flip to cover
      ]

      const timeouts: ReturnType<typeof setTimeout>[] = []
      
      sequence.forEach(({ state, delay }) => {
        const timeout = setTimeout(() => {
          setCardState(state)
        }, delay)
        timeouts.push(timeout)
      })

      // Cleanup timeouts on unmount
      return () => {
        timeouts.forEach(clearTimeout)
      }
    }
  }, [isOpen])

  // Show pages only during open states
  const showPages = ['opening', 'open', 'focus-left', 'focus-right', 'full-view'].includes(cardState)
  
  // Show cover when closed, closing, or showing back/flip states
  const showCover = ['closed', 'closing', 'show-back', 'flip-to-cover'].includes(cardState)

  return (
    <div className={`card-container ${cardState} ${isOpen ? 'envelope-gone' : ''}`}>
      <div className="card-book">
        
        {/* Cover (front of card) */}
        <div className={`card-cover ${showCover ? 'visible' : 'hidden'}`}>
          <div className="card-content">
            <div className="card-gold-spray"></div>
            <div className="card-header">
              <div className="card-logo-area">
                <div className="logo-text">VOTRE</div>
                <div className="logo-text">LOGO</div>
                <div className="logo-text">ICI</div>
              </div>
              <div className="card-greeting">MEILLEURS VŒUX</div>
            </div>
            <div className="card-visual">
              <div className="card-year">
                <span className="year-digit">2</span>
                <span className="year-digit">0</span>
                <span className="year-digit year-digit-faded">2</span>
                <span className="year-digit year-digit-faded">5</span>
              </div>
              <div className="chrome-blob chrome-blob-1"></div>
              <div className="chrome-blob chrome-blob-2"></div>
              <div className="chrome-blob chrome-blob-3"></div>
            </div>
          </div>
        </div>

        {/* Inside pages - two page spread */}
        <div className={`card-pages ${showPages ? 'visible' : 'hidden'}`}>
          {/* Left page */}
          <div className="card-page card-page-left">
            <div className="page-chrome-blob page-blob-1"></div>
            <div className="page-chrome-blob page-blob-2"></div>
            <div className="page-chrome-blob page-blob-3"></div>
            <div className="page-chrome-blob page-blob-4"></div>
            <div className="page-logo-box">
              <span>VOTRE</span>
              <span>LOGO</span>
              <span>ICI</span>
            </div>
          </div>
          
          {/* Right page */}
          <div className="card-page card-page-right">
            <div className="page-content-right">
              <p className="page-intro">
                En 2026, nous continuerons<br/>
                à mettre toute notre compétence<br/>
                à profit pour concrétiser nos projets communs.
              </p>
              <p className="page-wishes">
                Nous vous adressons nos meilleurs vœux<br/>
                de réussite et de bonheur,<br/>
                et vous remercions pour votre dévouement<br/>
                et votre collaboration.
              </p>
              <p className="page-signature">
                TOUTE L'ÉQUIPE DE SUPERENTREPRISE
              </p>
            </div>
          </div>
          
          {/* Gold glitter */}
          <div className="pages-gold-glitter"></div>
        </div>

        {/* Card back */}
        <div className="card-back">
          <div className="card-back-content">
            <div className="back-logo">★</div>
            <div className="back-text">www.votresite.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
