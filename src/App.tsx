import { useState, useEffect, useRef, useId, createContext, useContext, type ReactNode } from 'react';
import heroPortrait from './rajeshkanna.jpg';

// ─── Theme context ──────────────────────────────────────────────────────────────

const ThemeCtx = createContext(true);
const useTheme = () => useContext(ThemeCtx);

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; opacity: number; pulse: number;
  energy: number;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const TAGLINES = [
  'Architecting Enterprise Systems',
  'Senior Full Stack Engineer',
  'Java, Spring Boot & React Specialist',
  'Cloud Architecture & AI Systems',
];

const SKILLS_RADIAL = [
  { name: 'Java / Spring Boot', pct: 96 },
  { name: 'React / Next.js', pct: 94 },
  { name: 'TypeScript', pct: 91 },
  { name: 'System Design', pct: 93 },
  { name: 'Cloud / AWS', pct: 89 },
  { name: 'AI / RAG Systems', pct: 88 },
];

const SKILLS_BAR = [
  { name: 'Microservices & Distributed Systems', pct: 95 },
  { name: 'PostgreSQL / MongoDB / MySQL / Redis', pct: 92 },
  { name: 'Docker / Kubernetes / CI/CD Pipelines', pct: 88 },
  { name: 'REST APIs & Full-Stack Web Development', pct: 94 },
  { name: 'Cloud Infrastructure & AWS Deployment', pct: 90 },
  { name: 'System Performance & Security Hardening', pct: 91 },
];

const EXPERIENCES = [
  {
    title: 'Senior Full Stack Software Engineer & Architect',
    company: 'Enterprise Software & Cloud Platforms',
    period: '2018 – Present',
    location: 'Tamil Nadu, India',
    desc: 'Architect and deliver high-performance enterprise systems, microservices, and AI-enabled platforms. Leading full-stack engineering across Java, Spring Boot, React, and cloud infrastructure with 99.9% uptime and sub-second response times.',
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
  },
  {
    title: 'Full Stack Software Engineer',
    company: 'Web Application & SaaS Solutions',
    period: '2016 – 2018',
    location: 'India',
    desc: 'Developed scalable client-facing web portals, high-throughput REST APIs, and automated database workflows. Improved system throughput by 40% and built robust multi-tenant services.',
    tech: ['Java', 'React.js', 'Node.js', 'MySQL', 'REST APIs', 'Tailwind CSS'],
  },
];

const CERTIFICATES = [
  { name: 'Building High-Performance Teams', issuer: 'Professional Certification', year: 'Verified', accent: '#22d3ee', letter: 'TEAM' },
  { name: 'Corporate Finance & Modeling Foundations', issuer: 'Professional Certification', year: 'Verified', accent: '#818cf8', letter: 'FIN' },
  { name: 'Strategic Thinking & Leadership', issuer: 'Executive Certification', year: 'Verified', accent: '#34d399', letter: 'STRAT' },
  { name: 'Full Stack Architecture & Cloud', issuer: 'Professional Certification', year: 'Verified', accent: '#f472b6', letter: 'ARCH' },
];

const PROJECTS = [
  {
    id: 'reportsiq',
    title: 'ReportsIQ',
    subtitle: 'Intelligent Reporting & Analytics Platform',
    desc: 'Comprehensive reporting and data visualization platform offering real-time business insights, interactive dashboards, and automated analytics for enterprise decision making.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Charts', 'Tailwind CSS'],
    github: 'https://github.com/rajeshkanna-s', stars: '1.8k', forks: '420',
    category: 'prod',
    metrics: [{ label: 'Data Accuracy', value: '99.9%' }, { label: 'Reports / Sec', value: '120k' }, { label: 'Latency', value: '<15ms' }],
    featured: true,
    accent: '#22d3ee',
    gradFrom: 'rgba(34,211,238,0.16)', gradTo: 'rgba(56,189,248,0.04)',
  },
  {
    id: 'zezhatools',
    title: 'Zezha Tools & Platform',
    subtitle: 'Multi-Utility Developer & Recruitment Suite',
    desc: 'Feature-rich platform combining utility calculators, tax comparison engines, developer tools, and talent recruitment connecting skilled professionals with top companies.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST API'],
    github: 'https://github.com/rajeshkanna-s', stars: '2.4k', forks: '580',
    category: 'prod',
    metrics: [{ label: 'Active Users', value: '45k+' }, { label: 'Tools Built', value: '25+' }, { label: 'Uptime', value: '99.9%' }],
    featured: false,
    accent: '#818cf8',
    gradFrom: 'rgba(129,140,248,0.16)', gradTo: 'rgba(167,139,250,0.04)',
  },
  {
    id: 'tastetable',
    title: 'Taste & Table',
    subtitle: 'Café & Restaurant Digital Ordering Platform',
    desc: 'Modern, high-converting digital dining platform with interactive menu management, table reservations, and seamless ordering workflows for restaurant guests.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    github: 'https://github.com/rajeshkanna-s', stars: '1.1k', forks: '290',
    category: 'prod',
    metrics: [{ label: 'Order Speed', value: '<2s' }, { label: 'Conversion', value: '+45%' }, { label: 'Mobile Score', value: '99/100' }],
    featured: false,
    accent: '#fb923c',
    gradFrom: 'rgba(251,146,60,0.16)', gradTo: 'rgba(249,115,22,0.04)',
  },
  {
    id: 'parkingmate',
    title: 'ParkingMate',
    subtitle: 'Smart Parking Management System',
    desc: 'Real-time smart parking system helping drivers find, reserve, and manage parking slots with automated slot allocation, map navigation, and payment tracking.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'WebSockets', 'Maps API'],
    github: 'https://github.com/rajeshkanna-s', stars: '1.5k', forks: '340',
    category: 'prod',
    metrics: [{ label: 'Slot Booking', value: '<1s' }, { label: 'Active Slots', value: '10k+' }, { label: 'Efficiency Lift', value: '+60%' }],
    featured: false,
    accent: '#34d399',
    gradFrom: 'rgba(52,211,153,0.16)', gradTo: 'rgba(20,184,166,0.04)',
  },
  {
    id: 'ragsupport',
    title: 'RAG Support Suite',
    subtitle: 'Retrieval-Augmented GenAI Customer Support',
    desc: 'Enterprise AI knowledge assistant utilizing Retrieval-Augmented Generation (RAG) with vector search to deliver context-aware, instantaneous customer support responses.',
    tags: ['Python', 'OpenAI', 'LangChain', 'FastAPI', 'ChromaDB', 'React'],
    github: 'https://github.com/rajeshkanna-s', stars: '3.6k', forks: '820',
    category: 'oss',
    metrics: [{ label: 'Accuracy', value: '96.8%' }, { label: 'Resolution Rate', value: '82%' }, { label: 'Response Time', value: '<500ms' }],
    featured: false,
    accent: '#f472b6',
    gradFrom: 'rgba(244,114,182,0.16)', gradTo: 'rgba(236,72,153,0.04)',
  },
  {
    id: 'healthyplates',
    title: 'HealthyPlates',
    subtitle: 'Nutrition & Meal Planning Platform',
    desc: 'Interactive wellness platform helping individuals and families discover nutritionist-approved meal plans, track dietary goals, and curate balanced recipes.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'REST API'],
    github: 'https://github.com/rajeshkanna-s', stars: '980', forks: '210',
    category: 'oss',
    metrics: [{ label: 'Recipes', value: '5,000+' }, { label: 'User Rating', value: '4.9★' }, { label: 'Engagement', value: '+75%' }],
    featured: false,
    accent: '#a78bfa',
    gradFrom: 'rgba(167,139,250,0.16)', gradTo: 'rgba(139,92,246,0.04)',
  },
];

const TESTIMONIALS = [
  {
    quote: "Rajeshkanna built my business website in just 3 days! The design was clean, professional, and exactly what I needed. Highly recommended for anyone looking for an affordable top-tier web developer.",
    name: 'Arjun K.', title: 'Startup Founder', company: 'TechVentures',
    initials: 'AK', color: '#22d3ee',
  },
  {
    quote: "I wanted a portfolio that truly represents my work, and Rajeshkanna delivered beyond my expectations. The animations, responsiveness, and SEO are top-notch. My portfolio now gets more leads!",
    name: 'Priya M.', title: 'Lead Designer', company: 'DesignCraft',
    initials: 'PM', color: '#f472b6',
  },
  {
    quote: "The café website Rajeshkanna built for us is beautiful. Our customers love the online menu. The project was delivered on time and the support after delivery is exceptional.",
    name: 'Meena L.', title: 'Restaurant Owner', company: 'Taste & Table',
    initials: 'ML', color: '#fb923c',
  },
  {
    quote: "My property listing website is exactly what I wanted — professional, fast, and easy to navigate. Rajeshkanna understood my requirements perfectly and delivered enterprise quality.",
    name: 'Vikram S.', title: 'Managing Director', company: 'Empire Real Estate',
    initials: 'VS', color: '#818cf8',
  },
];

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useTypingEffect(texts: string[], speed = 78) {
  const [display, setDisplay] = useState('');
  const st = useRef({ idx: 0, charIdx: 0, deleting: false, paused: false });
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    function tick() {
      const s = st.current;
      const text = texts[s.idx];
      if (s.paused) return;
      if (!s.deleting) {
        setDisplay(text.slice(0, s.charIdx + 1));
        s.charIdx++;
        if (s.charIdx >= text.length) {
          s.paused = true;
          t = setTimeout(() => { s.deleting = true; s.paused = false; tick(); }, 2600);
          return;
        }
      } else {
        s.charIdx = Math.max(0, s.charIdx - 1);
        setDisplay(text.slice(0, s.charIdx));
        if (s.charIdx === 0) { s.deleting = false; s.idx = (s.idx + 1) % texts.length; }
      }
      t = setTimeout(tick, s.deleting ? speed / 2 : speed);
    }
    t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, [texts, speed]);
  return display;
}

function useCounter(target: number, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    setVal(0);
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [active, target, duration]);
  return val;
}

// ─── Neural Canvas ─────────────────────────────────────────────────────────────

function NeuralCanvas() {
  const dark = useTheme();
  const darkRef = useRef(dark);
  darkRef.current = dark;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();

    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.33, vy: (Math.random() - 0.5) * 0.33,
      radius: Math.random() * 1.4 + 0.5,
      opacity: Math.random() * 0.45 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      energy: 0,
    }));

    const MAX = 148;
    let frame = 0;

    const draw = () => {
      frame++;
      if (frame % 140 === 0) particles[Math.floor(Math.random() * particles.length)].energy = 1.0;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const isDark = darkRef.current;

      // Core colours switch per theme
      const coreRGB = isDark ? '210,248,255' : '0,60,160';
      const glowRGB = isDark ? '0,212,255' : '0,90,200';
      const edgeRGB = isDark ? '0,185,255' : '0,80,180';
      const glowOpMul = isDark ? 0.85 : 0.55;
      const edgeOpBase = isDark ? 0.28 : 0.18;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mx - p.x; const dy = my - p.y;
        const md = Math.hypot(dx, dy);
        if (md < 210 && md > 0) { p.vx += (dx / md) * 0.024; p.vy += (dy / md) * 0.024; }
        p.vx *= 0.987; p.vy *= 0.987;
        p.x += p.vx; p.y += p.vy;
        p.pulse += 0.016;

        if (p.energy > 0.5 && Math.random() < 0.08) {
          for (let j = 0; j < particles.length; j++) {
            if (j === i) continue;
            const d = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
            if (d < MAX) particles[j].energy = Math.max(particles[j].energy, p.energy * 0.55);
          }
        }
        p.energy *= 0.94;

        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;

        const r = p.radius + Math.sin(p.pulse) * 0.5 + p.energy * 2.5;
        const o = Math.min(1, p.opacity + Math.sin(p.pulse) * 0.1 + p.energy * 0.55);

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 8);
        grd.addColorStop(0, `rgba(${glowRGB},${o * glowOpMul})`);
        grd.addColorStop(0.35, `rgba(${glowRGB},${o * 0.15})`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 8, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = `rgba(${coreRGB},${o})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ed = Math.hypot(p.x - q.x, p.y - q.y);
          if (ed < MAX) {
            const energyA = Math.max(p.energy, q.energy) * 0.6;
            const a = Math.min(0.9, (1 - ed / MAX) * edgeOpBase + energyA);
            ctx.strokeStyle = `rgba(${edgeRGB},${a})`;
            ctx.lineWidth = 0.5 + (p.energy + q.energy) * 0.4;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    const onMouse = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('mousemove', onMouse); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── Shared UI primitives ──────────────────────────────────────────────────────

const card: React.CSSProperties = {
  background: 'var(--c-card)',
  backdropFilter: 'blur(14px)',
  border: '1px solid var(--c-border)',
};

function TiltCard({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) scale3d(1.03,1.03,1.03)`;
    el.style.transition = 'transform 0.08s ease';
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.transition = 'transform 0.5s ease';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform', ...style }} className={className}>
      {children}
    </div>
  );
}

function MagneticBtn({ children, onClick, className, style }: { children: ReactNode; onClick?: () => void; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLButtonElement>(null);
  const ripples = useRef<{ x: number; y: number; id: number }[]>([]);
  const [, tick] = useState(0);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = 'transform 0.08s ease';
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'translate(0,0)';
    el.style.transition = 'transform 0.5s ease';
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    ripples.current = [...ripples.current, { x: e.clientX - r.left, y: e.clientY - r.top, id }];
    tick(n => n + 1);
    setTimeout(() => { ripples.current = ripples.current.filter(rip => rip.id !== id); tick(n => n + 1); }, 650);
    onClick?.();
  };
  return (
    <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={handleClick}
      className={`relative overflow-hidden ${className ?? ''}`} style={style}>
      {children}
      {ripples.current.map(rip => (
        <span key={rip.id} style={{ position: 'absolute', left: rip.x, top: rip.y, width: 0, height: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.28)', transform: 'translate(-50%,-50%)', animation: 'ripple 0.65s ease-out forwards', pointerEvents: 'none' }} />
      ))}
    </button>
  );
}

function TimelineLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const c = containerRef.current; const l = lineRef.current;
      if (!c || !l) return;
      const rect = c.getBoundingClientRect();
      const filled = Math.max(0, Math.min(1, (window.innerHeight - rect.top + 80) / rect.height));
      l.style.height = `${filled * 100}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [containerRef]);
  return (
    <div className="absolute left-0 top-2 bottom-2 w-px" style={{ background: 'var(--c-timeline-bg)' }}>
      <div ref={lineRef} className="w-full" style={{ height: '0%', background: 'linear-gradient(180deg, var(--c-accent), rgba(129,140,248,0.5))', transition: 'height 0.4s ease', boxShadow: '0 0 6px var(--c-dot-glow)' }} />
    </div>
  );
}

function SectionHeader({ label, title, sub }: { label: string; title: string; sub?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className="text-center mb-16">
      <p className="text-xs font-mono tracking-[0.28em] uppercase mb-3" style={{ color: 'var(--c-accent)', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
        {label}
      </p>
      <div style={{ overflow: 'hidden' }}>
        <h2 className="text-3xl sm:text-4xl font-bold font-display" style={{ color: 'var(--c-text)', transform: visible ? 'translateY(0)' : 'translateY(110%)', transition: 'transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.08s', display: 'inline-block' }}>
          {title}
        </h2>
      </div>
      {sub && <p className="text-sm max-w-md mx-auto leading-relaxed mt-3" style={{ color: 'var(--c-muted)', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>{sub}</p>}
      <div className="mt-5 flex items-center justify-center gap-3">
        <div style={{ height: '1px', width: visible ? '56px' : '0px', background: 'linear-gradient(to left, var(--c-accent), transparent)', transition: 'width 0.7s ease 0.35s' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-accent)', boxShadow: '0 0 8px var(--c-dot-glow)', opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0)', transition: 'opacity 0.4s ease 0.45s, transform 0.4s ease 0.45s' }} />
        <div style={{ height: '1px', width: visible ? '56px' : '0px', background: 'linear-gradient(to right, var(--c-accent), transparent)', transition: 'width 0.7s ease 0.35s' }} />
      </div>
    </div>
  );
}

function RadialSkill({ name, pct, delay = 0 }: { name: string; pct: number; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  const count = useCounter(pct, 1500, visible);
  const rawId = useId();
  const uid = `g${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const R = 38; const circ = 2 * Math.PI * R;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px) scale(0.9)', transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms` }}>
      <div className="relative w-[92px] h-[92px]">
        <svg width="92" height="92" style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <circle cx="46" cy="46" r={R} stroke="var(--c-accent-bg)" strokeWidth="5.5" fill="none" style={{ stroke: 'var(--c-border)' }} />
          <circle cx="46" cy="46" r={R} stroke={`url(#${uid})`} strokeWidth="5.5" fill="none"
            strokeDasharray={circ} strokeDashoffset={visible ? circ - (pct / 100) * circ : circ} strokeLinecap="round"
            style={{ transition: `stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1) ${delay + 100}ms`, filter: 'drop-shadow(0 0 5px var(--c-dot-glow))' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold font-mono" style={{ color: 'var(--c-accent)', opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${delay + 200}ms` }}>{count}%</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-center leading-tight" style={{ color: 'var(--c-muted)' }}>{name}</span>
    </div>
  );
}

function SkillBar({ name, pct, delay = 0 }: { name: string; pct: number; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  const count = useCounter(pct, 1400, visible);
  return (
    <div ref={ref} className="space-y-1.5" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-20px)', transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms` }}>
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: 'var(--c-muted)' }}>{name}</span>
        <span className="text-xs font-mono ml-4 shrink-0 tabular-nums" style={{ color: 'var(--c-accent)' }}>{count}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--c-accent-bg)' }}>
        <div className="h-full rounded-full" style={{ width: visible ? `${pct}%` : '0%', background: 'linear-gradient(90deg, #22d3ee 0%, #818cf8 45%, #22d3ee 70%, #818cf8 100%)', backgroundSize: '300% 100%', animation: visible ? `shimmer-bar 3s linear ${delay + 1400}ms infinite` : 'none', transition: `width 1.3s cubic-bezier(0.4,0,0.2,1) ${delay + 100}ms`, boxShadow: '0 0 8px var(--c-dot-glow)' }} />
      </div>
    </div>
  );
}

function StatItem({ target, suffix, label, dur, active }: { target: number; suffix: string; label: string; dur: number; active: boolean }) {
  const count = useCounter(target, dur, active);
  return (
    <div className="pt-4">
      <div className="text-2xl font-bold font-display" style={{ color: 'var(--c-text)', textShadow: '0 0 20px var(--c-stat-glow)' }}>{count}{suffix}</div>
      <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--c-faint)' }}>{label}</div>
    </div>
  );
}

// ─── Theme Toggle Icon ─────────────────────────────────────────────────────────

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
      style={{
        background: 'var(--c-accent-bg)',
        border: '1px solid var(--c-border-hi)',
        color: 'var(--c-accent)',
      }}
    >
      {dark ? (
        /* Sun icon */
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon */
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ─── NavBar ────────────────────────────────────────────────────────────────────

function NavBar({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
      background: scrolled ? 'var(--c-nav)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--c-border)' : 'none',
    }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => go('hero')} className="font-display text-lg font-bold tracking-wider transition-all hover:scale-105" style={{ color: 'var(--c-accent)' }}>
          RK<span style={{ color: 'var(--c-text)' }}>.</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className="text-sm font-mono tracking-wide relative group transition-colors"
              style={{ color: 'var(--c-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ background: 'var(--c-accent)' }} />
            </button>
          ))}
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <MagneticBtn onClick={() => go('contact')}
            className="px-4 py-1.5 rounded border text-sm font-mono transition-colors"
            style={{ borderColor: 'var(--c-border-hi)', color: 'var(--c-accent)' }}>
            Hire Me
          </MagneticBtn>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button className="flex flex-col gap-1.5 p-1 transition-colors"
            style={{ color: 'var(--c-muted)' }}
            onClick={() => setMenuOpen(!menuOpen)}>
            <span className="block w-5 h-0.5 bg-current transition-all duration-200" style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <span className="block w-5 h-0.5 bg-current transition-all duration-200" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-5 h-0.5 bg-current transition-all duration-200" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 space-y-1" style={{ background: 'var(--c-nav)', backdropFilter: 'blur(16px)', borderTop: '1px solid var(--c-border)' }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => go(l.id)} className="block w-full text-left py-2.5 text-sm font-mono transition-colors" style={{ color: 'var(--c-muted)' }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [entered, setEntered] = useState(false);
  const tagline = useTypingEffect(TAGLINES);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(() => setEntered(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const fn = () => { if (parallaxRef.current) parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const anim = (delay: number, fromY = 28, scale = 1) => ({
    opacity: entered ? 1 : 0,
    transform: entered ? 'none' : `translateY(${fromY}px) scale(${scale})`,
    transition: `opacity 0.85s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.85s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
  });

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative z-10 min-h-screen flex items-center pt-16 overflow-hidden">
      <div ref={parallaxRef} className="max-w-6xl mx-auto px-6 py-24 w-full grid lg:grid-cols-2 gap-14 items-center">

        <div className="order-2 lg:order-1 space-y-7">
          <div style={anim(0)}>
            <p className="text-xs font-mono tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--c-accent)', opacity: 0.8 }}>Senior Full Stack Software Engineer & Architect</p>
            <h1 className="font-display font-bold leading-none" style={{ color: 'var(--c-text)', fontSize: 'clamp(2.4rem,6.5vw,4.5rem)', textShadow: '0 0 60px var(--c-stat-glow)' }}>
              Rajeshkanna<br />S
            </h1>
          </div>

          <div style={anim(160)} className="flex items-center gap-2 h-8">
            <span className="text-lg font-light" style={{ color: 'var(--c-muted)' }}>{tagline}</span>
            <span className="w-0.5 h-5 inline-block" style={{ background: 'var(--c-accent)', animation: 'blink 1s step-end infinite' }} />
          </div>

          <p className="leading-relaxed max-w-md" style={{ ...anim(280), color: 'var(--c-muted)' }}>
            Senior Software Engineer & Architect with 8+ years of experience engineering high-scale web platforms, enterprise microservices, and AI integrations. I transform complex ideas into reliable, high-performance digital realities.
          </p>

          <div className="flex flex-wrap gap-3" style={anim(400)}>
            <MagneticBtn onClick={() => go('projects')}
              className="px-6 py-2.5 rounded font-mono text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8)', boxShadow: '0 0 28px var(--c-dot-glow)', color: 'var(--c-invert)' }}>
              View Work
            </MagneticBtn>
            <MagneticBtn onClick={() => go('contact')}
              className="px-6 py-2.5 rounded font-mono text-sm font-medium transition-colors"
              style={{ borderColor: 'var(--c-border-hi)', border: '1px solid', color: 'var(--c-accent)' }}>
              Get in Touch
            </MagneticBtn>
          </div>

          <div className="flex gap-8 pt-2" style={{ ...anim(560), borderTop: '1px solid var(--c-border)' }}>
            <StatItem target={8}  suffix="+"  label="Years"    dur={1200} active={entered} />
            <StatItem target={50} suffix="+"  label="Models"   dur={1800} active={entered} />
            <StatItem target={5}  suffix=""   label="Papers"   dur={900}  active={entered} />
            <StatItem target={12} suffix="k+" label="GitHub ★" dur={1500} active={entered} />
          </div>
        </div>

        <div className="order-1 lg:order-2 flex justify-center lg:justify-end" style={anim(200, 0, 0.85)}>
          <div className="relative" style={{ animation: 'float 7s ease-in-out infinite' }}>
            <div className="absolute" style={{ inset: '-30px', borderRadius: '50%', border: '1px solid var(--c-border)', animation: 'orbit 24s linear infinite' }}>
              <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', marginLeft: '-4px', borderRadius: '50%', background: 'var(--c-dot)', boxShadow: '0 0 12px var(--c-dot), 0 0 24px var(--c-dot-glow)' }} />
            </div>
            <div className="absolute" style={{ inset: '-60px', borderRadius: '50%', border: '1px solid rgba(129,140,248,0.12)', animation: 'orbit 40s linear infinite reverse' }}>
              <div style={{ position: 'absolute', bottom: '-3px', left: '50%', width: '6px', height: '6px', marginLeft: '-3px', borderRadius: '50%', background: '#818cf8', boxShadow: '0 0 8px #818cf8' }} />
            </div>

            <div className="relative overflow-hidden" style={{
              width: 'clamp(220px,30vw,288px)', height: 'clamp(220px,30vw,288px)', borderRadius: '50%',
              border: '2px solid var(--c-border-hi)', animation: 'glow-ring 4.5s ease-in-out infinite',
              background: 'var(--c-card)',
            }}>
              <img
                src={heroPortrait}
                alt="Rajeshkanna S — Senior Full Stack Software Engineer & Architect"
                className="w-full h-full object-cover object-center"
                style={{ filter: 'saturate(0.95) brightness(1)' }}
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg,var(--c-scan) 0%,transparent 40%,transparent 60%,var(--c-scan) 100%)' }} />
              <div className="absolute left-0 right-0 h-10 pointer-events-none" style={{ background: 'linear-gradient(180deg,transparent,var(--c-scan),transparent)', animation: 'scanline 6s ease-in-out infinite' }} />
            </div>

            <div className="absolute -top-1 -right-1 w-5 h-5" style={{ borderTop: '2px solid var(--c-accent)', borderRight: '2px solid var(--c-accent)' }} />
            <div className="absolute -bottom-1 -left-1 w-5 h-5" style={{ borderBottom: '2px solid var(--c-accent)', borderLeft: '2px solid var(--c-accent)' }} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'var(--c-faint)', opacity: entered ? 1 : 0, transition: 'opacity 1s ease 1.2s' }}>
        <span className="text-[10px] font-mono tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-current to-transparent" style={{ animation: 'blink 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────

function AboutSection() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="about" className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="01 · Who I Am" title="About Me" />
        <div ref={ref} className="grid lg:grid-cols-3 gap-6" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div className="lg:col-span-2 rounded-xl p-8 space-y-5" style={card}>
            <p className="leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              I'm a Senior Full Stack Software Engineer & Architect based in Tamil Nadu, India with <strong style={{ color: 'var(--c-text)' }}>8+ years</strong> of experience architecting enterprise software, high-throughput microservices, and modern web applications that deliver measurable business growth.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              My core expertise spans Java, Spring Boot, React.js, TypeScript, and AWS cloud architecture. I specialize in building custom business portals, high-converting landing pages, and AI-enabled platforms for founders, professionals, and enterprises worldwide.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              Particularly passionate about <span style={{ color: 'var(--c-accent)' }}>clean system architecture</span>, <span style={{ color: 'var(--c-accent)' }}>lightning-fast web performance</span>, and integrating <span style={{ color: 'var(--c-accent)' }}>production-grade AI</span> to solve tangible problems.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Java', 'Spring Boot', 'React', 'TypeScript', 'Next.js', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'System Design'].map((t, i) => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded border cursor-default transition-colors"
                  style={{ background: 'var(--c-tag-bg)', borderColor: 'var(--c-tag-border)', color: 'var(--c-tag-text)', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)', transition: `opacity 0.4s ease ${200 + i * 40}ms, transform 0.4s ease ${200 + i * 40}ms` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Location', value: 'Tamil Nadu, India' },
              { label: 'Experience', value: '8+ Years Enterprise Development' },
              { label: 'Email', value: 'rajeshkannaprogrammer@gmail.com' },
              { label: 'WhatsApp / Phone', value: '+91 8667454755' },
              { label: 'Availability', value: 'Open for Projects & Consulting' },
            ].map((f, i) => (
              <div key={f.label} className="rounded-lg p-4" style={{ ...card, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(20px)', transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms` }}>
                <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--c-faint)' }}>{f.label}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--c-text)' }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="02 · Expertise" title="Skills & Proficiency" sub="Core competencies across Full Stack Architecture, Java, Spring Boot, React, and Cloud Platforms." />
        <div className="rounded-xl p-8 mb-8" style={card}>
          <p className="text-xs font-mono uppercase tracking-widest mb-8" style={{ color: 'var(--c-faint)' }}>Core Technical Skills</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {SKILLS_RADIAL.map((s, i) => <RadialSkill key={s.name} name={s.name} pct={s.pct} delay={i * 90} />)}
          </div>
        </div>
        <div className="rounded-xl p-8" style={card}>
          <p className="text-xs font-mono uppercase tracking-widest mb-8" style={{ color: 'var(--c-faint)' }}>Supporting Stack</p>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
            {SKILLS_BAR.map((s, i) => <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 80} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────────

function ExpItem({ exp, i }: { exp: typeof EXPERIENCES[number]; i: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-28px)', transition: `opacity 0.65s ease ${i * 130}ms, transform 0.65s cubic-bezier(0.34,1.56,0.64,1) ${i * 130}ms` }}>
      <div className="absolute left-0 w-2.5 h-2.5 rounded-full -translate-x-[5px] mt-1" style={{ background: 'var(--c-dot)', boxShadow: '0 0 14px var(--c-dot-glow)', opacity: visible ? 1 : 0, transform: visible ? 'translateX(-5px) scale(1)' : 'translateX(-5px) scale(0)', transition: `opacity 0.4s ease ${i * 130 + 200}ms, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 130 + 200}ms` }} />
      <TiltCard className="rounded-xl p-7" style={card}>
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold font-display" style={{ color: 'var(--c-text)' }}>{exp.title}</h3>
            <p className="font-medium text-sm mt-0.5" style={{ color: 'var(--c-accent)' }}>{exp.company}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono whitespace-nowrap" style={{ color: 'var(--c-muted)' }}>{exp.period}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--c-faint)' }}>{exp.location}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--c-muted)' }}>{exp.desc}</p>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map(t => (
            <span key={t} className="text-xs font-mono px-2 py-0.5 rounded border" style={{ background: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.22)', color: 'var(--c-muted)' }}>{t}</span>
          ))}
        </div>
      </TiltCard>
    </div>
  );
}

function ExperienceSection() {
  const tlRef = useRef<HTMLDivElement>(null);
  return (
    <section id="experience" className="relative z-10 py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="03 · Career" title="Experience" />
        <div ref={tlRef} className="relative pl-8">
          <TimelineLine containerRef={tlRef} />
          <div className="space-y-10">{EXPERIENCES.map((exp, i) => <ExpItem key={i} exp={exp} i={i} />)}</div>
        </div>
      </div>
    </section>
  );
}

// ─── Certificates ──────────────────────────────────────────────────────────────

function CertBadge({ cert, i }: { cert: typeof CERTIFICATES[number]; i: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px) scale(0.92)', transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 110}ms` }}>
      <TiltCard className="rounded-xl p-6 h-full flex flex-col items-center text-center gap-5" style={{ ...card, border: `1px solid ${cert.accent}28` }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center font-display font-bold text-sm" style={{ background: `${cert.accent}18`, border: `1.5px solid ${cert.accent}40`, color: cert.accent, boxShadow: `0 0 24px ${cert.accent}20` }}>
          {cert.letter}
        </div>
        <div className="flex-1 space-y-1.5">
          <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--c-text)' }}>{cert.name}</h3>
          <p className="text-xs" style={{ color: 'var(--c-faint)' }}>{cert.issuer}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: `${cert.accent}22` }}>
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke={cert.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6l3 3 5-5" /></svg>
          </div>
          <span className="text-xs font-mono" style={{ color: 'var(--c-faint)' }}>Verified · {cert.year}</span>
        </div>
      </TiltCard>
    </div>
  );
}

function CertificatesSection() {
  return (
    <section id="certificates" className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="04 · Credentials" title="Certifications" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATES.map((cert, i) => <CertBadge key={cert.name} cert={cert} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────

const CAT_LABEL: Record<string, string> = { prod: 'Production', oss: 'Open Source', research: 'Research' };
const CAT_COLOR: Record<string, string> = { prod: '#22d3ee', oss: '#818cf8', research: '#34d399' };
const GITHUB_ICON = <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>;

type Proj = typeof PROJECTS[number];

function ProjectPreview({ accent, gradFrom, gradTo, tall = false }: { accent: string; gradFrom: string; gradTo: string; tall?: boolean }) {
  const NODES = [
    { x: '11%', y: '28%', d: '0s' }, { x: '33%', y: '68%', d: '0.55s' },
    { x: '56%', y: '22%', d: '1.0s' }, { x: '76%', y: '72%', d: '0.3s' },
    { x: '91%', y: '35%', d: '0.8s' }, { x: '20%', y: '82%', d: '1.3s' },
  ];
  return (
    <div className="relative overflow-hidden shrink-0" style={{ height: tall ? '100%' : '108px', minHeight: tall ? '200px' : undefined, background: `linear-gradient(140deg, ${gradFrom}, ${gradTo})` }}>
      {/* Circuit grid */}
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
      {/* Connecting edges */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
        <line x1="11%" y1="28%" x2="33%" y2="68%" stroke={accent} strokeWidth="0.6" strokeDasharray="4 4" />
        <line x1="33%" y1="68%" x2="56%" y2="22%" stroke={accent} strokeWidth="0.6" strokeDasharray="4 4" />
        <line x1="56%" y1="22%" x2="76%" y2="72%" stroke={accent} strokeWidth="0.6" strokeDasharray="4 4" />
        <line x1="76%" y1="72%" x2="91%" y2="35%" stroke={accent} strokeWidth="0.6" strokeDasharray="4 4" />
        <line x1="20%" y1="82%" x2="33%" y2="68%" stroke={accent} strokeWidth="0.6" strokeDasharray="4 4" />
      </svg>
      {/* Nodes */}
      {NODES.map((n, idx) => (
        <div key={idx} className="absolute" style={{ left: n.x, top: n.y, transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}`, animation: `node-ping 2.6s ease-in-out ${n.d} infinite`, opacity: 0.85 }} />
        </div>
      ))}
      {/* Scan line */}
      <div className="absolute left-0 right-0" style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${accent}70, transparent)`, animation: 'scanline 4s ease-in-out infinite' }} />
    </div>
  );
}

function ProjectCard({ proj, i }: { proj: Proj; i: number }) {
  const { ref, visible } = useScrollReveal();
  const glowRef = useRef<HTMLDivElement>(null);
  const onEnter = () => { if (glowRef.current) { glowRef.current.style.boxShadow = `0 0 0 1px ${proj.accent}40, 0 24px 48px ${proj.accent}14, 0 8px 20px rgba(0,0,0,0.25)`; glowRef.current.style.transform = 'translateY(-5px)'; } };
  const onLeave = () => { if (glowRef.current) { glowRef.current.style.boxShadow = '0 0 0 1px rgba(34,211,238,0.1)'; glowRef.current.style.transform = 'translateY(0)'; } };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(36px) scale(0.97)', transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 110}ms` }}>
      <div ref={glowRef} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ borderRadius: '14px', boxShadow: '0 0 0 1px rgba(34,211,238,0.1)', transition: 'box-shadow 0.35s ease, transform 0.35s ease', height: '100%' }}>
        <TiltCard className="rounded-[14px] h-full flex flex-col overflow-hidden" style={card}>
          {/* Preview */}
          <div className="relative">
            <ProjectPreview accent={proj.accent} gradFrom={proj.gradFrom} gradTo={proj.gradTo} />
            {/* Category badge */}
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full" style={{ background: `${proj.accent}20`, border: `1px solid ${proj.accent}40`, color: proj.accent }}>
                {CAT_LABEL[proj.category]}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1 gap-4">
            {/* Title */}
            <div>
              <h3 className="text-base font-bold font-display leading-tight" style={{ color: 'var(--c-text)' }}>{proj.title}</h3>
              <p className="text-[11px] font-mono mt-0.5" style={{ color: proj.accent, opacity: 0.8 }}>{proj.subtitle}</p>
            </div>

            {/* Desc */}
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)', flexGrow: 1 }}>{proj.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map(t => (
                <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded border" style={{ background: 'var(--c-tag-bg)', borderColor: 'var(--c-tag-border)', color: 'var(--c-tag-text)' }}>{t}</span>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-3" style={{ borderTop: '1px solid var(--c-border)' }}>
              {proj.metrics.map(m => (
                <div key={m.label} className="text-center">
                  <div className="text-sm font-bold font-mono" style={{ color: proj.accent }}>{m.value}</div>
                  <div className="text-[9px] font-mono mt-0.5 leading-tight" style={{ color: 'var(--c-faint)' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'var(--c-faint)' }}>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" /></svg>
                  {proj.stars}
                </span>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0z"/></svg>
                  {proj.forks}
                </span>
              </div>
              <a href={proj.github} className="flex items-center gap-1.5 text-xs font-mono transition-all hover:gap-2.5" style={{ color: 'var(--c-accent)' }} target="_blank" rel="noopener noreferrer">
                {GITHUB_ICON} GitHub
              </a>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}

function FeaturedProjectCard({ proj }: { proj: Proj }) {
  const { ref, visible } = useScrollReveal();
  const glowRef = useRef<HTMLDivElement>(null);
  const onEnter = () => { if (glowRef.current) { glowRef.current.style.boxShadow = `0 0 0 1px ${proj.accent}45, 0 32px 60px ${proj.accent}16`; } };
  const onLeave = () => { if (glowRef.current) { glowRef.current.style.boxShadow = `0 0 0 1px ${proj.accent}20`; } };
  return (
    <div ref={ref} className="mb-6" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)' }}>
      <div ref={glowRef} onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ borderRadius: '16px', boxShadow: `0 0 0 1px ${proj.accent}20`, transition: 'box-shadow 0.35s ease' }}>
        <div className="rounded-[16px] overflow-hidden grid lg:grid-cols-5" style={card}>
          {/* Preview — takes 2 of 5 cols */}
          <div className="lg:col-span-2 relative min-h-[200px]">
            <ProjectPreview accent={proj.accent} gradFrom={proj.gradFrom} gradTo={proj.gradTo} tall />
            {/* "Featured" ribbon */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: proj.accent, boxShadow: `0 0 8px ${proj.accent}`, animation: 'blink 2s ease-in-out infinite' }} />
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: proj.accent }}>Featured</span>
            </div>
          </div>

          {/* Content — 3 of 5 cols */}
          <div className="lg:col-span-3 p-8 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full" style={{ background: `${proj.accent}18`, border: `1px solid ${proj.accent}35`, color: proj.accent }}>
                    {CAT_LABEL[proj.category]}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--c-text)' }}>{proj.title}</h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: proj.accent, opacity: 0.8 }}>{proj.subtitle}</p>
              </div>
              <a href={proj.github} className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded transition-all hover:scale-105" style={{ background: `${proj.accent}14`, border: `1px solid ${proj.accent}30`, color: proj.accent }} target="_blank" rel="noopener noreferrer">
                {GITHUB_ICON} GitHub
              </a>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{proj.desc}</p>

            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map(t => (
                <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded border" style={{ background: 'var(--c-tag-bg)', borderColor: 'var(--c-tag-border)', color: 'var(--c-tag-text)' }}>{t}</span>
              ))}
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-4 pt-4" style={{ borderTop: '1px solid var(--c-border)' }}>
              {proj.metrics.map((m, idx) => (
                <div key={m.label} className="text-center rounded-lg p-3" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: `opacity 0.5s ease ${300 + idx * 100}ms, transform 0.5s ease ${300 + idx * 100}ms`, background: `${proj.accent}08`, border: `1px solid ${proj.accent}18` }}>
                  <div className="text-lg font-bold font-mono" style={{ color: proj.accent, textShadow: `0 0 16px ${proj.accent}50` }}>{m.value}</div>
                  <div className="text-[10px] font-mono mt-1 leading-tight" style={{ color: 'var(--c-faint)' }}>{m.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--c-faint)' }}>
              <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" /></svg>
              {proj.stars} stars &nbsp;·&nbsp; {proj.forks} forks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjStat({ val, label, accent, i }: { val: string; label: string; accent: string; i: number; }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className="text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms` }}>
      <div className="text-2xl font-bold font-display" style={{ color: accent, textShadow: `0 0 20px ${accent}50` }}>{val}</div>
      <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--c-faint)' }}>{label}</div>
    </div>
  );
}

const PROJ_FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'prod', label: 'Production' },
  { id: 'oss', label: 'Open Source' },
  { id: 'research', label: 'Research' },
];

function ProjectsSection() {
  const [filter, setFilter] = useState('all');
  const [displayFilter, setDisplayFilter] = useState('all');
  const [fading, setFading] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleFilter = (f: string) => {
    if (f === filter) return;
    setFading(true);
    setTimeout(() => { setDisplayFilter(f); setFilter(f); setFading(false); }, 220);
  };

  // Slide indicator to active tab
  useEffect(() => {
    const idx = PROJ_FILTERS.findIndex(f => f.id === filter);
    const tab = tabsRef.current[idx];
    const ind = indicatorRef.current;
    if (tab && ind) {
      ind.style.left = `${tab.offsetLeft}px`;
      ind.style.width = `${tab.offsetWidth}px`;
    }
  }, [filter]);

  const featured = PROJECTS.find(p => p.featured)!;
  const rest = PROJECTS.filter(p => !p.featured);

  const showFeatured = displayFilter === 'all' || featured.category === displayFilter;
  const grid = displayFilter === 'all' ? rest : PROJECTS.filter(p => p.category === displayFilter && !p.featured);

  const counts = { all: PROJECTS.length, prod: PROJECTS.filter(p => p.category === 'prod').length, oss: PROJECTS.filter(p => p.category === 'oss').length, research: PROJECTS.filter(p => p.category === 'research').length };

  return (
    <section id="projects" className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="05 · Work" title="Featured Projects" sub="Production portals, enterprise applications, and web platforms delivered for businesses." />

        {/* Summary stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {([ { val: '6', label: 'Projects', accent: '#22d3ee' }, { val: '14k+', label: 'Total Stars', accent: '#818cf8' }, { val: '3.4k+', label: 'Forks', accent: '#34d399' }, { val: '3', label: 'Papers', accent: '#f472b6' } ] as const).map((s, i) => (
            <ProjStat key={s.label} val={s.val} label={s.label} accent={s.accent} i={i} />
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', backdropFilter: 'blur(12px)' }}>
            {/* Sliding indicator */}
            <div ref={indicatorRef} className="absolute rounded-lg" style={{ top: '4px', bottom: '4px', background: 'var(--c-accent-bg)', border: '1px solid var(--c-border-hi)', transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)', pointerEvents: 'none' }} />
            {PROJ_FILTERS.map((f, idx) => (
              <button
                key={f.id}
                ref={el => { tabsRef.current[idx] = el; }}
                onClick={() => handleFilter(f.id)}
                className="relative z-10 flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors"
                style={{ color: filter === f.id ? 'var(--c-accent)' : 'var(--c-faint)' }}
              >
                {f.label}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: filter === f.id ? 'var(--c-accent-bg)' : 'transparent', color: filter === f.id ? 'var(--c-accent)' : 'var(--c-faint)', border: filter === f.id ? '1px solid var(--c-border-hi)' : '1px solid transparent', transition: 'all 0.25s ease' }}>
                  {counts[f.id as keyof typeof counts]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.22s ease' }}>
          {showFeatured && <FeaturedProjectCard proj={featured} />}
          {grid.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {grid.map((proj, i) => <ProjectCard key={proj.id} proj={proj} i={i} />)}
            </div>
          )}
          {!showFeatured && grid.length === 0 && (
            <div className="text-center py-20" style={{ color: 'var(--c-faint)' }}>
              <p className="text-sm font-mono">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

function TestimonialCard({ t, i }: { t: typeof TESTIMONIALS[number]; i: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: `opacity 0.65s ease ${i * 160}ms, transform 0.65s ease ${i * 160}ms` }}>
      <TiltCard className="rounded-xl p-8 h-full flex flex-col gap-6" style={card}>
        <div className="text-5xl font-display leading-none select-none" style={{ color: `${t.color}30` }}>"</div>
        <p className="text-sm leading-relaxed flex-1 -mt-6" style={{ color: 'var(--c-muted)' }}>{t.quote}</p>
        <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid var(--c-border)' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0" style={{ background: `${t.color}18`, border: `1.5px solid ${t.color}40`, color: t.color }}>
            {t.initials}
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: 'var(--c-text)' }}>{t.name}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--c-faint)' }}>{t.title} · {t.company}</div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative z-10 py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="06 · Feedback" title="What People Say" />
        <div className="grid md:grid-cols-2 gap-6">{TESTIMONIALS.map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}</div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { ref, visible } = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', borderRadius: '8px', padding: '0.75rem 1rem',
    fontSize: '0.875rem', outline: 'none',
    background: 'var(--c-input)',
    border: '1px solid var(--c-input-bd)',
    color: 'var(--c-text)',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="relative z-10 py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="07 · Reach Out" title="Get in Touch" sub="Ready to bring enterprise quality to your website, web application, or architectural vision." />
        <div ref={ref} className="grid lg:grid-cols-2 gap-8" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
          <div className="rounded-xl p-8" style={card}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--c-accent-bg)', border: '1.5px solid var(--c-border-hi)', animation: 'glow-ring 2s ease-in-out infinite' }}>
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--c-accent)' }}><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div>
                  <p className="font-semibold font-display text-lg" style={{ color: 'var(--c-text)' }}>Message sent!</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--c-muted)' }}>I'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--c-faint)' }}>Name</label>
                  <input type="text" required placeholder="Your name" value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--c-faint)' }}>Email</label>
                  <input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--c-faint)' }}>Message</label>
                  <textarea required rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <MagneticBtn className="w-full py-3 rounded-lg font-mono text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8)', boxShadow: '0 0 24px var(--c-dot-glow)', color: 'var(--c-invert)' }}>
                  Send Message
                </MagneticBtn>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="rounded-xl p-7 space-y-4" style={card}>
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--c-faint)' }}>Direct Contact</p>
              {[
                { label: 'Email', value: 'rajeshkannaprogrammer@gmail.com' },
                { label: 'WhatsApp / Phone', value: '+91 8667454755' },
                { label: 'Location', value: 'Tamil Nadu, India' },
                { label: 'Website', value: 'rajeshkanna.in' },
              ].map(f => (
                <div key={f.label} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid var(--c-border)' }}>
                  <span className="text-xs font-mono" style={{ color: 'var(--c-faint)' }}>{f.label}</span>
                  <span className="text-sm" style={{ color: 'var(--c-text)' }}>{f.value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-7" style={card}>
              <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: 'var(--c-faint)' }}>Find Me On</p>
              <div className="flex gap-4">
                {[
                  { label: 'GitHub', href: 'https://github.com/rajeshkanna-s', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajeshkanna-s/', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label: 'WhatsApp', href: 'https://wa.me/918667454755', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg> },
                  { label: 'LeetCode', href: 'https://leetcode.com/rajeshkann_s', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.607 2.6 2.6 0 0 1 .591-.497l3.85-4.12 5.4-5.787a1.376 1.376 0 0 0-.02-1.935A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    className="w-11 h-11 rounded-lg flex items-center justify-center hover:scale-110 transition-all"
                    style={{ background: 'var(--c-accent-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6" style={{ borderTop: '1px solid var(--c-border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono" style={{ color: 'var(--c-faint)' }}>
          © 2026 Rajeshkanna S. All Rights Reserved. · Senior Full Stack Software Engineer & Architect
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c-dot)', boxShadow: '0 0 6px var(--c-dot-glow)', animation: 'blink 2.5s ease-in-out infinite' }} />
          <p className="text-xs font-mono" style={{ color: 'var(--c-faint)' }}>Available for new opportunities</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !dark);
  }, [dark]);

  return (
    <ThemeCtx.Provider value={dark}>
      <div className="relative font-sans" style={{ background: 'var(--c-bg)', color: 'var(--c-text)', minHeight: '100%', transition: 'background-color 0.35s ease, color 0.25s ease' }}>
        <NeuralCanvas />
        <NavBar dark={dark} onToggle={() => setDark(d => !d)} />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <CertificatesSection />
          <ProjectsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeCtx.Provider>
  );
}
