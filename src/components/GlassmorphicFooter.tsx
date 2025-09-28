import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Heart,
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: "home" | "about" | "crowdfunding") => void;
}

function FooterSection({ 
  title, 
  children, 
  delay = 0, 
  isInView 
}: { 
  title: string; 
  children: React.ReactNode; 
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, delay: isInView ? delay : 0, ease: "easeOut" }}
    >
      <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] tracking-wide uppercase">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </motion.div>
  );
}

function FooterLink({ 
  href, 
  onClick, 
  children, 
  external = false 
}: { 
  href?: string; 
  onClick?: () => void; 
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="font-['Nunito:Regular',_sans-serif] font-normal text-[#d5adff]/80 hover:text-white text-[14px] transition-colors cursor-pointer flex items-center gap-2 group w-fit"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {external && (
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.a>
  );
}

function SocialIcon({ 
  Icon, 
  href, 
  label, 
  delay = 0, 
  isInView 
}: { 
  Icon: any; 
  href: string; 
  label: string; 
  delay?: number;
  isInView: boolean;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      className="bg-white/10 backdrop-blur-sm hover:bg-[#8614ff]/30 border border-white/20 hover:border-[#8614ff]/50 rounded-[12px] p-3 transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.4, delay: isInView ? delay : 0, ease: "easeOut" }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-5 h-5 text-[#d5adff] group-hover:text-white transition-colors" />
    </motion.a>
  );
}

export function GlassmorphicFooter({ onNavigate }: FooterProps) {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });

  return (
    <footer 
      ref={footerRef}
      className="relative mt-16 md:mt-20 overflow-hidden"
    >
      {/* Glassmorphic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0033]/95 via-[#2d1b69]/90 to-[#0a0015]/95 backdrop-blur-[20px]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-[10%] w-32 h-32 bg-[#8614ff]/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[15%] w-24 h-24 bg-[#d5adff]/30 rounded-full blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 right-[5%] w-20 h-20 bg-[#8614ff]/15 rounded-full blur-lg"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            {/* Brand section */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#8614ff] rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[24px] tracking-wide">
                  YGBVerse
                </h2>
              </div>
              <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#d5adff]/80 text-[16px] leading-relaxed max-w-md">
                Reimagining STEM. 
                Every child deserves to see themselves as the hero of their learning journey.
              </p>
            </motion.div>
          </div>

          {/* Support & Connect */}
          <FooterSection title="Connect" isInView={isInView} delay={0.2}>
            <FooterLink onClick={() => onNavigate?.('crowdfunding')}>Support Our Mission</FooterLink>
            <FooterLink onClick={() => onNavigate?.('home')}>Contact Us</FooterLink>
            <FooterLink href="#" external>Partnership Opportunities</FooterLink>
            <FooterLink href="#" external>Press & Media</FooterLink>
          </FooterSection>
        </div>

        {/* Contact info & Social */}
        <motion.div
          className="border-t border-white/10 pt-8 space-y-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: isInView ? 0 : 40, opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >

          {/* Social Media & Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <SocialIcon Icon={Facebook} href="#" label="Facebook" delay={0.1} isInView={isInView} />
              <SocialIcon Icon={Twitter} href="#" label="Twitter" delay={0.15} isInView={isInView} />
              <SocialIcon Icon={Instagram} href="#" label="Instagram" delay={0.2} isInView={isInView} />
              <SocialIcon Icon={Linkedin} href="#" label="LinkedIn" delay={0.25} isInView={isInView} />
              <SocialIcon Icon={Youtube} href="#" label="YouTube" delay={0.3} isInView={isInView} />
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
              <div className="flex items-center gap-4 text-[13px] font-['Nunito:Regular',_sans-serif] font-normal text-[#d5adff]/60">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
              <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#d5adff]/60 text-[13px] flex items-center gap-2">
                © 2024 YGBVerse. Made with 
                <Heart className="w-3 h-3 fill-current text-[#8614ff]" /> 
                for the future of STEM.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8614ff]/50 to-transparent" />
    </footer>
  );
}