import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Code,
  User,
  MessageSquare,
  Terminal,
  Menu,
  X,
  FolderKanban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ─── Nav config ────────────────────────────────────────────────
// Each item maps to:
//   • a route path  (used when not on the portfolio page)
//   • a section id  (used for smooth-scroll when on the portfolio page `/`)
// ───────────────────────────────────────────────────────────────
type NavItem = {
  label: string;
  path: string;
  sectionId: string;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  decoration: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "HOME",
    path: "/",
    sectionId: "home",
    icon: Home,
    color: "text-accent-green",
    decoration: "bg-accent-green",
  },
  {
    label: "ABOUT",
    path: "/about",
    sectionId: "about",
    icon: User,
    color: "text-accent-pink",
    decoration: "bg-accent-pink",
  },
  {
    label: "SKILLS",
    path: "/skills",
    sectionId: "skills",
    icon: Code,
    color: "text-accent-purple",
    decoration: "bg-accent-purple",
  },
  {
    label: "PROJECTS",
    path: "/projects",
    sectionId: "projects",
    icon: FolderKanban,
    color: "text-accent-blue",
    decoration: "bg-accent-blue",
  },
  {
    label: "CONTACT",
    path: "/contact",
    sectionId: "contact",
    icon: MessageSquare,
    color: "text-accent-orange",
    decoration: "bg-accent-orange",
  },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const isPortfolioPage = pathname === "/";

  // ── Scroll spy — horizontal container as IntersectionObserver root ──
  useEffect(() => {
    if (!isPortfolioPage) return;

    const container = document.getElementById("portfolio-scroll-container");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      {
        root: container, // observe within the horizontal scroll container
        threshold: 0.5,
      },
    );

    NAV_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isPortfolioPage]);

  // ── Glass effect: track horizontal scroll on the snap container ──
  useEffect(() => {
    if (!isPortfolioPage) {
      // On sub-pages use window scroll as normal
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // On portfolio page, watch the horizontal container's scrollLeft
    const container = document.getElementById("portfolio-scroll-container");
    if (!container) return;
    const handleScroll = () => setScrolled(container.scrollLeft > 20);
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isPortfolioPage]);

  // ── Body scroll lock on mobile menu ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ── Navigation handler (horizontal scroll) ──
  const handleNavClick = useCallback(
    (item: NavItem, closeMenu = false) => {
      if (closeMenu) setIsOpen(false);

      if (isPortfolioPage) {
        const container = document.getElementById("portfolio-scroll-container");
        const section = document.getElementById(item.sectionId);
        if (container && section) {
          // Scroll horizontally to the section's left offset within the container
          container.scrollTo({
            left: section.offsetLeft,
            behavior: "smooth",
          });
        }
      } else {
        navigate(item.path);
      }
    },
    [isPortfolioPage, navigate],
  );

  // ── Active state logic ──
  const isItemActive = (item: NavItem) => {
    if (isPortfolioPage) {
      return activeSection === item.sectionId;
    }
    return pathname === item.path;
  };

  return (
    <div className="w-full">
      <nav
        className={`max-w-7xl mx-auto z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 pointer-events-none ${
          scrolled ? "py-3" : "bg-transparent"
        }`}
      >
        {/* ── Logo ── */}
        <div className="pointer-events-auto">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="p-1.5 bg-accent-green text-background rounded-sm">
              <Terminal size={18} />
            </div>
            <span className="font-semibold tracking-tighter text-xl group-hover:text-accent-green transition-colors">
              NAIM<span className="text-accent-green">/DEV</span>
            </span>
          </Link>
        </div>

        {/* ── Desktop Navigation ── */}
        <div className="hidden md:flex gap-6 pointer-events-auto bg-background/80 backdrop-blur-md px-8 py-3.5 border border-white/5 rounded-full">
          {NAV_ITEMS.map((item) => {
            const isActive = isItemActive(item);
            const Icon = item.icon;
            return (
              <div key={item.sectionId} className="relative group">
                <motion.button
                  onClick={() => handleNavClick(item)}
                  whileHover={{ y: -2 }}
                  className={`flex items-center gap-1.5 text-xs font-semibold tracking-widest transition-colors uppercase cursor-pointer ${
                    isActive ? item.color : "text-foreground/60"
                  } hover:${item.color}`}
                >
                  <Icon
                    size={13}
                    className={`transition-transform ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />
                  {item.label}
                </motion.button>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${item.decoration}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Right side controls ── */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="hidden md:flex flex-col items-end gap-0.5">
            <span className="text-[10px] font-semibold text-accent-green leading-none tracking-widest">
              SYSTEM ACTIVE
            </span>
            <span className="text-[8px] font-mono text-foreground/40 uppercase tracking-widest">
              Load: 0.24ms
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden w-10 h-10 border border-accent-green/30 flex items-center justify-center bg-accent-green/5 hover:bg-accent-green/20 transition-colors cursor-pointer z-50 relative"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? (
                  <X size={20} className="text-accent-green" />
                ) : (
                  <Menu size={20} className="text-accent-green" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Status dot (Desktop) */}
          <div className="hidden md:flex w-10 h-10 border border-accent-green/30 items-center justify-center bg-accent-green/5 hover:bg-accent-green/20 transition-colors cursor-pointer">
            <div className="w-2 h-2 bg-accent-green animate-pulse" />
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-screen Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            {/* Scanline decoration */}
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
              }}
            />

            <div className="relative flex flex-col gap-6 w-full max-w-xs px-6">
              {/* Menu header */}
              <div className="mb-4 border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono text-accent-green tracking-widest uppercase">
                  &gt; NAVIGATION_MENU
                </span>
              </div>

              {NAV_ITEMS.map((item, i) => {
                const isActive = isItemActive(item);
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.sectionId}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, ease: "easeOut" }}
                  >
                    <button
                      onClick={() => handleNavClick(item, true)}
                      className={`w-full flex items-center gap-4 text-2xl font-semibold uppercase tracking-tighter transition-colors cursor-pointer ${
                        isActive
                          ? item.color
                          : "text-foreground/40 hover:text-foreground/80"
                      }`}
                    >
                      <Icon size={24} />
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileTab"
                          className={`w-2 h-2 rounded-none ml-auto ${item.decoration}`}
                        />
                      )}
                    </button>
                  </motion.div>
                );
              })}

              {/* Mobile footer */}
              <div className="mt-8 border-t border-white/10 pt-6 flex justify-between items-center">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-semibold text-accent-green leading-none tracking-widest">
                    SYSTEM STATUS
                  </span>
                  <span className="text-xs font-mono text-foreground/60">
                    ONLINE
                  </span>
                </div>
                <div className="w-2 h-2 bg-accent-green animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
