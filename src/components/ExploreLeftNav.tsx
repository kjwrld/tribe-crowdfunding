import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface Section {
    id: string;
    label: string;
    number: string;
}

interface ExploreLeftNavProps {
    sections: Section[];
}

export function ExploreLeftNav({ sections }: ExploreLeftNavProps) {
    const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.length === 0) return;

                // Find the entry with the highest intersection ratio
                let mostVisible = entries.reduce((prev, current) => {
                    return current.intersectionRatio > prev.intersectionRatio
                        ? current
                        : prev;
                });

                if (mostVisible && mostVisible.intersectionRatio > 0.1) {
                    setActiveSection(mostVisible.target.id);
                }
            },
            {
                threshold: [
                    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
                ],
                rootMargin: "-20% 0px -20% 0px",
            }
        );

        // Also add a scroll listener as a backup
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            let currentSection = "";
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    if (
                        scrollPosition >= elementTop &&
                        scrollPosition <= elementBottom
                    ) {
                        currentSection = section.id;
                    }
                }
            });

            if (currentSection && currentSection !== activeSection) {
                setActiveSection(currentSection);
            }
        };

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        // Add scroll listener
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initial check
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sections, activeSection]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden xl:block">
            <div className="flex flex-col gap-5">
                {sections.map((section, index) => {
                    const isActive = activeSection === section.id;

                    return (
                        <motion.button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group flex items-center gap-4 text-left"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Rounded squares with glow */}
                            <div
                                className={`w-4 h-4 border-2 rounded-[4px] transition-all duration-300 ${
                                    isActive
                                        ? "border-[#70e2d8] bg-[#70e2d8]/25 scale-125 shadow-lg shadow-[#70e2d8]/60"
                                        : "border-white/25 bg-transparent group-hover:border-[#70e2d8]/70 group-hover:bg-[#70e2d8]/15 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#70e2d8]/40"
                                }`}
                            />

                            {/* Bigger text with Nunito font */}
                            <div
                                className={`transition-all duration-300 overflow-hidden ${
                                    isActive
                                        ? "max-w-[180px] opacity-100"
                                        : "max-w-0 opacity-0"
                                } group-hover:max-w-[180px] group-hover:opacity-100`}
                            >
                                <span
                                    className={`font-['Nunito:Medium',_sans-serif] font-medium text-[20px] whitespace-nowrap transition-all duration-300 ${
                                        isActive
                                            ? "text-white drop-shadow-sm"
                                            : "text-white/85"
                                    }`}
                                >
                                    {section.label}
                                </span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
