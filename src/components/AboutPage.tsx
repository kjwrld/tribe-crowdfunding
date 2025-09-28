import VerticalHero from "./VerticalHero";
import RepresentationSection from "./RepresentationSection";
import OurTeamSection from "./OurTeamSection";

interface AboutPageProps {
  onNavigate?: (page: "home" | "about" | "explore" | "crowdfunding") => void;
  onConfetti?: (position: { x: number; y: number }) => void;
}

export default function AboutPage({ onNavigate, onConfetti }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#ffffff] to-[#f0f4ff]">
      {/* Subtle background elements */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(134, 20, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(134, 20, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Corner HUD Elements */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#8614ff]/30 opacity-60" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#8614ff]/30 opacity-60" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#8614ff]/30 opacity-60" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#8614ff]/30 opacity-60" />
        
        {/* Holographic Glow */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(134, 20, 255, 0.2) 0%, transparent 50%)',
            animation: 'holo-pulse 6s ease-in-out infinite'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes holo-pulse {
          0%, 100% { opacity: 0.02; transform: scale(1); }
          50% { opacity: 0.05; transform: scale(1.1); }
        }
      `}</style>

      {/* Main content with relative z-index */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="content-stretch flex flex-col gap-[60px] md:gap-[80px] items-start justify-start relative size-full">
            <VerticalHero />
            <RepresentationSection />
            <OurTeamSection />
          </div>
        </div>
      </div>
    </div>
  );
}