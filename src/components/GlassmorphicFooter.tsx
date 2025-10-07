import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Heart,
    ArrowRight,
    ExternalLink,
} from "lucide-react";

interface FooterProps {
    onNavigate?: (page: "home" | "about" | "crowdfunding") => void;
    currentPage?: "home" | "about" | "explore" | "crowdfunding";
}

function FooterSection({
    title,
    children,
    delay = 0,
    isInView,
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
            transition={{
                duration: 0.6,
                delay: isInView ? delay : 0,
                ease: "easeOut",
            }}
        >
            <h3 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[16px] tracking-wide uppercase">
                {title}
            </h3>
            <div className="flex flex-col gap-3">{children}</div>
        </motion.div>
    );
}

function FooterLink({
    href,
    onClick,
    children,
    external = false,
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
            className="font-['Nunito:Regular',_sans-serif] font-normal text-white hover:text-white text-[14px] transition-colors cursor-pointer flex items-center gap-2 group w-fit"
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
    isInView,
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
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-[12px] p-3 transition-all duration-300 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{
                duration: 0.4,
                delay: isInView ? delay : 0,
                ease: "easeOut",
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            <Icon className="w-5 h-5 text-white group-hover:text-white transition-colors" />
        </motion.a>
    );
}

export function GlassmorphicFooter({ onNavigate, currentPage }: FooterProps) {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-10%" });

    const backgroundColor = currentPage === "explore" ? "#4c1c93" : "#8516ff";

    return (
        <footer
            ref={footerRef}
            className="relative mt-16 md:mt-20 overflow-hidden"
            style={{ backgroundColor }}
        >
            {/* Grain texture overlay */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ filter: "contrast(170%) brightness(100%)" }}
            >
                <defs>
                    <filter id="footerGrainFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.9"
                            numOctaves="4"
                            stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    filter="url(#footerGrainFilter)"
                    opacity="0.4"
                    style={{ mixBlendMode: "multiply" }}
                />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Company Info & Newsletter */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Brand section */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{
                                y: isInView ? 0 : 30,
                                opacity: isInView ? 1 : 0,
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="font-['Nunito:Bold',_sans-serif] font-bold text-white text-[24px] tracking-wide">
                                    YGBVerse
                                </h2>
                            </div>
                            <p className="font-['Nunito:Regular',_sans-serif] font-normal text-white text-[16px] leading-relaxed max-w-md">
                                Reimagining STEM. Every child deserves to see
                                themselves as the hero of their learning
                                journey.
                            </p>
                        </motion.div>
                    </div>

                    {/* Support & Connect */}
                    <FooterSection
                        title="Connect"
                        isInView={isInView}
                        delay={0.2}
                    >
                        <FooterLink
                            onClick={() => onNavigate?.("crowdfunding")}
                        >
                            Support Our Mission
                        </FooterLink>
                        <FooterLink onClick={() => onNavigate?.("home")}>
                            Contact Us
                        </FooterLink>
                        <FooterLink href="#" external>
                            Partnership Opportunities
                        </FooterLink>
                        <FooterLink href="#" external>
                            Press & Media
                        </FooterLink>
                    </FooterSection>
                </div>

                {/* Contact info & Social */}
                <motion.div
                    className="border-t border-white/10 pt-8 space-y-8"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{
                        y: isInView ? 0 : 40,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    {/* Social Media & Copyright */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Social Media */}
                        <div className="flex items-center gap-4">
                            <SocialIcon
                                Icon={Facebook}
                                href="https://www.facebook.com/younggiftedbeautiful/"
                                label="Facebook"
                                delay={0.1}
                                isInView={isInView}
                            />
                            <SocialIcon
                                Icon={() => (
                                    <svg
                                        className="w-5 h-5 text-white group-hover:text-white transition-colors"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                    </svg>
                                )}
                                href="https://www.tiktok.com/@younggiftedbeautiful"
                                label="TikTok"
                                delay={0.15}
                                isInView={isInView}
                            />
                            <SocialIcon
                                Icon={Instagram}
                                href="https://www.instagram.com/younggiftedbeautiful/"
                                label="Instagram"
                                delay={0.2}
                                isInView={isInView}
                            />
                            <SocialIcon
                                Icon={Linkedin}
                                href="#"
                                label="LinkedIn"
                                delay={0.25}
                                isInView={isInView}
                            />
                            <SocialIcon
                                Icon={Youtube}
                                href="https://www.youtube.com/@younggiftedbeautiful"
                                label="YouTube"
                                delay={0.3}
                                isInView={isInView}
                            />
                        </div>

                        {/* Copyright & Legal */}
                        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right">
                            <div className="flex items-center gap-4 text-[13px] font-['Nunito:Regular',_sans-serif] font-normal text-white/60">
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </a>
                                <span>•</span>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </div>
                            <p className="font-['Nunito:Regular',_sans-serif] font-normal text-white/60 text-[13px] flex items-center gap-2">
                                © 2026 YGBVerse. Made with
                                <Heart className="w-3 h-3 fill-current text-white" />
                                for the future of STEM.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </footer>
    );
}
