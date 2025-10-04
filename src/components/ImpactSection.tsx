import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Check, Rocket, Train, Crown } from "lucide-react";
import { useStripeCheckout } from "./DonationCheckout";

interface PricingTierProps {
    tier: "explorer" | "steamer" | "ygber";
    title: string;
    price: string;
    icon: React.ReactNode;
    features: string[];
    isPopular?: boolean;
    delay?: number;
    isInView: boolean;
    onConfetti?: (position: { x: number; y: number }) => void;
}

function PricingTier({
    tier,
    title,
    price,
    icon,
    features,
    isPopular = false,
    delay = 0,
    isInView,
    onConfetti,
}: PricingTierProps) {
    const { createCheckoutSession, isLoading, error, clearError } =
        useStripeCheckout();

    const handleChoose = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isLoading) return;

        // Clear any previous errors
        clearError();

        try {
            // Get button position for confetti origin
            const rect = e.currentTarget.getBoundingClientRect();
            const buttonCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };

            // Extract amount from price (remove $ sign)
            const amount = price.replace("$", "");

            // Create Stripe checkout session for one-time payment
            await createCheckoutSession(amount, "one-time");

            // Trigger confetti for successful redirect
            onConfetti?.(buttonCenter);
        } catch (error) {
            console.error("Tier selection failed:", error);
            // Error is handled by the useStripeCheckout hook
        }
    };
    const tierColors = {
        explorer: {
            gradient: "from-[#8614ff]/20 via-[#d5adff]/10 to-transparent",
            border: "border-[#c685ff]/50",
            accent: "#8614ff",
            iconBg: "bg-[#8614ff]/20",
        },
        steamer: {
            gradient: "from-[#6d00e0]/25 via-[#8614ff]/15 to-transparent",
            border: "border-[#8614ff]/60",
            accent: "#6d00e0",
            iconBg: "bg-[#6d00e0]/25",
        },
        ygber: {
            gradient: "from-[#5400ad]/30 via-[#6d00e0]/20 to-transparent",
            border: "border-[#5400ad]/70",
            accent: "#5400ad",
            iconBg: "bg-[#5400ad]/30",
        },
    };

    const colors = tierColors[tier];

    // Different effects for different cards
    const hasCleanBorderEffect = tier === "explorer"; // Border-only like contact form
    const hasBackgroundGlow = tier === "ygber"; // Background glow effect

    return (
        <motion.div
            className={`relative bg-white/95 backdrop-blur-sm rounded-[24px] p-8 border-2 ${
                hasCleanBorderEffect
                    ? "border-purple-200"
                    : hasBackgroundGlow
                    ? "border-purple-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/10"
                    : colors.border
            } ${isPopular ? "lg:scale-110" : ""} ${
                tier === "steamer" ? "z-10" : tier === "ygber" ? "z-0" : ""
            }`}
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
            style={{
                animation: isInView
                    ? isPopular
                        ? "popular-card-breathe 4s ease-in-out infinite"
                        : hasCleanBorderEffect
                        ? "none"
                        : hasBackgroundGlow
                        ? "none" // No border color animations for YGBer, only shadow effects via CSS classes
                        : "elegant-card-pulse 5s ease-in-out infinite"
                    : "none",
            }}
        >
            {/* Split-the-Difference Background Glow Effect - Only for YGBer */}
            {hasBackgroundGlow && (
                <div
                    className="absolute inset-[-1px] rounded-[25px] pointer-events-none z-0 opacity-30"
                    style={{
                        background:
                            "linear-gradient(45deg, rgba(134, 20, 255, 0.12), rgba(154, 82, 235, 0.12), rgba(255, 107, 122, 0.12), rgba(245, 230, 184, 0.12), rgba(34, 197, 94, 0.12), rgba(134, 20, 255, 0.12))",
                        backgroundSize: "200% 200%",
                        filter: "blur(8px)",
                        animation:
                            "pulse-glow-shifting 4s ease-in-out infinite",
                    }}
                />
            )}

            {/* Popular badge */}
            {isPopular && (
                <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#8614ff] to-[#6d00e0] text-white px-6 py-2 rounded-[16px] shadow-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: isInView ? 1 : 0,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: isInView ? delay + 0.3 : 0,
                        ease: "easeOut",
                    }}
                >
                    <span className="font-['Nunito:Bold',_sans-serif] font-bold text-[12px] tracking-wide">
                        MOST POPULAR
                    </span>
                </motion.div>
            )}

            {/* Header with icon and title */}
            <div className="flex flex-col items-center text-center mb-8">
                <motion.div
                    className="w-16 h-16 bg-transparent rounded-[16px] flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{
                        scale: isInView ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: isInView ? delay + 0.2 : 0,
                        ease: "easeOut",
                    }}
                >
                    {tier === "ygber" ? (
                        <div className="w-8 h-8 crown-container">
                            <Crown className="w-8 h-8 crown-icon" />
                        </div>
                    ) : (
                        icon
                    )}
                </motion.div>

                <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-[#4c1d95] text-[24px] mb-2">
                    {title}
                </h3>

                <div className="mb-2">
                    <span
                        className={`font-['Nunito:Bold',_sans-serif] font-bold text-[#8614ff] text-[36px] ${
                            tier === "ygber" ? "shimmer-text" : ""
                        }`}
                    >
                        {price}
                    </span>
                </div>

                <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[14px]">
                    / billed annually
                </p>
                <p className="font-['Nunito:Regular',_sans-serif] font-normal text-[#6b7280] text-[12px] mt-1">
                    Plus taxes
                </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{
                            x: isInView ? 0 : -20,
                            opacity: isInView ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: isInView ? delay + 0.4 + index * 0.1 : 0,
                            ease: "easeOut",
                        }}
                    >
                        <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                            <Check
                                className="w-3 h-3 text-white"
                                strokeWidth={3}
                            />
                        </div>
                        <span
                            className={`font-['Nunito:Regular',_sans-serif] font-normal text-[#374151] text-[14px] leading-relaxed ${
                                tier === "ygber" &&
                                feature.includes("150 students")
                                    ? "shimmer-text"
                                    : ""
                            }`}
                        >
                            {feature}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Error Display */}
            {error && (
                <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm font-['Nunito:Medium',_sans-serif]">
                        {error}
                    </p>
                </div>
            )}

            {/* CTA Button */}
            <motion.button
                onClick={handleChoose}
                disabled={isLoading}
                className={`relative group w-full mt-8 bg-gradient-to-r ${
                    tier === "explorer"
                        ? "from-[#8614ff] to-[#a047ff]"
                        : tier === "steamer"
                        ? "from-[#6d00e0] to-[#8614ff]"
                        : "from-[#5400ad] to-[#6d00e0]"
                } hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition-opacity duration-200 h-[48px] rounded-[16px] shadow-lg flex items-center justify-center gap-2 overflow-hidden`}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                    y: isInView ? 0 : 20,
                    opacity: isInView ? 1 : 0,
                }}
                transition={{
                    duration: 0.6,
                    delay: isInView ? delay + 0.8 : 0,
                    ease: "easeOut",
                }}
            >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Button content */}
                {isLoading ? (
                    <>
                        <div className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
                            Redirecting...
                        </span>
                    </>
                ) : (
                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
                        Give Today
                    </span>
                )}
            </motion.button>
        </motion.div>
    );
}

function ImpactTitle({ isInView }: { isInView: boolean }) {
    const [animateGift, setAnimateGift] = useState(false);

    useEffect(() => {
        if (isInView && !animateGift) {
            // Trigger the chroma animation after the title appears
            const timer = setTimeout(() => {
                setAnimateGift(true);
            }, 300); // Small delay to let the title settle
            return () => clearTimeout(timer);
        }
    }, [isInView, animateGift]);

    return (
        <div className="text-center mb-4 lg:mb-16">
            <h2 className="font-['Nunito:Bold',_sans-serif] text-[#d5adff] text-[48px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] mb-4">
                <span>Help Us </span>
                <span
                    className={`chroma-text ${
                        animateGift ? "chroma-text-animate" : ""
                    }`}
                >
                    Reimagine
                </span>
                <span> the Classroom</span>
            </h2>
            <p className="font-['Nunito:Regular',_sans-serif] text-[#8c92ab] text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto">
                Choose your level of impact and help transform STEM education
            </p>
        </div>
    );
}

export function ImpactSection({
    onConfetti,
}: {
    onConfetti?: (position: { x: number; y: number }) => void;
}) {
    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: true, margin: "-20%" });

    const tiers = [
        {
            tier: "explorer" as const,
            title: "Explorer",
            price: "$199",
            icon: <Rocket className="w-8 h-8 text-[#8614ff]" />,
            features: [
                "Gift access to 1 class (30 students)",
                "Meet the Founder and the Team",
                'Digital "Thank you" postcard',
            ],
        },
        {
            tier: "steamer" as const,
            title: "Steamer",
            price: "$599",
            icon: <Train className="w-8 h-8 text-[#6d00e0]" />,
            isPopular: true,
            features: [
                "Gift access to 3 classes (90 students)",
                "Meet the Teacher Advisory Board",
                "YGBverse exclusive Lanyard",
                "Plus all Explorer benefits",
            ],
        },
        {
            tier: "ygber" as const,
            title: "YGBer",
            price: "$999",
            icon: <Crown className="w-8 h-8 text-[#5400ad]" />,
            features: [
                "Gift access to 5 classes (120 students)",
                "YGB limited edition Coloring Book",
                "YGBverse limited Edition Journal",
                "Plus all Steamer benefits",
            ],
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="backdrop-blur-[11.5px] backdrop-filter relative rounded-[24px] w-full py-16 md:py-20"
        >
            <div className="flex flex-col items-center relative w-full">
                <div className="box-border content-stretch flex flex-col gap-[56px] items-center px-[32px] relative w-full max-w-7xl">
                    {/* Title Section */}
                    <ImpactTitle isInView={sectionInView} />

                    {/* Pricing Tiers */}
                    <div className="w-full">
                        {/* Mobile: Stacked layout */}
                        <div className="lg:hidden flex flex-col gap-8 max-w-md mx-auto">
                            {tiers.map((tier, index) => (
                                <PricingTier
                                    key={tier.tier}
                                    {...tier}
                                    delay={0.2 + index * 0.2}
                                    isInView={sectionInView}
                                    onConfetti={onConfetti}
                                />
                            ))}
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12 max-w-6xl mx-auto">
                            {tiers.map((tier, index) => (
                                <PricingTier
                                    key={tier.tier}
                                    {...tier}
                                    delay={0.2 + index * 0.2}
                                    isInView={sectionInView}
                                    onConfetti={onConfetti}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        className="text-center max-w-2xl mx-auto"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{
                            y: sectionInView ? 0 : 40,
                            opacity: sectionInView ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.8,
                            delay: sectionInView ? 1.2 : 0,
                            ease: "easeOut",
                        }}
                    >
                        <div className="font-['Nunito:Regular',_sans-serif] text-[#8c92ab] text-[16px] leading-relaxed mb-6 lg:mt-12">
                            <p className="mb-2">
                                Every contribution directly supports
                                underrepresented students in STEM education.
                            </p>
                            <p className="font-['Nunito:Bold',_sans-serif] font-bold text-[#8614ff]">
                                Your gift creates lasting change.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
