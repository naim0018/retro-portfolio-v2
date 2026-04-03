import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import SectionTitle from "../Components/SectionTitle";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { projects } from "./ProjectData";
export default function ProjectsPage() {
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
    <main className="container mx-auto px-6 py-20 pb-12 max-w-7xl h-full flex flex-col justify-center">
      <section className="flex-1 flex flex-col justify-center min-h-0 container mx-auto gap-8 py-8 lg:py-0 ">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end shrink-0">
          <SectionTitle
            directory="DIRECTORY: /PROJECTS"
            title="ARCHIVED"
            highlightedText="SESSIONS"
            className=""
          />
          <p className="text-foreground/50 text-xs sm:text-sm lg:text-base font-mono leading-relaxed max-w-2xl">
            A curated list of tactical web deployments and technical research
            projects. All sessions are encrypted and stored in the decentralized
            neural network.
          </p>
        </div>
        {/* Main Project Slider Container */}
        <div className="relative flex-1 min-h-0 flex flex-col justify-start gap-8">
          {/* Shared Navigation Header */}
          <div className="z-20 pointer-events-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-end gap-6 lg:gap-10 ">
            <div className="flex items-center justify-end gap-4 bg-background/80 p-2 px-4 border border-white/10 backdrop-blur-md self-end lg:self-auto">
              <button className="project-nav-prev p-1 hover:text-accent-green transition-colors cursor-pointer group">
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
              <div className="project-pagination flex gap-2"></div>
              <button className="project-nav-next p-1 hover:text-accent-green transition-colors cursor-pointer group">
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <div className="w-px h-6 bg-white/20 mx-2" />
              {/* Autoplay Progress Indicator */}
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
                      className="stroke-accent-green fill-none transition-all duration-100"
                      strokeWidth="2"
                      style={{
                        strokeDasharray: "88",
                        strokeDashoffset: "calc(88 * (1 - var(--progress, 0)))",
                      }}
                    />
                  </svg>
                  <span
                    ref={progressContent}
                    className="absolute text-[8px] text-accent-green font-bold"
                  ></span>
                </div>
                <span className="hidden lg:inline opacity-60 uppercase font-bold tracking-tighter">
                  Next_Session
                </span>
              </div>
            </div>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            onSlideChange={(swiper: any) => setActiveIdx(swiper.realIndex)}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
              },
            }}
            loop={true}
            watchSlidesProgress={true}
            grabCursor={true}
            navigation={{
              nextEl: ".project-nav-next",
              prevEl: ".project-nav-prev",
            }}
            pagination={{
              clickable: true,
              el: ".project-pagination",
              renderBullet: (_index: number, className: string) => {
                return `<span class="${className} custom-project-bullet"></span>`;
              },
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="w-full !h-auto pb-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id} className="!h-auto border">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-background border p-6 flex flex-col gap-6 hover:bg-white/2 transition-all h-full"
                  style={{ borderColor: `${project.color}33` }}
                >
                  {/* Retro CRT Scanline Overlay inside card */}
                  <div
                    className="absolute inset-0 bg-linear-to-b from-transparent pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${project.color}05, transparent)`,
                    }}
                  />
                  <div className="flex justify-between items-start">
                    <span
                      className="text-xs font-mono px-3 py-1 border"
                      style={{
                        borderColor: project.color,
                        color: project.color,
                      }}
                    >
                      {project.status}
                    </span>
                    <span className="text-xs font-mono opacity-30">
                      SESSION_ID_00{projects.indexOf(project) + 1}
                    </span>
                  </div>
                  <div className="space-y-3 flex-1 max-h-full">
                    <h3
                      className="text-xl font-black uppercase tracking-tight transition-colors"
                      style={{ color: project.color }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold uppercase tracking-widest px-2 py-1"
                        style={{
                          backgroundColor: `${project.color}1A`,
                          color: project.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4 mt-auto border-t border-white/5">
                    <Link
                      to={`/project/${project.id}`}
                      className="flex items-center gap-2 text-xs font-bold hover:underline decoration-2 underline-offset-4 transition-all hover:gap-3 underline"
                      style={{ color: project.color }}
                    >
                      <ArrowUpRight size={14} />
                      LEARN_MORE
                    </Link>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold hover:underline decoration-2 underline-offset-4 transition-all hover:gap-3"
                      style={{ color: project.color }}
                    >
                      <ExternalLink size={14} />
                      LIVE_DEMO
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold text-foreground/40 hover:text-foreground transition-all hover:gap-3"
                    >
                      <Github size={14} />
                      REPOSITORY
                    </a>
                  </div>
                  {/* Corner Brackets */}
                  <div
                    className="absolute top-0 left-0 w-2 h-2 border-t border-l"
                    style={{ borderColor: `${project.color}66` }}
                  />
                  <div
                    className="absolute top-0 right-0 w-2 h-2 border-t border-r"
                    style={{ borderColor: `${project.color}66` }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2 h-2 border-b border-l"
                    style={{ borderColor: `${project.color}66` }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
                    style={{ borderColor: `${project.color}66` }}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Status Footer */}
        <div className="flex justify-between items-center font-mono text-[10px] opacity-30 uppercase tracking-[0.2em] shrink-0 pt-4 border-t border-white/5">
          <div className="flex gap-4">
            <span>
              SESSION_ID: {(activeIdx + 1).toString().padStart(2, "0")}
            </span>
            <span>STATUS: ARCHIVED</span>
          </div>
          <span className="animate-pulse">
            Connection_Active: Secure_Link_Established
          </span>
        </div>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-project-bullet {
          width: 8px !important;
          height: 8px !important;
          border: 1px solid var(--accent-green);
          background: transparent !important;
          border-radius: 0 !important;
          opacity: 0.3 !important;
          transition: all 0.3s ease;
          display: inline-block;
          margin: 0 4px !important;
          cursor: pointer;
        }
        .custom-project-bullet.swiper-pagination-bullet-active {
          background: var(--accent-green) !important;
          border-color: var(--accent-green);
          opacity: 1 !important;
          transform: rotate(45deg);
        }
        .swiper-button-disabled {
          opacity: 0.1 !important;
          cursor: not-allowed !important;
        }
        .project-pagination {
          display: flex !important;
        }
      `,
        }}
      />
    </main>
  );
}
