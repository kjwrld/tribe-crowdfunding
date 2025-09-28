# Side Navigation Implementation Guide

## Overview
Our explore page features a dynamic side navigation that tracks user scroll position and highlights the current section. This implementation combines modern IntersectionObserver API with traditional scroll detection for maximum reliability.

## Core Components

### ExploreLeftNav Component
Located at `src/components/ExploreLeftNav.tsx` - the main navigation component that handles scroll detection.

### Section Configuration
```typescript
const sections = [
    { id: "hero-section", label: "Hero", number: "001" },
    { id: "kids-section", label: "Kids", number: "002" },
    { id: "families-section", label: "Families", number: "003" },
    { id: "educators-section", label: "Educators", number: "004" },
    { id: "roadmap-section", label: "Roadmap", number: "005" },
];
```

## Detection Logic

### Dual Detection System
We use both IntersectionObserver and scroll events for robust section detection:

```typescript
// IntersectionObserver for modern browsers
const observer = new IntersectionObserver((entries) => {
    if (entries.length === 0) return;
    
    let mostVisible = entries.reduce((prev, current) => {
        return current.intersectionRatio > prev.intersectionRatio ? current : prev;
    });

    if (mostVisible && mostVisible.intersectionRatio > 0.1) {
        setActiveSection(mostVisible.target.id);
    }
}, {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    rootMargin: '-20% 0px -20% 0px'
});

// Backup scroll listener
const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementBottom = elementTop + rect.height;
            
            if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
                setActiveSection(section.id);
            }
        }
    });
};
```

### Smooth Scrolling
Navigation clicks trigger smooth scrolling to target sections:

```typescript
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};
```

## Key Implementation Details

### Why Dual Detection?
- **IntersectionObserver**: Modern, performant, handles complex viewport calculations
- **Scroll Listener**: Reliable fallback, works in all scenarios
- **Combined**: Ensures navigation always updates correctly

### Configuration Choices
- **Multiple thresholds**: Provides granular intersection data
- **20% root margin**: Creates comfortable detection zones
- **Viewport center reference**: Uses middle of screen for scroll calculations

### Performance Optimizations
- Passive scroll listeners for better performance
- Proper cleanup prevents memory leaks
- Initial position check on component mount

## Usage Pattern

```typescript
// In your explore page component
import { ExploreLeftNav } from './ExploreLeftNav';

const sections = [/* your sections */];

<ExploreLeftNav sections={sections} />
```

## Section Element Requirements
Each section must have a corresponding DOM element with matching ID:

```tsx
<div id="hero-section">...</div>
<div id="kids-section">...</div>
```

## Future Enhancements
- Remove debug console.logs in production
- Add animation transitions for active state changes
- Consider adding keyboard navigation support
- Implement section progress indicators

---
*Implementation by YGBVerse Engineering Team - Combining modern web APIs with reliable fallbacks for exceptional UX*