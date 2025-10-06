import heroImage from "../assets/ed2b132e66660932ae3972504fc2fac4b26cbd68.png";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

function Frame61564() {
    const titleRef = useRef(null);
    const titleInView = useInView(titleRef, { once: true, margin: "-10%" });

    const text = "Empower every kid to win in STEM";
    const words = text.split(" ");

    return (
        <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
            <div
                ref={titleRef}
                className="content-stretch flex flex-col gap-[7px] items-center text-center leading-[0] relative w-full max-w-4xl"
            >
                <div className="font-['Nunito:Bold',_sans-serif] font-bold relative text-[#d5adff] leading-tight overflow-hidden">
                    <motion.p
                        className="mb-0 text-[42px] sm:text-[48px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-[1.25]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: titleInView ? 1 : 0 }}
                    >
                        {words.map((word, index) => {
                            // Group "win in STEM" together to prevent line breaks
                            if (word === "win") {
                                const winInStemIndex = index;
                                return (
                                    <span
                                        key={`win-in-stem-${index}`}
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        <motion.span
                                            className=""
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{
                                                y: titleInView ? 0 : 100,
                                                opacity: titleInView ? 1 : 0,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: titleInView
                                                    ? index * 0.2
                                                    : 0,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                            style={{
                                                display: "inline-block",
                                                marginRight: "0.3em",
                                            }}
                                        >
                                            win
                                        </motion.span>
                                        <motion.span
                                            className=""
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{
                                                y: titleInView ? 0 : 100,
                                                opacity: titleInView ? 1 : 0,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: titleInView
                                                    ? (index + 1) * 0.2
                                                    : 0,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                            style={{
                                                display: "inline-block",
                                                marginRight: "0.3em",
                                            }}
                                        >
                                            in
                                        </motion.span>
                                        <motion.span
                                            className="text-[#8614ff]"
                                            initial={{ y: 100, opacity: 0 }}
                                            animate={{
                                                y: titleInView ? 0 : 100,
                                                opacity: titleInView ? 1 : 0,
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: titleInView
                                                    ? (index + 2) * 0.2
                                                    : 0,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                            style={{ display: "inline-block" }}
                                        >
                                            STEM
                                        </motion.span>
                                    </span>
                                );
                            }
                            // Skip "in" and "STEM" since they're handled above
                            if (word === "in" || word === "STEM") {
                                return null;
                            }

                            return (
                                <motion.span
                                    key={index}
                                    className=""
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{
                                        y: titleInView ? 0 : 100,
                                        opacity: titleInView ? 1 : 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: titleInView ? index * 0.2 : 0,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    style={{
                                        display: "inline-block",
                                        marginRight: "0.3em",
                                    }}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </motion.p>
                </div>
            </div>
        </div>
    );
}

function Frame61766() {
    const subtitleRef = useRef(null);
    const isInView = useInView(subtitleRef, { once: true, margin: "-10%" });

    return (
        <div className="content-stretch flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-center justify-center lg:justify-around relative shrink-0 w-full max-w-6xl">
            {/* Left side: Mission & Vision */}
            <div className="flex flex-col gap-[32px] items-center lg:items-start lg:flex-1 lg:ml-[120px] order-2 lg:order-1">
                {/* Pill with Our Mission & Vision */}
                <motion.div
                    className="flex gap-[10px] items-center justify-center lg:justify-start relative shrink-0"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{
                        x: isInView ? 0 : -30,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: isInView ? 0.2 : 0,
                        ease: "easeOut",
                    }}
                >
                    <div className="bg-white border border-[#e0daef] rounded-[16px] px-3 py-2 flex items-center gap-[8px]">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                fill="#deb020"
                            />
                        </svg>
                        <span className="text-[#4c1d95] font-['Nunito:Bold',_sans-serif] font-bold text-[14px]">
                            Our Mission & Vision
                        </span>
                    </div>
                </motion.div>

                {/* Mission & Vision Content - Stacked Vertically */}
                <motion.div
                    ref={subtitleRef}
                    className="flex flex-col gap-[40px] items-center lg:items-start w-full"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{
                        y: isInView ? 0 : 30,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: isInView ? 1.2 : 0,
                        ease: "easeOut",
                    }}
                >
                    {/* Mission */}
                    <div className="flex flex-col gap-[8px] items-center lg:items-start text-center lg:text-left font-['Nunito:Regular',_sans-serif] font-normal text-[#737992]">
                        <p className="font-['Nunito:Bold',_sans-serif] font-bold text-[20px] lg:text-[24px] leading-[27px] text-[#8614ff]">
                            Mission
                        </p>
                        <p className="text-[16px] lg:text-[18px] leading-[26px] max-w-[400px]">
                            Empower every kid to win in STEM
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="flex flex-col gap-[8px] items-center lg:items-start text-center lg:text-left font-['Nunito:Regular',_sans-serif] font-normal text-[#737992]">
                        <p className="font-['Nunito:Bold',_sans-serif] font-bold text-[20px] lg:text-[24px] leading-[27px] text-[#8614ff]">
                            Vision
                        </p>
                        <p className="text-[16px] lg:text-[18px] leading-[26px] max-w-[400px]">
                            Make STEM culturally relevant so every kid,
                            everywhere, can succeed.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right side: Image */}
            <div className="lg:flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
                <motion.div
                    className="bg-center bg-contain bg-no-repeat h-[300px] md:h-[350px] lg:h-[450px] xl:h-[500px] w-[300px] md:w-[350px] lg:w-[450px] xl:w-[500px] opacity-90 shrink-0"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{
                        x: isInView ? 0 : 30,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: isInView ? 1.4 : 0,
                        ease: "easeOut",
                    }}
                />
            </div>
        </div>
    );
}

function Frame61772() {
    return (
        <div className="content-stretch flex flex-col gap-[40px] lg:gap-[60px] items-center relative shrink-0 w-full">
            <Frame61564 />
            <Frame61766 />
        </div>
    );
}

export default function VerticalHero() {
    return (
        <div
            id="mission-section"
            className="relative w-full min-h-screen"
            data-name="Vertical HERO"
        >
            <div className="flex flex-col items-center justify-center relative w-full min-h-screen pt-20 md:pt-24 lg:pt-28">
                <div className="box-border content-stretch flex flex-col gap-[20px] md:gap-[24px] lg:gap-[32px] items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-12 md:py-16 lg:py-20 relative w-full max-w-7xl mx-auto">
                    <Frame61772 />
                </div>
            </div>
        </div>
    );
}
