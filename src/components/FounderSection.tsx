import { motion, useInView } from "motion/react";
import { useRef } from "react";
import chrisImage from "../assets/chris.webp";

export default function FounderSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

    return (
        <section ref={sectionRef} className="w-full flex justify-center">
            <motion.div 
                className="flex flex-col items-center text-center p-8 md:p-12 bg-white/90 backdrop-blur-sm rounded-[24px] border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group max-w-lg"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: isInView ? 0 : 60, opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: isInView ? 0.3 : 0, ease: "easeOut" }}
            >
                {/* Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#8614ff] to-[#d5adff] p-1 mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                            src={chrisImage}
                            alt="Chris Campbell, Founder of YGBVerse"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                
                {/* Header */}
                <div className="mb-4">
                    <h2 className="font-['Nunito:Regular',_sans-serif] font-normal text-[#8614ff] text-[14px] md:text-[16px] tracking-wide uppercase mb-2">
                        Meet Our Founder
                    </h2>
                    <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-[24px] md:text-[28px] text-[#4c1d95] mb-2">
                        Chris Campbell
                    </h3>
                    <div className="font-['Nunito:Medium',_sans-serif] font-medium text-[14px] md:text-[16px] text-[#8614ff] mb-4 px-3 py-1 bg-[#8614ff]/10 rounded-[12px] inline-block">
                        We Build Culture To Change The World
                    </div>
                </div>
                
                {/* Bio */}
                <div className="space-y-4">
                    <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[14px] md:text-[16px] text-[#737992] leading-relaxed">
                        Born with a passion for innovation and organizational excellence, Chris Campbell has dedicated his career to empowering teams and transforming businesses through technology and culture.
                    </p>
                    <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[14px] md:text-[16px] text-[#737992] leading-relaxed">
                        As an experienced Technology Project/Program Manager & Agile Leader, Chris has spent 15 years mastering the art of building high-performing teams. With over 300 teams built and $2 billion in successful project delivery across various industries, his approach goes beyond traditional project management.
                    </p>
                    <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[14px] md:text-[16px] text-[#737992] leading-relaxed">
                        Today, Chris continues his mission through YGBVerse, bringing his servant leadership philosophy and culture-building expertise to revolutionize STEM education, one transformative experience at a time.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}