import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { DonationDialog } from './DonationDialog';
import { R3FRocketModel } from './R3FRocketModel';

const rocketImageUrl = "https://images.unsplash.com/photo-1720214658819-2676e74b4c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2glMjBzcGFjZXxlbnwxfHx8fDE3NTg1OTg5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface ExploreHeroProps {
  onNavigate?: (page: "home" | "about" | "explore" | "crowdfunding") => void;
  onConfetti?: (position: { x: number; y: number }) => void;
}

function ExploreHeroTitle() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10%" });
  const [animateSupercharged, setAnimateSupercharged] = useState(false);

  useEffect(() => {
    if (titleInView && !animateSupercharged) {
      // Trigger the chroma animation after the slide-up animation completes
      const timer = setTimeout(() => {
        setAnimateSupercharged(true);
      }, 1000); // Delay to let slide-up complete (0.8s + 0.2s buffer)
      return () => clearTimeout(timer);
    }
  }, [titleInView, animateSupercharged]);
  
  return (
    <div ref={titleRef} className="content-stretch flex flex-col gap-[12px] items-center lg:items-start text-center lg:text-left leading-[0] relative w-full">
      <motion.div 
        className="font-['Nunito:Bold',_sans-serif] font-bold relative text-[#d5adff] leading-tight overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: titleInView ? 1 : 0 }}
      >
        <div className="mb-0 text-[38px] md:text-[48px] lg:text-[58px] xl:text-[68px] leading-[1.1]">
          {/* Single line: "STEM, but Supercharged." */}
          {/* First line: "STEM, but" */}
          <div className="block text-[rgba(255,255,255,1)]">
            <motion.span
              className=""
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: titleInView ? 0 : 100, 
                opacity: titleInView ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: titleInView ? 0 : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              STEM,
            </motion.span>
            <motion.span
              className=""
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: titleInView ? 0 : 100, 
                opacity: titleInView ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: titleInView ? 0.2 : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ display: 'inline-block' }}
            >
              but
            </motion.span>
          </div>
          
          {/* Second line: "Supercharged." */}
          <div className="block">
            <motion.span
              className={`chroma-text-supercharged ${animateSupercharged ? 'chroma-text-supercharged-animate' : ''}`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: titleInView ? 0 : 100, 
                opacity: titleInView ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: titleInView ? 0.4 : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ display: 'inline-block' }}
            >
              Supercharged.
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ExploreHeroSubtitle() {
  const subtitleRef = useRef(null);
  const subtitleInView = useInView(subtitleRef, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={subtitleRef}
      className="font-['Nunito:Regular',_sans-serif] font-normal text-white text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed max-w-[500px] text-center lg:text-left"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: subtitleInView ? 0 : 30, opacity: subtitleInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: subtitleInView ? 0.6 : 0, ease: "easeOut" }}
    >
      NGSS-aligned learning, powered by heroes who reflect every child's identity and potential.
    </motion.div>
  );
}

function ExploreHeroButtons({ onNavigate, onConfetti }: { onNavigate?: (page: "home" | "about" | "explore" | "crowdfunding") => void; onConfetti?: (position: { x: number; y: number }) => void }) {
  const buttonsRef = useRef(null);
  const buttonsInView = useInView(buttonsRef, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={buttonsRef}
      className="flex items-center justify-center lg:items-start lg:justify-start w-full lg:w-auto"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: buttonsInView ? 0 : 40, opacity: buttonsInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: buttonsInView ? 0.8 : 0, ease: "easeOut" }}
    >
      {/* Premium Gradient "Make Impact" Button with Donation Modal */}
      <DonationDialog onConfetti={onConfetti} darkMode={true}>
        <button className="relative group bg-gradient-to-r from-[#d1d5db] via-[#f9fafb] to-[#d1d5db] hover:from-[#e5e7eb] hover:via-[#ffffff] hover:to-[#e5e7eb] transition-all duration-300 h-[56px] rounded-[16px] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 px-8 min-w-[240px] overflow-hidden">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-[#4e1d97] text-[16px]">
            Make Impact
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 text-[#4e1d97] group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </DonationDialog>
    </motion.div>
  );
}

function RocketCanvas() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* R3F Rocket Canvas with Full Features */}
      <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] max-w-[400px] lg:max-w-[500px] rounded-[24px] overflow-hidden">
        <R3FRocketModel className="w-full h-full" />
      </div>
      
      {/* Floating particles - keeping the space aesthetic */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-3 h-3 bg-[#8614ff] rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-[30%] right-[15%] w-2 h-2 bg-[#d5adff] rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-[60%] left-[20%] w-1.5 h-1.5 bg-[#6ee7db] rounded-full"
        animate={{
          y: [0, -25, 0],
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  );
}

export function ExploreHero({ onNavigate, onConfetti }: ExploreHeroProps) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 py-16 lg:py-20 overflow-hidden">
      {/* Futuristic HUD Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
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
        
        {/* Corner HUD Elements - White */}
        <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/30 opacity-60" />
        <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/30 opacity-60" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-white/30 opacity-60" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/30 opacity-60" />
        
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
      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile/Tablet layout: Image above, text/buttons below */}
        <div className="lg:hidden flex flex-col items-center justify-center gap-12 text-center">
          {/* 3D Rocket Canvas */}
          <div className="w-full max-w-[400px] h-[350px] md:h-[400px]">
            <RocketCanvas />
          </div>
          
          {/* Text and buttons section */}
          <div className="w-full max-w-[600px] flex flex-col gap-8 items-center justify-center text-center mx-auto">
            <ExploreHeroTitle />
            <ExploreHeroSubtitle />
            <ExploreHeroButtons onNavigate={onNavigate} onConfetti={onConfetti} />
          </div>
        </div>
        
        {/* Desktop layout: Side by side */}
        <div className="hidden lg:flex items-center justify-between gap-6 xl:gap-8 max-w-5xl mx-auto">
          {/* Left side - Text Content */}
          <div className="flex-1 max-w-[600px] flex flex-col gap-8 items-start">
            <ExploreHeroTitle />
            <ExploreHeroSubtitle />
            <ExploreHeroButtons onNavigate={onNavigate} onConfetti={onConfetti} />
          </div>
          
          {/* Right side - 3D Rocket Canvas */}
          <div className="flex-1 max-w-[600px] h-[500px] xl:h-[550px]">
            <RocketCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}