import WarpBackground from "./WarpBackground";
export default function RetroBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden selection:bg-accent-green selection:text-background bg-[#040707]">
      <WarpBackground />
      <div className="relative z-20 w-full h-full text-foreground selection:bg-accent-green selection:text-background flex flex-col">
        {children}
      </div>
      <div className="fixed bottom-4 left-4 flex gap-2 text-[10px] font-mono text-accent-green/40 pointer-events-none uppercase tracking-widest z-30">
        <span>V1.0.0-WARP</span>
        <span>{`//`}</span>
        <span>STRAT_ENV: READY</span>
      </div>
      
      <div className="fixed bottom-4 right-4 flex gap-2 text-[10px] font-mono text-accent-green/40 pointer-events-none uppercase tracking-widest z-30">
        <span>{`FLIGHT_MODE: ACTIVE`}</span>
        <span>{`//`}</span>
        <span>{`STATUS: SYNCED`}</span>
      </div>
    </div>
  );
}
