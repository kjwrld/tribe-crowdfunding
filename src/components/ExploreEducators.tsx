import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
    BarChart3,
    BookOpen,
    Trophy,
    Users,
    GraduationCap,
    Target,
} from "lucide-react";

interface EducatorCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
    isInView: boolean;
    cardIndex?: number;
}

function EducatorCard({
    icon,
    title,
    description,
    delay = 0,
    isInView,
    cardIndex = 0,
}: EducatorCardProps) {
    // Randomized animation delays for each card (0s, 0.7s, 1.4s, 2.1s)
    const animationDelay = cardIndex * 0.7;

    return (
        <motion.div
            className="relative rounded-[24px] shrink-0 border border-white/10
                 bg-black/20 backdrop-blur-sm shadow-lg
                 hover:bg-black/30 hover:border-[#8614ff]/30 hover:shadow-2xl hover:shadow-[#8614ff]/10 
                 hover:-translate-y-2 hover:scale-[1.02]
                 transition-all duration-300 ease-out group"
            initial={{ y: 60, opacity: 0 }}
            animate={{
                y: isInView ? 0 : 60,
                opacity: isInView ? 1 : 0,
            }}
            transition={{
                duration: 0.8,
                delay: isInView ? delay : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {/* Night Mode Glow Effect - Darker with Purple Accent */}
            <div
                className="absolute inset-[-1px] rounded-[25px] pointer-events-none z-0 opacity-30 group-hover:opacity-50"
                style={{
                    background:
                        "linear-gradient(45deg, rgba(134, 20, 255, 0.15), rgba(112, 226, 216, 0.1), rgba(46, 124, 255, 0.12), rgba(134, 20, 255, 0.15))",
                    backgroundSize: "200% 200%",
                    filter: "blur(12px)",
                    animation: `pulse-glow-shifting 5s ease-in-out infinite`,
                    animationDelay: `${animationDelay}s`,
                }}
            />

            {/* Night Mode Content Container */}
            <div className="relative z-10">
                <div className="box-border content-stretch flex flex-col gap-[24px] h-full items-center justify-center overflow-clip p-[24px] relative z-10">
                    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-[141px]">
                        <div className="box-border content-stretch flex flex-col gap-[6.38px] h-[43.979px] items-center justify-center overflow-clip p-[3.19px] relative shrink-0 w-[42.107px]">
                            <div className="relative shrink-0 size-[45px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {icon}
                            </div>
                        </div>
                        <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#d5adff] group-hover:text-[#8614ff] text-[18px] text-center tracking-[0.36px] transition-colors duration-300">
                            <p className="leading-[20px] w-[140px] text-center flex items-center justify-center min-h-[40px] text-[rgba(255,255,255,1)]">
                                {title}
                            </p>
                        </div>
                        <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#a0a8c0] group-hover:text-[#c4d0ff] text-[14px] text-center tracking-[0.28px] transition-colors duration-300">
                            <p className="leading-[18px] w-[140px] text-center">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function EducatorSolutionHeader({ isInView }: { isInView: boolean }) {
    const [animateEducators, setAnimateEducators] = useState(false);

    useEffect(() => {
        if (isInView && !animateEducators) {
            // Trigger the chroma animation after the title appears
            const timer = setTimeout(() => {
                setAnimateEducators(true);
            }, 600); // Delay to let the title settle
            return () => clearTimeout(timer);
        }
    }, [isInView, animateEducators]);

    return (
        <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex gap-2.5 items-start justify-center relative shrink-0 w-full">
                <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
                    <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[1.1] text-[48px] md:text-[56px] lg:text-[64px] whitespace-pre">
                        <span className="text-[rgba(255,255,255,1)]">For </span>
                        <span
                            className={`chroma-text-supercharged ${
                                animateEducators
                                    ? "chroma-text-supercharged-animate"
                                    : ""
                            }`}
                        >
                            Educators
                        </span>
                    </p>
                </div>
            </div>
            <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full">
                <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[18px] text-center tracking-[0.36px] w-full">
                    <p className="leading-[27px]">
                        Professional development meets cultural innovation.
                        <br aria-hidden="true" />
                        Transform your classroom with engaging, research-backed
                        STEM tools.
                    </p>
                </div>
            </div>
        </div>
    );
}

function EducatorFeatureGrid({ isInView }: { isInView: boolean }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[31px] justify-center relative w-full max-w-[920px] mx-auto">
            <div className="w-full h-[220px]">
                <EducatorCard
                    icon={
                        <BarChart3 className="w-8 h-8 text-[#70e2d8] group-hover:text-[#00ffe6] transition-colors duration-300" />
                    }
                    title="Real-Time Analytics"
                    description="Track student progress with detailed insights and performance metrics"
                    delay={0.3}
                    isInView={isInView}
                    cardIndex={0}
                />
            </div>
            <div className="w-full h-[220px]">
                <EducatorCard
                    icon={
                        <BookOpen className="w-8 h-8 text-[#8614ff] group-hover:text-[#a855f7] transition-colors duration-300" />
                    }
                    title="Curriculum Alignment"
                    description="Lessons that integrate seamlessly with teaching plans"
                    delay={0.5}
                    isInView={isInView}
                    cardIndex={1}
                />
            </div>
            <div className="w-full h-[220px]">
                <EducatorCard
                    icon={
                        <GraduationCap className="w-8 h-8 text-[#2e7cff] group-hover:text-[#60a5fa] transition-colors duration-300" />
                    }
                    title="Academic Readiness"
                    description="Prepare students for advanced placement and competitive high school admissions"
                    delay={0.7}
                    isInView={isInView}
                    cardIndex={2}
                />
            </div>
            <div className="w-full h-[220px]">
                <EducatorCard
                    icon={
                        <Target className="w-8 h-8 text-[#d5adff] group-hover:text-[#e879f9] transition-colors duration-300" />
                    }
                    title="Proven Results"
                    description="95% teacher satisfaction with measurable engagement improvement"
                    delay={0.9}
                    isInView={isInView}
                    cardIndex={3}
                />
            </div>
        </div>
    );
}

export function ExploreEducators() {
    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-20%" });

    return (
        <section
            ref={sectionRef}
            className="backdrop-blur-[11.5px] backdrop-filter relative rounded-[24px] w-full py-16 md:py-20"
        >
            <div className="flex flex-col items-center relative w-full">
                <div className="box-border content-stretch flex flex-col gap-[56px] items-center px-[32px] relative w-full max-w-6xl">
                    <motion.div
                        className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{
                            y: sectionInView ? 0 : 40,
                            opacity: sectionInView ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: sectionInView ? 0.2 : 0,
                            ease: "easeOut",
                        }}
                    >
                        <EducatorSolutionHeader isInView={sectionInView} />
                    </motion.div>

                    <motion.div
                        className="w-full"
                        initial={{ y: 60, opacity: 0 }}
                        animate={{
                            y: sectionInView ? 0 : 60,
                            opacity: sectionInView ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: sectionInView ? 0.4 : 0,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        <EducatorFeatureGrid isInView={sectionInView} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
