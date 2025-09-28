'use client';
 
import * as React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from 'motion/react';
 
import { cn } from '../../lib/utils';
 
type CursorContextType = {
  cursorPos: { x: number; y: number };
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
};
 
const CursorContext = React.createContext<CursorContextType | undefined>(
  undefined,
);
 
const useCursor = (): CursorContextType => {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
 
type CursorProviderProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
};
 
function CursorProvider({ ref, children, ...props }: CursorProviderProps) {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);
 
  React.useEffect(() => {
    if (!containerRef.current) return;
 
    const container = containerRef.current;
    
    // Ensure the container itself is the positioning context
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
    const handleMouseLeave = () => setIsActive(false);
 
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
 
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
 
  return (
    <CursorContext.Provider
      value={{ cursorPos, isActive, containerRef, cursorRef }}
    >
      <div ref={containerRef} data-slot="cursor-provider" {...props}>
        {children}
      </div>
    </CursorContext.Provider>
  );
}
 
type CursorProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
};
 
function Cursor({ ref, children, className, style, ...props }: CursorProps) {
  const { cursorPos, isActive, containerRef, cursorRef } = useCursor();
  React.useImperativeHandle(ref, () => cursorRef.current as HTMLDivElement);
 
  const x = useMotionValue(0);
  const y = useMotionValue(0);
 
  React.useEffect(() => {
    const container = containerRef.current;
 
    if (container && isActive) {
      container.style.cursor = 'none';
      // Apply cursor none to all child elements to override chart cursors
      container.style.setProperty('cursor', 'none', 'important');
      const allElements = container.querySelectorAll('*');
      allElements.forEach((el: Element) => {
        (el as HTMLElement).style.setProperty('cursor', 'none', 'important');
      });
    }
 
    return () => {
      if (container) container.style.cursor = 'default';
    };
  }, [containerRef, cursorPos, isActive]);
 
  React.useEffect(() => {
    x.set(cursorPos.x);
    y.set(cursorPos.y);
  }, [cursorPos, x, y]);
 
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={cursorRef}
          data-slot="cursor"
          className={cn(
            'pointer-events-none z-[9999] absolute -translate-x-1/2 -translate-y-1/2',
            className,
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
 
type Align =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'center';
 
type CursorFollowProps = HTMLMotionProps<'div'> & {
  sideOffset?: number;
  align?: Align;
  transition?: SpringOptions;
  children: React.ReactNode;
};
 
function CursorFollow({
  ref,
  sideOffset = 15,
  align = 'bottom-right',
  children,
  className,
  style,
  transition = { stiffness: 1000, damping: 100, bounce: 0 },
  ...props
}: CursorFollowProps) {
  const { cursorPos, isActive, cursorRef } = useCursor();
  const cursorFollowRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    ref,
    () => cursorFollowRef.current as HTMLDivElement,
  );
 
  const x = useMotionValue(0);
  const y = useMotionValue(0);
 
  const springX = useSpring(x, transition);
  const springY = useSpring(y, transition);
 
  const calculateOffset = React.useCallback(() => {
    const rect = cursorFollowRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;
 
    let newOffset;
 
    switch (align) {
      case 'center':
        newOffset = { x: width / 2, y: height / 2 };
        break;
      case 'top':
        newOffset = { x: width / 2, y: height + sideOffset };
        break;
      case 'top-left':
        newOffset = { x: width + sideOffset, y: height + sideOffset };
        break;
      case 'top-right':
        newOffset = { x: -sideOffset, y: height + sideOffset };
        break;
      case 'bottom':
        newOffset = { x: width / 2, y: -sideOffset };
        break;
      case 'bottom-left':
        newOffset = { x: width + sideOffset, y: -sideOffset };
        break;
      case 'bottom-right':
        newOffset = { x: -sideOffset, y: -sideOffset };
        break;
      case 'left':
        newOffset = { x: width + sideOffset, y: height / 2 };
        break;
      case 'right':
        newOffset = { x: -sideOffset, y: height / 2 };
        break;
      default:
        newOffset = { x: 0, y: 0 };
    }
 
    return newOffset;
  }, [align, sideOffset]);
 
  React.useEffect(() => {
    const offset = calculateOffset();
 
    const newX = cursorPos.x - offset.x;
    const newY = cursorPos.y - offset.y;
    
    // Initialize position immediately on first render to prevent fly-in
    if (x.get() === 0 && y.get() === 0) {
      x.jump(newX);
      y.jump(newY);
    } else {
      x.set(newX);
      y.set(newY);
    }
  }, [calculateOffset, cursorPos, x, y]);
 
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={cursorFollowRef}
          data-slot="cursor-follow"
          className={cn(
            'pointer-events-none z-[9998] absolute -translate-x-1/2 -translate-y-1/2',
            className,
          )}
          style={{ top: springY, left: springX, ...style }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
 
export {
  CursorProvider,
  Cursor,
  CursorFollow,
  useCursor,
  type CursorContextType,
  type CursorProviderProps,
  type CursorProps,
  type CursorFollowProps,
};