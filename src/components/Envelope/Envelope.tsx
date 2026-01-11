import { useState } from 'react'
import Card from './Card'
import './Envelope.css'

function Envelope() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="envelope-container" onClick={handleClick}>
      {/* Gold particles */}
      <div className="gold-particles gold-particles-top-right"></div>
      <div className="gold-particles gold-particles-bottom-left"></div>
      
      {/* Card - stays visible always */}
      <div className="letter">
        <Card isOpen={isOpen} />
      </div>
      
      {/* Envelope parts - slide down and fade */}
      <div className={`envelope-back ${isOpen ? 'open' : ''}`}></div>
      <div className={`envelope-pocket ${isOpen ? 'open' : ''}`}></div>
      <div className={`envelope-flap ${isOpen ? 'open' : ''}`}></div>
    </div>
  )
}

export default Envelope
