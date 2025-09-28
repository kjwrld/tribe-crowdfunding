# ShadCN Animated Cursor System Implementation

## Overview

A production-ready animated cursor system built with Motion and React that provides contextual hover descriptions for dashboard sections. Features smooth spring animations, proper positioning logic, and TypeScript safety.

## Core Architecture

### 1. Context-Based State Management

```tsx
type CursorContextType = {
  cursorPos: { x: number; y: number };
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
};

const CursorContext = React.createContext<CursorContextType | undefined>(undefined);
```

**Key Decision**: Used React Context to avoid prop drilling and enable cursor state sharing across deeply nested components.

### 2. Provider Component Structure

```tsx
function CursorProvider({ ref, children, ...props }: CursorProviderProps) {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Ensure positioning context
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setCursorPos({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
      setIsActive(true);
    };
    
    // Event listeners...
  }, []);
}
```

**Critical Fix**: Changed from parent element tracking to container-based tracking for accurate positioning.

### 3. Motion-Driven Cursor Component

```tsx
function Cursor({ ref, children, className, style, ...props }: CursorProps) {
  const { cursorPos, isActive, containerRef, cursorRef } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    x.set(cursorPos.x);
    y.set(cursorPos.y);
  }, [cursorPos, x, y]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={cursorRef}
          className="pointer-events-none z-[9999] absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 4. Smart Tooltip Positioning

```tsx
function CursorFollow({
  sideOffset = 15,
  align = 'bottom-right',
  transition = { stiffness: 500, damping: 50, bounce: 0 },
  // ...other props
}: CursorFollowProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, transition);
  const springY = useSpring(y, transition);

  const calculateOffset = React.useCallback(() => {
    const rect = cursorFollowRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;

    switch (align) {
      case 'bottom-right':
        return { x: -sideOffset, y: -sideOffset };
      case 'bottom':
        return { x: width / 2, y: -sideOffset };
      // ... other cases
    }
  }, [align, sideOffset]);
}
```

## Integration Pattern

### Dashboard Implementation

```tsx
// 1. Wrap your dashboard with CursorProvider
<CursorProvider className="relative min-h-screen bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
  
  {/* 2. Modern teal cursor with transparent fill */}
  <Cursor className="flex items-center justify-center">
    <motion.div 
      className="relative"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(0, 255, 230, 0.6)) drop-shadow(0 0 16px rgba(0, 255, 230, 0.3))'
      }}
      animate={{ 
        filter: [
          'drop-shadow(0 0 8px rgba(0, 255, 230, 0.6)) drop-shadow(0 0 16px rgba(0, 255, 230, 0.3))',
          'drop-shadow(0 0 12px rgba(0, 255, 230, 0.8)) drop-shadow(0 0 24px rgba(0, 255, 230, 0.4))',
          'drop-shadow(0 0 8px rgba(0, 255, 230, 0.6)) drop-shadow(0 0 16px rgba(0, 255, 230, 0.3))'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Modern Cursor with Teal Border */}
      <svg
        className="size-6 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path
          d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
          fill="rgba(0, 255, 230, 0.1)"
          stroke="#00ffe6"
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  </Cursor>

  {/* 3. Contextual tooltip - Only renders when content exists */}
  {currentSection && (
    <CursorFollow 
      align="bottom-right" 
      sideOffset={45}
      className="px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-white text-sm"
      style={{
        transform: 'translateX(8px) translateY(5px)'
      }}
    >
      {currentSection}
    </CursorFollow>
  )}

  {/* 4. Dashboard sections with onMouseEnter handlers */}
  <div 
    className="performance-section"
    onMouseEnter={() => setCurrentSection('Performance Overview - Track your learning progress')}
    onMouseLeave={() => setCurrentSection(null)}
  >
    {/* Dashboard content */}
  </div>
</CursorProvider>
```

### Section Management

```tsx
const [currentSection, setCurrentSection] = useState<string | null>(null);

const sectionDescriptions = {
  performance: 'Performance Overview - Track your learning progress',
  subjects: 'Subject Distribution - See time spent across topics',
  progress: 'Study Progress - Monitor daily consistency',
  leaderboard: 'Leaderboard - Compare with classmates',
  achievements: 'Achievements - Unlock badges and rewards'
};

// Apply to each section
<motion.div
  onMouseEnter={() => setCurrentSection(sectionDescriptions.performance)}
  onMouseLeave={() => setCurrentSection(null)}
  className="dashboard-card"
>
```

## Key Technical Decisions

### 1. **Container-Based Positioning**
- **Problem**: Parent element positioning caused coordinate misalignment
- **Solution**: Direct container event tracking with relative positioning
- **Impact**: Accurate cursor tracking across all viewport sizes

### 2. **Motion Values vs State**
- **Choice**: Motion values for cursor position, state for tooltip content
- **Reasoning**: Motion values provide 60fps animations without re-renders
- **Performance**: Eliminates layout thrashing on mouse movement

### 3. **Spring Physics Configuration**
```tsx
transition = { stiffness: 500, damping: 50, bounce: 0 }
```
- **stiffness: 500**: Responsive but not jittery
- **damping: 50**: Smooth deceleration  
- **bounce: 0**: Professional, non-playful movement

### 4. **Z-Index Layering**
```tsx
// Cursor: z-[9999] (top layer)
// Tooltip: z-[9998] (just below cursor)
```
Ensures cursor visibility above all UI elements while keeping tooltip accessible.

## Performance Optimizations

### 1. **Event Listener Cleanup**
```tsx
React.useEffect(() => {
  const container = containerRef.current;
  // ... event setup
  
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  };
}, []);
```

### 2. **Memoized Offset Calculation**
```tsx
const calculateOffset = React.useCallback(() => {
  // Expensive calculation only when align/sideOffset changes
}, [align, sideOffset]);
```

### 3. **Conditional Rendering**
```tsx
<AnimatePresence>
  {isActive && (
    // Only render cursor elements when mouse is in container
  )}
</AnimatePresence>
```

## Customization Options

### Visual Styling
```tsx
// Modern cursor with transparent fill and teal border
<Cursor className="flex items-center justify-center">
  <svg className="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <path 
      d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
      fill="rgba(0, 255, 230, 0.1)" 
      stroke="#00ffe6" 
      strokeWidth="1.5" 
    />
  </svg>
</Cursor>

// Conditional tooltip styling  
{content && (
  <CursorFollow 
    className="px-4 py-2 bg-purple-900/90 backdrop-blur text-white rounded-xl"
    sideOffset={45}
    style={{ transform: 'translateX(8px) translateY(5px)' }}
  >
    {content}
  </CursorFollow>
)}
```

### Animation Tuning
```tsx
transition={{
  stiffness: 300,    // Less responsive for smoother movement
  damping: 30,       // Less damping for more oscillation
  bounce: 0.2        // Slight bounce for playful feel
}}
```

### Positioning Control
```tsx
sideOffset={45}                                    // Distance from cursor  
align="bottom-right"                               // 9 alignment options available
style={{ transform: 'translateX(8px) translateY(5px)' }}  // Fine-tune positioning
```

### Conditional Rendering
```tsx
// Only show tooltip when content exists (fixes empty string issue)
{currentSection && (
  <CursorFollow>
    {currentSection}
  </CursorFollow>
)}

// Alternative: Use null check
<CursorFollow>
  {currentSection || null}
</CursorFollow>
```

## Production Considerations

### 1. **Mobile Handling**
```tsx
// Disable on mobile to avoid performance issues
const isMobile = useMediaQuery('(max-width: 768px)');

return (
  <div>
    {!isMobile && (
      <CursorProvider>
        {/* Cursor system */}
      </CursorProvider>
    )}
    {/* Rest of app */}
  </div>
);
```

### 2. **Accessibility**
- Cursor doesn't interfere with screen readers
- `pointer-events-none` prevents interaction blocking
- Native cursor remains for keyboard navigation

### 3. **Browser Support**
- Uses modern CSS transforms for performance
- Motion library handles browser compatibility
- Graceful degradation on older browsers

## Debugging Tips

### 1. **Positioning Issues**
```tsx
// Add visual debug overlay
<div className="absolute inset-0 border-2 border-red-500 pointer-events-none">
  Debug Container
</div>
```

### 2. **Performance Monitoring**
```tsx
// Log cursor position updates
React.useEffect(() => {
  console.log('Cursor moved:', cursorPos);
}, [cursorPos]);
```

### 3. **Animation Tuning**
Use React DevTools Profiler to monitor re-render frequency and optimize spring settings accordingly.

## Future Enhancements

1. **Multi-cursor Support**: Multiple cursors for collaborative interfaces
2. **Gesture Recognition**: Cursor trails and drawing capabilities  
3. **Adaptive Physics**: Dynamic spring settings based on movement velocity
4. **Theme Integration**: Cursor appearance that adapts to light/dark themes
5. **Sound Integration**: Audio feedback for cursor interactions

## Dependencies

```json
{
  "motion": "^10.x.x",
  "react": "^18.x.x", 
  "@types/react": "^18.x.x"
}
```

## File Structure
```
/components/ui/cursor.tsx          # Core cursor system
/imports/ClassProgress.tsx         # Dashboard implementation
/lib/utils.ts                      # Utility functions (cn helper)
```

This implementation provides a robust foundation for interactive cursor experiences while maintaining excellent performance and developer experience.