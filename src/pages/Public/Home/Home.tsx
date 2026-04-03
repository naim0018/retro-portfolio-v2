import Hero3D from "../Components/Hero3D";

export default function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 pb-8 lg:pb-12 max-w-7xl h-full flex flex-col justify-center -mt-24">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center flex-1 py-8 lg:py-0">
        <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left w-full">
          <div className="space-y-2 lg:space-y-4">
            <span className="text-accent-green font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] font-bold uppercase animate-pulse block">
              &gt; INITIALIZING_DEVELOPER_SESSION...
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none">
              MD. KAZI
              <span className="text-accent-blue retro-glow italic lg:inline">
                {" "}
                NAIM
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            I am a passionate web developer with a strong foundation in{" "}
            <span className="text-accent-pink">full-stack development</span>. My
            journey in programming started with solving complex problems, and
            now I channel that analytical mindset into creating{" "}
            <span className="text-accent-orange">elegant web solutions</span>.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 lg:pt-4">
            <a
              href="https://drive.google.com/file/d/1S2dnVLAzqSrf_jC-eue_UeCqzges5Dtd/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="retro-button-3d cursor-pointer text-xs sm:text-sm">
                VIEW_RESUME
              </button>
            </a>
            <button
              onClick={() => {
                const container = document.getElementById(
                  "portfolio-scroll-container",
                );
                const section = document.getElementById("contact");
                if (container && section) {
                  container.scrollTo({
                    left: section.offsetLeft,
                    behavior: "smooth",
                  });
                }
              }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-white/10 hover:border-accent-pink hover:text-accent-pink transition-all font-bold tracking-widest text-[10px] sm:text-xs uppercase cursor-pointer"
            >
              GET_IN_TOUCH
            </button>
          </div>

          {/* Quick Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 border border-white/5 bg-white/1 backdrop-blur-md mt-4 lg:mt-0">
            <div className="flex flex-col p-2 bg-white/2 rounded">
              <span className="text-[8px] md:text-[9px] text-accent-green/60 font-mono uppercase tracking-wider md:tracking-widest truncate">
                Repositories
              </span>
              <span className="text-base md:text-xl font-black text-accent-green">
                50+
              </span>
            </div>
            <div className="flex flex-col p-2 bg-white/2 rounded">
              <span className="text-[8px] md:text-[9px] text-accent-blue/60 font-mono uppercase tracking-wider md:tracking-widest truncate">
                Commits/Year
              </span>
              <span className="text-base md:text-xl font-black text-accent-blue">
                1.2k+
              </span>
            </div>
            <div className="flex flex-col p-2 bg-white/2 rounded">
              <span className="text-[8px] md:text-[9px] text-accent-pink/60 font-mono uppercase tracking-wider md:tracking-widest truncate">
                APIs
              </span>
              <span className="text-base md:text-xl font-black text-accent-pink">
                200+
              </span>
            </div>
            <div className="flex flex-col p-2 bg-white/2 rounded">
              <span className="text-[8px] md:text-[9px] text-accent-orange/60 font-mono uppercase tracking-wider md:tracking-widest truncate">
                Performance
              </span>
              <span className="text-base md:text-xl font-black text-accent-orange">
                90+
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-md aspect-square relative group mt-8 lg:mt-0">
          <div className="absolute inset-0 border-2 border-dashed border-accent-blue/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-8 border border-accent-pink/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <Hero3D />
        </div>
      </section>
    </main>
  );
}
