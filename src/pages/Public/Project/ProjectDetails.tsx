import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "./ProjectData";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Activity,
  Monitor,
  Database,
  Terminal,
  Code2,
  Zap,
} from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center font-mono bg-black text-white p-6 text-center">
        <h1 className="text-3xl text-accent-pink mb-4 font-black tracking-tighter">
          404_VOID
        </h1>
        <Link
          to="/"
          className="px-6 py-2 border border-white/10 hover:border-accent-pink text-[10px] font-black tracking-[0.3em] backdrop-blur-md transition-all"
        >
          REBOOT_SYSTEM
        </Link>
      </div>
    );
  }

  return (
    <main className="h-screen w-full bg-[#050505] text-foreground selection:bg-white selection:text-black overflow-hidden relative text-xs uppercase tracking-widest pt-12 md:pt-0">
      {/* HUD Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)]" />
        <div className="absolute top-0 left-[25%] w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 left-[50%] w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 left-[75%] w-px h-full bg-white/[0.02]" />
      </div>

      <div className="h-full w-full flex flex-col relative z-10 border border-white/5 md:border-none overflow-auto md:overflow-hidden">
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-[9px] font-black opacity-40 hover:opacity-100 transition-all group"
          >
            <ArrowLeft
              size={12}
              className="group-hover:-translate-x-1 transition-transform"
            />
            BACK_ARCHIVES
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[8px] opacity-30">
            <span className="flex items-center gap-2">
              <Activity size={10} /> LINK_STABLE
            </span>
            <span>ID: {project.id}</span>
            <span style={{ color: project.color }}>MNTR_ACTIVE</span>
          </div>
        </div>

        {/* COMPACT DASHBOARD GRID */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden border-b border-white/5">
          {/* LEFT COLUMN: Dossier Control */}
          <div className="w-full md:w-[400px] lg:w-[480px] xl:w-[540px] flex flex-col border-r border-white/5 bg-white/[0.01] backdrop-blur-sm">
            <div className="p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto no-scrollbar scroll-smooth">
              {/* Title HUD */}
              <div className="space-y-2 mb-10">
                <span className="text-[8px] opacity-30 tracking-[0.4em]">
                  Project_Dossier_0{projects.indexOf(project) + 1}
                </span>
                <h1
                  className="text-3xl lg:text-5xl font-black tracking-tighter leading-[0.9] break-words"
                  style={{ color: project.color }}
                >
                  {project.title}
                </h1>
              </div>

              {/* Stats Mini Matrix */}
              <div className="grid grid-cols-2 gap-4 pb-8 border-b border-white/5">
                <MiniStat
                  label="Status"
                  value={project.status}
                  color={project.color}
                />
                <MiniStat label="Revision" value="2.4.92" color="white" />
                <MiniStat label="Visibility" value="Public" color="white" />
                <MiniStat label="Reliability" value="99.9%" color="white" />
              </div>

              {/* Information Feed */}
              <div className="space-y-10 pt-4">
                <section className="space-y-4">
                  <h2 className="text-[9px] font-black opacity-30 flex items-center gap-2">
                    <Terminal size={12} /> Overview_Data
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-white/70 font-medium normal-case tracking-normal">
                    {project.details}
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-[9px] font-black opacity-30 flex items-center gap-2">
                    <Zap size={12} color={project.color} /> Core_Capabilities
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {project.features?.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-[10px] font-black tracking-tight group"
                      >
                        <span
                          className="w-1 h-1 rotate-45 flex-shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-6 pb-10">
                  <h2 className="text-[9px] font-black opacity-30 flex items-center gap-2">
                    <Database size={12} /> Tech_Matrix
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((t, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-2 border text-[9px] font-black tracking-[0.2em] relative overflow-hidden transition-all bg-black/40"
                        style={{
                          borderColor: `${project.color}44`,
                          color: project.color,
                          boxShadow: `0 0 15px ${project.color}11`,
                        }}
                      >
                        {/* Glow effect on tag */}
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="relative z-10">{t.toUpperCase()}</span>

                        {/* Corner accent */}
                        <div
                          className="absolute top-0 right-0 w-1.5 h-1.5"
                          style={{ backgroundColor: project.color }}
                        />
                      </motion.span>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Action Hub - Compact Footer */}
            <div className="px-6 lg:px-8 py-6 border-t border-white/5 grid grid-cols-2 gap-4 bg-black/40">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 border flex items-center justify-center gap-3 text-[9px] font-black tracking-[0.3em] transition-all hover:bg-white hover:text-black"
                style={{
                  borderColor: `${project.color}33`,
                  color: project.color,
                }}
              >
                <ExternalLink size={14} />
                LIVE_FEED
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 border border-white/10 flex items-center justify-center gap-3 text-[9px] font-black tracking-[0.3em] transition-all hover:bg-white hover:text-black opacity-40 hover:opacity-100"
              >
                <Github size={14} />
                SOURCE
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Monitoring (Integrated Feed) */}
          <div className="flex-1 min-h-0 bg-[#080808] flex flex-col">
            <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between text-[8px] font-black tracking-[0.4em] opacity-30">
              <span className="flex items-center gap-2">
                <Monitor size={12} /> Visual_Telemetry_Stream
              </span>
              <span>NODES_ACTIVE [02/02]</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth p-6 lg:p-10 space-y-10">
              {project.images?.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="relative group border border-white/5 bg-black"
                >
                  {/* Data Overlay */}
                  <div className="absolute top-4 left-4 z-20 px-2 py-1 bg-black/80 backdrop-blur-md text-[7px] font-mono tracking-[0.2em] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    IMG_CAPTURE_0{i + 1} // {project.id.toUpperCase()}
                  </div>

                  <img
                    src={img}
                    alt="Project Preview"
                    className="w-full h-auto opacity-50 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 grayscale group-hover:grayscale-0"
                  />

                  {/* Corner Decoration */}
                  <div
                    className="absolute top-2 right-2 w-4 h-4 border-t border-r opacity-20 group-hover:opacity-100 transition-all"
                    style={{ borderColor: project.color }}
                  />
                  <div
                    className="absolute bottom-2 left-2 w-4 h-4 border-b border-l opacity-20 group-hover:opacity-100 transition-all"
                    style={{ borderColor: project.color }}
                  />
                </motion.div>
              ))}

              {/* Technical Placeholder for empty space */}
              <div className="p-20 border border-dashed border-white/5 flex flex-col items-center justify-center space-y-4 opacity-10">
                <Code2 size={40} />
                <span className="text-[8px] tracking-[1em]">
                  END_OF_DOCUMENTATION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global HUD Bottom Terminal Status */}
        <div className="px-6 py-3 flex items-center justify-between text-[7px] font-mono opacity-10 uppercase tracking-[0.3em] bg-black">
          <div className="flex gap-6">
            <span>LAT: 23.81</span>
            <span>LONG: 90.41</span>
            <span>TIME: 14:06:52_GMT</span>
          </div>
          <div className="hidden sm:flex gap-6">
            <span>BITRATE_9200_KBPS</span>
            <span>MEM_ALLOC [84.2MB]</span>
            <span>NAIM_INTERFACE_CORP</span>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </main>
  );
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[7px] opacity-20 block tracking-[0.2em]">
        {label}
      </span>
      <span className="text-[10px] font-black break-words" style={{ color }}>
        {value}
      </span>
    </div>
  );
}
