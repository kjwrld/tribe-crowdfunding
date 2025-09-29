import { ImageWithFallback } from './components/figma/ImageWithFallback';
import svgPaths from "./imports/svg-h5pr0nqnbp";
import lightningPaths from "./imports/svg-l6jo3f130c";
import whySvgPaths from "./imports/svg-77dqz9ziks";
import solutionSvgPaths from "./imports/svg-u6n8qa4seb";
import buttonSvgPaths from "./imports/svg-5yrfzz9814";
import imgLaughing1 from "./assets/19dbf2dbedb00b9e97d44bc39a5ca3e1cbafd48e.png";
import imgEmpowerHero from "./assets/8d5a368abcc2f3aae0405a99719edc7142e70ae2.png";
import imgJadeCharacter from "./assets/3a8603163d49c6cc36d717f3c233ef19737140e8.png";
import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { useMailchimp } from './hooks/useMailchimp';
import { validateContactForm, getFieldError, type FieldError } from './utils/validation';
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Status, StatusIndicator, StatusLabel } from "./components/ui/status";
import { ArrowRight, Mail } from "lucide-react";
import { DonationDialog } from "./components/DonationDialog";
import { ResponsiveNav } from "./components/ResponsiveNav";
import { GlassmorphicFooter } from "./components/GlassmorphicFooter";
import { Explore } from "./components/Explore";
import { ImpactSection } from "./components/ImpactSection";
import AboutPage from "./components/AboutPage";
import { PaymentSuccess } from "./components/PaymentSuccess";

// Responsive Hero Title Component with Text Reveal Animation
function Frame61858() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10%" });
  const [animateCulture, setAnimateCulture] = useState(false);

  const words = ["Bringing", "CULTURE", "to", "STEM"];

  useEffect(() => {
    if (titleInView && !animateCulture) {
      // Trigger the chroma animation after the slide-up animation completes
      const timer = setTimeout(() => {
        setAnimateCulture(true);
      }, 1000); // Delay to let slide-up complete (0.8s + 0.2s buffer)
      return () => clearTimeout(timer);
    }
  }, [titleInView, animateCulture]);
  
  return (
    <div ref={titleRef} className="content-stretch flex flex-col gap-[7px] items-center text-center leading-[0] relative w-full">
      <div className="font-['Nunito:Bold',_sans-serif] font-bold relative text-[#d5adff] leading-tight overflow-hidden">
        <motion.div 
          className="mb-0 text-[42px] md:text-[50px] lg:text-[58px] leading-[1.1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: titleInView ? 1 : 0 }}
        >
          {/* First line: "Bringing CULTURE" */}
          <div className="whitespace-nowrap text-[rgba(160,71,255,1)]">
            <motion.span
              className="text-[#4C1D95]"
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
              Bring
            </motion.span>
            <motion.span
              className={`chroma-text-culture ${animateCulture ? 'chroma-text-culture-animate' : ''}`}
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
              CULTURE
            </motion.span>
          </div>
          
          {/* Second line: "to STEM" */}
          <div className="block">
            <motion.span
              className="text-[#4C1D95]"
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
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              to
            </motion.span>
            <motion.span
              className="text-[#4C1D95]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: titleInView ? 0 : 100, 
                opacity: titleInView ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: titleInView ? 0.6 : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ display: 'inline-block' }}
            >
              STEM
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FormHeroBanner({ onConfetti }: { onConfetti?: (position: { x: number; y: number }) => void }) {
  const [donationAmount, setDonationAmount] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mobileContainerRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const mobileContainerInView = useInView(mobileContainerRef, { once: true, margin: "-10%" });
  const desktopContainerInView = useInView(desktopContainerRef, { once: true, margin: "-10%" });

  // Track if donation input has content for conditional animation
  const isDonationInputFilled = donationAmount && donationAmount.trim() !== '';

  const handleDonation = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    
    // Validate amount
    const amount = parseFloat(donationAmount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get button position for confetti origin
      const rect = e.currentTarget.getBoundingClientRect();
      const buttonCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      
      // Trigger confetti immediately for instant feedback
      onConfetti?.(buttonCenter);
      
      // Call backend API to create Stripe checkout session
      const response = await fetch('http://localhost:3002/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          donationType: 'one-time',
          description: `YGBverse Make Impact Donation - $${amount}`,
          productId: 'one-time'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const session = await response.json();
      console.log('Checkout session created:', session);

      // Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('No checkout URL received from server');
      }
      
    } catch (error) {
      console.error('Donation error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 md:px-8 pt-[100px] md:pt-[120px] lg:pt-40 pb-8 max-w-7xl mx-auto w-full">
        {/* Mobile: Image first, then content below */}
        <div className="flex flex-col lg:hidden gap-0 items-center">
          {/* Mobile Image - Much larger and show full picture */}
          <div className="w-full max-w-[500px] h-[300px] relative rounded-[24px] md:rounded-[46.083px]">
            <div 
              className="w-full h-full" 
              style={{ 
                backgroundImage: `url('${imgLaughing1}')`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }} 
            />
          </div>
          
          {/* Mobile Content - All centered */}
          <div className="flex flex-col gap-[32px] items-center text-center relative w-full z-[2]">
            {/* Donation Module */}
            <motion.div 
              ref={mobileContainerRef}
              className="relative bg-white/90 backdrop-blur-sm rounded-[24px] p-8 w-full max-w-[480px]"
              initial={{ y: 60, opacity: 0 }}
              animate={{ 
                y: mobileContainerInView ? 0 : 60, 
                opacity: mobileContainerInView ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: mobileContainerInView ? 0.3 : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >

              {/* Animated Title - Centered */}
              <div className="flex justify-center mb-6">
                <Frame61858 />
              </div>

              {/* Header */}
              <div className="flex flex-col gap-4 items-center text-center mb-8">
                <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[16px] md:text-[18px] leading-relaxed max-w-[400px]">
                  Your pledge fuels access, equity, and joy in STEM education.
                </p>
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6">
                <div className="relative group">
                  {/* Conditional Animated Color-Shifting Glow Effect - Only when filled */}
                  {isDonationInputFilled && (
                    <div 
                      className="absolute inset-[-1px] rounded-[17px] pointer-events-none z-0 transition-all duration-300 group-hover:inset-[-2px]"
                      style={{
                        background: 'linear-gradient(45deg, rgba(134, 20, 255, 0.3), rgba(154, 82, 235, 0.3), rgba(255, 107, 122, 0.3), rgba(245, 230, 184, 0.3), rgba(34, 197, 94, 0.3), rgba(134, 20, 255, 0.3))',
                        backgroundSize: '200% 200%',
                        filter: 'blur(4px)',
                        animation: 'pulse-glow-shifting 3.5s ease-in-out infinite'
                      }}
                    />
                  )}
                  
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8614ff] text-[20px] font-['Nunito:Medium',_sans-serif] font-medium z-30">
                    $
                  </div>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    step="25"
                    className="relative z-10 w-full h-[64px] pl-10 pr-4 bg-white border-2 border-[#e5e7eb] rounded-[16px] text-[20px] font-['Nunito:Medium',_sans-serif] font-medium text-[#374151] focus:border-[#3e1c85] focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-700 text-sm font-['Nunito:Medium',_sans-serif] text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Make Impact Button - Direct Stripe Checkout */}
              <button 
                onClick={handleDonation}
                disabled={isLoading}
                className="relative group w-full bg-[#8614ff] hover:bg-[#7c3aed] disabled:bg-[#8614ff]/70 disabled:cursor-not-allowed transition-colors h-[56px] rounded-[16px] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 px-8 mb-6 overflow-hidden"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Button content */}
                {isLoading ? (
                  <>
                    <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
                      Creating checkout...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
                      Make Impact
                    </span>
                    <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px]">
                    Secure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px]">
                    Direct Impact
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Side by side layout */}
        <div className="hidden lg:flex content-stretch items-start relative size-full gap-6 lg:gap-8 xl:gap-12">
          {/* Left side - Form Content */}
          <div className="content-stretch flex flex-col gap-[32px] items-start relative self-stretch shrink-0 w-[493px] z-[2]">
            {/* Desktop Donation Module */}
            <motion.div 
              ref={desktopContainerRef}
              className="relative bg-white/90 backdrop-blur-sm rounded-[24px] p-8 w-full"
              initial={{ y: 60, opacity: 0 }}
              animate={{ 
                y: desktopContainerInView ? 0 : 60, 
                opacity: desktopContainerInView ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: desktopContainerInView ? 0.3 : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {/* Animated Title - Centered */}
              <div className="flex justify-center mb-6">
                <Frame61858 />
              </div>
              
              {/* Header */}
              <div className="flex flex-col gap-4 items-center text-center mb-8">
                <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[16px] md:text-[18px] leading-relaxed max-w-[400px]">
                  Your pledge fuels access, equity, and joy in STEM education.
                </p>
              </div>

              {/* Custom Amount Input */}
              <div className="mb-6">
                <div className="relative group">
                  {/* Conditional Animated Color-Shifting Glow Effect - Only when filled */}
                  {isDonationInputFilled && (
                    <div 
                      className="absolute inset-[-1px] rounded-[17px] pointer-events-none z-0 transition-all duration-300 group-hover:inset-[-2px]"
                      style={{
                        background: 'linear-gradient(45deg, rgba(134, 20, 255, 0.3), rgba(154, 82, 235, 0.3), rgba(255, 107, 122, 0.3), rgba(245, 230, 184, 0.3), rgba(34, 197, 94, 0.3), rgba(134, 20, 255, 0.3))',
                        backgroundSize: '200% 200%',
                        filter: 'blur(4px)',
                        animation: 'pulse-glow-shifting 3.5s ease-in-out infinite'
                      }}
                    />
                  )}
                  
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8614ff] text-[20px] font-['Nunito:Medium',_sans-serif] font-medium z-30">
                    $
                  </div>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    step="25"
                    className="relative z-10 w-full h-[64px] pl-10 pr-4 bg-white border-2 border-[#e5e7eb] rounded-[16px] text-[20px] font-['Nunito:Medium',_sans-serif] font-medium text-[#374151] focus:border-[#3e1c85] focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-red-700 text-sm font-['Nunito:Medium',_sans-serif] text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Make Impact Button - Direct Stripe Checkout */}
              <button
                onClick={handleDonation}
                disabled={isLoading}
                className="relative group w-full bg-[#8614ff] hover:bg-[#7c3aed] disabled:bg-[#8614ff]/70 disabled:cursor-not-allowed transition-colors h-[56px] rounded-[16px] shadow-lg flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Button content */}
                {isLoading ? (
                  <>
                    <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[18px]">
                      Creating checkout...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[18px]">
                      Make Impact
                    </span>
                    <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px]">
                    Secure
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px]">
                    Direct Impact
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Character Image */}
          <div className="box-border content-stretch flex gap-[10px] items-center px-[4px] py-0 relative shrink-0 w-[707px] z-[1]">
            <div 
              className="h-[517px] rounded-[46.083px] shrink-0 w-full max-w-[750px]" 
              style={{ 
                backgroundImage: `url('${imgLaughing1}')`, 
                backgroundPosition: 'center 80%',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }} 
            />
          </div>
        </div>
    </div>
  );
}

// Why It Matters Section (keeping existing logic)
function Title() {
  return (
    <div className="content-stretch flex gap-2.5 items-start justify-center relative shrink-0 w-full" data-name="Title">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[51px] text-[34px] whitespace-pre">
          <span>Why It </span>
          <span className="text-[#8614ff]">Matters</span>
        </p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-2.5 items-start justify-center relative shrink-0 w-full" data-name="Text">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[0px] text-center tracking-[0.36px] w-full">
        <p className="leading-[27px] text-[18px]">
          <span className="font-['Nunito:Bold',_sans-serif] font-bold tracking-[0.36px]">STEM</span>
          <span> isn't equally accessible or culturally relevant.</span>
        </p>
      </div>
    </div>
  );
}

function Frame61772() {
  return (
    <div className="content-stretch flex flex-col gap-1.5 items-center justify-start relative shrink-0 w-full">
      <Title />
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-6 items-center justify-start relative shrink-0 w-[470px]" data-name="Text">
      <Frame61772 />
    </div>
  );
}

function Frame61843({ isInView }: { isInView: boolean }) {
  return (
    <div className="h-[344px] md:h-[344px] sm:h-[250px] relative shrink-0 w-full max-w-[1088px] md:max-w-[1088px] sm:max-w-[350px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1088 344">
        <g id="Frame 61843">
          <motion.path 
            d={svgPaths.p2fce1d00} 
            id="Vector 4" 
            stroke="url(#paint0_linear_1_856)" 
            strokeLinecap="round" 
            strokeWidth="8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut", delay: isInView ? 0.5 : 0 }}
          />
          <motion.circle 
            cx="243" 
            cy="303" 
            fill="var(--fill-0, #DDC0FA)" 
            id="Ellipse 38" 
            r="10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: isInView ? 0.3 : 0 }}
          />
          <motion.circle 
            cx="536" 
            cy="226" 
            fill="var(--fill-0, #7F1EE5)" 
            id="Ellipse 37" 
            r="10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: isInView ? 0.8 : 0 }}
          />
          <motion.circle 
            cx="860" 
            cy="38" 
            fill="var(--fill-0, #CDA2F7)" 
            id="Ellipse 36" 
            r="10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: isInView ? 1.3 : 0 }}
          />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_856" x1="47.5" x2="1061" y1="170.713" y2="170.713">
            <stop stopColor="#C685FF" stopOpacity="0" />
            <stop offset="0.541385" stopColor="#6D00E0" />
            <stop offset="1" stopColor="#C685FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function CountingNumber({ target, isInView, delay = 0 }: { target: number; isInView: boolean; delay?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) {
      return;
    }

    const timer = setTimeout(() => {
      const duration = 1500; // 1.5 seconds
      const steps = 60; // 60 steps for smooth animation
      const increment = target / steps;
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          setHasAnimated(true);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, isInView, delay, hasAnimated]);

  return <span>{hasAnimated ? target : count}</span>;
}

function Frame61844({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-2.5 items-center justify-center leading-[0] left-[257px] md:left-[257px] sm:left-[20px] top-[162px] md:top-[162px] sm:top-[120px]">
      <div className="flex flex-col font-['Bungee:Regular',_sans-serif] justify-center min-w-full not-italic relative shrink-0 text-[#a047ff] text-[0px]" style={{ width: "min-content" }}>
        <p className="leading-[44px] md:leading-[44px] sm:leading-[32px]">
          <span className="text-[64px] md:text-[64px] sm:text-[32px] tracking-[-3.2px]">
            <CountingNumber target={1} isInView={isInView} delay={300} />
          </span>
          <span className="text-[65px] md:text-[65px] sm:text-[32px] tracking-[-3.25px]">%</span>
        </p>
      </div>
      <div className="flex flex-col font-['Nunito:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#8c92ab] text-[12px] md:text-[12px] sm:text-[10px] tracking-[0.12px] w-[156px] md:w-[156px] sm:w-[100px]">
        <p className="leading-[18px] md:leading-[18px] sm:leading-[14px]">of heroes in kids' books and games reflect students of color.</p>
      </div>
    </div>
  );
}

function Frame61845({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-2.5 items-center justify-center leading-[0] left-[612px] md:left-[612px] sm:left-[175px] top-[233px] md:top-[233px] sm:top-[170px]">
      <div className="flex flex-col font-['Bungee:Regular',_sans-serif] justify-center min-w-full not-italic relative shrink-0 text-[#a047ff] text-[64px] tracking-[-3.2px]" style={{ width: "min-content" }}>
        <p className="leading-[44px] md:leading-[44px] sm:leading-[32px]">
          <span className="text-[64px] md:text-[64px] sm:text-[32px]">
            <CountingNumber target={36} isInView={isInView} delay={800} />
          </span>
          <span className="text-[64px] md:text-[64px] sm:text-[32px]">%</span>
        </p>
      </div>
      <div className="flex flex-col font-['Nunito:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#8c92ab] text-[12px] md:text-[12px] sm:text-[10px] tracking-[0.12px] w-[156px] md:w-[156px] sm:w-[100px]">
        <p className="leading-[18px] md:leading-[18px] sm:leading-[14px]">of U.S. 4th graders are proficient in STEM.</p>
      </div>
    </div>
  );
}

function Frame61846({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-2.5 items-center justify-center leading-[0] left-[867px] md:left-[867px] sm:left-[280px] top-[74px] md:top-[74px] sm:top-[40px]">
      <div className="flex flex-col font-['Bungee:Regular',_sans-serif] justify-center min-w-full not-italic relative shrink-0 text-[#a047ff] text-[64px] tracking-[-3.2px]" style={{ width: "min-content" }}>
        <p className="leading-[44px] md:leading-[44px] sm:leading-[32px]">
          <span className="text-[64px] md:text-[64px] sm:text-[32px]">
            <CountingNumber target={55} isInView={isInView} delay={1300} />
          </span>
          <span className="text-[64px] md:text-[64px] sm:text-[32px]">%</span>
        </p>
      </div>
      <div className="flex flex-col font-['Nunito:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#8c92ab] text-[12px] md:text-[12px] sm:text-[10px] tracking-[0.12px] w-[156px] md:w-[156px] sm:w-[100px]">
        <p className="leading-[18px] md:leading-[18px] sm:leading-[14px]">of U.S. K–5 students are kids of color—but rarely see themselves in STEM content.</p>
      </div>
    </div>
  );
}

// Why It Matters Section Components
function WhyItMattersTitle({ isInView }: { isInView: boolean }) {
  const [animateMatters, setAnimateMatters] = useState(false);

  useEffect(() => {
    if (isInView && !animateMatters) {
      // Trigger the chroma animation after the title appears
      const timer = setTimeout(() => {
        setAnimateMatters(true);
      }, 600); // Delay to let the title settle
      return () => clearTimeout(timer);
    }
  }, [isInView, animateMatters]);

  return (
    <div className="content-stretch flex gap-2.5 items-start justify-center relative shrink-0 w-full">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[1.1] text-[48px] md:text-[56px] lg:text-[64px] whitespace-pre">
          <span>Why It </span>
          <span className={`chroma-text ${animateMatters ? 'chroma-text-animate' : ''}`}>Matters</span>
        </p>
      </div>
    </div>
  );
}

function WhyItMattersSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-2.5 items-start justify-center relative shrink-0 w-full">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[0px] text-center tracking-[0.36px] w-full">
        <p className="leading-[27px] text-[16px] md:text-[18px]">
          <span className="font-['Nunito:Bold',_sans-serif] font-bold tracking-[0.36px]">STEM</span>
          <span> isn't equally accessible or culturally relevant.</span>
        </p>
      </div>
    </div>
  );
}

function WhyItMattersHeader({ isInView }: { isInView: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-1.5 items-center justify-start relative shrink-0 w-full">
      <WhyItMattersTitle isInView={isInView} />
      <WhyItMattersSubtitle />
    </div>
  );
}

function AnimatedLineGraph({ isInView }: { isInView: boolean }) {
  return (
    <div className="h-[200px] md:h-[250px] lg:h-[300px] relative shrink-0 w-full max-w-[800px] mx-auto">
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1088 344">
        <g>
          {/* Animated Line Path */}
          <motion.path 
            d={svgPaths.p2fce1d00}
            stroke="url(#paint0_linear_why_matters)" 
            strokeLinecap="round" 
            strokeWidth="8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: isInView ? 0.3 : 0 }}
          />
          {/* Middle circle positioned correctly on the path (36% statistic) */}
          <motion.circle 
            cx="536" 
            cy="226" 
            fill="#7F1EE5" 
            r="10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: isInView ? 1.2 : 0 }}
          />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_why_matters" x1="47.5" x2="1061" y1="170.713" y2="170.713">
            <stop stopColor="#C685FF" stopOpacity="0" />
            <stop offset="0.541385" stopColor="#6D00E0" />
            <stop offset="1" stopColor="#C685FF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function CountingNumberWhyMatters({ target, isInView, delay = 0 }: { target: number; isInView: boolean; delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

    const timer = setTimeout(() => {
      const duration = 1200;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, isInView, delay]);

  return <span className="text-[rgba(133,22,254,1)]">{count}</span>;
}

function CenterStatistic({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-1.5 md:gap-2.5 items-start justify-start leading-[0] left-[58%] top-[75%] transform -translate-x-1/4 sm:left-[60%] sm:top-[78%] lg:left-[58%] lg:top-[75%]">
      <motion.div 
        className="flex flex-col font-['Bungee:Regular',_sans-serif] justify-center min-w-full not-italic relative shrink-0 text-[#a047ff] text-[0px]" 
        style={{ width: "min-content" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isInView ? 0 : 20, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, delay: isInView ? 1.0 : 0, ease: "easeOut" }}
      >
        <p className="leading-[36px] md:leading-[44px] lg:leading-[50px]">
          <span className="text-[36px] md:text-[48px] lg:text-[64px] xl:text-[72px] tracking-[-2px]">
            <CountingNumberWhyMatters target={36} isInView={isInView} delay={1000} />
          </span>
          <span className="text-[36px] md:text-[48px] lg:text-[64px] xl:text-[72px] tracking-[-2px] text-[rgba(133,22,254,1)]">%</span>
        </p>
      </motion.div>
      <motion.div 
        className="flex flex-col font-['Nunito:Regular',_sans-serif] font-normal justify-start relative shrink-0 text-[#8c92ab] text-[9px] md:text-[11px] lg:text-[12px] tracking-[0.12px] w-[100px] md:w-[120px] lg:w-[140px] text-left"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isInView ? 0 : 20, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, delay: isInView ? 2.4 : 0, ease: "easeOut" }}
      >
        <p className="leading-[14px] md:leading-[16px] lg:leading-[18px] text-[12px] text-left w-[160px] md:w-[170px] lg:w-[180px]">of U.S. 4th graders are proficient in STEM.</p>
      </motion.div>
    </div>
  );
}

function GraphWithStatistics({ isInView }: { isInView: boolean }) {
  return (
    <div className="content-stretch flex gap-[24px] h-[280px] md:h-[320px] lg:h-[360px] items-start justify-center relative shrink-0 w-full">
      <AnimatedLineGraph isInView={isInView} />
      <CenterStatistic isInView={isInView} />
    </div>
  );
}

function EyeIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 14">
        <g clipPath="url(#clip0_eye_icon)" id="eye_icon">
          <path d={whySvgPaths.p39204400} fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_eye_icon">
            <rect fill="white" height="14" width="22" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SeeTheSolutionButton() {
  return (
    <motion.button
      className="bg-[#782acb] hover:bg-[#6d25b3] transition-colors box-border content-stretch flex h-[65px] items-center justify-between px-[24px] py-[15px] relative rounded-[12px] shadow-[0px_10px_25px_rgba(120,42,203,0.3)] shrink-0 w-[237px]"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className="basis-0 box-border content-stretch flex grow h-[65px] items-center justify-between min-h-px min-w-px px-0 py-[15px] relative rounded-[12px] shrink-0">
        <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
          <p className="leading-[normal] whitespace-pre">See the Solution</p>
        </div>
        <EyeIcon />
      </div>
    </motion.button>
  );
}

function CulturalContextExplanation({ isInView }: { isInView: boolean }) {
  return (
    <motion.div 
      className="content-stretch flex flex-col gap-2.5 items-center justify-center relative shrink-0 w-full max-w-[600px] mt-8"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: isInView ? 2.4 : 0, ease: "easeOut" }}
    >
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[0px] text-center tracking-[0.36px] w-full">
        <motion.p 
          className="leading-[27px] text-[16px] md:text-[18px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isInView ? 0 : 20, opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: isInView ? 2.4 : 0, ease: "easeOut" }}
        >
          Imagine a world where every child sees themselves as the hero of their own STEM story. 
          <span className="font-['Nunito:Bold',_sans-serif] font-bold tracking-[0.36px]"> Representation is rocket fuel for innovation. </span>
        </motion.p>
      </div>
    </motion.div>
  );
}

function WhyItMattersSection() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section id="proficiency-section" ref={sectionRef} className="backdrop-blur-[11.5px] backdrop-filter relative rounded-[24px] w-full py-16 md:py-20">
      <div className="flex flex-col items-center relative w-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] md:gap-[50px] items-center px-[32px] relative w-full max-w-6xl">
          <motion.div
            className="content-stretch flex flex-col gap-[32px] md:gap-[40px] items-center relative shrink-0 w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: sectionInView ? 0 : 20, opacity: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: sectionInView ? 0 : 0, ease: "easeOut" }}
          >
            <div className="content-stretch flex flex-col gap-6 items-center justify-start relative shrink-0 w-full max-w-[470px]">
              <WhyItMattersHeader isInView={sectionInView} />
            </div>
            <GraphWithStatistics isInView={sectionInView} />
            <CulturalContextExplanation isInView={sectionInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Our Solution Section Components
function OurSolutionTitle({ isInView }: { isInView: boolean }) {
  const [animateSolution, setAnimateSolution] = useState(false);

  useEffect(() => {
    if (isInView && !animateSolution) {
      // Trigger the chroma animation after the title appears
      const timer = setTimeout(() => {
        setAnimateSolution(true);
      }, 600); // Delay to let the title settle
      return () => clearTimeout(timer);
    }
  }, [isInView, animateSolution]);

  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0 w-full">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[1.1] text-[48px] md:text-[56px] lg:text-[64px] whitespace-pre">
          <span>Our </span>
          <span className={`chroma-text ${animateSolution ? 'chroma-text-animate' : ''}`}>Solution</span>
        </p>
      </div>
    </div>
  );
}

function OurSolutionSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[18px] text-center tracking-[0.36px] w-full">
        <p className="leading-[27px]">
          Immersive quests. Diverse heroes. Fun science.
          <br aria-hidden="true" />
          Kids explore, experiment, and earn rewards while building real STEM skills.
        </p>
      </div>
    </div>
  );
}

function OurSolutionHeader({ isInView }: { isInView: boolean }) {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
      <OurSolutionTitle isInView={isInView} />
      <OurSolutionSubtitle />
    </div>
  );
}

function GameIcon() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.38px] h-[43.979px] items-center justify-center overflow-clip p-[3.19px] relative shrink-0 w-[42.107px]">
      <div className="relative shrink-0 size-[45.935px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g>
            <path d={solutionSvgPaths.p7114900} fill="#3C007A" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function WebIcon() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[56px] items-center justify-center overflow-clip p-[5px] relative shrink-0 w-[54px]">
      <div className="relative shrink-0 size-[72px]">
        <div className="absolute left-[12px] size-[50.05px] top-[9.81px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 51">
            <g clipPath="url(#clip0_31_586)">
              <path d={solutionSvgPaths.p118c5ac0} stroke="#3C007A" strokeMiterlimit="10" strokeWidth="4.16757" />
              <path d={solutionSvgPaths.p2ca46d80} stroke="#3C007A" strokeMiterlimit="10" strokeWidth="4.16757" />
              <path d="M25.0272 2.0838V47.9706" stroke="#3C007A" strokeMiterlimit="10" strokeWidth="4.16757" />
              <path d="M2.08389 25.0272H47.9707" stroke="#3C007A" strokeMiterlimit="10" strokeWidth="4.16757" />
              <path d={solutionSvgPaths.p2b0e7640} stroke="#3C007A" strokeMiterlimit="10" strokeWidth="4.16757" />
              <path d={solutionSvgPaths.p220c7380} stroke="#3C007A" strokeMiterlimit="10" strokeWidth="4.16757" />
            </g>
            <defs>
              <clipPath id="clip0_31_586">
                <rect fill="white" height="50.05" width="50.05" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function CommunityIcon() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[7.395px] h-[61.786px] items-center justify-center overflow-clip p-[3.697px] relative shrink-0 w-[59.157px]">
      <div className="relative shrink-0 size-[53.241px]">
        <div className="absolute h-[44.538px] left-[3.21px] top-[4.3px] w-[46.796px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47 45">
            <g clipPath="url(#clip0_31_575)">
              <path d={solutionSvgPaths.p7c62780} stroke="#D5ADFF" strokeMiterlimit="10" strokeWidth="4.43675" />
              <path d={solutionSvgPaths.p162f6080} stroke="#D5ADFF" strokeMiterlimit="10" strokeWidth="4.43675" />
              <path d={solutionSvgPaths.p1b46f40} stroke="#D5ADFF" strokeMiterlimit="10" strokeWidth="4.43675" />
              <path d={solutionSvgPaths.p3007bc00} fill="#5400AD" />
              <path d={solutionSvgPaths.p16b82d00} fill="#5400AD" />
              <path d={solutionSvgPaths.pc37d900} fill="#5400AD" />
              <path d={solutionSvgPaths.p3ce21180} fill="#5400AD" />
              <path d={solutionSvgPaths.p14a6bb40} fill="#5400AD" />
              <path d={solutionSvgPaths.p14705880} fill="#5400AD" />
            </g>
            <defs>
              <clipPath id="clip0_31_575">
                <rect fill="white" height="44.5376" width="46.7959" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SportsIcon() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[6.38px] h-[43.979px] items-center justify-center overflow-clip p-[3.19px] relative shrink-0 w-[42.107px]">
      <div className="relative shrink-0 size-[45.935px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
          <g>
            {/* Basketball body */}
            <circle cx="23" cy="23" r="18" fill="#3C007A" strokeWidth="1"/>
            {/* Horizontal center line */}
            <line x1="5" y1="23" x2="41" y2="23" stroke="white" strokeWidth="1.5"/>
            {/* Vertical center line */}
            <line x1="23" y1="5" x2="23" y2="41" stroke="white" strokeWidth="1.5"/>
            {/* Left curved line */}
            <path d="M 8 12 Q 16 23 8 34" fill="none" stroke="white" strokeWidth="1.5"/>
            {/* Right curved line */}
            <path d="M 38 12 Q 30 23 38 34" fill="none" stroke="white" strokeWidth="1.5"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, delay = 0, isInView, cardIndex = 0 }: { icon: React.ReactNode; title: string; delay?: number; isInView: boolean; cardIndex?: number }) {
  // Randomized animation delays for each card (0s, 0.7s, 1.4s, 2.1s)
  const animationDelay = cardIndex * 0.7;
  
  return (
    <motion.div 
      className="relative rounded-[24px] shrink-0 border border-gray-200 
                 bg-white shadow-sm
                 lg:frosted lg:shadow-lg lg:border-gray-300
                 lg:hover:shadow-2xl lg:hover:shadow-purple-500/10 
                 lg:hover:-translate-y-2 lg:hover:scale-[1.02]
                 lg:transition-all lg:duration-300 lg:ease-out"
      initial={{ y: 60, opacity: 0 }}
      animate={{ 
        y: isInView ? 0 : 60, 
        opacity: isInView ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        delay: isInView ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Randomized Color-Shifting Background Glow Effect */}
      <div 
        className="absolute inset-[-1px] rounded-[25px] pointer-events-none z-0 opacity-15 lg:opacity-25"
        style={{
          background: 'linear-gradient(45deg, rgba(134, 20, 255, 0.06), rgba(154, 82, 235, 0.06), rgba(255, 107, 122, 0.06), rgba(245, 230, 184, 0.06), rgba(34, 197, 94, 0.06), rgba(134, 20, 255, 0.06))',
          backgroundSize: '200% 200%',
          filter: 'blur(8px)',
          animation: `pulse-glow-shifting 4s ease-in-out infinite`,
          animationDelay: `${animationDelay}s`
        }}
      />

      {/* Desktop Only: Frosted Glass Filter Background */}
      <div className="hidden lg:block filter absolute inset-0 rounded-[24px] pointer-events-none z-1" />

      {/* Desktop Only: Frosted Glass Content Container */}
      <div className="lg:relative lg:z-10">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-full items-center justify-center overflow-clip p-[24px] relative z-10">
          <div className="content-stretch flex flex-col gap-[24px] items-center justify-center relative shrink-0 w-[141px]">
            {icon}
            <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#a047ff] text-[18px] text-center tracking-[0.36px]">
              <p className="leading-[20px] w-[140px] h-[40px] text-center flex items-center justify-center">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SolutionFeatureGrid({ isInView }: { isInView: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[31px] justify-center relative w-full max-w-[920px] mx-auto">
      {/* Connecting lines for desktop */}
      <div className="absolute h-0 left-[105px] top-[90px] w-[710px] hidden lg:block">
        <motion.div 
          className="absolute inset-[-1px_-0.15%]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: isInView ? 1.2 : 0, ease: "easeInOut" }}
          style={{ transformOrigin: 'left' }}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 712 2">
            <motion.path 
              d="M1 1H711" 
              stroke="#8614ff"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              initial={{ strokeDashoffset: 16 }}
              animate={{ 
                strokeDashoffset: isInView ? 0 : 16 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: isInView ? 2.7 : 0,
                repeatType: "loop"
              }}
            />
          </svg>
        </motion.div>
      </div>
      
      <div className="w-full h-[180px]">
        <FeatureCard 
          icon={<GameIcon />} 
          title="Immersive Gameplay" 
          delay={0.3}
          isInView={isInView}
          cardIndex={0}
        />
      </div>
      <div className="w-full h-[180px]">
        <FeatureCard 
          icon={<WebIcon />} 
          title="Cultural Relevance" 
          delay={0.5}
          isInView={isInView}
          cardIndex={1}
        />
      </div>
      <div className="w-full h-[180px]">
        <FeatureCard 
          icon={<CommunityIcon />} 
          title="Cross-Cultural Community" 
          delay={0.7}
          isInView={isInView}
          cardIndex={2}
        />
      </div>
      <div className="w-full h-[180px]">
        <FeatureCard 
          icon={<SportsIcon />} 
          title="Music + Sports Connections" 
          delay={0.9}
          isInView={isInView}
          cardIndex={3}
        />
      </div>
    </div>
  );
}

function ExploreButton({ isInView, onNavigate }: { isInView: boolean; onNavigate?: (page: "home" | "about" | "explore" | "crowdfunding") => void }) {
  return (
    <motion.button
      onClick={() => onNavigate?.('explore')}
      className="relative group bg-[#8614ff] hover:bg-[#7c3aed] transition-colors rounded-[12px] shadow-[0px_46px_13px_0px_rgba(134,20,255,0),0px_30px_12px_0px_rgba(134,20,255,0.01),0px_17px_10px_0px_rgba(134,20,255,0.05),0px_7px_7px_0px_rgba(134,20,255,0.09),0px_2px_4px_0px_rgba(134,20,255,0.1)] w-[237px] h-[65px] overflow-hidden"
      initial={{ y: 40, opacity: 0 }}
      animate={{ 
        y: isInView ? 0 : 40, 
        opacity: isInView ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        delay: isInView ? 1.3 : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      <div className="box-border content-stretch flex items-center justify-center gap-3 px-[24px] py-[15px] relative size-full z-10">
        <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
          <p className="leading-[normal] whitespace-pre">Explore Features</p>
        </div>
        <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[20px]">
          {/* Modern Gamepad Icon from Lucide */}
          <svg className="block size-full" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" x2="10" y1="11" y2="11"/>
            <line x1="8" x2="8" y1="9" y2="13"/>
            <line x1="15" x2="15.01" y1="12" y2="12"/>
            <line x1="18" x2="18.01" y1="10" y2="10"/>
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

function OurSolutionSection({ onNavigate }: { onNavigate?: (page: "home" | "about" | "explore" | "crowdfunding") => void }) {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section id="impact-section" ref={sectionRef} className="backdrop-blur-[11.5px] backdrop-filter relative rounded-[24px] w-full py-16 md:py-20">
      <div className="flex flex-col items-center relative w-full">
        <div className="box-border content-stretch flex flex-col gap-[56px] items-center px-[32px] relative w-full max-w-6xl">
          <motion.div
            className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: sectionInView ? 0 : 40, opacity: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: sectionInView ? 0.2 : 0, ease: "easeOut" }}
          >
            <OurSolutionHeader isInView={sectionInView} />
          </motion.div>
          
          <SolutionFeatureGrid isInView={sectionInView} />
          
          <ExploreButton isInView={sectionInView} onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  );
}

// Contact Form Section Components
function ContactFormLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[8px] sm:gap-[10px] items-center px-[12px] py-0 relative w-full">
          <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#5b6178] text-[0px] text-nowrap">
            <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[20px] sm:leading-[24px] text-[12px] sm:text-[13px] md:text-[14px] whitespace-pre">{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactFormInput({ label, placeholder, type = "text", rows, value, onChange, error }: { 
  label: string; 
  placeholder: string; 
  type?: string; 
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string | null;
}) {
  // Generate randomized animation timing for each input field
  const animationDuration = (3 + Math.random() * 2).toFixed(1); // Random between 3.0s and 5.0s
  const animationDelay = (Math.random() * 2).toFixed(1); // Random between 0.0s and 2.0s
  
  // Use controlled value or internal state as fallback
  const [internalValue, setInternalValue] = useState('');
  const inputValue = value !== undefined ? value : internalValue;
  const isInputFilled = inputValue && inputValue.trim() !== '';
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };
  
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[6px] sm:gap-[8px] grow min-h-px min-w-px relative rounded-[12px] sm:rounded-[15px] shrink-0">
      <ContactFormLabel>{label}:</ContactFormLabel>
      
      {/* Hero-Style Animated Border Container */}
      <div className="relative group">
        {/* Conditional Animated Color-Shifting Glow Effect - Only when filled */}
        {isInputFilled && (
          <div 
            className="absolute inset-[-1px] rounded-[13px] sm:rounded-[16px] pointer-events-none z-0 transition-all duration-300 group-hover:inset-[-2px]"
            style={{
              background: 'linear-gradient(45deg, rgba(134, 20, 255, 0.3), rgba(154, 82, 235, 0.3), rgba(255, 107, 122, 0.3), rgba(245, 230, 184, 0.3), rgba(34, 197, 94, 0.3), rgba(134, 20, 255, 0.3))',
              backgroundSize: '200% 200%',
              filter: 'blur(4px)',
              animation: `pulse-glow-shifting ${animationDuration}s ease-in-out infinite`,
              animationDelay: `${animationDelay}s`
            }}
          />
        )}
        
        {/* Input Container - Updated Border Color with Error State */}
        <div 
          className={`relative z-10 bg-white border-2 rounded-[12px] sm:rounded-[15px] shrink-0 w-full transition-all duration-300 shadow-lg hover:shadow-xl focus-within:shadow-2xl ${
            error 
              ? 'border-red-400 focus-within:border-red-500' 
              : 'border-[#e5e7eb] focus-within:border-[#3e1c85]'
          } ${rows ? '' : 'h-[52px] sm:h-[58px] md:h-[64px]'}`}
          style={rows ? { height: `${rows * 20 + 32}px` } : {}}
        >
          <div className="flex flex-row items-center relative size-full">
            <div 
              className={`box-border content-stretch flex items-center justify-between px-[12px] sm:px-[15px] py-[10px] sm:py-[12px] relative w-full ${
                rows ? '' : 'h-[52px] sm:h-[58px] md:h-[64px]'
              }`}
              style={rows ? { height: `${rows * 20 + 32}px` } : {}}
            >
              <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                {rows ? (
                  <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent border-none outline-none font-['Nunito:Medium',_sans-serif] font-medium text-[#374151] text-[14px] sm:text-[15px] md:text-[16px] placeholder:text-[#737992] resize-none focus:text-[#374151]"
                    placeholder={placeholder}
                    rows={rows}
                  />
                ) : (
                  <input
                    type={type}
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none outline-none font-['Nunito:Medium',_sans-serif] font-medium text-[#374151] text-[14px] sm:text-[15px] md:text-[16px] placeholder:text-[#737992] focus:text-[#374151]"
                    placeholder={placeholder}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 mt-2">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-600 text-sm font-['Nunito:Medium',_sans-serif] font-medium">
            {error}
          </span>
        </div>
      )}
    </div>
  );
}

function ContactFormTitle({ isInView }: { isInView: boolean }) {
  const words = ["We'd", "love", "to", "hear", "from", "you."];
  
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      {/* Reach Out Badge */}
      <motion.div 
        className="content-stretch flex gap-[10px] items-center justify-center px-[12px] py-[3px] relative rounded-[12px] shrink-0"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: isInView ? 0 : -30, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: isInView ? 0.2 : 0, ease: "easeOut" }}
      >
        <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#a047ff] text-[16px] text-center text-nowrap">
          <Status status="online" className="bg-white border border-[#e0daef] rounded-[16px] px-3 py-2">
            <StatusIndicator className="animate-[flicker_2s_ease-in-out_infinite]" />
            <StatusLabel className="text-[#4c1d95] font-['Nunito:Bold',_sans-serif] font-bold">Accepting Messages</StatusLabel>
          </Status>
        </div>
      </motion.div>
      
      {/* Animated Title */}
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#a047ff] text-[0px] text-nowrap tracking-[0.8px] sm:tracking-[1.02px] overflow-hidden">
        <motion.p 
          className="font-['Nunito:Bold',_sans-serif] font-bold leading-[36px] sm:leading-[42px] md:leading-[48px] lg:leading-[51px] text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] whitespace-pre"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: isInView ? 0 : 100, 
                opacity: isInView ? 1 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: isInView ? 0.4 + index * 0.1 : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{ display: 'inline-block', marginRight: word === "you." ? '0' : '0.3em' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
}

function ContactFormSubtitle({ isInView }: { isInView: boolean }) {
  return (
    <motion.div 
      className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] w-full relative shrink-0 text-[#737992] text-[14px] sm:text-[16px] md:text-[18px] tracking-[0.28px] sm:tracking-[0.32px] md:tracking-[0.36px] text-center px-2" 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: isInView ? 1.2 : 0, ease: "easeOut" }}
    >
      <p className="leading-[20px] sm:leading-[24px] md:leading-[27px] max-w-[280px] sm:max-w-[400px] md:max-w-[500px] mx-auto">Be part of our journey! Get updates and opportunities to help us grow through our Facebook Group and Newsletter.</p>
    </motion.div>
  );
}

function ContactForm({ isInView }: { isInView: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
  };

  return (
    <motion.div 
      className="relative bg-white/90 backdrop-blur-sm border border-purple-200 rounded-[24px] p-8 w-full shadow-lg"
      initial={{ y: 60, opacity: 0 }}
      animate={{ 
        y: isInView ? 0 : 60, 
        opacity: isInView ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        delay: isInView ? 1.5 : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <span 
        className="absolute inset-[-2px] rounded-[24px] border-2 border-transparent pointer-events-none"
        style={{
          mask: 'linear-gradient(transparent, transparent), linear-gradient(white, white)',
          maskClip: 'padding-box, border-box',
          maskComposite: 'intersect'
        }}
      >
        <span 
          className="absolute w-[160px] h-[160px] opacity-100"
          style={{
            background: `
              radial-gradient(circle at right, rgba(134, 20, 255, 0.8), transparent 50%),
              radial-gradient(circle at right, #8614ff 50%, transparent)
            `,
            offsetPath: 'rect(0 100% 100% 0 round 24px)',
            offsetAnchor: '100% 50%',
            animation: 'glow-loop 8s infinite linear'
          }}
        />
      </span>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px] items-start justify-center relative">
        {/* Name and Email Row */}
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <ContactFormInput 
            label="Name" 
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleInputChange('name')}
            error={getFieldError(validationErrors, 'name')}
          />
          <ContactFormInput 
            label="Email Address" 
            placeholder="Your Email" 
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            error={getFieldError(validationErrors, 'email')}
          />
        </div>
        
        {/* Subject Row */}
        <div className="w-full">
          <ContactFormInput 
            label="Subject" 
            placeholder="Message Subject"
            value={formData.subject}
            onChange={handleInputChange('subject')}
            error={getFieldError(validationErrors, 'subject')}
          />
        </div>
        
        {/* Message Row */}
        <div className="w-full">
          <ContactFormInput 
            label="Message" 
            placeholder="Your Message" 
            rows={4}
            value={formData.message}
            onChange={handleInputChange('message')}
            error={getFieldError(validationErrors, 'message')}
          />
        </div>
        
        {/* Send Button - Matching Hero Style */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-[#8614ff] hover:bg-[#7c3aed] transition-colors h-[56px] rounded-[16px] shadow-lg flex items-center justify-center gap-2"
        >
          <span className="font-['Nunito:Medium',_sans-serif] font-medium text-white text-[18px]">
            Send Message
          </span>
          <Mail className="w-5 h-5 text-white" />
        </button>
      </form>
    </motion.div>
  );
}

function JadeCharacter({ isInView }: { isInView: boolean }) {
  return (
    <div className="flex items-center justify-center relative">
      <ImageWithFallback 
        src={imgJadeCharacter}
        alt="Jade Character Animated GIF" 
        className="w-full h-[300px] md:h-[400px] lg:h-[480px] max-w-[400px] lg:max-w-[420px] object-contain rounded-[24px] md:rounded-[46.083px] mx-auto"
        style={{ 
          imageRendering: 'auto'
        }}
      />
    </div>
  );
}

function ContactFormSection({ onConfetti }: { onConfetti?: (position: { x: number; y: number }) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<FieldError[]>([]);
  
  // Import the Mailchimp hook (we'll add this import at the top)
  const { subscribeToMailchimp, isLoading, error, clearError } = useMailchimp();
  const mobileContainerRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const mobileContainerInView = useInView(mobileContainerRef, { once: true, margin: "-10%" });
  const desktopContainerInView = useInView(desktopContainerRef, { once: true, margin: "-10%" });

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;
    
    // Clear previous messages
    setSuccessMessage('');
    clearError();
    setValidationErrors([]);
    
    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    try {
      // Submit to Mailchimp
      const result = await subscribeToMailchimp(formData);
      
      if (result.success) {
        // Get button position for confetti origin
        if (e.type === 'click') {
          const rect = (e.target as HTMLButtonElement).getBoundingClientRect();
          const buttonCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
          onConfetti?.(buttonCenter);
        }
        
        setSuccessMessage(result.message);
        
        // Clear form and validation errors after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setValidationErrors([]);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div id="contact-section" className="min-h-[85vh] flex items-center justify-center px-4 md:px-8 pt-8 pb-8 max-w-7xl mx-auto w-full">
      {/* Mobile: Character first, then content below */}
      <div className="flex flex-col lg:hidden gap-8 items-center">
        {/* Mobile Jade Character - Full visible like hero */}
        <div className="w-full max-w-[400px] h-[300px] relative rounded-[24px] md:rounded-[46.083px]">
          <JadeCharacter isInView={mobileContainerInView} />
        </div>
        
        {/* Mobile Content - All centered */}
        <div className="flex flex-col gap-[24px] sm:gap-[32px] items-center text-center relative w-full z-[2]">
          <div className="flex flex-col gap-[16px] sm:gap-[20px] items-center w-full px-2">
            <ContactFormTitle isInView={mobileContainerInView} />
            <ContactFormSubtitle isInView={mobileContainerInView} />
          </div>
          
          {/* Mobile Contact Form */}
          <motion.div 
            ref={mobileContainerRef}
            className="relative bg-white/90 backdrop-blur-sm rounded-[16px] sm:rounded-[24px] p-4 sm:p-6 md:p-8 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] mx-2"
            initial={{ y: 60, opacity: 0 }}
            animate={{ 
              y: mobileContainerInView ? 0 : 60, 
              opacity: mobileContainerInView ? 1 : 0 
            }}
            transition={{ 
              duration: 0.8, 
              delay: mobileContainerInView ? 0.3 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{
              animation: 'pulse-border-glow 2s ease-in-out infinite'
            }}
          >
            {/* Contact Form Content */}
            <div className="flex flex-col gap-3 sm:gap-4 items-center text-center mb-6 sm:mb-8">
              <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-[#4c1d95] text-[22px] sm:text-[26px] md:text-[32px] leading-tight px-2">
                Let's Connect & Collaborate
              </h3>
              <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed max-w-[280px] sm:max-w-[350px] md:max-w-[400px] px-2">
                Share your ideas, questions, or partnership opportunities with us.
              </p>
            </div>

            <form className="flex flex-col gap-[16px] sm:gap-[20px] items-start justify-center relative w-full">
              {/* Name Field */}
              <div className="w-full">
                <ContactFormInput 
                  label="Name" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={getFieldError(validationErrors, 'name')}
                />
              </div>
              
              {/* Email Field */}
              <div className="w-full">
                <ContactFormInput 
                  label="Email Address" 
                  placeholder="Your Email" 
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={getFieldError(validationErrors, 'email')}
                />
              </div>
              
              {/* Subject Field */}
              <div className="w-full">
                <ContactFormInput 
                  label="Subject" 
                  placeholder="Message Subject"
                  value={formData.subject}
                  onChange={handleInputChange('subject')}
                  error={getFieldError(validationErrors, 'subject')}
                />
              </div>
              
              {/* Message Field */}
              <div className="w-full">
                <ContactFormInput 
                  label="Message" 
                  placeholder="Your Message" 
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  error={getFieldError(validationErrors, 'message')}
                />
              </div>
              
              {/* Send Button - More responsive */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="relative group w-full bg-[#8614ff] hover:bg-[#7c3aed] disabled:bg-[#8614ff]/70 disabled:cursor-not-allowed transition-colors h-[48px] sm:h-[52px] md:h-[56px] rounded-[12px] sm:rounded-[16px] shadow-lg flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Button content */}
                {isLoading ? (
                  <>
                    <div className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px] sm:text-[17px] md:text-[18px]">
                      Sending...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px] sm:text-[17px] md:text-[18px]">
                      Send Message
                    </span>
                    <Mail className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </>
                )}
              </button>
            </form>

            {/* Success Message */}
            {successMessage && (
              <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-[12px] text-center">
                <p className="font-['Nunito:Medium',_sans-serif]">{successMessage}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-[12px] text-center">
                <p className="font-['Nunito:Medium',_sans-serif]">{error}</p>
              </div>
            )}

            {/* Trust Indicators - More responsive */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[12px] sm:text-[14px]">
                  Secure
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6ee7db' }}>
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[12px] sm:text-[14px]">
                  Fast Response
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop: Side by side layout */}
      <div className="hidden lg:flex content-stretch items-center relative w-full gap-16 px-8 lg:px-12">
        {/* Left side - Form Content */}
        <div className="content-stretch flex flex-col gap-[32px] items-start relative flex-1 max-w-[520px] z-[2]">
          <div className="flex flex-col gap-[20px] items-start w-full">
            <ContactFormTitle isInView={desktopContainerInView} />
            <ContactFormSubtitle isInView={desktopContainerInView} />
          </div>
          
          {/* Desktop Contact Form */}
          <motion.div 
            ref={desktopContainerRef}
            className="relative bg-white/90 backdrop-blur-sm rounded-[24px] p-8 w-full"
            initial={{ y: 60, opacity: 0 }}
            animate={{ 
              y: desktopContainerInView ? 0 : 60, 
              opacity: desktopContainerInView ? 1 : 0 
            }}
            transition={{ 
              duration: 0.8, 
              delay: desktopContainerInView ? 0.3 : 0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{
              animation: 'pulse-border-glow 2.5s ease-in-out infinite'
            }}
          >

            <form className="flex flex-col gap-[20px] items-start justify-center relative">
              {/* Name and Email Row */}
              <div className="flex gap-[16px] w-full">
                <ContactFormInput 
                  label="Name" 
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={getFieldError(validationErrors, 'name')}
                />
                <ContactFormInput 
                  label="Email Address" 
                  placeholder="Your Email" 
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={getFieldError(validationErrors, 'email')}
                />
              </div>
              
              {/* Subject Row */}
              <div className="w-full">
                <ContactFormInput 
                  label="Subject" 
                  placeholder="Message Subject"
                  value={formData.subject}
                  onChange={handleInputChange('subject')}
                  error={getFieldError(validationErrors, 'subject')}
                />
              </div>
              
              {/* Message Row */}
              <div className="w-full">
                <ContactFormInput 
                  label="Message" 
                  placeholder="Your Message" 
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  error={getFieldError(validationErrors, 'message')}
                />
              </div>
              
              {/* Send Button - Matching Hero Style */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="relative group w-full bg-[#8614ff] hover:bg-[#7c3aed] disabled:bg-[#8614ff]/70 disabled:cursor-not-allowed transition-colors h-[56px] rounded-[16px] shadow-lg flex items-center justify-center gap-2 overflow-hidden"
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Button content */}
                {isLoading ? (
                  <>
                    <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[18px]">
                      Sending...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[18px]">
                      Send Message
                    </span>
                    <Mail className="relative z-10 w-5 h-5 text-white" />
                  </>
                )}
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px]">
                  Secure
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6ee7db' }}>
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px]">
                  Fast Response
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right side - Jade Character - Perfectly Balanced */}
        <div className="content-stretch flex items-center justify-center relative flex-1 max-w-[520px]">
          <JadeCharacter isInView={desktopContainerInView} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "explore" | "crowdfunding">("home");
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // Check for payment success on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowPaymentSuccess(true);
    }
  }, []);

  const handleNavigate = (page: "home" | "about" | "explore" | "crowdfunding") => {
    setCurrentPage(page);
    // Scroll to top of page when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(`Navigating to ${page}`);
  };

  const handleConfetti = (position: { x: number; y: number }) => {
    setConfettiPosition(position);
    setTriggerConfetti(prev => !prev); // Toggle to trigger animation
  };

  const handleClosePaymentSuccess = () => {
    setShowPaymentSuccess(false);
  };

  // Render the appropriate page based on currentPage
  if (currentPage === "explore") {
    return (
      <div className="min-h-screen">
        {/* SVG Filter Definitions for Frosted Glass Effect */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <filter id="ice" x="-50%" y="-50%" width="200%" height="200%">
              {/* Frosted glass texture with noise */}
              <feTurbulence 
                baseFrequency="0.9" 
                numOctaves="4" 
                stitchTiles="stitch" 
                type="fractalNoise"
              />
              <feColorMatrix type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0.5 0.6 0.7 0.8 0.9 1"/>
              </feComponentTransfer>
              <feComposite in2="SourceGraphic" operator="multiply"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="SourceGraphic" operator="screen"/>
            </filter>
          </defs>
        </svg>

        {/* Responsive Navigation */}
        <ResponsiveNav 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onConfetti={handleConfetti}
        />
        
        {/* Explore Page */}
        <Explore onNavigate={handleNavigate} onConfetti={handleConfetti} />
      </div>
    );
  }

  if (currentPage === "about") {
    return (
      <div className="min-h-screen">
        {/* Responsive Navigation */}
        <ResponsiveNav 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onConfetti={handleConfetti}
        />
        
        {/* About Page */}
        <AboutPage onNavigate={handleNavigate} onConfetti={handleConfetti} />
        
        {/* Glassmorphic Footer */}
        <GlassmorphicFooter 
          onNavigate={handleNavigate}
        />
        
        {/* Confetti Canvas Overlay */}
        <ConfettiCanvas 
          trigger={triggerConfetti}
          buttonPosition={confettiPosition}
        />
      </div>
    );
  }

  // Default home page
  return (
    <div className="min-h-screen">
      {/* SVG Filter Definitions for Frosted Glass Effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="ice" x="-50%" y="-50%" width="200%" height="200%">
            {/* Frosted glass texture with noise */}
            <feTurbulence 
              baseFrequency="0.9" 
              numOctaves="4" 
              stitchTiles="stitch" 
              type="fractalNoise"
            />
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.5 0.6 0.7 0.8 0.9 1"/>
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="multiply"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="SourceGraphic" operator="screen"/>
          </filter>
        </defs>
      </svg>

      {/* Responsive Navigation */}
      <ResponsiveNav 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onConfetti={handleConfetti}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="content-stretch flex flex-col gap-[60px] md:gap-[80px] items-start justify-start relative size-full">
          <FormHeroBanner onConfetti={handleConfetti} />
          <WhyItMattersSection />
          <OurSolutionSection onNavigate={handleNavigate} />
          <ImpactSection onConfetti={handleConfetti} />
          <ContactFormSection onConfetti={handleConfetti} />
        </div>
      </div>
      
      {/* Glassmorphic Footer */}
      <GlassmorphicFooter 
        onNavigate={handleNavigate}
      />
      
      {/* Confetti Canvas Overlay */}
      <ConfettiCanvas 
        trigger={triggerConfetti}
        buttonPosition={confettiPosition}
      />
      
      {/* Payment Success Modal */}
      {showPaymentSuccess && (
        <PaymentSuccess onClose={handleClosePaymentSuccess} />
      )}
    </div>
  );
}