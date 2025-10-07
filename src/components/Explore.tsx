import { useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { DonationDialog } from "./DonationDialog";
import { ExploreLeftNav } from "./ExploreLeftNav";
import { ExploreHero } from "./ExploreHero";
import { ExploreKids } from "./ExploreKids";
import { ExploreFamilies } from "./ExploreFamilies";
import { ExploreEducators } from "./ExploreEducators";
import { GlassmorphicFooter } from "./GlassmorphicFooter";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ClassProgress from "../imports/ClassProgress";
import imgKidsLearning from "../assets/24ffbe288bce42e59626a63b1da81bcb21dce94f.png";

// Families Section Component
function FamiliesSection() {
    const [animateFamilies, setAnimateFamilies] = useState(false);
    const familiesRef = useRef(null);
    const familiesInView = useInView(familiesRef, {
        once: true,
        margin: "-10%",
    });

    useEffect(() => {
        if (familiesInView && !animateFamilies) {
            // Trigger the chroma animation after the slide-up animation completes
            const timer = setTimeout(() => {
                setAnimateFamilies(true);
            }, 1000); // Delay to let slide-up complete (0.8s + 0.2s buffer)
            return () => clearTimeout(timer);
        }
    }, [familiesInView, animateFamilies]);

    return (
        <section
            id="families-section"
            className="min-h-screen w-full relative flex items-center justify-center"
        >
            {/* Futuristic HUD Corner Brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/30 opacity-60" />
            <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/30 opacity-60" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-white/30 opacity-60" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/30 opacity-60" />

            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-12">
                {/* Section Header */}
                <div ref={familiesRef} className="text-center mb-4">
                    <motion.h2
                        className="font-['Nunito:Bold',_sans-serif] font-bold text-[38px] md:text-[48px] lg:text-[58px] xl:text-[68px] leading-[1.1] mb-6 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: familiesInView ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.span
                            className="text-[rgba(255,255,255,1)]"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{
                                y: familiesInView ? 0 : 100,
                                opacity: familiesInView ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: familiesInView ? 0.3 : 0,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            style={{
                                display: "inline-block",
                                marginRight: "0.3em",
                            }}
                        >
                            For
                        </motion.span>
                        <motion.span
                            className={`chroma-text-supercharged ${
                                animateFamilies
                                    ? "chroma-text-supercharged-animate"
                                    : ""
                            }`}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{
                                y: familiesInView ? 0 : 100,
                                opacity: familiesInView ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: familiesInView ? 0.5 : 0,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            style={{ display: "inline-block" }}
                        >
                            Families
                        </motion.span>
                    </motion.h2>
                </div>

                <ClassProgress />

                {/* Subtitle below dashboard */}
                <motion.div
                    className="mt-6 text-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{
                        y: familiesInView ? 0 : 30,
                        opacity: familiesInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: familiesInView ? 1.2 : 0,
                        ease: "easeOut",
                    }}
                >
                    <p className="font-['Nunito:Regular',_sans-serif] text-[14px] xs:text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-white/90 leading-relaxed max-w-[90vw] sm:max-w-[600px] mx-auto px-2 sm:px-4">
                        <span>
                            Progress report card data and information to help
                            your kid thrive.
                        </span>
                        <br />
                        <span>Affordable, Measurable and Safe.</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

interface ExploreProps {
    onNavigate?: (
        page:
            | "home"
            | "about"
            | "explore"
            | "crowdfunding"
            | "success"
            | "cancel"
    ) => void;
    onConfetti?: (position: { x: number; y: number }) => void;
}

const sections = [
    { id: "hero-section", label: "Explore", number: "001" },
    { id: "kids-section", label: "Kids", number: "002" },
    { id: "families-section", label: "Families", number: "003" },
    { id: "educators-section", label: "Educators", number: "004" },
    { id: "roadmap-section", label: "Roadmap", number: "005" },
];

// Placeholder components for empty sections

function RoadmapSolutionHeader({ isInView }: { isInView: boolean }) {
    const [animateJourney, setAnimateJourney] = useState(false);

    useEffect(() => {
        if (isInView && !animateJourney) {
            // Trigger the chroma animation after the title appears
            const timer = setTimeout(() => {
                setAnimateJourney(true);
            }, 600); // Delay to let the title settle
            return () => clearTimeout(timer);
        }
    }, [isInView, animateJourney]);

    return (
        <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex gap-2.5 items-start justify-center relative shrink-0 w-full">
                <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5adff] text-[0px] text-center text-nowrap tracking-[1.02px]">
                    <p className="font-['Nunito:Bold',_sans-serif] font-bold leading-[1.1] text-[48px] md:text-[56px] lg:text-[64px] whitespace-pre">
                        <span className="text-[rgba(255,255,255,1)]">Our </span>
                        <span
                            className={`chroma-text-supercharged ${
                                animateJourney
                                    ? "chroma-text-supercharged-animate"
                                    : ""
                            }`}
                        >
                            Journey
                        </span>
                    </p>
                </div>
            </div>
            <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full">
                <div className="font-['Nunito:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#8c92ab] text-[18px] text-center tracking-[0.36px] w-full">
                    <p className="leading-[27px]">
                        We have a clear, actionable plan to move quickly from
                        funding to impact.
                        <br aria-hidden="true" />
                        Join us on this transformative journey to revolutionize
                        STEM education.
                    </p>
                </div>
            </div>
        </div>
    );
}

function TimelineCards({ isInView }: { isInView: boolean }) {
    const timelineItems = [
        {
            period: "Q2-Q4 2025",
            title: "Completed Dev and Beta Testing: MVP 1",
            description:
                "Initial product testing with select educators and students",
            delay: 0.3,
        },
        {
            period: "Q2-Q4 2025",
            title: "$1 Million Crowdfunding Campaign",
            description:
                "Launch fundraising to support full development and expansion",
            delay: 0.5,
        },
        {
            period: "Q1-Q2 2026",
            title: "Complete Dev and Beta Testing: MVP 2",
            description:
                "Iterate based on feedback and begin next-generation features",
            delay: 0.7,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {timelineItems.map((item, index) => (
                <motion.div
                    key={index}
                    className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-[20px] p-6 text-center hover:bg-black/30 hover:border-[#70e2d8]/30 transition-all duration-300"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{
                        y: isInView ? 0 : 40,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: isInView ? item.delay : 0,
                        ease: "easeOut",
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                >
                    <div className="text-[#70e2d8] text-sm font-['Nunito:Bold',_sans-serif] font-bold mb-2">
                        {item.period}
                    </div>
                    <h4 className="text-white text-[18px] font-['Nunito:Bold',_sans-serif] font-bold mb-3 leading-tight">
                        {item.title}
                    </h4>
                    <p className="text-[#a0a8c0] text-[14px] font-['Nunito:Regular',_sans-serif] leading-relaxed">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}

function ExploreRoadmap({
    onNavigate,
    onConfetti,
}: {
    onNavigate?: ExploreProps["onNavigate"];
    onConfetti?: (position: { x: number; y: number }) => void;
}) {
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
                        <RoadmapSolutionHeader isInView={sectionInView} />
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
                        <TimelineCards isInView={sectionInView} />
                    </motion.div>

                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{
                            y: sectionInView ? 0 : 40,
                            opacity: sectionInView ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: sectionInView ? 1.0 : 0,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="flex items-center justify-center w-full"
                    >
                        {/* Premium Gradient "Make Impact" Button with Donation Modal - Exact ExploreHero Styling */}
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
                </div>
            </div>
        </section>
    );
}

export function Explore({ onNavigate, onConfetti }: ExploreProps = {}) {
    // Hide scrollbar when component mounts, restore when unmounts
    useEffect(() => {
        // Hide scrollbar
        document.body.style.scrollbarWidth = "none";
        document.body.style.msOverflowStyle = "none";
        document.documentElement.style.scrollbarWidth = "none";
        document.documentElement.style.msOverflowStyle = "none";

        // Add CSS for webkit browsers
        const style = document.createElement("style");
        style.textContent = `
            body::-webkit-scrollbar,
            html::-webkit-scrollbar {
                display: none;
                width: 0;
                background: transparent;
            }
        `;
        document.head.appendChild(style);

        return () => {
            // Restore scrollbar
            document.body.style.scrollbarWidth = "";
            document.body.style.msOverflowStyle = "";
            document.documentElement.style.scrollbarWidth = "";
            document.documentElement.style.msOverflowStyle = "";

            // Remove the style element
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, []);

    return (
        <div
            className="w-full overflow-x-hidden relative hide-scrollbar"
            style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
            }}
        >
            {/* Milky Way Background Effects */}

            {/* Darker gradient overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background:
                        "linear-gradient(135deg, #0f0224, #1a0238, #200440, #230c4a, #240d4d, #2a155a, #1e0d3d)",
                }}
            />

            {/* Nebula overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-30 z-0"
                style={{
                    background: `
                        radial-gradient(ellipse 800px 400px at 20% 30%, rgba(134, 20, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse 600px 300px at 80% 70%, rgba(109, 0, 224, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse 400px 200px at 50% 50%, rgba(213, 173, 255, 0.06) 0%, transparent 40%)
                    `,
                }}
            />

            {/* Twinkling Stars */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Large stars */}
                <div
                    className="absolute w-2 h-2 bg-white rounded-full opacity-80"
                    style={{
                        top: "15%",
                        left: "12%",
                        animation: "twinkle-large 3s ease-in-out infinite",
                        boxShadow:
                            "0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(213, 173, 255, 0.4)",
                    }}
                />
                <div
                    className="absolute w-2 h-2 bg-white rounded-full opacity-70"
                    style={{
                        top: "25%",
                        right: "18%",
                        animation: "twinkle-large 4s ease-in-out infinite 1s",
                        boxShadow:
                            "0 0 6px rgba(255, 255, 255, 0.7), 0 0 12px rgba(134, 20, 255, 0.3)",
                    }}
                />
                <div
                    className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-90"
                    style={{
                        top: "45%",
                        left: "8%",
                        animation: "twinkle-large 2.5s ease-in-out infinite 2s",
                        boxShadow:
                            "0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(109, 0, 224, 0.5)",
                    }}
                />
                <div
                    className="absolute w-2 h-2 bg-white rounded-full opacity-75"
                    style={{
                        bottom: "30%",
                        right: "15%",
                        animation:
                            "twinkle-large 3.5s ease-in-out infinite 0.5s",
                        boxShadow:
                            "0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(213, 173, 255, 0.4)",
                    }}
                />
                <div
                    className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-85"
                    style={{
                        bottom: "15%",
                        left: "25%",
                        animation:
                            "twinkle-large 4.5s ease-in-out infinite 1.5s",
                        boxShadow:
                            "0 0 4px rgba(255, 255, 255, 0.9), 0 0 8px rgba(134, 20, 255, 0.3)",
                    }}
                />

                {/* Medium stars */}
                <div
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    style={{
                        top: "20%",
                        left: "35%",
                        animation:
                            "twinkle-medium 2s ease-in-out infinite 0.3s",
                    }}
                />
                <div
                    className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                    style={{
                        top: "35%",
                        right: "40%",
                        animation:
                            "twinkle-medium 2.8s ease-in-out infinite 1.2s",
                    }}
                />
                <div
                    className="absolute w-1 h-1 bg-white rounded-full opacity-70"
                    style={{
                        top: "55%",
                        left: "45%",
                        animation:
                            "twinkle-medium 3.2s ease-in-out infinite 2.1s",
                    }}
                />
                <div
                    className="absolute w-1 h-1 bg-white rounded-full opacity-55"
                    style={{
                        bottom: "35%",
                        left: "70%",
                        animation:
                            "twinkle-medium 2.5s ease-in-out infinite 0.8s",
                    }}
                />
                <div
                    className="absolute w-1 h-1 bg-white rounded-full opacity-65"
                    style={{
                        bottom: "20%",
                        right: "30%",
                        animation:
                            "twinkle-medium 3.5s ease-in-out infinite 1.8s",
                    }}
                />

                {/* Small stars */}
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
                    style={{
                        top: "18%",
                        left: "55%",
                        animation:
                            "twinkle-small 1.5s ease-in-out infinite 0.5s",
                    }}
                />
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-35"
                    style={{
                        top: "30%",
                        left: "75%",
                        animation:
                            "twinkle-small 2.2s ease-in-out infinite 1.1s",
                    }}
                />
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-45"
                    style={{
                        top: "50%",
                        right: "25%",
                        animation:
                            "twinkle-small 1.8s ease-in-out infinite 1.7s",
                    }}
                />
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-30"
                    style={{
                        bottom: "40%",
                        left: "15%",
                        animation:
                            "twinkle-small 2.5s ease-in-out infinite 0.9s",
                    }}
                />
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
                    style={{
                        bottom: "25%",
                        right: "55%",
                        animation:
                            "twinkle-small 1.9s ease-in-out infinite 1.4s",
                    }}
                />
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-35"
                    style={{
                        top: "40%",
                        left: "90%",
                        animation:
                            "twinkle-small 2.1s ease-in-out infinite 0.7s",
                    }}
                />
                <div
                    className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
                    style={{
                        bottom: "50%",
                        right: "10%",
                        animation:
                            "twinkle-small 1.7s ease-in-out infinite 2.3s",
                    }}
                />
            </div>

            {/* Shooting star effect */}
            <div
                className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                style={{
                    top: "10%",
                    right: "10%",
                    animation: "shooting-star 8s linear infinite",
                    boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
                }}
            />

            {/* Add styles for the animations */}
            <style>{`
                @keyframes twinkle-large {
                    0%, 100% { 
                        opacity: 0.3; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.2);
                    }
                }
                
                @keyframes twinkle-medium {
                    0%, 100% { 
                        opacity: 0.2; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.8; 
                        transform: scale(1.1);
                    }
                }
                
                @keyframes twinkle-small {
                    0%, 100% { 
                        opacity: 0.1; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.6; 
                        transform: scale(1.05);
                    }
                }
                
                @keyframes shooting-star {
                    0% {
                        opacity: 0;
                        transform: translateX(0) translateY(0) rotate(-45deg);
                    }
                    2% {
                        opacity: 1;
                    }
                    5% {
                        opacity: 0;
                        transform: translateX(-150px) translateY(150px) rotate(-45deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translateX(-150px) translateY(150px) rotate(-45deg);
                    }
                }
            `}</style>
            {/* Content with elevated z-index to appear above background */}
            <div className="relative z-10">
                {/* Desktop Left Navigation - Hidden on mobile */}
                <ExploreLeftNav sections={sections} />

                {/* Hero Section */}
                <section
                    id="hero-section"
                    className="min-h-screen w-full relative flex items-center justify-center"
                >
                    <div className="w-full">
                        <ExploreHero
                            onNavigate={onNavigate}
                            onConfetti={onConfetti}
                        />
                    </div>
                </section>

                {/* Kids Section */}
                <section
                    id="kids-section"
                    className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
                >
                    {/* Futuristic HUD Corner Brackets */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/30 opacity-60" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/30 opacity-60" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-white/30 opacity-60" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/30 opacity-60" />

                    {/* Mobile Layout: Title centered, Image and Features below */}
                    <div className="flex flex-col lg:hidden gap-8 items-center text-center max-w-lg mx-auto px-4 py-20">
                        {/* Mobile Title Only */}
                        <motion.div
                            className="text-center"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true, margin: "-20%" }}
                        >
                            <h2 className="font-['Nunito:Bold',_sans-serif] font-bold text-[42px] md:text-[48px] text-white leading-tight">
                                For{" "}
                                <span className="chroma-text-supercharged chroma-text-supercharged-animate">
                                    Kids
                                </span>
                            </h2>
                        </motion.div>

                        {/* Mobile Image */}
                        <motion.div
                            className="w-full max-w-[400px] rounded-[24px] overflow-hidden shadow-2xl"
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true, margin: "-20%" }}
                        >
                            <ImageWithFallback
                                src={imgKidsLearning}
                                alt="Kids STEM Learning"
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>

                        {/* Mobile Content Section */}
                        <div className="w-full max-w-[380px] flex flex-col gap-6 text-left">
                            {/* Mobile Subtitle */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true, margin: "-20%" }}
                            >
                                <p className="font-['Nunito:Regular',_sans-serif] text-[18px] text-white/90 leading-relaxed text-center">
                                    Interactive STEM adventures where every
                                    child becomes the hero of their own learning
                                    journey
                                </p>
                            </motion.div>

                            {/* Mobile Feature List */}
                            <motion.div
                                className="flex flex-col gap-4 w-full"
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                viewport={{ once: true, margin: "-20%" }}
                            >
                                {/* Safe AI Learning Assistant */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-4 h-4 border-2 rounded-[4px] border-[#70e2d8] bg-[#70e2d8]/25 mt-1"></div>
                                    <div className="flex-1">
                                        <h4 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] mb-1">
                                            Mastery Pathways
                                        </h4>
                                        <p className="font-['Nunito:Regular',_sans-serif] text-white/60 text-[14px] leading-relaxed">
                                            Personalized mastery and proficiency
                                            metrics.
                                        </p>
                                    </div>
                                </div>

                                {/* Immersive Game-Based Learning */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-4 h-4 border-2 rounded-[4px] border-[#70e2d8] bg-[#70e2d8]/25 mt-1"></div>
                                    <div className="flex-1">
                                        <h4 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] mb-1">
                                            Immersive Game-Based Learning
                                        </h4>
                                        <p className="font-['Nunito:Regular',_sans-serif] text-white/60 text-[14px] leading-relaxed">
                                            Adventures and quests that make STEM
                                            stick.
                                        </p>
                                    </div>
                                </div>

                                {/* Diverse Heroes & Role Models */}
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-4 h-4 border-2 rounded-[4px] border-[#70e2d8] bg-[#70e2d8]/25 mt-1"></div>
                                    <div className="flex-1">
                                        <h4 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] mb-1">
                                            Diverse Heroes & Role Models
                                        </h4>
                                        <p className="font-['Nunito:Regular',_sans-serif] text-white/60 text-[14px] leading-relaxed">
                                            Every child sees themselves as the
                                            hero.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Desktop Layout: Image on left, Content on right */}
                    <div className="hidden lg:flex flex-col items-center justify-center gap-12 max-w-6xl mx-auto px-8 py-20">
                        {/* Centered Title Only */}
                        <motion.div
                            className="text-center"
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true, margin: "-20%" }}
                        >
                            {(() => {
                                const [animateKids, setAnimateKids] =
                                    useState(false);

                                useEffect(() => {
                                    // Trigger the chroma animation after the slide-up animation completes
                                    const timer = setTimeout(() => {
                                        setAnimateKids(true);
                                    }, 1000); // Delay to let slide-up complete (0.8s + 0.2s buffer)
                                    return () => clearTimeout(timer);
                                }, []);

                                return (
                                    <h2 className="font-['Nunito:Bold',_sans-serif] font-bold text-[38px] md:text-[48px] lg:text-[58px] xl:text-[68px] leading-[1.1] mb-6 overflow-hidden">
                                        <span
                                            className="text-[rgba(255,255,255,1)]"
                                            style={{
                                                display: "inline-block",
                                                marginRight: "0.3em",
                                            }}
                                        >
                                            For
                                        </span>
                                        <span
                                            className={`chroma-text-supercharged ${
                                                animateKids
                                                    ? "chroma-text-supercharged-animate"
                                                    : ""
                                            }`}
                                            style={{ display: "inline-block" }}
                                        >
                                            Kids
                                        </span>
                                    </h2>
                                );
                            })()}
                        </motion.div>

                        {/* Image and Content Side by Side */}
                        <div className="flex items-center justify-center gap-16 w-full">
                            {/* Desktop Image - Left Side */}
                            <motion.div
                                className="flex-1 max-w-[500px] rounded-[24px] overflow-hidden shadow-2xl"
                                initial={{ x: -40, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-20%" }}
                            >
                                <ImageWithFallback
                                    src={imgKidsLearning}
                                    alt="Kids STEM Learning"
                                    className="w-full h-auto object-cover"
                                />
                            </motion.div>

                            {/* Desktop Content - Right Side - Vertically Centered */}
                            <div className="flex-1 max-w-[500px] flex flex-col justify-center gap-8 text-left">
                                {/* Subtitle */}
                                <motion.div
                                    initial={{ x: 40, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    viewport={{ once: true, margin: "-20%" }}
                                >
                                    <p className="font-['Nunito:Regular',_sans-serif] text-[20px] xl:text-[22px] text-white/90 leading-relaxed">
                                        Interactive STEM adventures where every
                                        child becomes the hero of their own
                                        learning journey
                                    </p>
                                </motion.div>

                                {/* Feature List */}
                                <motion.div
                                    className="flex flex-col gap-4 w-full max-w-[480px]"
                                    initial={{ x: 40, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true, margin: "-20%" }}
                                >
                                    {/* Moderated AI Use */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-4 h-4 border-2 rounded-[4px] border-[#70e2d8] bg-[#70e2d8]/25 mt-1"></div>
                                        <div className="flex-1">
                                            <h4 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] xl:text-[18px] mb-1">
                                                Safe AI Learning Assistant
                                            </h4>
                                            <p className="font-['Nunito:Regular',_sans-serif] text-white/60 text-[14px] xl:text-[15px] leading-relaxed">
                                                AI-guided challenges with
                                                age-appropriate educational
                                                content.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Gamified Education */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-4 h-4 border-2 rounded-[4px] border-[#70e2d8] bg-[#70e2d8]/25 mt-1"></div>
                                        <div className="flex-1">
                                            <h4 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] xl:text-[18px] mb-1">
                                                Immersive Game-Based Learning
                                            </h4>
                                            <p className="font-['Nunito:Regular',_sans-serif] text-white/60 text-[14px] xl:text-[15px] leading-relaxed">
                                                Adventures and quests that make
                                                STEM stick.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Cultural Heroes */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-4 h-4 border-2 rounded-[4px] border-[#70e2d8] bg-[#70e2d8]/25 mt-1"></div>
                                        <div className="flex-1">
                                            <h4 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] xl:text-[18px] mb-1">
                                                Diverse Heroes & Role Models
                                            </h4>
                                            <p className="font-['Nunito:Regular',_sans-serif] text-white/60 text-[14px] xl:text-[15px] leading-relaxed">
                                                Every child sees themselves as
                                                the hero.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Families Section */}
                <FamiliesSection />

                {/* Educators Section */}
                <section
                    id="educators-section"
                    className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
                >
                    {/* Futuristic HUD Corner Brackets */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/30 opacity-60" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/30 opacity-60" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-white/30 opacity-60" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/30 opacity-60" />

                    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
                        <ExploreEducators />
                    </div>
                </section>

                {/* Roadmap Section */}
                <section
                    id="roadmap-section"
                    className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
                >
                    {/* Futuristic HUD Corner Brackets */}
                    <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/30 opacity-60" />
                    <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-white/30 opacity-60" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-white/30 opacity-60" />
                    <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/30 opacity-60" />

                    <ExploreRoadmap
                        onNavigate={onNavigate}
                        onConfetti={onConfetti}
                    />
                </section>

                {/* Footer Section */}
                <section id="footer-section" className="w-full relative">
                    <div className="w-full">
                        <GlassmorphicFooter
                            onNavigate={onNavigate}
                            currentPage="explore"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
