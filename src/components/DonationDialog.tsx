import { useState } from "react";
import { Gift, Heart, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { StarBorder } from "./StarBorder";
import { useStripeCheckout } from "./DonationCheckout";
import {
    DialogStack,
    DialogStackTrigger,
    DialogStackOverlay,
    DialogStackBody,
    DialogStackContent,
    DialogStackHeader,
    DialogStackTitle,
    DialogStackDescription,
    DialogStackFooter,
} from "./ui/dialog-stack";

interface DonationDialogProps {
    onConfetti?: (position: { x: number; y: number }) => void;
    children?: React.ReactNode;
    darkMode?: boolean;
}

export function DonationDialog({
    onConfetti,
    children,
    darkMode = false,
}: DonationDialogProps) {
    const [donationAmount, setDonationAmount] = useState("100");
    const donationType = "one-time";
    const [isOpen, setIsOpen] = useState(false);

    const { createCheckoutSession, isLoading, error, clearError } =
        useStripeCheckout();

    const handleDonation = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

            // Create Stripe checkout session
            await createCheckoutSession(donationAmount, donationType);

            // Trigger confetti for successful redirect
            onConfetti?.(buttonCenter);

            // Close dialog after successful redirect
            setIsOpen(false);
        } catch (error) {
            console.error("Donation failed:", error);
            // Error is handled by the useStripeCheckout hook
        }
    };

    // Track if donation input has content for conditional animation
    const isDonationInputFilled =
        donationAmount && donationAmount.trim() !== "";

    return (
        <DialogStack open={isOpen} onOpenChange={setIsOpen} darkMode={darkMode}>
            <DialogStackTrigger asChild>
                {children || (
                    <StarBorder
                        color={darkMode ? "#a855f7" : "#792bcb"}
                        speed="4s"
                        style={{
                            cursor: "pointer",
                            background: "transparent",
                            border: "none",
                            color: darkMode ? "#e2e8f0" : "#5b6178",
                            fontSize: "14px",
                            padding: "0",
                            boxShadow: "none",
                        }}
                    >
                        <button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                fontFamily: "'Nunito', sans-serif",
                                background: "transparent",
                                border: "none",
                                padding: "8px 20px 8px 0",
                                margin: "auto 0",
                                cursor: "pointer",
                                outline: "none",
                                fontWeight: "bold",
                                height: "fit-content",
                            }}
                            className={`${
                                darkMode
                                    ? "hover:text-white text-slate-300"
                                    : "hover:text-[#8615ff] text-[#5b6178]"
                            } transition-colors duration-200 focus:outline-none`}
                        >
                            <Gift size={16} />
                            Give Today
                        </button>
                    </StarBorder>
                )}
            </DialogStackTrigger>

            <DialogStackOverlay />

            <DialogStackBody className="px-4">
                <DialogStackContent
                    className={`${
                        darkMode
                            ? "bg-slate-900/95 border-2 border-slate-700/50 backdrop-blur-sm shadow-2xl"
                            : "bg-white/95 border-2 border-[#e0daef] backdrop-blur-sm shadow-2xl"
                    } max-w-md mx-auto relative overflow-hidden`}
                >
                    {/* Epic $500 Chroma Background Effect */}
                    {donationAmount === "500" && (
                        <div
                            className="absolute inset-0 rounded-[24px] pointer-events-none z-0"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(134, 20, 255, 0.03) 0%, rgba(154, 82, 235, 0.03) 20%, rgba(255, 107, 122, 0.03) 40%, rgba(245, 230, 184, 0.03) 50%, rgba(34, 197, 94, 0.03) 70%, rgba(112, 226, 216, 0.03) 85%, rgba(134, 20, 255, 0.03) 100%)",
                                backgroundSize: "400% 400%",
                                animation:
                                    "pulse-glow-shifting 4s ease-in-out infinite",
                            }}
                        />
                    )}

                    {/* Epic $500 Enhanced Border Glow */}
                    {donationAmount === "500" && (
                        <div
                            className="absolute inset-[-3px] rounded-[27px] pointer-events-none z-0"
                            style={{
                                background:
                                    "linear-gradient(45deg, rgba(134, 20, 255, 0.4), rgba(154, 82, 235, 0.4), rgba(255, 107, 122, 0.4), rgba(245, 230, 184, 0.4), rgba(34, 197, 94, 0.4), rgba(112, 226, 216, 0.4), rgba(134, 20, 255, 0.4))",
                                backgroundSize: "300% 300%",
                                filter: "blur(8px)",
                                animation:
                                    "pulse-glow-shifting 3s ease-in-out infinite",
                            }}
                        />
                    )}

                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-20"
                    >
                        <X
                            className={`h-4 w-4 ${
                                darkMode ? "text-slate-300" : "text-[#4c1d95]"
                            }`}
                        />
                        <span className="sr-only">Close</span>
                    </button>

                    <DialogStackHeader className="space-y-4 pb-6 relative z-10">
                        {/* Header Icon */}
                        <div className="flex justify-center">
                            <div
                                className={`relative transition-all duration-500 ${
                                    donationAmount === "500"
                                        ? "transform scale-110"
                                        : ""
                                }`}
                            >
                                {/* Chroma Sweep Background - Only for $500 */}
                                {donationAmount === "500" && (
                                    <div
                                        className="absolute inset-[-4px] rounded-full"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #4C1D95 0%, #4C1D95 33.33%, #ff0138 40%, #ff6b7a 45%, #474dd6 50%, #6de4db 55%, #8614ff 60%, transparent 66.67%, transparent)",
                                            backgroundSize: "300% 100%",
                                            backgroundPosition: "100% 0",
                                            animation:
                                                "chroma-sweep-culture 0.9s ease-in-out 0.1s forwards",
                                            filter: "blur(1px)",
                                            maskImage: `url("data:image/svg+xml,${encodeURIComponent(`
                        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' stroke='white' stroke-width='2' fill='none'/>
                        </svg>
                      `)}")`,
                                            maskSize: "48px 48px",
                                            maskPosition: "center",
                                            maskRepeat: "no-repeat",
                                            WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(`
                        <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' stroke='white' stroke-width='2' fill='none'/>
                        </svg>
                      `)}")`,
                                            WebkitMaskSize: "48px 48px",
                                            WebkitMaskPosition: "center",
                                            WebkitMaskRepeat: "no-repeat",
                                            zIndex: 5,
                                        }}
                                    />
                                )}

                                <Gift
                                    className={`relative z-10 w-12 h-12 transition-all duration-500 ${
                                        donationAmount === "500"
                                            ? "opacity-0"
                                            : "text-[#8614ff]"
                                    }`}
                                />
                            </div>
                        </div>

                        <DialogStackTitle
                            className={`text-center font-['Nunito:Bold',_sans-serif] font-bold text-[24px] leading-tight transition-all duration-500 ${
                                darkMode
                                    ? "text-slate-100"
                                    : donationAmount === "500"
                                    ? "chroma-text chroma-text-animate"
                                    : "text-[#4c1d95]"
                            }`}
                        >
                            Support STEM Education
                        </DialogStackTitle>

                        <DialogStackDescription
                            className={`text-center ${
                                darkMode ? "text-slate-300" : "text-[#6b7280]"
                            } font-['Nunito:Regular',_sans-serif] text-[16px] leading-relaxed`}
                        >
                            Help us create a place where kids feel seen,
                            celebrated, and empowered to dream big through
                            culturally relevant STEM education.
                        </DialogStackDescription>
                    </DialogStackHeader>

                    {/* Custom Amount Input */}
                    <div className="mb-6 relative z-10">
                        <label
                            className={`block ${
                                darkMode ? "text-slate-200" : "text-[#4c1d95]"
                            } font-['Nunito:Bold',_sans-serif] font-bold text-[14px] mb-3`}
                        >
                            Donation Amount:
                        </label>
                        <div className="relative group">
                            {/* Conditional Animated Color-Shifting Glow Effect - Only when filled */}
                            {isDonationInputFilled && (
                                <div
                                    className="absolute inset-[-1px] rounded-[13px] pointer-events-none z-0 transition-all duration-300 group-hover:inset-[-2px]"
                                    style={{
                                        background:
                                            "linear-gradient(45deg, rgba(134, 20, 255, 0.3), rgba(154, 82, 235, 0.3), rgba(255, 107, 122, 0.3), rgba(245, 230, 184, 0.3), rgba(34, 197, 94, 0.3), rgba(134, 20, 255, 0.3))",
                                        backgroundSize: "200% 200%",
                                        filter: "blur(4px)",
                                        animation:
                                            "pulse-glow-shifting 3.5s ease-in-out infinite",
                                    }}
                                />
                            )}

                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8614ff] text-[18px] font-['Nunito:Medium',_sans-serif] font-medium z-30">
                                $
                            </div>
                            <input
                                type="number"
                                value={donationAmount}
                                onChange={(e) =>
                                    setDonationAmount(e.target.value)
                                }
                                step="25"
                                className={`relative z-10 w-full h-[56px] pl-8 pr-3 ${
                                    darkMode
                                        ? "bg-slate-800 border-slate-600 text-slate-100"
                                        : "bg-white border-[#e5e7eb] text-[#374151]"
                                } border-2 rounded-[12px] text-[18px] font-['Nunito:Medium',_sans-serif] font-medium focus:border-[#3e1c85] focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                placeholder="100"
                            />
                        </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="mb-6 relative z-10">
                        <div className="flex justify-between w-full gap-2">
                            {["50", "100", "250", "500"].map((amount) => (
                                <div
                                    key={amount}
                                    className="flex-1 relative group"
                                >
                                    {/* Chroma Glow Effect - Only when selected */}
                                    {(donationAmount === amount ||
                                        (amount === "100" &&
                                            ![
                                                "50",
                                                "100",
                                                "250",
                                                "500",
                                            ].includes(donationAmount))) && (
                                        <div
                                            className="absolute inset-[-2px] rounded-[16px] pointer-events-none z-0 transition-all duration-300 group-hover:inset-[-3px]"
                                            style={{
                                                background:
                                                    "linear-gradient(45deg, rgba(134, 20, 255, 0.4), rgba(154, 82, 235, 0.4), rgba(255, 107, 122, 0.4), rgba(245, 230, 184, 0.4), rgba(34, 197, 94, 0.4), rgba(134, 20, 255, 0.4))",
                                                backgroundSize: "200% 200%",
                                                filter: "blur(6px)",
                                                animation:
                                                    "pulse-glow-shifting 3.5s ease-in-out infinite",
                                            }}
                                        />
                                    )}
                                    <button
                                        onClick={() =>
                                            setDonationAmount(amount)
                                        }
                                        className={`relative z-10 w-full py-4 px-2 sm:px-3 rounded-[14px] font-['Nunito:Medium',_sans-serif] font-medium text-[15px] sm:text-[16px] transition-all duration-300 min-h-[48px] sm:min-h-[52px] flex items-center justify-center active:scale-[0.98] ${
                                            donationAmount === amount ||
                                            (amount === "100" &&
                                                ![
                                                    "50",
                                                    "100",
                                                    "250",
                                                    "500",
                                                ].includes(donationAmount))
                                                ? "bg-white text-[#2d3748] shadow-xl transform scale-[1.03] border border-gray-200"
                                                : "bg-white text-[#4a5568] border border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-[1.02] active:shadow-sm"
                                        }`}
                                        style={
                                            donationAmount === amount ||
                                            (amount === "100" &&
                                                ![
                                                    "50",
                                                    "100",
                                                    "250",
                                                    "500",
                                                ].includes(donationAmount))
                                                ? {
                                                      boxShadow:
                                                          "0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                                                  }
                                                : {}
                                        }
                                    >
                                        <span
                                            className={
                                                amount === "500" &&
                                                donationAmount !== amount
                                                    ? "gold-shimmer-text"
                                                    : ""
                                            }
                                        >
                                            ${amount}
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogStackFooter className="flex-col space-y-4 space-x-0 relative z-10">
                        {/* Error Display */}
                        {error && (
                            <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm font-['Nunito:Medium',_sans-serif]">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Donate Button */}
                        <button
                            onClick={(e) => {
                                handleDonation(e);
                                // Skip confetti for $500 premium experience - keep it clean and sophisticated
                                if (donationAmount !== "500") {
                                    // Trigger confetti effect for other amounts
                                    const rect =
                                        e.currentTarget.getBoundingClientRect();
                                    const buttonCenter = {
                                        x: rect.left + rect.width / 2,
                                        y: rect.top + rect.height / 2,
                                    };

                                    // Create confetti particles
                                    for (let i = 0; i < 50; i++) {
                                        const confetti =
                                            document.createElement("div");
                                        confetti.style.position = "fixed";
                                        confetti.style.left =
                                            buttonCenter.x + "px";
                                        confetti.style.top =
                                            buttonCenter.y + "px";
                                        confetti.style.width = "8px";
                                        confetti.style.height = "8px";
                                        confetti.style.backgroundColor = [
                                            "#8614ff",
                                            "#a855f7",
                                            "#c084f5",
                                            "#FFD700",
                                            "#22c55e",
                                        ][Math.floor(Math.random() * 5)];
                                        confetti.style.borderRadius = "50%";
                                        confetti.style.pointerEvents = "none";
                                        confetti.style.zIndex = "9999";
                                        confetti.style.transform = "scale(0)";
                                        confetti.style.transition =
                                            "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

                                        document.body.appendChild(confetti);

                                        // Animate confetti
                                        setTimeout(() => {
                                            const angle =
                                                Math.random() *
                                                360 *
                                                (Math.PI / 180);
                                            const distance =
                                                Math.random() * 200 + 100;
                                            const x =
                                                Math.cos(angle) * distance;
                                            const y =
                                                Math.sin(angle) * distance -
                                                Math.random() * 100;

                                            confetti.style.transform = `translate(${x}px, ${y}px) scale(1) rotate(${
                                                Math.random() * 360
                                            }deg)`;
                                            confetti.style.opacity = "0";
                                        }, 10);

                                        // Remove confetti after animation
                                        setTimeout(() => {
                                            if (confetti.parentNode) {
                                                confetti.parentNode.removeChild(
                                                    confetti
                                                );
                                            }
                                        }, 1000);
                                    }
                                }
                            }}
                            disabled={isLoading}
                            className="relative group w-full bg-[#8614ff] hover:bg-[#7c3aed] disabled:bg-[#8614ff]/70 disabled:cursor-not-allowed transition-all duration-300 h-[52px] rounded-[12px] shadow-lg hover:shadow-xl focus:shadow-xl flex items-center justify-center gap-2 overflow-hidden"
                        >
                            {/* Shimmer overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                            {/* Button content */}
                            {isLoading ? (
                                <>
                                    <div className="relative z-10 w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
                                        Processing...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="relative z-10 font-['Nunito:Medium',_sans-serif] font-medium text-white text-[16px]">
                                        Donate Now
                                    </span>
                                    <span className="relative z-10 text-white text-[16px] transition-transform duration-200 group-hover:translate-x-1">
                                        →
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Trust Indicators */}
                        <div className="flex items-center justify-center gap-6 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-2.5 h-2.5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <span className="font-['Nunito:Regular',_sans-serif] text-[#6b7280] text-[12px]">
                                    Secure & Encrypted
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-2.5 h-2.5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <span className="font-['Nunito:Regular',_sans-serif] text-[#6b7280] text-[12px]">
                                    Direct Impact
                                </span>
                            </div>
                        </div>
                    </DialogStackFooter>
                </DialogStackContent>
            </DialogStackBody>
        </DialogStack>
    );
}
