import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Shield, TrendingUp, Users, Clock } from 'lucide-react';

const dashboardImageUrl = "https://images.unsplash.com/photo-1532377416656-e35d0e574765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODY3OTYxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  isInView: boolean;
}

function FeatureCard({ icon, title, description, delay = 0, isInView }: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[20px] hover:bg-white/10 hover:border-[#8614ff]/30 transition-all duration-300 group"
      initial={{ y: 40, opacity: 0 }}
      animate={{ 
        y: isInView ? 0 : 40, 
        opacity: isInView ? 1 : 0 
      }}
      transition={{ 
        duration: 0.8, 
        delay: isInView ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="w-12 h-12 bg-[#8614ff]/20 rounded-[12px] flex items-center justify-center group-hover:bg-[#8614ff]/30 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-[#a047ff] text-[18px] sm:text-[20px] leading-tight">
          {title}
        </h3>
        <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#d5adff] text-[14px] sm:text-[16px] leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function ExploreFamilies() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <div ref={sectionRef} className="w-full flex flex-col items-center gap-8 lg:gap-12 py-8 lg:py-12">
      {/* Title Section */}
      <motion.div 
        className="flex flex-col items-center gap-4 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: sectionInView ? 0 : 30, opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-['Nunito:Bold',_sans-serif] text-[#d5adff] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[59.044px] xl:text-[64px] font-bold leading-[28px] sm:leading-[36px] md:leading-[48px] lg:leading-[59.044px] xl:leading-[64px]">
          For Families
        </h2>
        <p className="font-['Nunito:Regular',_sans-serif] text-[#efe0ff] text-[16px] sm:text-[18px] leading-relaxed max-w-md">
          Affordable, Measurable and Safe.
        </p>
      </motion.div>

      {/* Content Section - Responsive Layout */}
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Mobile & Tablet: Vertical Stack */}
        <div className="lg:hidden flex flex-col gap-8">
          {/* Dashboard Image */}
          <motion.div 
            className="w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: sectionInView ? 1 : 0.9, 
              opacity: sectionInView ? 1 : 0 
            }}
            transition={{ duration: 0.8, delay: sectionInView ? 0.3 : 0, ease: "easeOut" }}
          >
            <div className="relative w-full h-[280px] sm:h-[360px] rounded-[20px] overflow-hidden group">
              <ImageWithFallback
                src={dashboardImageUrl}
                alt="Family dashboard showing screen time analytics, progress reports, and parental controls"
                className="w-full h-full object-cover rounded-[20px] group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8614ff]/20 via-transparent to-transparent rounded-[20px]" />
            </div>
          </motion.div>

          {/* Features Section for Mobile/Tablet */}
          <div className="w-full max-w-2xl mx-auto sm:max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6 text-[#8614ff]" />}
                title="Family Mode"
                description="Detailed screen time analytics, progress reports, and insights to help your family thrive"
                delay={0.5}
                isInView={sectionInView}
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-[#8614ff]" />}
                title="Safe & Simple"
                description="COPPA-compliant monitoring with intuitive dashboards designed for families"
                delay={0.7}
                isInView={sectionInView}
              />
            </div>
          </div>
        </div>

        {/* Desktop: Horizontal Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Dashboard Image - Left Side */}
          <motion.div 
            className="w-full"
            initial={{ x: -50, opacity: 0 }}
            animate={{ 
              x: sectionInView ? 0 : -50, 
              opacity: sectionInView ? 1 : 0 
            }}
            transition={{ duration: 0.8, delay: sectionInView ? 0.2 : 0, ease: "easeOut" }}
          >
            <div className="relative w-full h-[450px] xl:h-[500px] rounded-[24px] overflow-hidden group">
              <ImageWithFallback
                src={dashboardImageUrl}
                alt="Family dashboard showing screen time analytics, progress reports, and parental controls"
                className="w-full h-full object-cover rounded-[24px] group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8614ff]/20 via-transparent to-[#d5adff]/10 rounded-[24px]" />
              
              {/* Floating stats overlay */}
              <motion.div
                className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] px-4 py-3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: sectionInView ? 1 : 0, 
                  opacity: sectionInView ? 1 : 0 
                }}
                transition={{ duration: 0.6, delay: sectionInView ? 1 : 0, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-[12px] font-['Nunito:Medium',_sans-serif] font-medium">
                    Live Tracking
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Section - Right Side */}
          <motion.div 
            className="w-full flex flex-col gap-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ 
              x: sectionInView ? 0 : 50, 
              opacity: sectionInView ? 1 : 0 
            }}
            transition={{ duration: 0.8, delay: sectionInView ? 0.4 : 0, ease: "easeOut" }}
          >
            <div className="grid gap-6">
              <FeatureCard
                icon={<TrendingUp className="w-6 h-6 text-[#8614ff]" />}
                title="Family Mode"
                description="Detailed screen time analytics, progress reports, and insights to help your family thrive in the digital age"
                delay={0.6}
                isInView={sectionInView}
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-[#8614ff]" />}
                title="Safe & Simple"
                description="COPPA-compliant monitoring with intuitive dashboards designed specifically for families"
                delay={0.8}
                isInView={sectionInView}
              />
              <FeatureCard
                icon={<Users className="w-6 h-6 text-[#8614ff]" />}
                title="Multi-Child Support"
                description="Manage multiple children's progress with personalized profiles and individual tracking"
                delay={1.0}
                isInView={sectionInView}
              />
              <FeatureCard
                icon={<Clock className="w-6 h-6 text-[#8614ff]" />}
                title="Smart Scheduling"
                description="Set healthy learning schedules with built-in break reminders and time management tools"
                delay={1.2}
                isInView={sectionInView}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}