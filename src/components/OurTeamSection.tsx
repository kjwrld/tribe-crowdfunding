import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

function OurTeamTitle({ isInView }: { isInView: boolean }) {
  const [animateTeam, setAnimateTeam] = useState(false);

  useEffect(() => {
    if (isInView && !animateTeam) {
      // Trigger the chroma animation after the title appears
      const timer = setTimeout(() => {
        setAnimateTeam(true);
      }, 600); // Delay to let the title settle
      return () => clearTimeout(timer);
    }
  }, [isInView, animateTeam]);

  return (
    <div className="content-stretch flex gap-2.5 items-start justify-center relative shrink-0 w-full">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
        <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[1.1] text-[48px] md:text-[56px] lg:text-[64px] whitespace-pre">
          <span>Meet Our </span>
          <span className={`chroma-text ${animateTeam ? 'chroma-text-animate' : ''}`}>Team</span>
        </p>
      </div>
    </div>
  );
}

function OurTeamSubtitle() {
  return (
    <div className="content-stretch flex flex-col gap-2.5 items-start justify-center relative shrink-0 w-full">
      <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[0px] text-center tracking-[0.36px] w-full">
        <p className="leading-[27px] text-[16px] md:text-[18px] max-w-[600px] mx-auto">
          Passionate educators, technologists, and advocates working together to make STEM accessible for everyone.
        </p>
      </div>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  delay: number;
  isInView: boolean;
}

function TeamMemberCard({ name, role, bio, avatar, delay, isInView }: TeamMemberProps) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center p-6 bg-white/90 backdrop-blur-sm rounded-[24px] border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: isInView ? 0 : 60, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: isInView ? delay : 0, ease: "easeOut" }}
    >
      {/* Avatar */}
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#8614ff] to-[#d5adff] p-1 mb-6 group-hover:scale-105 transition-transform duration-300">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#8614ff] text-[24px] md:text-[32px] font-['Nunito:Bold',_sans-serif] font-bold">
          {avatar}
        </div>
      </div>
      
      {/* Name */}
      <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-[20px] md:text-[24px] text-[#4c1d95] mb-2">
        {name}
      </h3>
      
      {/* Role */}
      <div className="font-['Nunito:Medium',_sans-serif] font-medium text-[14px] md:text-[16px] text-[#8614ff] mb-4 px-3 py-1 bg-[#8614ff]/10 rounded-[12px]">
        {role}
      </div>
      
      {/* Bio */}
      <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[14px] md:text-[16px] text-[#737992] leading-relaxed">
        {bio}
      </p>
    </motion.div>
  );
}

function TeamGrid({ isInView }: { isInView: boolean }) {
  const teamMembers = [
    {
      name: "Chris Campbell",
      role: "Founder & CEO",
      bio: "Handles strategic vision and partnerships to make STEM education culturally relevant for all students.",
      avatar: "CC",
      delay: 0.3
    },
    {
      name: "Nicole Veintimilla",
      role: "Lead Designer",
      bio: "Handles visual design and user experience to create engaging, inclusive educational interfaces.",
      avatar: "NV",
      delay: 0.5
    },
    {
      name: "Emilia Burbano de Lara",
      role: "Lead Content Creator",
      bio: "Handles curriculum development and storytelling that connects diverse cultures with STEM learning.",
      avatar: "EB",
      delay: 0.7
    },
    {
      name: "Nihal Pimpale",
      role: "UI/UX Product Strategist",
      bio: "Handles product strategy and user research to ensure our platform meets real educational needs.",
      avatar: "NP",
      delay: 0.9
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
      {teamMembers.map((member, index) => (
        <TeamMemberCard 
          key={index}
          {...member}
          isInView={isInView}
        />
      ))}
    </div>
  );
}

function GetInTouchSection({ isInView }: { isInView: boolean }) {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto text-center"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: isInView ? 0 : 30, opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.8, delay: isInView ? 1.2 : 0, ease: "easeOut" }}
    >
      <div className="relative bg-white/90 backdrop-blur-sm rounded-[24px] p-8 md:p-12 overflow-hidden">
        {/* Chroma Glow Background Effect */}
        <div 
          className="absolute inset-[-2px] rounded-[26px] pointer-events-none z-0"
          style={{
            background: 'linear-gradient(45deg, rgba(134, 20, 255, 0.4), rgba(154, 82, 235, 0.4), rgba(255, 107, 122, 0.4), rgba(245, 230, 184, 0.4), rgba(34, 197, 94, 0.4), rgba(134, 20, 255, 0.4))',
            backgroundSize: '200% 200%',
            filter: 'blur(8px)',
            animation: 'pulse-glow-shifting 4s ease-in-out infinite'
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-10">
        <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-[24px] md:text-[28px] text-[#4c1d95] mb-4">
          Ready to Connect?
        </h3>
        <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[16px] md:text-[18px] text-[#737992] leading-relaxed mb-8">
          We'd love to hear from you! Whether you're an educator, parent, or potential partner, 
          let's collaborate to bring more culture and representation to STEM education.
        </p>
        
        {/* Get in Touch Button - Homepage Style */}
        <button 
          onClick={scrollToContact}
          className="relative group bg-[#8614ff] hover:bg-[#7c3aed] transition-colors h-[56px] rounded-[16px] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 px-8 mx-auto overflow-hidden"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
            Get in Touch
          </span>
          <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-200" />
        </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurTeamSection() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section id="team-section" ref={sectionRef} className="backdrop-blur-[11.5px] backdrop-filter relative rounded-[24px] w-full py-16 md:py-20">
      <div className="flex flex-col items-center relative w-full">
        <div className="box-border content-stretch flex flex-col gap-[56px] items-center px-[32px] relative w-full max-w-6xl">
          {/* Header */}
          <motion.div
            className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: sectionInView ? 0 : 40, opacity: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: sectionInView ? 0.2 : 0, ease: "easeOut" }}
          >
            <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
              <OurTeamTitle isInView={sectionInView} />
              <OurTeamSubtitle />
            </div>
          </motion.div>
          
          {/* Team Grid */}
          <TeamGrid isInView={sectionInView} />
          
          {/* Get in Touch Section */}
          <GetInTouchSection isInView={sectionInView} />
        </div>
      </div>
    </section>
  );
}