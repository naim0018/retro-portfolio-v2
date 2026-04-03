/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "../Components/SectionTitle";
import TechCard from "../Components/TechCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
const skillCategories = [
  {
    title: "Frontend_Stack",
    description: "User interface architecture and client-side logic modules.",
    skills: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        level: 98,
        color: "var(--accent-orange)",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        level: 95,
        color: "var(--accent-blue)",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        level: 92,
        color: "var(--accent-green)",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: 95,
        color: "var(--accent-blue)",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        level: 90,
        color: "var(--accent-pink)",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        level: 92,
        color: "var(--accent-blue)",
      },
      {
        name: "Redux Toolkit",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        level: 85,
        color: "var(--accent-purple)",
      },
    ],
  },
  {
    title: "Backend_Systems",
    description:
      "Server-side architecture, database management, and API design.",
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        level: 80,
        color: "var(--accent-green)",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        level: 82,
        color: "var(--accent-orange)",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: 78,
        color: "var(--accent-green)",
      },
      {
        name: "Zod",
        icon: "https://zod.dev/logo.svg",
        level: 85,
        color: "var(--accent-blue)",
      },
      {
        name: "JWT Auth",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
        level: 88,
        color: "var(--accent-pink)",
      },
    ],
  },
  {
    title: "Version_Control",
    description: "Distributed version control and deployment orchestration.",
    skills: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        level: 88,
        color: "var(--accent-orange)",
      },
      {
        name: "Github",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        level: 88,
        color: "var(--accent-blue)",
      },
    ],
  },
  {
    title: "CMS_Tools",
    description: "Content management systems and visual development platforms.",
    skills: [
      {
        name: "Wix Studio",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wix/wix-original.svg",
        level: 90,
        color: "var(--accent-purple)",
      },
      {
        name: "Wix",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wix/wix-original.svg",
        level: 95,
        color: "var(--accent-blue)",
      },
    ],
  },
];
export default function SkillsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const progressCircle = useRef<SVGCircleElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const onAutoplayTimeLeft = (_s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress),
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <main className="container mx-auto px-6 py-20 pb-12 max-w-7xl h-full flex flex-col justify-center pt-42">
      <section className="flex-1 flex flex-col justify-center min-h-0 container mx-auto gap-4 py-8 lg:py-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 shrink-0 mb-8">
          <SectionTitle
            directory="DIRECTORY: /SKILLS"
            title="Modules_"
            highlightedText="Loaded"
            accentColor="pink"
            className="mb-0"
          />
          <p className="text-foreground/50 max-w-sm text-[10px] md:text-sm font-mono leading-relaxed">
            Optimized toolsets for creating robust, scalable, and visually
            stunning digital artifacts.
          </p>
        </div>
        <div className="relative flex-1 min-h-0 flex flex-col justify-center">
          <div className="w-full relative flex justify-end mb-2 md:mb-0 md:absolute md:top-0 md:right-0 md:w-auto z-50 pointer-events-auto">
            <div className="flex items-center gap-4 bg-background/80 p-2 px-4 border border-white/10 backdrop-blur-md">
              <button className="skill-nav-prev p-1 hover:text-accent-pink transition-colors cursor-pointer group">
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
              <div className="skill-pagination flex gap-2"></div>
              <button className="skill-nav-next p-1 hover:text-accent-pink transition-colors cursor-pointer group">
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <div className="w-px h-6 bg-white/20 mx-2" />
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      className="stroke-white/10 fill-none"
                      strokeWidth="2"
                    />
                    <circle
                      ref={progressCircle}
                      cx="16"
                      cy="16"
                      r="14"
                      className="stroke-accent-pink fill-none transition-all duration-100"
                      strokeWidth="2"
                      style={{
                        strokeDasharray: "88",
                        strokeDashoffset: "calc(88 * (1 - var(--progress, 0)))",
                      }}
                    />
                  </svg>
                  <span
                    ref={progressContent}
                    className="absolute text-[8px] text-accent-pink font-bold"
                  ></span>
                </div>
                <span className="hidden lg:inline opacity-60 uppercase font-bold tracking-tighter">
                  Next_Step
                </span>
              </div>
            </div>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            onSlideChange={(swiper: any) => setActiveIdx(swiper.realIndex)}
            loop={true}
            watchSlidesProgress={true}
            grabCursor={true}
            navigation={{
              nextEl: ".skill-nav-next",
              prevEl: ".skill-nav-prev",
            }}
            pagination={{
              clickable: true,
              el: ".skill-pagination",
              renderBullet: (_index: number, className: string) => {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            autoplay={{
              delay: 8000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="w-full h-full"
          >
            {skillCategories.map((category) => (
              <SwiperSlide
                key={category.title}
                className="flex flex-col justify-center"
              >
                <div className="space-y-4 mt-8 md:mt-0">
                  {/* Category Title Slide Content */}
                  <div className="space-y-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={category.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h2 className="text-lg md:text-xl font-black uppercase tracking-[0.2em] flex items-center gap-4">
                          <div className="w-12 h-1 bg-accent-blue" />
                          {category.title}
                        </h2>
                        <p className="text-[9px] md:text-sm font-mono text-foreground/40 uppercase tracking-[0.3em] mt-1">
                          {category.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 m-2">
                    {category.skills.map((tech, i) => (
                      <TechCard key={i} {...tech} keyTrigger={activeIdx} />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Status Footer */}
        <div className="flex justify-between items-center font-mono text-[10px] opacity-30 uppercase tracking-[0.2em] shrink-0 pt-2 border-t border-white/5">
          <div className="flex gap-4">
            <span>
              MODULE_ID: {(activeIdx + 1).toString().padStart(2, "0")}
            </span>
            <span>STATUS: STABLE</span>
          </div>
          <span className="animate-pulse hidden sm:inline">
            Session_Active: Encrypted_Link_Established
          </span>
        </div>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-bullet {
          width: 8px !important;
          height: 8px !important;
          border: 1px solid var(--accent-blue);
          background: transparent !important;
          border-radius: 0 !important;
          opacity: 0.3 !important;
          transition: all 0.3s ease;
          display: inline-block;
          margin: 0 4px !important;
          cursor: pointer;
        }
        .custom-bullet.swiper-pagination-bullet-active {
          background: var(--accent-pink) !important;
          border-color: var(--accent-pink);
          opacity: 1 !important;
          transform: rotate(45deg);
        }
        .swiper-button-disabled {
          opacity: 0.1 !important;
          cursor: not-allowed !important;
        }
        .skill-pagination {
          display: flex !important;
        }
      `,
        }}
      />
    </main>
  );
}
