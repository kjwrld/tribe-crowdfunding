import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { CardNav } from "./CardNav";
import { DonationDialog } from "./DonationDialog";

// Add custom CSS for iOS-style mobile menu animations
const mobileMenuStyles = `
  @keyframes slideInUp {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeInStagger {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .mobile-menu-item {
    animation: fadeInStagger 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    opacity: 0;
  }
  
  .animate-slideInUp {
    animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('responsive-nav-styles');
  if (!existingStyle) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'responsive-nav-styles';
    styleSheet.innerText = mobileMenuStyles;
    document.head.appendChild(styleSheet);
  }
}

interface ResponsiveNavProps {
    onNavigate?: (page: "home" | "about" | "explore" | "crowdfunding") => void;
    currentPage?: "home" | "about" | "explore" | "crowdfunding";
    onConfetti?: (position: { x: number; y: number }) => void;
}

export function ResponsiveNav({
    onNavigate,
    currentPage = "home",
    onConfetti,
}: ResponsiveNavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for enhanced navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        console.log('Toggle menu clicked. Current state:', isMenuOpen);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (page: "home" | "about" | "explore" | "crowdfunding") => {
        console.log('Nav item clicked:', page);
        if (onNavigate) {
            onNavigate(page);
        }
        setIsMenuOpen(false);
    };

    // Use the same scrolling approach as the sidebar
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleSectionScroll = (page: "home" | "about" | "explore" | "crowdfunding", sectionId?: string) => {
        console.log('Section scroll requested:', page, sectionId);
        
        // If we're navigating to the explore page and have a section ID, use direct scrolling
        if (page === 'explore' && sectionId && currentPage === 'explore') {
            // Already on explore page, just scroll to section
            scrollToSection(sectionId);
            setIsMenuOpen(false);
            return;
        }
        
        // Navigate to the page first
        if (onNavigate) {
            onNavigate(page);
        }
        
        // For explore page sections, use direct scrolling after navigation
        if (page === 'explore' && sectionId) {
            setTimeout(() => {
                scrollToSection(sectionId);
            }, currentPage === page ? 100 : 300); // Shorter delay if already on the page
        } else if (sectionId) {
            // For non-explore pages, use the original offset-based approach
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    // Calculate navbar height + desired spacing
                    const navbarHeight = 80; // Base navbar height
                    const additionalSpacing = 40; // Extra spacing for breathing room
                    const totalOffset = navbarHeight + additionalSpacing;
                    
                    // Get element position and subtract offset
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const targetPosition = elementPosition - totalOffset;
                    
                    // Smooth scroll to the calculated position
                    window.scrollTo({
                        top: Math.max(0, targetPosition), // Ensure we don't scroll above the page
                        behavior: 'smooth'
                    });
                }
            }, currentPage === page ? 100 : 500); // Shorter delay if already on the page
        }
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: "Explore", page: "explore" as const },
        { name: "About Us", page: "about" as const },
        { name: "Crowdfunding", page: "crowdfunding" as const },
        { name: "Reach Out", page: "home" as const },
    ];

    // YGBVerse logo as SVG - replace with your actual logo asset
    const logoUrl = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTgiIGZpbGw9IiM4NjE0ZmYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyTDEzLjA5IDguMjZMMjAgOUwxMy4wOSA5Ljc0TDEyIDEyTDEwLjkxIDkuNzRMNCA5TDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNS41IDVMMTYuMDkgOS4yNkwyMSA5LjVMMTYuMDkgOS43NEwxNS41IDEzTDE0LjkxIDkuNzRMMTAgOS41TDE0LjkxIDkuMjZMMTUuNSA1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo=";

    // CardNav items configuration
    const cardNavItems = [
        {
            label: "Explore",
            bgColor: "#792bcb",
            textColor: "#ffffff",
            onLabelClick: () => handleNavClick('explore'),
            links: [
                { label: "Kids", href: "#kids-section", ariaLabel: "Go to kids section", onClick: () => handleSectionScroll('explore', 'kids-section') },
                { label: "Families", href: "#families-section", ariaLabel: "Learn about families section", onClick: () => handleSectionScroll('explore', 'families-section') },
                { label: "Educators", href: "#educators-section", ariaLabel: "View educators section", onClick: () => handleSectionScroll('explore', 'educators-section') }
            ]
        },
        {
            label: "Pledge",
            bgColor: "#D5ADFF",
            textColor: "#000000",
            onLabelClick: () => handleNavClick('home'),
            links: [
                { label: "Proficiency", href: "#proficiency-section", ariaLabel: "Why It Matters", onClick: () => handleSectionScroll('home', 'proficiency-section') },
                { label: "Impact", href: "#impact-section", ariaLabel: "Help us Reimagine", onClick: () => handleSectionScroll('home', 'impact-section') },
                { label: "Contact", href: "#contact-section", ariaLabel: "We'd love to hear from you", onClick: () => handleSectionScroll('home', 'contact-section') }
            ]
        },
        {
            label: "About",
            bgColor: "#4038ef",
            textColor: "#ffffff",
            onLabelClick: () => handleNavClick('about'),
            links: [
                { label: "Our Mission", href: "#mission-section", ariaLabel: "Learn about our mission", onClick: () => handleSectionScroll('about', 'mission-section') },
                { label: "Representation", href: "#representation-section", ariaLabel: "See representation section", onClick: () => handleSectionScroll('about', 'representation-section') },
                { label: "Meet Our Team", href: "#team-section", ariaLabel: "Meet the team", onClick: () => handleSectionScroll('about', 'team-section') }
            ]
        }
    ];

    const isExplorePage = currentPage === "explore";

    return (
        <>
            {/* CardNav for modern navigation */}
            <CardNav
                items={cardNavItems}
                baseColor={isExplorePage ? "rgba(78, 29, 151, 0.95)" : "rgba(255, 255, 255, 0.95)"}
                menuColor={isExplorePage ? "#d9ddea" : "#5b6178"}
                buttonBgColor="#792bcb"
                buttonTextColor="#ffffff"
                onCtaClick={async () => {
                    try {
                        console.log('CTA clicked - would normally handle donation flow');
                        // For now, just scroll to the donation section
                        handleSectionScroll('home', 'hero-section');
                    } catch (error) {
                        console.error('Donation error:', error);
                        alert(`Would normally process donation here`);
                    }
                }}
                onConfetti={onConfetti}
                customDonationButton={
                    <DonationDialog onConfetti={onConfetti} darkMode={isExplorePage} />
                }
            />
        </>
    );
}