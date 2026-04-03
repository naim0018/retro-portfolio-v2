import React from "react";
import { Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  directory: string;
  title: string;
  highlightedText?: string;
  className?: string;
  accentColor?: "green" | "pink" | "blue" | "orange" | "purple";
}

const colorMap = {
  green:
    "text-accent-green bg-accent-green shadow-[0_0_15px_rgba(0,255,136,0.5)]",
  pink: "text-accent-pink bg-accent-pink shadow-[0_0_15px_rgba(255,0,122,0.5)]",
  blue: "text-accent-blue bg-accent-blue shadow-[0_0_15px_rgba(0,212,255,0.5)]",
  orange:
    "text-accent-orange bg-accent-orange shadow-[0_0_15px_rgba(255,140,0,0.5)]",
  purple:
    "text-accent-purple bg-accent-purple shadow-[0_0_15px_rgba(88,101,242,0.5)]",
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  directory,
  title,
  highlightedText,
  className = "",
  accentColor = "green",
}) => {
  const accentClasses = colorMap[accentColor].split(" ");
  const textColor = accentClasses[0];
  const bgColor = accentClasses[1];
  const shadowColor = accentClasses[2];

  return (
    <header className={`space-y-2 ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-2 ${textColor} font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase`}
      >
        <Terminal size={14} className="shrink-0" />
        <span className="truncate">{directory}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tighter md:leading-[0.9]">
          {title}
          {highlightedText && (
            <span
              className={`${textColor} italic block md:inline mt-2 md:mt-0 ml-0 md:ml-4`}
            >
              {highlightedText}
            </span>
          )}
        </h1>

        {/* Decorative underline */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
          className={`h-1 ${bgColor} mt-4 ${shadowColor}`}
        />
      </motion.div>
    </header>
  );
};

export default SectionTitle;
