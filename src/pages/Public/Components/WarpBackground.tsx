import { useEffect, useRef } from "react";
const STAR_TYPES = [
  { h: 215, s: 80, l: 80 }, // Blue-White
  { h: 200, s: 70, l: 90 }, // Light Blue
  { h: 0, s: 0, l: 100 }, // White
  { h: 60, s: 80, l: 90 }, // Yellow-White
  { h: 45, s: 90, l: 70 }, // Yellow
  { h: 25, s: 80, l: 70 }, // Orange
  { h: 0, s: 80, l: 70 }, // Red
];
const random = (min: number, max: number) => Math.random() * (max - min) + min;
class Star {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  pz: number = 0;
  color: string = "";
  sizeBase: number = 0;
  constructor(width: number, height: number, initial = false) {
    this.init(width, height, initial);
  }
  init(width: number, height: number, initial = false) {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = initial ? random(0, width) : width;
    this.pz = this.z;
    const type = STAR_TYPES[Math.floor(Math.random() * STAR_TYPES.length)];
    this.color = `hsl(${type.h}, ${type.s}%, ${type.l}%)`;
    this.sizeBase = random(0.5, 3.0); // Slightly larger stars
  }
  update(width: number, height: number, currentSpeed: number) {
    this.z -= currentSpeed;
    if (this.z < 1) {
      this.init(width, height);
      this.z = width;
      this.pz = this.z;
    }
  }
  draw(ctx: CanvasRenderingContext2D, width: number, cx: number, cy: number, currentSpeed: number, activeWarp: boolean) {
    const fov = width * 0.8;
    const scale = fov / this.z;
    const x2d = this.x * scale + cx;
    const y2d = this.y * scale + cy;
    const radius = Math.max(0.1, (1 - this.z / width) * this.sizeBase);
    const safeZ = Math.max(this.z, 10);
    const streakZ = safeZ + (currentSpeed * (activeWarp ? 4 : 0.5));
    const streakScale = fov / streakZ;
    const px2d = this.x * streakScale + cx;
    const py2d = this.y * streakScale + cy;
    ctx.beginPath();
    if (currentSpeed > 8) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = radius;
      ctx.lineCap = "round";
      ctx.moveTo(x2d, y2d);
      ctx.lineTo(px2d, py2d);
      ctx.stroke();
    } else {
      ctx.fillStyle = this.color;
      ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
class ShootingStar {
  x: number = 0;
  y: number = 0;
  len: number = 0;
  speed: number = 0;
  size: number = 0;
  angle: number = 0;
  waitTime: number = 0;
  active: boolean = false;
  constructor(width: number, height: number) {
    this.reset(width, height);
  }
  reset(width: number, height: number) {
    this.x = random(0, width);
    this.y = random(0, height * 0.5);
    this.len = random(100, 300);
    this.speed = random(15, 30);
    this.size = random(0.5, 2);
    this.angle = random(Math.PI / 6, Math.PI / 3);
    this.waitTime = random(200, 800);
    this.active = false;
  }
  update(width: number, height: number, currentSpeed: number) {
    if (this.active) {
      // Shooting stars also speed up during warp
      const speedMult = Math.min(2, 1 + (currentSpeed / 100));
      this.x -= this.speed * speedMult * Math.cos(this.angle);
      this.y += this.speed * speedMult * Math.sin(this.angle);
      if (this.x < -this.len || this.y > height + this.len) {
        this.active = false;
        this.reset(width, height);
      }
    } else {
      this.waitTime--;
      if (this.waitTime <= 0) this.active = true;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    const tailX = this.x + this.len * Math.cos(this.angle);
    const tailY = this.y - this.len * Math.sin(this.angle);
    const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
    gradient.addColorStop(0, "rgba(200, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 50, 0)");
    ctx.lineWidth = this.size;
    ctx.lineCap = "round";
    ctx.strokeStyle = gradient;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(100, 255, 255, 1)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}
class Nebula {
  x: number = 0;
  y: number = 0;
  radius: number = 0;
  baseRadius: number = 0;
  hue: number = 0;
  vx: number = 0;
  vy: number = 0;
  pulseOffset: number = 0;
  pulseSpeed: number = 0;
  constructor(width: number, height: number) {
    this.init(width, height);
  }
  init(width: number, height: number) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = random(200, 600);
    this.baseRadius = this.radius;
    this.hue = random(200, 300);
    this.vx = random(-0.1, 0.1);
    this.vy = random(-0.1, 0.1);
    this.pulseOffset = random(0, Math.PI * 2);
    this.pulseSpeed = random(0.0005, 0.002);
  }
  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.radius = this.baseRadius + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 40;
    if (this.x < -this.radius) this.x = width + this.radius;
    if (this.x > width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = height + this.radius;
    if (this.y > height + this.radius) this.y = -this.radius;
  }
  draw(ctx: CanvasRenderingContext2D, currentSpeed: number, WARP_SPEED: number) {
    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    const opacity = Math.max(0.01, 0.08 - (currentSpeed / WARP_SPEED) * 0.05);
    g.addColorStop(0, `hsla(${this.hue}, 80%, 50%, ${opacity})`);
    g.addColorStop(0.4, `hsla(${this.hue + 20}, 80%, 40%, ${opacity * 0.5})`);
    g.addColorStop(1, `hsla(${this.hue}, 80%, 30%, 0)`);
    ctx.fillStyle = g;
    ctx.globalCompositeOperation = "screen";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }
}
export default function WarpBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const velocityRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cx = width / 2;
    let cy = height / 2;
    let targetCx = width / 2;
    let targetCy = height / 2;
    const STAR_COUNT = 400;
    const BASE_SPEED = 2;
    const WARP_SPEED = 120;
    const ACCELERATION = 3;
    const NEBULA_COUNT = 8;
    let currentSpeed = BASE_SPEED;
    let activeWarp = false;
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const nebulas: Nebula[] = [];
    const resize = () => {
      width = canvas.width = Math.max(1, window.innerWidth);
      height = canvas.height = Math.max(1, window.innerHeight);
      targetCx = width / 2;
      targetCy = height / 2;
      cx = width / 2;
      cy = height / 2;
    };
    window.addEventListener("resize", resize);
    resize();
    const handleMouseDown = () => { activeWarp = true; };
    const handleMouseUp = () => { activeWarp = false; };
    const handleMouseMove = (e: MouseEvent) => {
      const offsetX = (e.clientX - width / 2) * 0.5;
      const offsetY = (e.clientY - height / 2) * 0.5;
      targetCx = (width / 2) + offsetX;
      targetCy = (height / 2) + offsetY;
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);
    for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star(width, height, true));
    for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar(width, height));
    for (let i = 0; i < NEBULA_COUNT; i++) nebulas.push(new Nebula(width, height));
    let rafId: number;
    const animate = () => {
      if (activeWarp) {
        if (currentSpeed < WARP_SPEED) currentSpeed += ACCELERATION;
      } else {
        if (currentSpeed > BASE_SPEED) currentSpeed -= ACCELERATION;
        if (currentSpeed < BASE_SPEED) currentSpeed = BASE_SPEED;
      }
      // Update UI via refs to avoid React re-renders during animation
      const warpStrength = (currentSpeed - BASE_SPEED) / (WARP_SPEED - BASE_SPEED);
      if (velocityRef.current) {
        velocityRef.current.innerText = `${Math.floor(currentSpeed * 100).toLocaleString()} KM/S`;
      }
      if (statusRef.current) {
        statusRef.current.style.opacity = currentSpeed > 20 ? '1' : '0';
        statusRef.current.style.textShadow = currentSpeed > 50 ? `0 0 10px var(--accent-pink)` : 'none';
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = (0.2 + warpStrength * 0.8).toString();
      }
      cx += (targetCx - cx) * 0.05;
      cy += (targetCy - cy) * 0.05;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#040707";
      ctx.fillRect(0, 0, width, height);
      if (currentSpeed > 50) {
        const shakeIntensity = (currentSpeed - 50) * 0.05;
        const sx = random(-shakeIntensity, shakeIntensity);
        const sy = random(-shakeIntensity, shakeIntensity);
        ctx.translate(sx, sy);
      }
      nebulas.forEach(n => { n.update(width, height); n.draw(ctx, currentSpeed, WARP_SPEED); });
      // Removed expensive sort as stars are simple points
      stars.forEach(s => { s.update(width, height, currentSpeed); s.draw(ctx, width, cx, cy, currentSpeed, activeWarp); });
      shootingStars.forEach(ss => { ss.update(width, height, currentSpeed); ss.draw(ctx); });
      if (currentSpeed > 20) {
        const vcx = width / 2;
        const vcy = height / 2;
        const vignetteOpacity = Math.min(0.5, (currentSpeed - 20) / (WARP_SPEED - 20) * 0.5);
        const grad = ctx.createRadialGradient(vcx, vcy, height * 0.3, vcx, vcy, Math.max(width, height) * 0.8);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, `rgba(0, 150, 255, ${vignetteOpacity})`);
        ctx.fillStyle = grad;
        ctx.fillRect(-50, -50, width + 100, height + 100);
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto cursor-crosshair">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* UI Overlay Inspired by User Request */}
      <div 
        ref={overlayRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none text-center font-mono opacity-20 transition-opacity duration-300"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="text-[10px] text-accent-blue/50 tracking-[0.3em] uppercase">Velocity_Module</div>
          <div className="text-2xl font-black tabular-nums">
            <span ref={velocityRef}>200 KM/S</span>
          </div>
          <div 
            ref={statusRef}
            className="text-xs font-bold text-accent-pink tracking-[0.4em] uppercase transition-all duration-300 opacity-0"
          >
            Warp_Engaged
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-20 text-[8px] font-mono tracking-[0.2em] uppercase animate-pulse">
        Hold_Left_Click_To_Initiate_Warp // Slide_To_Look
      </div>
    </div>
  );
}
