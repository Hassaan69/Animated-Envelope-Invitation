# Interactive Envelope Animation

A pixel-perfect replica of an interactive envelope animation built with React and pure CSS. The envelope opens on click to reveal a card with elegant typography and liquid chrome effects.

## Features

- **3D Flap Animation**: Smooth CSS-driven flap rotation with double-face technique
- **Card Reveal**: Staggered animation where the card rises after the flap opens
- **Liquid Chrome Effects**: CSS-based metallic blob graphics
- **Gold Particle Accents**: Scattered glitter effects in the corners
- **Pure CSS Animations**: No JavaScript animations for optimal performance

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
  components/
    Envelope/
      Envelope.tsx       # Main component with state management
      Envelope.css       # Envelope structure and flap animations
      Card.tsx           # Card content component
      Card.css           # Card styling and chrome effects
  App.tsx
  main.tsx
  index.css
```

## Animation Details

The animation consists of two phases:

1. **Phase 1 (0-0.6s)**: The top flap rotates 180° on the X-axis, revealing the gold-dotted interior
2. **Phase 2 (0.4s-1s)**: The card rises with a slight scale, creating a smooth reveal effect

## Technologies

- React 18
- TypeScript
- Vite
- Pure CSS animations
