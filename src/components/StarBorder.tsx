import React from 'react';

interface StarBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const StarBorder: React.FC<StarBorderProps> = ({
  children,
  color = '#792bcb',
  speed = '4s',
  onClick,
  style,
  className = ''
}) => {
  return (
    <div
      className={`star-border-container ${className}`}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-block',
        borderRadius: '12px',
        padding: '8px 16px',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Animated border effect */}
      <div
        className="star-border-glow"
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '12px',
          padding: '2px',
          backgroundImage: `linear-gradient(45deg, ${color}, transparent, ${color})`,
          backgroundSize: '200% 200%',
          animation: `starBorderGlow ${speed} ease-in-out infinite`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};