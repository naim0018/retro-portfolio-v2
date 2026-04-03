import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "INITIALIZING BOOT SEQUENCE...",
  "ESTABLISHING HANDSHAKE...",
  "BYPASSING KERNEL RESTRICTIONS...",
  "UPLOADING CORE ASSETS...",
  "CLEANING TEMPORARY REGISTRY...",
  "ACCESSING BIOMETRIC DATA...",
  "DECRYPTING PORTFOLIO MODULES...",
  "SYNCHRONIZING WITH THE GRID...",
  "SYSTEM STABILIZED...",
  "WELCOME BACK, OPERATOR",
];

// ─── Particle System ───────────────────────────────────────────
const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 30}vh`],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #00ff88, transparent)`,
            boxShadow: `0 0 ${p.size * 3}px #00ff8866`,
          }}
        />
      ))}
    </div>
  );
};

// ─── Matrix Rain Column ────────────────────────────────────────
const MatrixColumn = ({ x, speed, chars }: { x: number; speed: number; chars: string }) => (
  <motion.div
    className="absolute top-0 font-pixel text-[10px] leading-[14px] text-accent-green/30 whitespace-pre pointer-events-none"
    style={{ left: `${x}%` }}
    initial={{ y: "-100%" }}
    animate={{ y: "100vh" }}
    transition={{ duration: speed, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
  >
    {chars.split("").map((char, i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.1, 0.6, 0.1] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        className="text-center"
        style={{
          textShadow: i === 0 ? "0 0 8px #00ff88" : "none",
          color: i === 0 ? "#00ff88" : undefined,
        }}
      >
        {char}
      </motion.div>
    ))}
  </motion.div>
);

const MatrixRain = () => {
  const columns = Array.from({ length: 15 }, (_, i) => {
    const chars = Array.from({ length: 12 }, () =>
      String.fromCharCode(0x30a0 + Math.random() * 96)
    ).join("");
    return { id: i, x: i * 7 + Math.random() * 3, speed: Math.random() * 6 + 4, chars };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 z-5">
      {columns.map((col) => (
        <MatrixColumn key={col.id} x={col.x} speed={col.speed} chars={col.chars} />
      ))}
    </div>
  );
};

// ─── Circular Progress Ring ────────────────────────────────────
const CircularProgress = ({ progress }: { progress: number }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mb-8">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        {/* Background track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#00ff8810"
          strokeWidth="1"
        />
        {/* Tick marks */}
        {Array.from({ length: 60 }, (_, i) => {
          const angle = (i * 6 * Math.PI) / 180;
          const isMajor = i % 5 === 0;
          const innerR = isMajor ? 44 : 46;
          return (
            <line
              key={i}
              x1={60 + innerR * Math.cos(angle)}
              y1={60 + innerR * Math.sin(angle)}
              x2={60 + 48 * Math.cos(angle)}
              y2={60 + 48 * Math.sin(angle)}
              stroke={i <= (progress / 100) * 60 ? "#00ff88" : "#00ff8820"}
              strokeWidth={isMajor ? 1.5 : 0.5}
            />
          );
        })}
        {/* Progress arc */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 6px #00ff8888)" }}
        />
        {/* Glow outer ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke="#00ff88"
          strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="50%" stopColor="#00ccff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl font-pixel text-accent-green drop-shadow-[0_0_10px_#00ff88]"
          animate={{ textShadow: ["0 0 10px #00ff88", "0 0 20px #00ff88", "0 0 10px #00ff88"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {progress === 100 ? "OK" : `${progress}%`}
        </motion.span>
        <span className="text-[7px] font-pixel text-accent-green/40 mt-1 tracking-widest">
          {progress === 100 ? "COMPLETE" : "LOADING"}
        </span>
      </div>

      {/* Rotating outer indicator */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-green rounded-full shadow-[0_0_8px_#00ff88]" />
      </motion.div>

      {/* Counter-rotating ring */}
      <motion.div
        className="absolute inset-[-4px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 right-0 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_6px_#00ccff]" />
        <div className="absolute bottom-0 left-1/2 w-0.5 h-0.5 bg-accent-green rounded-full" />
      </motion.div>
    </div>
  );
};

// ─── Sound Wave Visualizer ─────────────────────────────────────
const SoundWave = ({ active }: { active: boolean }) => {
  const bars = 24;
  return (
    <div className="flex items-center gap-[2px] h-6">
      {Array.from({ length: bars }, (_, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-accent-green/60 rounded-full"
          animate={{
            height: active
              ? [
                  `${4 + Math.random() * 4}px`,
                  `${8 + Math.random() * 16}px`,
                  `${4 + Math.random() * 4}px`,
                ]
              : "3px",
          }}
          transition={{
            duration: 0.4 + Math.random() * 0.3,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: active ? "0 0 4px #00ff8844" : "none",
          }}
        />
      ))}
    </div>
  );
};

// ─── Radar Sweep ───────────────────────────────────────────────
const RadarSweep = () => (
  <div className="absolute bottom-10 right-10 w-24 h-24 hidden lg:block">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Concentric circles */}
      {[20, 35, 50].map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#00ff8815" strokeWidth="0.5" />
      ))}
      {/* Cross lines */}
      <line x1="50" y1="0" x2="50" y2="100" stroke="#00ff8810" strokeWidth="0.5" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#00ff8810" strokeWidth="0.5" />
      {/* Sweep */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
        <line x1="50" y1="50" x2="50" y2="0" stroke="#00ff8866" strokeWidth="1" />
        <path d="M50,50 L50,0 A50,50 0 0,1 93.3,25 Z" fill="url(#sweepGrad)" />
      </motion.g>
      {/* Blips */}
      {[
        { cx: 35, cy: 30, delay: 0 },
        { cx: 65, cy: 40, delay: 1 },
        { cx: 45, cy: 60, delay: 2 },
      ].map((blip, i) => (
        <motion.circle
          key={i}
          cx={blip.cx}
          cy={blip.cy}
          r="2"
          fill="#00ff88"
          animate={{ opacity: [0, 1, 0], r: [1, 2.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: blip.delay }}
          style={{ filter: "drop-shadow(0 0 3px #00ff88)" }}
        />
      ))}
      <defs>
        <radialGradient id="sweepGrad">
          <stop offset="0%" stopColor="#00ff8830" />
          <stop offset="100%" stopColor="#00ff8800" />
        </radialGradient>
      </defs>
    </svg>
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] font-pixel text-accent-green/30 tracking-widest">
      RADAR
    </div>
  </div>
);

// ─── Hexagonal Grid ────────────────────────────────────────────
const HexGrid = () => {
  const hexagons = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 15,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute"
          style={{ left: `${hex.x}%`, top: `${hex.y}%` }}
          animate={{
            opacity: [0.05, 0.4, 0.05],
            scale: [0.8, 1.1, 0.8],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: hex.delay,
            ease: "easeInOut",
          }}
        >
          <svg width={hex.size} height={hex.size} viewBox="0 0 100 100">
            <polygon
              points="50,2 95,25 95,75 50,98 5,75 5,25"
              fill="none"
              stroke="#00ff88"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// ─── Data Stream Sidebar ───────────────────────────────────────
const DataStream = ({ side }: { side: "left" | "right" }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const generateLine = () => {
      const types = [
        () => `0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`,
        () => `[${Math.floor(Math.random() * 999)}] ACK`,
        () => `SYN >> ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        () => `CHK: ${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        () => `PKT_${Math.floor(Math.random() * 9999)} OK`,
        () => `│ ${"█".repeat(Math.floor(Math.random() * 8))}`,
      ];
      return types[Math.floor(Math.random() * types.length)]();
    };

    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, generateLine()];
        return next.slice(-14);
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-6" : "right-6"} 
      hidden xl:flex flex-col gap-[2px] ${side === "right" ? "text-right items-end" : "items-start"}`}
    >
      <div className="text-[7px] font-pixel text-accent-green/40 tracking-[0.3em] mb-2 uppercase">
        {side === "left" ? "◄ STREAM.IN" : "STREAM.OUT ►"}
      </div>
      {lines.map((line, i) => (
        <motion.div
          key={`${line}-${i}`}
          initial={{ opacity: 0, x: side === "left" ? -10 : 10 }}
          animate={{ opacity: i === lines.length - 1 ? 0.6 : 0.15 }}
          className="text-[8px] font-pixel text-accent-green whitespace-nowrap"
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

// ─── DNA Helix Animation ───────────────────────────────────────
const DNAHelix = () => (
  <div className="absolute left-1/2 -translate-x-1/2 bottom-20 hidden md:block">
    <div className="flex items-center gap-1">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <motion.div
            className="w-1 h-1 rounded-full bg-accent-green"
            animate={{
              y: [0, -8, 0, 8, 0],
              opacity: [0.3, 1, 0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
            style={{ boxShadow: "0 0 4px #00ff88" }}
          />
          <motion.div
            className="w-[1px] bg-accent-green/20"
            animate={{
              height: ["8px", "16px", "8px"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
          <motion.div
            className="w-1 h-1 rounded-full bg-cyan-400"
            animate={{
              y: [0, 8, 0, -8, 0],
              opacity: [0.3, 0.6, 0.3, 1, 0.3],
              scale: [0.8, 1, 0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
            style={{ boxShadow: "0 0 4px #00ccff" }}
          />
        </div>
      ))}
    </div>
  </div>
);

// ─── Warning Flash Banner ──────────────────────────────────────
const WarningBanner = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0, scaleX: 0 }}
        className="absolute top-1/2 left-0 right-0 z-30 flex items-center justify-center"
      >
        <div className="bg-red-500/5 border-y border-red-500/20 px-8 py-1 w-full text-center">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-[9px] font-pixel text-red-400/60 tracking-[0.5em]"
          >
            ⚠ SECURITY SCAN IN PROGRESS ⚠
          </motion.span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Log History ───────────────────────────────────────────────
const LogHistory = ({ currentIndex }: { currentIndex: number }) => (
  <div className="mt-6 w-80">
    <div className="border border-accent-green/10 rounded-sm bg-accent-green/[0.02] p-3">
      <div className="text-[7px] font-pixel text-accent-green/30 tracking-[0.3em] mb-2 flex items-center gap-2">
        <span>SYSTEM LOG</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-accent-green"
        >
          ●
        </motion.span>
      </div>
      <div className="space-y-[2px] max-h-20 overflow-hidden">
        {MESSAGES.slice(0, currentIndex + 1).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i === currentIndex ? 0.8 : 0.2 }}
            className="text-[7px] font-pixel text-accent-green flex gap-2"
          >
            <span className="text-accent-green/20">
              {String(i).padStart(2, "0")}
            </span>
            <span className={i < currentIndex ? "line-through text-accent-green/15" : ""}>
              {i < currentIndex ? msg.replace("...", " ✓") : i === currentIndex ? msg : ""}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Preloader ────────────────────────────────────────────
const Preloader = () => {
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [warningFlash, setWarningFlash] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setElapsedTime((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150 + Math.random() * 150);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Warning flash
  useEffect(() => {
    const warningTimeout = setTimeout(() => {
      setWarningFlash(true);
      setTimeout(() => setWarningFlash(false), 2500);
    }, 4000);
    return () => clearTimeout(warningTimeout);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentMsg = MESSAGES[msgIndex];
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex <= currentMsg.length) {
        setText(currentMsg.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          if (msgIndex < MESSAGES.length - 1) {
            setMsgIndex((prev) => prev + 1);
          }
        }, 600);
      }
    }, 25);
    return () => clearInterval(typingInterval);
  }, [msgIndex]);

  // Progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 2) + 1;
        return next > 100 ? 100 : next;
      });
    }, 80);
    return () => clearInterval(progressInterval);
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030808] overflow-hidden font-retro"
    >
      {/* ── BACKGROUND LAYERS ── */}
      <HexGrid />
      <MatrixRain />
      <FloatingParticles />

      {/* CRT Scanlines */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-20 scanlines" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Primary Scan Line */}
      <motion.div
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-green/50 to-transparent z-40 shadow-[0_0_20px_#00ff88]"
      />

      {/* Secondary Scan Line (opposite direction, different color) */}
      <motion.div
        animate={{ bottom: ["-5%", "105%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent z-40 shadow-[0_0_12px_#00ccff]"
      />

      {/* ── PERIPHERAL HUD ── */}
      <DataStream side="left" />
      <DataStream side="right" />
      <RadarSweep />
      <DNAHelix />
      <WarningBanner show={warningFlash} />

      {/* Top-left Stats */}
      <div className="absolute top-8 left-8 text-accent-green/25 text-[8px] font-pixel space-y-1.5 hidden md:block">
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
          ┌─ SYSTEM DIAGNOSTICS ─┐
        </motion.div>
        <div>│ CORE_TEMP: {32 + Math.floor(progress * 0.15)}°C</div>
        <div>│ VOLTAGE: {(1.2 + progress * 0.003).toFixed(3)}V</div>
        <div>│ MEM_ALLOC: {Math.floor(progress * 1.6)}/160 GB</div>
        <div>│ CPU_LOAD: {Math.min(progress + 15, 99)}%</div>
        <div>│ THREADS: {Math.floor(progress / 10) + 2} ACTIVE</div>
        <div>│ STATUS: <span className="text-accent-green">ACTIVE</span></div>
        <div>└──────────────────────┘</div>
      </div>

      {/* Top-right Stats */}
      <div className="absolute top-8 right-8 text-accent-green/25 text-[8px] font-pixel space-y-1.5 text-right hidden md:block">
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
          ┌─ NETWORK STATUS ──────┐
        </motion.div>
        <div>CONNECTION: ENCRYPTED │</div>
        <div>PROTOCOL: AES-256-X77 │</div>
        <div>LATENCY: {12 + Math.floor(Math.random() * 5)}ms │</div>
        <div>UPTIME: {formatTime(elapsedTime)} │</div>
        <div>BANDWIDTH: {(2.4 + progress * 0.05).toFixed(1)} GB/s │</div>
        <div>NODES: {Math.floor(progress / 8) + 1} LINKED │</div>
        <div>└────────────────────────┘</div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        animate={
          glitch
            ? {
                x: [-3, 3, -1, 2, 0],
                y: [1, -1, 0],
                filter: [
                  "hue-rotate(0deg)",
                  "hue-rotate(90deg)",
                  "hue-rotate(-60deg)",
                  "hue-rotate(0deg)",
                ],
              }
            : {}
        }
        transition={{ duration: 0.15 }}
        className="relative z-20 flex flex-col items-center"
      >
        {/* Circular Progress */}
        <CircularProgress progress={progress} />

        {/* Sound Wave */}
        <div className="mb-4">
          <SoundWave active={progress < 100} />
        </div>

        {/* Status Text Block */}
        <div className="text-center w-80">
          <div className="h-6 mb-3 overflow-hidden relative">
            {/* Glitch duplicate layers */}
            {glitch && (
              <>
                <motion.h2
                  className="text-red-500/50 text-xs tracking-[0.3em] font-semibold uppercase absolute inset-0 mix-blend-screen"
                  animate={{ x: [-4, 4, -2, 0], y: [1, -1, 0] }}
                >
                  {text}
                </motion.h2>
                <motion.h2
                  className="text-cyan-500/50 text-xs tracking-[0.3em] font-semibold uppercase absolute inset-0 mix-blend-screen"
                  animate={{ x: [4, -4, 2, 0], y: [-1, 1, 0] }}
                >
                  {text}
                </motion.h2>
              </>
            )}
            <motion.h2
              className={`text-accent-green text-xs tracking-[0.3em] font-semibold uppercase retro-glow relative z-10 transition-all duration-75 ${
                glitch ? "skew-x-12 blur-[1px] brightness-150" : ""
              }`}
            >
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.h2>
          </div>

          {/* Multi-layer Progress Bar */}
          <div className="space-y-1">
            {/* Main bar */}
            <div className="relative h-1.5 w-full bg-accent-green/5 rounded-full overflow-hidden border border-accent-green/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-gradient-to-r from-accent-green via-cyan-400 to-accent-green relative"
                style={{
                  boxShadow: "0 0 15px #00ff88, 0 0 30px #00ff8844",
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                {/* Leading edge glow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-white/60 blur-sm rounded-full" />
              </motion.div>
            </div>

            {/* Secondary thin bar */}
            <div className="relative h-[2px] w-full bg-accent-green/5 overflow-hidden">
              <motion.div
                animate={{ width: `${Math.min(progress * 1.1, 100)}%` }}
                className="h-full bg-cyan-400/40"
              />
            </div>
          </div>

          {/* Progress Info Row */}
          <div className="mt-3 flex justify-between items-center px-1">
            <div className="text-accent-green/40 text-[8px] font-pixel tracking-tight">
              PROC: {progress}% | BUF: {Math.floor(progress * 2.55)}/255
            </div>
            <div className="text-accent-green/50 text-[9px] font-pixel tracking-tighter">
              [{"█".repeat(Math.floor(progress / 5))}
              {progress < 100 && (
                <motion.span animate={{ opacity: [0, 1] }} transition={{ duration: 0.3, repeat: Infinity }}>
                  ▓
                </motion.span>
              )}
              {"░".repeat(Math.max(0, 20 - Math.floor(progress / 5) - 1))}]
            </div>
          </div>
        </div>

        {/* Log History */}
        <LogHistory currentIndex={msgIndex} />
      </motion.div>

      {/* ── DECORATIVE HUD FRAME ── */}
      {/* Outer frame */}
      <div className="absolute inset-3 border border-accent-green/[0.07] pointer-events-none rounded-sm" />
      <div className="absolute inset-6 border border-accent-green/[0.03] pointer-events-none" />

      {/* Top center notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-start">
        <div className="w-20 h-3 border-x border-b border-accent-green/15 bg-[#030808]" />
      </div>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[6px] font-pixel text-accent-green/20 tracking-[0.5em]">
        NEXUS v4.2.1
      </div>

      {/* Bottom center bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-[2px] bg-gradient-to-r from-transparent via-accent-green/40 to-transparent" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[6px] font-pixel text-accent-green/15 tracking-[0.4em]">
        CLASSIFIED // AUTHORIZED PERSONNEL ONLY
      </div>

      {/* Animated Corners with unique positions */}
      {[
        { top: "12px", left: "12px", rotate: 0 },
        { top: "12px", right: "12px", rotate: 90 },
        { bottom: "12px", right: "12px", rotate: 180 },
        { bottom: "12px", left: "12px", rotate: 270 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            ...Object.fromEntries(
              Object.entries(pos).filter(([k]) => k !== "rotate")
            ),
            rotate: pos.rotate,
          }}
          animate={{
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="w-8 h-8 border-t-2 border-l-2 border-accent-green/30"
        />
      ))}

      {/* Pulsing corner dots */}
      {[
        { top: "24px", left: "24px" },
        { top: "24px", right: "24px" },
        { bottom: "24px", right: "24px" },
        { bottom: "24px", left: "24px" },
      ].map((pos, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 bg-accent-green rounded-full"
          style={pos as any}
          animate={{
            opacity: [0.2, 1, 0.2],
            boxShadow: [
              "0 0 2px #00ff88",
              "0 0 8px #00ff88",
              "0 0 2px #00ff88",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}

      {/* Edge accent lines */}
      <motion.div
        className="absolute left-3 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-accent-green/20 to-transparent"
        animate={{ height: ["40px", "80px", "40px"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-3 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-accent-green/20 to-transparent"
        animate={{ height: ["60px", "30px", "60px"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Preloader;