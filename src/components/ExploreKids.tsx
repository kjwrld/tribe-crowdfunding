import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
    Sparkles,
    Users,
    BookOpen,
    Gamepad2,
    Trophy,
    Star,
    Rocket,
} from "lucide-react";
import exampleImage from "../assets/24ffbe288bce42e59626a63b1da81bcb21dce94f.png";

function ExploreKidsTitle({ isInView }: { isInView: boolean }) {
    const [animateKids, setAnimateKids] = useState(false);

    useEffect(() => {
        if (isInView && !animateKids) {
            // Trigger the chroma animation after the title appears
            const timer = setTimeout(() => {
                setAnimateKids(true);
            }, 600); // Delay to let the title settle
            return () => clearTimeout(timer);
        }
    }, [isInView, animateKids]);

    return (
        <div className="content-stretch flex gap-2.5 items-start justify-center relative shrink-0 w-full">
            <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
                <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[1.1] text-[48px] md:text-[56px] lg:text-[64px] whitespace-pre">
                    <span>Made for </span>
                    <span
                        className={`chroma-text ${
                            animateKids ? "chroma-text-animate" : ""
                        }`}
                    >
                        Kids
                    </span>
                </p>
            </div>
        </div>
    );
}

function ExploreKidsSubtitle() {
    return (
        <div className="content-stretch flex flex-col gap-2.5 items-start justify-center relative shrink-0 w-full">
            <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[0px] text-center tracking-[0.36px] w-full">
                <p className="leading-[27px] text-[16px] md:text-[18px]">
                    Age-appropriate adventures where young learners become the
                    heroes of their own STEM journey.
                </p>
            </div>
        </div>
    );
}

function ExploreKidsHeader({ isInView }: { isInView: boolean }) {
    return (
        <div className="content-stretch flex flex-col gap-1.5 items-center justify-start relative shrink-0 w-full">
            <ExploreKidsTitle isInView={isInView} />
            <ExploreKidsSubtitle />
        </div>
    );
}

function KidsFeatureCard({
    icon,
    title,
    description,
    delay = 0,
    isInView,
    cardIndex = 0,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
    isInView: boolean;
    cardIndex?: number;
}) {
    // Randomized animation delays for each card
    const animationDelay = cardIndex * 0.15;

    return (
        <motion.div
            className="relative rounded-[20px] shrink-0 border border-white/20 
                 bg-white/5 backdrop-blur-sm shadow-sm
                 lg:hover:shadow-2xl lg:hover:shadow-purple-500/10 
                 lg:hover:-translate-y-1 lg:hover:scale-[1.02]
                 lg:transition-all lg:duration-300 lg:ease-out"
            initial={{ y: 40, opacity: 0 }}
            animate={{
                y: isInView ? 0 : 40,
                opacity: isInView ? 1 : 0,
            }}
            transition={{
                duration: 0.6,
                delay: isInView ? delay : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {/* Randomized Color-Shifting Background Glow Effect */}
            <div
                className="absolute inset-[-1px] rounded-[21px] pointer-events-none z-0 opacity-20"
                style={{
                    background:
                        "linear-gradient(45deg, rgba(134, 20, 255, 0.1), rgba(154, 82, 235, 0.1), rgba(255, 107, 122, 0.1), rgba(245, 230, 184, 0.1), rgba(34, 197, 94, 0.1), rgba(134, 20, 255, 0.1))",
                    backgroundSize: "200% 200%",
                    filter: "blur(8px)",
                    animation: `pulse-glow-shifting 4s ease-in-out infinite`,
                    animationDelay: `${animationDelay}s`,
                }}
            />

            <div className="box-border content-stretch flex flex-col gap-[20px] h-full items-center justify-center overflow-clip p-[20px] relative z-10">
                <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-[#d5adff]">
                        {icon}
                    </div>
                    <div className="font-['Nunito:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#d5adff] text-[16px] text-center tracking-[0.32px]">
                        <p className="leading-[18px] text-center">{title}</p>
                    </div>
                    <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[14px] text-center tracking-[0.28px] max-w-[200px]">
                        <p className="leading-[20px] text-center">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function KidsFeatureGrid({ isInView }: { isInView: boolean }) {
    const features = [
        {
            icon: <Gamepad2 size={24} />,
            title: "Interactive Play",
            description:
                "Learning through games that spark curiosity and discovery",
        },
        {
            icon: <Users size={24} />,
            title: "Diverse Heroes",
            description:
                "Characters that reflect every child's background and dreams",
        },
        {
            icon: <BookOpen size={24} />,
            title: "Story-Driven",
            description: "Adventures that make complex concepts simple and fun",
        },
        {
            icon: <Trophy size={24} />,
            title: "Achievement",
            description: "Celebrate progress with rewards and recognition",
        },
        {
            icon: <Star size={24} />,
            title: "Personalized",
            description: "Adapts to each child's learning style and pace",
        },
        {
            icon: <Rocket size={24} />,
            title: "Future Ready",
            description: "Building tomorrow's innovators and problem solvers",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] justify-center relative w-full max-w-[900px] mx-auto">
            {features.map((feature, index) => (
                <div key={index} className="w-full">
                    <KidsFeatureCard
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        delay={0.2 + index * 0.1}
                        isInView={isInView}
                        cardIndex={index}
                    />
                </div>
            ))}
        </div>
    );
}

function ExploreKidsButton({ isInView }: { isInView: boolean }) {
    return (
        <motion.button
            className="relative group bg-white hover:bg-gray-50 transition-colors rounded-[12px] shadow-lg w-[240px] h-[64px] overflow-hidden border border-white/20"
            initial={{ y: 30, opacity: 0 }}
            animate={{
                y: isInView ? 0 : 30,
                opacity: isInView ? 1 : 0,
            }}
            transition={{
                duration: 0.8,
                delay: isInView ? 0.8 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <div className="box-border content-stretch flex items-center justify-center gap-3 px-[24px] py-[15px] relative size-full z-10">
                <div className="font-['Nunito:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[16px] text-nowrap text-[#4e1d97]">
                    <p className="leading-[normal] whitespace-pre">
                        Start Their Journey
                    </p>
                </div>
                <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[20px]">
                    <Sparkles className="block size-full text-[#4e1d97]" />
                </div>
            </div>
        </motion.button>
    );
}

export function ExploreKids() {
    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-20%" });

    return (
        <div
            ref={sectionRef}
            className="w-full py-16 md:py-20 relative"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
        >
            {/* 3D CSS Plane with Image */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: sectionInView ? 1 : 0 }}
                transition={{ duration: 1.2, delay: sectionInView ? 0.3 : 0 }}
            >
                <div
                    className="absolute w-[800px] h-[600px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                        transform:
                            "translateX(-50%) translateY(-50%) rotateX(65deg) rotateY(-15deg) translateZ(-100px) scale(0.9)",
                        transformStyle: "preserve-3d",
                        filter: "blur(1px) brightness(0.8) contrast(1.1)",
                        opacity: 0.6,
                    }}
                >
                    {/* 3D Plane Surface */}
                    <div
                        className="w-full h-full rounded-[24px] shadow-2xl"
                        style={{
                            backgroundImage: `url(${exampleImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            boxShadow:
                                "0 20px 80px rgba(134, 20, 255, 0.3), 0 0 60px rgba(213, 173, 255, 0.2)",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Holographic overlay */}
                        <div
                            className="absolute inset-0 rounded-[24px] pointer-events-none"
                            style={{
                                background: `
                  linear-gradient(45deg, transparent 30%, rgba(134, 20, 255, 0.1) 50%, transparent 70%),
                  radial-gradient(circle at 30% 30%, rgba(112, 226, 216, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, rgba(213, 173, 255, 0.1) 0%, transparent 50%)
                `,
                                animation:
                                    "holographic-shift 8s ease-in-out infinite",
                            }}
                        />

                        {/* Floating corner brackets */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white opacity-80"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white opacity-80"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white opacity-80"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white opacity-80"></div>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col items-center relative w-full z-10">
                <div className="box-border content-stretch flex flex-col gap-[48px] items-center px-[32px] relative w-full max-w-6xl">
                    <motion.div
                        className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{
                            y: sectionInView ? 0 : 30,
                            opacity: sectionInView ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: sectionInView ? 0.1 : 0,
                            ease: "easeOut",
                        }}
                    >
                        <ExploreKidsHeader isInView={sectionInView} />
                    </motion.div>

                    <KidsFeatureGrid isInView={sectionInView} />

                    <ExploreKidsButton isInView={sectionInView} />
                </div>
            </div>

            <style jsx>{`
                @keyframes holographic-shift {
                    0%,
                    100% {
                        background-position: 0% 0%, 0% 0%, 100% 100%;
                        opacity: 0.6;
                    }
                    25% {
                        background-position: 100% 0%, 30% 30%, 70% 70%;
                        opacity: 0.8;
                    }
                    50% {
                        background-position: 100% 100%, 70% 70%, 30% 30%;
                        opacity: 0.7;
                    }
                    75% {
                        background-position: 0% 100%, 100% 100%, 0% 0%;
                        opacity: 0.9;
                    }
                }
            `}</style>
        </div>
    );
}
