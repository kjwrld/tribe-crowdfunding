import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ArrowUpRight, Gift, Rocket, CreditCard } from "lucide-react";
import "./CardNav.css";
import { StarBorder } from "./StarBorder";

interface NavLink {
    label: string;
    href: string;
    ariaLabel: string;
    onClick?: () => void;
}

interface NavItem {
    label: string;
    bgColor: string;
    textColor: string;
    onLabelClick?: () => void;
    links?: NavLink[];
}

interface CardNavProps {
    logo?: string;
    logoAlt?: string;
    items?: NavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    onCtaClick?: () => void;
    onConfetti?: (position: { x: number; y: number }) => void;
    customDonationButton?: React.ReactNode;
}

export const CardNav = ({
    logo,
    logoAlt = "Logo",
    items = [],
    className = "",
    ease = "power3.out",
    baseColor = "#fff",
    menuColor,
    buttonBgColor,
    buttonTextColor,
    onCtaClick,
    onConfetti,
    customDonationButton,
}: CardNavProps) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) {
            const contentEl = navEl.querySelector(
                ".card-nav-content"
            ) as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = "visible";
                contentEl.style.pointerEvents = "auto";
                contentEl.style.position = "static";
                contentEl.style.height = "auto";

                contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        // Check if mobile device
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            // Mobile: Instant no-animation implementation
            return {
                play: () => {
                    const height = calculateHeight();
                    navEl.style.height = `${height}px`;
                    navEl.style.overflow = "visible";
                    navEl.style.transition = "none";
                    cardsRef.current.forEach((card) => {
                        if (card) {
                            card.style.transform = "translateY(0)";
                            card.style.opacity = "1";
                            card.style.transition = "none";
                        }
                    });
                    setIsAnimating(false);
                },
                reverse: () => {
                    navEl.style.height = "60px";
                    navEl.style.overflow = "hidden";
                    navEl.style.transition = "none";
                    cardsRef.current.forEach((card) => {
                        if (card) {
                            card.style.transform = "translateY(50px)";
                            card.style.opacity = "0";
                            card.style.transition = "none";
                        }
                    });
                    setIsExpanded(false);
                    setIsAnimating(false);
                },
                kill: () => {},
                progress: () => {},
            };
        }

        // Desktop: Simple CSS transitions instead of GSAP
        return {
            play: () => {
                const height = calculateHeight();
                navEl.style.height = `${height}px`;
                navEl.style.overflow = "visible";
                navEl.style.transition = "height 0.4s ease-out";

                setTimeout(() => {
                    cardsRef.current.forEach((card, index) => {
                        if (card) {
                            card.style.transform = "translateY(0)";
                            card.style.opacity = "1";
                            card.style.transition = `transform 0.4s ease-out ${
                                index * 0.08
                            }s, opacity 0.4s ease-out ${index * 0.08}s`;
                        }
                    });
                }, 100);

                setTimeout(() => {
                    setIsAnimating(false);
                }, 600);
            },
            reverse: () => {
                // Reverse staggered animation - last card animates first
                cardsRef.current.forEach((card, index) => {
                    if (card) {
                        const totalCards = cardsRef.current.length;
                        const reverseDelay = (totalCards - 1 - index) * 0.08; // Reverse order delay
                        card.style.transform = "translateY(50px)";
                        card.style.opacity = "0";
                        card.style.transition = `transform 0.3s ease-out ${reverseDelay}s, opacity 0.3s ease-out ${reverseDelay}s`;
                    }
                });

                setTimeout(() => {
                    navEl.style.height = "60px";
                    navEl.style.overflow = "hidden";
                    navEl.style.transition = "height 0.4s ease-out";
                    setIsExpanded(false);
                    setIsAnimating(false);
                }, 300);
            },
            kill: () => {},
            progress: () => {},
        };
    };

    const tlRef = useRef<any>(null);

    useLayoutEffect(() => {
        // Kill any existing timeline
        if (tlRef.current) {
            tlRef.current.kill();
        }

        // Reset state when recreating timeline
        setIsExpanded(false);
        setIsHamburgerOpen(false);
        setIsAnimating(false);

        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            if (tlRef.current) {
                tlRef.current.kill();
                tlRef.current = null;
            }
        };
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current || isAnimating) return;

            const wasExpanded = isExpanded;

            // Kill current timeline
            tlRef.current.kill();

            // Create new timeline
            const newTl = createTimeline();
            if (newTl) {
                tlRef.current = newTl;

                // If menu was expanded, set it to expanded state
                if (wasExpanded) {
                    newTl.play();
                }
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isExpanded, isAnimating]);

    const closeMenu = () => {
        if (!isExpanded || isAnimating) return;

        const tl = tlRef.current;
        if (!tl) return;

        setIsAnimating(true);
        setIsHamburgerOpen(false);
        tl.reverse();
    };

    const openMenu = () => {
        if (isExpanded || isAnimating) return;

        const tl = tlRef.current;
        if (!tl) return;

        setIsAnimating(true);
        setIsHamburgerOpen(true);
        setIsExpanded(true);
        tl.play();
    };

    const toggleMenu = () => {
        if (isAnimating) return;

        if (!isExpanded) {
            openMenu();
        } else {
            closeMenu();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    // Handle clicking outside to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isExpanded &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isExpanded]);

    // Handle scrolling to close menu
    useEffect(() => {
        const handleScroll = () => {
            if (isExpanded) {
                closeMenu();
            }
        };

        // Add scroll listener to both window and document
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("scroll", handleScroll);
        };
    }, [isExpanded]);

    // Reset menu state when component unmounts or remounts
    useEffect(() => {
        return () => {
            if (tlRef.current) {
                tlRef.current.kill();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={`card-nav-container ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? "open" : ""}`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${
                            isHamburgerOpen ? "open" : ""
                        }`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? "Close menu" : "Open menu"}
                        tabIndex={0}
                        style={{ color: menuColor || "#000" }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    {customDonationButton || (
                        <StarBorder
                            color="#792bcb"
                            speed="4s"
                            onClick={(e) => {
                                e.preventDefault();
                                // Navigate to crowdfunding pledge and close menu
                                if (onCtaClick) {
                                    onCtaClick();
                                }
                                if (isExpanded) {
                                    closeMenu();
                                }
                            }}
                            style={{
                                cursor: "pointer",
                                background: baseColor,
                                color: menuColor || "#000",
                                fontSize: "14px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontFamily: "'Nunito', sans-serif",
                                }}
                                className="hover:text-[#8615ff] transition-colors duration-200"
                            >
                                <Gift size={16} />
                                Give Today
                            </div>
                        </StarBorder>
                    )}
                </div>

                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {items.slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={setCardRef(idx)}
                            style={{
                                backgroundColor:
                                    item.label === "About"
                                        ? "#2e7cff"
                                        : item.label === "Home"
                                        ? "#20fde6"
                                        : item.label === "Explore"
                                        ? "#8614ff"
                                        : item.bgColor,
                                color:
                                    item.label === "About"
                                        ? "#ffffff"
                                        : item.label === "Home"
                                        ? "#000000"
                                        : item.label === "Explore"
                                        ? "#ffffff"
                                        : item.textColor,
                            }}
                        >
                            {/* Card Icon - Top Right */}
                            <div className="absolute top-4 right-4 opacity-40">
                                {item.label === "Home" && (
                                    <Gift
                                        className="w-6 h-6"
                                        style={{ color: "#000000" }}
                                    />
                                )}
                                {item.label === "Explore" && (
                                    <Rocket
                                        className="w-6 h-6"
                                        style={{ color: item.textColor }}
                                    />
                                )}
                                {item.label === "About" && (
                                    <CreditCard
                                        className="w-6 h-6"
                                        style={{ color: "#ffffff" }}
                                    />
                                )}
                            </div>

                            <div
                                className="nav-card-label cursor-pointer hover:opacity-75 transition-opacity"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Navigate to the main page for this section
                                    if (item.onLabelClick) {
                                        item.onLabelClick();
                                    }
                                    // Close menu after navigation
                                    if (isExpanded) {
                                        closeMenu();
                                    }
                                }}
                            >
                                {item.label}
                            </div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link"
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (lnk.onClick) {
                                                lnk.onClick();
                                            }
                                            // Close menu after navigation
                                            if (isExpanded) {
                                                closeMenu();
                                            }
                                        }}
                                    >
                                        <ArrowUpRight
                                            className="nav-card-link-icon"
                                            aria-hidden="true"
                                        />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};
