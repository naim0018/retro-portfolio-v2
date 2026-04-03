import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import RetroBackground from "../Components/RetroBackground";
import Navbar from "../Components/Navbar";
import Home from "../Home/Home";
import About from "../About/About";
import Skill from "../Skill/Skill";
import Project from "../Project/Project";
import Contact from "../Contact/Contact";

const SECTIONS = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

// const SECTION_COLORS = [
//   "bg-accent-green",
//   "bg-accent-pink",
//   "bg-accent-purple",
//   "bg-accent-blue",
//   "bg-accent-orange",
// ];

const SECTION_TEXT_COLORS = [
  "text-accent-green",
  "text-accent-pink",
  "text-accent-purple",
  "text-accent-blue",
  "text-accent-orange",
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showHint, setShowHint] = useState(true);

  // ── Slide to a section by index ──
  const slideTo = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(idx, SECTIONS.length - 1));
    container.scrollTo({
      left: clamped * container.clientWidth,
      behavior: "smooth",
    });
  };

  // ── Map vertical wheel → horizontal snap scroll ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;
      const delta = e.deltaY || e.deltaX;
      const currentIdx = Math.round(
        container.scrollLeft / container.clientWidth,
      );
      slideTo(delta > 0 ? currentIdx + 1 : currentIdx - 1);
      setTimeout(() => {
        isScrolling = false;
      }, 700);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Track active section on scroll ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const idx = Math.round(container.scrollLeft / container.clientWidth);
      setActiveIdx(idx);
      if (idx > 0) setShowHint(false);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // ── Arrow key navigation ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        slideTo(activeIdx + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        slideTo(activeIdx - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  // ── Hide scroll hint after 4s ──
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);
  //
  // const canGoLeft = activeIdx > 0;
  // const canGoRight = activeIdx < SECTIONS.length - 1;
  const activeColor = SECTION_TEXT_COLORS[activeIdx];
  // const activeBg = SECTION_COLORS[activeIdx];

  return (
    <RetroBackground>
      <Navbar />

      {/* ── Horizontal snap-scroll container ── */}
      <div
        ref={containerRef}
        id="portfolio-scroll-container"
        className="flex flex-row h-screen w-screen overflow-x-scroll snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        <section
          id="home"
          className="h-screen w-screen shrink-0 snap-start relative"
        >
          <Home />
        </section>
        <section
          id="about"
          className="h-screen w-screen shrink-0 snap-start relative"
        >
          <About />
        </section>
        <section
          id="skills"
          className="h-screen w-screen shrink-0 snap-start relative"
        >
          <Skill />
        </section>
        <section
          id="projects"
          className="h-screen w-screen shrink-0 snap-start relative"
        >
          <Project />
        </section>
        <section
          id="contact"
          className="h-screen w-screen shrink-0 snap-start relative"
        >
          <Contact />
        </section>
      </div>

      {/* ── Left arrow ── */}
      {/* <AnimatePresence>
        {canGoLeft && (
          <motion.button
            key="left"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            onClick={() => slideTo(activeIdx - 1)}
            aria-label="Previous section"
            className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center border border-white/10 bg-background/60 backdrop-blur-md hover:border-white/30 transition-all cursor-pointer group"
          >
            <ChevronLeft
              size={18}
              className={`${activeColor} group-hover:scale-110 transition-transform`}
            />
          </motion.button>
        )}
      </AnimatePresence> */}

      {/* ── Right arrow ── */}
      {/* <AnimatePresence>
        {canGoRight && (
          <motion.button
            key="right"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => slideTo(activeIdx + 1)}
            aria-label="Next section"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center border border-white/10 bg-background/60 backdrop-blur-md hover:border-white/30 transition-all cursor-pointer group"
          >
            <ChevronRight
              size={18}
              className={`${activeColor} group-hover:scale-110 transition-transform`}
            />
          </motion.button>
        )}
      </AnimatePresence> */}

      {/* ── Section dots ── */}
      {/* <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5">
        {SECTIONS.map(({ id, label }, i) => (
          <button
            key={id}
            aria-label={`Go to ${label}`}
            onClick={() => slideTo(i)}
            title={label}
            className={`transition-all duration-300 cursor-pointer ${
              i === activeIdx
                ? `w-8 h-1.5 ${activeBg}`
                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/50"
            }`}
          />
        ))}
      </div> */}

      {/* ── Slide counter ── */}
      <div
        className={`fixed bottom-6 right-16 z-50 font-mono text-[10px] uppercase tracking-widest select-none transition-colors duration-500 ${activeColor} opacity-40`}
      >
        {String(activeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;
        {String(SECTIONS.length).padStart(2, "0")}
      </div>

      {/* ── Current section label ── */}
      <div
        className={`fixed bottom-6 left-6 z-50 font-mono text-[10px] uppercase tracking-widest select-none transition-colors duration-500 ${activeColor} opacity-40`}
      >
        &gt;&nbsp;{SECTIONS[activeIdx].label}
      </div>

      {/* ── Scroll hint (shown for 4s on load) ── */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="fixed bottom-16 right-4 z-50 flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <span className="text-[9px] font-mono text-foreground/30 uppercase tracking-widest">
              scroll
            </span>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <ChevronRight size={14} className="text-foreground/30" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </RetroBackground>
  );
}
