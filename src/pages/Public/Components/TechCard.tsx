import {
  motion,
  useMotionValue,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState } from "react";
import { type LucideIcon } from "lucide-react";
interface TechCardProps {
  name: string;
  icon: LucideIcon | string;
  level: number;
  color?: string;
  keyTrigger?: number | string;
}
export default function TechCard({
  name,
  icon,
  level,
  color = "var(--accent-green)",
  keyTrigger,
}: TechCardProps) {
  const count = useMotionValue<number>(0);
  const [displayValue, setDisplayValue] = useState(0);
  useMotionValueEvent(count, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });
  useEffect(() => {
    count.set(0);
    const controls = animate(count, level, {
      duration: 1.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    });
    return () => controls.stop();
  }, [level, keyTrigger, count]);
  const Icon = typeof icon !== "string" ? icon : null;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{ borderColor: `${color}33` } as React.CSSProperties}
      className="relative p-4 bg-background border group overflow-hidden"
    >
      {/* Corner Bracket Decorations */}
      <div
        className="absolute top-0 left-0 w-2 h-2 border-t border-l"
        style={{ borderColor: `${color}99` }}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
        style={{ borderColor: `${color}99` }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div
            className="p-2 border transition-colors duration-300 flex items-center justify-center"
            style={{
              borderColor: `${color}1A`,
              backgroundColor: `${color}0D`,
              color: color,
            }}
          >
            {typeof icon === "string" ? (
              <img
                src={icon}
                alt={name}
                width={24}
                height={24}
                className="object-contain"
              />
            ) : Icon ? (
              <Icon size={24} />
            ) : null}
          </div>
          <motion.span
            className="text-[11px] font-mono font-bold uppercase px-2 py-0.5 border"
            style={{
              color: color,
              borderColor: `${color}33`,
              backgroundColor: `${color}0D`,
            }}
          >
            LVL_{displayValue}
          </motion.span>
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase">{name}</h3>
          <div className="mt-2 h-1.5 w-full bg-white/5 relative overflow-hidden">
            <motion.div
              key={keyTrigger}
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              className="h-full relative z-10"
              style={{ backgroundColor: color }}
              transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            />
            {/* Animated background pulse */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 z-20 bg-linear-to-r from-transparent via-white/20 to-transparent"
              style={{ width: "30%" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
