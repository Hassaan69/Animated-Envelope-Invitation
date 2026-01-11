import { useState, useEffect, useRef } from 'react'
import './Card.css'

interface CardProps {
  isOpen: boolean
}

type CardState = 
  | 'closed'           // Card cover visible
  | 'opening'          // Cover flipping open like a book
  | 'open'             // Both pages visible
  | 'focus-left'       // Focus on left page
  | 'focus-right'      // Focus on right page
  | 'full-view'        // Zoom out to see both pages
  | 'closing'          // Cover flipping back to close
  | 'show-back'        // Flip card to show back
  | 'flip-to-cover'    // Flip back to show cover

function Card({ isOpen }: CardProps) {
  const [cardState, setCardState] = useState<CardState>('closed')
  const animationStarted = useRef(false)

  // Auto-run animation when envelope opens
  useEffect(() => {
    if (isOpen && !animationStarted.current) {
      animationStarted.current = true
      
      // Wait for envelope to slide down first
      const envelopeAnimationTime = 3100
      
      // Animation sequence
      const sequence: { state: CardState; delay: number }[] = [
        { state: 'opening', delay: envelopeAnimationTime },           // Card cover flips open
        { state: 'open', delay: envelopeAnimationTime + 1500 },       // Both pages visible
        { state: 'focus-left', delay: envelopeAnimationTime + 3500 }, // Focus left page
        { state: 'focus-right', delay: envelopeAnimationTime + 5500 },// Focus right page
        { state: 'full-view', delay: envelopeAnimationTime + 7500 },  // Zoom out to see both pages
        { state: 'closing', delay: envelopeAnimationTime + 9500 },    // Cover flips back to close
        { state: 'show-back', delay: envelopeAnimationTime + 11500 }, // Flip to show outro (back)
        { state: 'flip-to-cover', delay: envelopeAnimationTime + 14000 }, // Flip to show intro (cover)
      ]

      const timeouts: ReturnType<typeof setTimeout>[] = []
      
      sequence.forEach(({ state, delay }) => {
        const timeout = setTimeout(() => {
          setCardState(state)
        }, delay)
        timeouts.push(timeout)
      })

      return () => {
        timeouts.forEach(clearTimeout)
      }
    }
  }, [isOpen])

  return (
    <div className={`card-container ${cardState} ${isOpen ? 'envelope-gone' : ''}`}>
      <div className="card-book">
        
        {/* Inside pages - always present, revealed when cover opens */}
        <div className="card-pages">
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

        {/* Cover - flips open like a book (hinged on left side) */}
        <div className="card-cover">
          <div className="card-cover-front">
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
        </div>

        {/* Card back - visible when whole card flips */}
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
