import svgPaths from "../imports/svg-hok9021ayf";
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import TribeCardStack from './TribeCardStack';

function OurPurposePill() {
  return (
    <div className="bg-white border border-[#e0daef] rounded-[16px] px-3 py-2 flex items-center gap-[8px]">
      <GraduationCap size={12} className="text-[#8614ff]" />
      <span className="text-[#4c1d95] font-['Nunito:Bold',_sans-serif] font-bold text-[14px]">Our Purpose</span>
    </div>
  );
}

function InterfaceLeaderboard() {
  return (
    <div className="h-[31.25px] relative shrink-0 w-[30px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32">
        <g clipPath="url(#clip0_1_278)" id="interface/Leaderboard">
          <path d={svgPaths.p16ebeb00} fill="var(--fill-0, #737992)" id="Union" />
        </g>
        <defs>
          <clipPath id="clip0_1_278">
            <rect fill="white" height="31.25" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InterfaceBadge() {
  return (
    <div className="h-[31.25px] relative shrink-0 w-[30px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32">
        <g id="interface/Badge">
          <path d={svgPaths.p1fa13a00} fill="var(--fill-0, #737992)" id="Vector" />
          <path d={svgPaths.p15959000} fill="var(--fill-0, #737992)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

export default function RepresentationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full py-[80px] px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-[40px] lg:gap-[60px] items-center">
          {/* Mobile: Cards on top, Desktop: Cards on left */}
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-center lg:items-start justify-center w-full max-w-[1200px]">
            {/* Tribe Card Stack */}
            <motion.div 
              className="w-full lg:w-[380px] h-[450px] lg:h-[500px] shrink-0 order-1 lg:order-1 flex justify-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: isInView ? 0 : -50, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <TribeCardStack />
            </motion.div>

            {/* Content */}
            <motion.div 
              className="flex flex-col items-center lg:items-start gap-[40px] flex-1 order-2 lg:order-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Pill */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: isInView ? 0 : -30, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: isInView ? 0.2 : 0, ease: "easeOut" }}
              >
                <OurPurposePill />
              </motion.div>

              {/* Title */}
              <motion.div 
                className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative text-[#a047ff] text-center lg:text-left"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: isInView ? 0.4 : 0, ease: "easeOut" }}
              >
                <h2 className="font-['Nunito:Bold',_sans-serif] font-bold leading-[51px] mb-0 text-[28px] lg:text-[34px]">
                  Representation that powers{" "}
                </h2>
                <h2 className="font-['Nunito:Bold',_sans-serif] font-bold leading-[51px] text-[28px] lg:text-[34px]">
                  the future of<span className="text-[#8614ff]"> STEM.</span>
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="font-['Nunito:Regular',_sans-serif] font-normal text-[#737992] text-[16px] lg:text-[18px] leading-[27px] max-w-[600px] text-center lg:text-left"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: isInView ? 0.6 : 0, ease: "easeOut" }}
              >
                The YGBverse was created to inspire and motivate kids from all walks of life to explore the wonders of STEM+.
              </motion.p>

              {/* Bullet Points */}
              <motion.div 
                className="flex flex-col gap-[24px] w-full max-w-[600px]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: isInView ? 0.8 : 0, ease: "easeOut" }}
              >
                {/* First bullet point */}
                <div className="flex gap-[16px] items-start">
                  <div className="flex items-center justify-center w-[60px] h-[49px] shrink-0">
                    <InterfaceLeaderboard />
                  </div>
                  <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#737992] text-[14px] leading-[24px] flex-1">
                    Schools, Teachers and Parents use our platform for developing personalized STEM skills and achieving proficiency standards through immersive game-based learning with cross-cultural exchange and relevancy.
                  </p>
                </div>

                {/* Second bullet point */}
                <div className="flex gap-[16px] items-start">
                  <div className="flex items-center justify-center w-[60px] h-[49px] shrink-0">
                    <InterfaceBadge />
                  </div>
                  <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#737992] text-[14px] leading-[24px] flex-1">
                    A place where kids feel seen, celebrated, and empowered to dream big.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}