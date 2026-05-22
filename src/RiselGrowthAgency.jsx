import { useState, useEffect, useRef } from "react";

// ─── CSS injected as a style tag ───────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap');

:root {
  --accent: #2563eb;       /* Royal Blue */
  --dark: #0f172a;         /* Slate 900 */
  --mid: #475569;          /* Slate 600 */
  --muted: #94a3b8;        /* Slate 400 */
  --gold: #b45309;         /* Premium Amber/Gold for contrast */
  --green: #15803d;        /* Emerald Green */
  --border: #e2e8f0;       /* Slate 200 */
  --bg: #ffffff;           /* Pure White */
  --white: #ffffff;

  /* Premium Light Theme Color Map */
  --tp: #0f172a;           /* Text Primary */
  --tm: #475569;           /* Text Muted / Body */
  --bn: #e2e8f0;           /* Border Color */
  --bd: #ffffff;           /* Button Text */
  --bc: #ffffff;           /* Card Background */
  --bk: #f8fafc;           /* Footer / Alternate backgrounds */
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg);
  color: var(--tm);
  overflow-x: hidden;
  cursor: none;
}

/* ── Custom Cursor ── */
.rga-cursor {
  width: 12px; height: 12px;
  background: var(--accent);
  border-radius: 50%;
  position: fixed; top: 0; left: 0;
  pointer-events: none; z-index: 99999;
  box-shadow: 0 0 10px var(--accent);
  transform: translate(-6px, -6px);
  transition: transform 0.05s linear;
}
.rga-cursor-ring {
  width: 36px; height: 36px;
  border: 1.5px solid rgba(37, 99, 235, 0.4);
  border-radius: 50%;
  position: fixed; top: 0; left: 0;
  pointer-events: none; z-index: 99998;
  transform: translate(-18px, -18px);
  transition: width 0.2s, height 0.2s, border-color 0.2s;
}
.rga-cursor-ring.expanded {
  width: 54px; height: 54px; border-color: var(--accent);
  transform: translate(-27px, -27px);
}

/* ── CRT Scanlines overlay ── */
.rga-scanlines {
  position: fixed; inset: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(15, 23, 42, 0.003) 2px, rgba(15, 23, 42, 0.003) 4px
  );
  pointer-events: none; z-index: 9999;
}

/* ── Moving Grid ── */
.rga-grid-bg {
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 20s linear infinite;
  pointer-events: none; z-index: 0;
}
@keyframes gridMove { to { transform: translateY(60px); } }

/* ── Particles ── */
.rga-particle {
  position: absolute; width: 2px; height: 2px;
  border-radius: 50%;
  animation: floatParticle linear infinite;
}
@keyframes floatParticle {
  0%   { transform: translateY(100vh) translateX(0); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-100px) translateX(var(--drift)); opacity: 0; }
}

/* ── Run Lines ── */
.rga-run-line {
  position: absolute; width: 1px; height: 120px;
  animation: runDown linear infinite; opacity: 0.5;
}
@keyframes runDown {
  0%   { top: -150px; opacity: 0; }
  10%  { opacity: 0.5; }
  90%  { opacity: 0.5; }
  100% { top: 110%; opacity: 0; }
}

/* ── Navbar ── */
.rga-nav {
  position: fixed; top: 0; width: 100%; z-index: 1000;
  padding: 0 4rem; height: 70px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--bn);
}
.rga-nav::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), var(--dark), var(--gold), transparent);
  animation: navGlow 3s ease-in-out infinite;
}
@keyframes navGlow { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }

.rga-logo { display: flex; align-items: center; gap: 14px; text-decoration: none; }
.rga-logo-img {
  width: 46px; height: 46px; border-radius: 10px; object-fit: cover;
  border: 1.5px solid var(--accent);
  box-shadow: 0 0 15px rgba(37,99,235,0.25), 0 0 30px rgba(37,99,235,0.08);
  animation: logoPulse 2.5s ease-in-out infinite;
}
@keyframes logoPulse {
  0%,100% { box-shadow: 0 0 15px rgba(37,99,235,0.25), 0 0 30px rgba(37,99,235,0.08); }
  50%      { box-shadow: 0 0 25px rgba(37,99,235,0.45), 0 0 50px rgba(37,99,235,0.15); }
}
.rga-logo-text { font-family: 'Playfair Display', serif; font-size:13px; font-weight:700; color:var(--tp); letter-spacing:2px; line-height:1.2; }
.rga-logo-sub  { font-size:9px; color:var(--accent); letter-spacing:4px; }

.rga-nav-links { display:flex; gap:36px; list-style:none; }
.rga-nav-links a {
  font-family: 'Inter', sans-serif; font-size:13px; font-weight:600;
  letter-spacing:3px; color:var(--tm); text-decoration:none;
  text-transform:uppercase; position:relative; transition:color 0.3s;
}
.rga-nav-links a::after {
  content:''; position:absolute; bottom:-4px; left:0;
  width:0; height:1px; background:var(--accent);
  transition:width 0.3s; box-shadow:0 0 8px var(--accent);
}
.rga-nav-links a:hover { color:var(--accent); }
.rga-nav-links a:hover::after { width:100%; }

.rga-nav-cta {
  padding:8px 22px; border:1px solid var(--accent);
  color:var(--accent); background:transparent;
  font-family:'Orbitron',sans-serif; font-size:10px;
  letter-spacing:2px; cursor:pointer;
  transition:all 0.3s; text-transform:uppercase;
}
.rga-nav-cta:hover { background:rgba(37,99,235,0.08); box-shadow:0 0 20px rgba(37,99,235,0.2); }

/* ── Hero ── */
.rga-hero {
  position:relative; min-height:100vh;
  display:flex; align-items:center;
  padding:0 4rem; overflow:hidden; z-index:2;
}
.rga-hero-content { position:relative; z-index:3; max-width:700px; padding-top:70px; }
.rga-hero-tag {
  display:inline-flex; align-items:center; gap:8px;
  padding:6px 16px; border:1px solid rgba(37, 99, 235, 0.2);
  background:rgba(37, 99, 235, 0.05);
  font-family:'Share Tech Mono',monospace; font-size:11px;
  color:var(--accent); letter-spacing:2px; margin-bottom:30px;
  animation:fadeInUp 0.6s ease both;
}
.rga-dot { width:6px; height:6px; background:var(--green); border-radius:50%; animation:blink 1s step-end infinite; }
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }

.rga-hero-title {
  font-family:'Orbitron',sans-serif;
  font-size:clamp(34px,5vw,66px); font-weight:900;
  line-height:1.05; margin-bottom:24px;
  animation:fadeInUp 0.7s 0.1s ease both;
}
.rga-hero-title .line1 { color:var(--tp); display:block; }
.rga-hero-title .line2 {
  display:block;
  background:linear-gradient(135deg,var(--accent),var(--dark));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}
.rga-glitch { animation:glitch 5s infinite; }
@keyframes glitch {
  0%,88%,100% { text-shadow:none; }
  90%  { text-shadow:-2px 0 var(--gold), 2px 0 var(--accent); }
  92%  { text-shadow: 2px 0 var(--gold),-2px 0 var(--accent); }
  94%  { text-shadow:none; }
  97%  { text-shadow:-1px 0 var(--dark), 1px 0 var(--green); }
}

.rga-hero-sub {
  font-size:17px; color:var(--tm); line-height:1.7;
  margin-bottom:48px; max-width:560px;
  animation:fadeInUp 0.7s 0.2s ease both;
}
.rga-hero-btns { display:flex; gap:20px; flex-wrap:wrap; animation:fadeInUp 0.7s 0.3s ease both; }

.rga-btn-primary {
  padding:14px 36px;
  background:linear-gradient(135deg,var(--accent),var(--dark));
  color:var(--bd); font-family:'Orbitron',sans-serif;
  font-size:12px; font-weight:700; letter-spacing:2px;
  text-transform:uppercase; border:none; cursor:pointer;
  clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);
  transition:all 0.3s; animation:floatBtn 3s ease-in-out infinite;
}
.rga-btn-primary:hover { box-shadow:0 10px 25px rgba(37,99,235,0.3); animation:none; transform:scale(1.04); }
.rga-btn-secondary {
  padding:14px 36px; background:transparent; color:var(--accent);
  font-family:'Orbitron',sans-serif; font-size:12px; font-weight:600;
  letter-spacing:2px; text-transform:uppercase;
  border:1px solid var(--accent); cursor:pointer;
  clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);
  transition:all 0.3s;
}
.rga-btn-secondary:hover { background:rgba(37,99,235,0.06); box-shadow:0 0 20px rgba(37,99,235,0.15); }
@keyframes floatBtn { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

/* ── Orb ── */
.rga-hero-visual {
  position:absolute; right:0; top:50%; transform:translateY(-50%);
  width:52vw; height:100vh; z-index:2;
  display:flex; align-items:center; justify-content:center;
}
.rga-hero-orb { width:480px; height:480px; position:relative; }
.rga-orb-core {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:170px; height:170px; border-radius:50%;
  background:radial-gradient(circle,rgba(37,99,235,0.15),rgba(79,70,229,0.1),transparent);
  border:1px solid rgba(37,99,235,0.25);
  animation:orbPulse 3s ease-in-out infinite;
}
@keyframes orbPulse {
  0%,100% { transform:translate(-50%,-50%) scale(1); opacity:0.8; }
  50%      { transform:translate(-50%,-50%) scale(1.1); opacity:1; }
}
.rga-orb-ring {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  border-radius:50%; border:1px solid transparent;
}
.rga-orb-ring:nth-child(1) { width:240px; height:240px; border-top-color:var(--accent); border-right-color:rgba(37,99,235,0.15); animation:spin 8s linear infinite; }
.rga-orb-ring:nth-child(2) { width:330px; height:330px; border-top-color:var(--dark); border-right-color:rgba(79,70,229,0.15); animation:spinR 12s linear infinite; }
.rga-orb-ring:nth-child(3) { width:430px; height:430px; border-top-color:var(--gold); border-right-color:rgba(180,83,9,0.15); animation:spin 18s linear infinite; }
@keyframes spin  { to { transform:translate(-50%,-50%) rotate(360deg); } }
@keyframes spinR { to { transform:translate(-50%,-50%) rotate(-360deg); } }

.rga-orb-dot {
  position:absolute; width:8px; height:8px; border-radius:50%;
}

/* ── Stats Bar ── */
.rga-stats-bar {
  position:relative; z-index:10;
  background:rgba(37, 99, 235, 0.02);
  border-top:1px solid var(--bn); border-bottom:1px solid var(--bn);
  padding:30px 4rem;
  display:grid; grid-template-columns:repeat(4,1fr);
}
.rga-stat-item { text-align:center; padding:20px; position:relative; }
.rga-stat-item:not(:last-child)::after {
  content:''; position:absolute; right:0; top:20%; height:60%; width:1px;
  background:linear-gradient(transparent,var(--bn),transparent);
}
.rga-stat-number {
  font-family:'Orbitron',sans-serif; font-size:38px; font-weight:700;
  background:linear-gradient(135deg,var(--accent),var(--dark));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  display:block;
}
.rga-stat-label { font-size:12px; color:var(--tm); letter-spacing:2px; text-transform:uppercase; margin-top:6px; font-weight:500; }

/* ── Marquee ── */
.rga-marquee-wrap {
  position:relative; z-index:10; overflow:hidden; padding:16px 0;
  background:linear-gradient(135deg,rgba(37, 99, 235, 0.03),rgba(79, 70, 229, 0.03));
  border-top:1px solid rgba(37, 99, 235, 0.1); border-bottom:1px solid rgba(37, 99, 235, 0.1);
}
.rga-marquee-track { display:flex; gap:60px; animation:marqueeScroll 22s linear infinite; white-space:nowrap; }
@keyframes marqueeScroll { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
.rga-marquee-item {
  font-family:'Orbitron',sans-serif; font-size:11px; letter-spacing:3px;
  color:var(--accent); display:flex; align-items:center; gap:12px; flex-shrink:0; opacity:0.7;
}
.rga-marquee-item::before { content:'◆'; color:var(--dark); font-size:8px; }

/* ── Sections ── */
.rga-section { position:relative; z-index:10; padding:100px 4rem; }
.rga-section-header { text-align:center; margin-bottom:70px; }
.rga-eyebrow { font-family:'Share Tech Mono',monospace; font-size:11px; letter-spacing:4px; color:var(--accent); text-transform:uppercase; margin-bottom:16px; opacity:0.8; }
.rga-section-title { font-family:'Orbitron',sans-serif; font-size:clamp(26px,3.5vw,44px); font-weight:700; color:var(--tp); line-height:1.15; }
.rga-section-title span { background:linear-gradient(135deg,var(--accent),var(--dark)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.rga-section-desc { margin-top:16px; font-size:16px; color:var(--tm); max-width:560px; margin-left:auto; margin-right:auto; line-height:1.7; }

/* ── Services ── */
.rga-services-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; margin-bottom:30px; }
.rga-ai-services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
.rga-ai-label {
  font-family:'Share Tech Mono',monospace; font-size:11px; letter-spacing:4px;
  color:var(--green); margin-bottom:24px; display:flex; align-items:center; gap:12px;
}
.rga-ai-label::before, .rga-ai-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(21,128,61,0.3)); }

.rga-service-card {
  background:var(--bc); border:1px solid var(--bn);
  padding:34px 26px; position:relative; overflow:hidden;
  transition:all 0.4s;
  clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px));
  cursor:pointer;
}
.rga-service-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg,transparent,var(--card-color, var(--accent)),transparent);
  transform:translateX(-100%); transition:transform 0.5s;
}
.rga-service-card:hover::before { transform:translateX(0); }
.rga-service-card:hover {
  border-color:var(--card-color, var(--accent));
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08), inset 0 0 40px rgba(37,99,235,0.015);
  transform:translateY(-8px);
}

.rga-service-icon {
  width:54px; height:54px; border:1px solid var(--card-color, var(--accent));
  display:flex; align-items:center; justify-content:center; margin-bottom:22px;
  clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
  background:rgba(37, 99, 235, 0.04);
}
.rga-service-icon svg { width:24px; height:24px; fill:none; stroke-width:1.5; }
.rga-ai-badge {
  display:inline-block; padding:3px 10px;
  background:rgba(21,128,61,0.1); border:1px solid rgba(21,128,61,0.3);
  color:var(--green); font-family:'Share Tech Mono',monospace; font-size:9px;
  letter-spacing:2px; margin-bottom:10px;
}
.rga-service-name { font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; letter-spacing:1px; color:var(--tp); margin-bottom:6px; }
.rga-service-sub { font-size:10px; letter-spacing:3px; text-transform:uppercase; margin-bottom:14px; font-family:'Share Tech Mono',monospace; }
.rga-service-desc { font-size:13px; color:var(--tm); line-height:1.7; }

/* ── About ── */
.rga-about-inner { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
.rga-about-heading { font-family:'Orbitron',sans-serif; font-size:clamp(24px,3vw,38px); font-weight:700; color:var(--tp); line-height:1.2; margin-bottom:22px; }
.rga-about-heading span { color:var(--accent); }
.rga-about-body { font-size:15px; color:var(--tm); line-height:1.8; margin-bottom:36px; }
.rga-about-pillars { display:flex; flex-direction:column; gap:18px; }
.rga-pillar {
  display:flex; gap:18px; align-items:flex-start;
  padding:18px; border:1px solid var(--bn);
  background:rgba(37, 99, 235, 0.02);
  clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
  transition:all 0.3s;
}
.rga-pillar:hover { border-color:rgba(37, 99, 235, 0.3); background:rgba(37, 99, 235, 0.04); }
.rga-pillar-icon {
  width:42px; height:42px; min-width:42px;
  border:1px solid var(--accent); display:flex; align-items:center; justify-content:center;
  font-family:'Orbitron',sans-serif; font-size:10px; color:var(--accent);
  clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
}
.rga-pillar-title { font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; color:var(--tp); margin-bottom:5px; }
.rga-pillar-desc { font-size:13px; color:var(--tm); line-height:1.6; }

.rga-vmg-stack { display:flex; flex-direction:column; gap:18px; }
.rga-vmg-card {
  padding:26px 30px; border:1px solid var(--bn);
  background:var(--bc); display:flex; gap:18px; align-items:flex-start;
  position:relative; overflow:hidden; transition:all 0.3s;
}
.rga-vmg-card::after {
  content:''; position:absolute; bottom:0; left:0; width:100%; height:2px;
  background:linear-gradient(90deg,var(--accent),var(--dark));
  transform:scaleX(0); transform-origin:left; transition:transform 0.4s;
}
.rga-vmg-card:hover::after { transform:scaleX(1); }
.rga-vmg-card:hover { transform:translateX(8px); }
.rga-vmg-icon {
  width:48px; height:48px; min-width:48px; border-radius:50%;
  background:linear-gradient(135deg,rgba(37,99,235,0.1),rgba(79,70,229,0.1));
  border:1px solid rgba(37,99,235,0.3);
  display:flex; align-items:center; justify-content:center; font-size:20px;
}
.rga-vmg-title { font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; color:var(--accent); margin-bottom:8px; letter-spacing:2px; }
.rga-vmg-desc { font-size:14px; color:var(--tm); line-height:1.6; }

/* ── Brands ── */
.rga-brands-grid { display:flex; flex-wrap:wrap; justify-content:center; gap:18px; align-items:center; }
.rga-brand-badge {
  padding:14px 28px; border:1px solid var(--bn);
  background:rgba(37, 99, 235, 0.02);
  font-family:'Orbitron',sans-serif; font-size:12px; font-weight:600;
  letter-spacing:2px; color:var(--tm); transition:all 0.3s;
  clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
}
.rga-brand-badge:hover { color:var(--accent); border-color:rgba(37, 99, 235, 0.3); box-shadow:0 10px 20px rgba(37, 99, 235, 0.05); }

/* ── Testimonials ── */
.rga-testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
.rga-testi-card {
  padding:34px 28px; border:1px solid var(--bn);
  background:#ffffff; position:relative; overflow:hidden; transition:all 0.3s;
}
.rga-testi-card::before {
  content:'"'; position:absolute; top:16px; right:22px;
  font-size:76px; font-family:'Orbitron',sans-serif;
  color:rgba(37,99,235,0.05); line-height:1;
}
.rga-testi-card:hover { border-color:rgba(37, 99, 235, 0.3); box-shadow: 0 15px 30px -10px rgba(15, 23, 42, 0.08); transform:translateY(-4px); }
.rga-testi-text { font-size:14px; line-height:1.8; color:var(--tm); margin-bottom:26px; font-style:italic; }
.rga-testi-brand { display:flex; align-items:center; gap:12px; }
.rga-testi-logo {
  width:42px; height:42px; border-radius:8px;
  background:rgba(37,99,235,0.05); border:1px solid var(--bn);
  display:flex; align-items:center; justify-content:center;
  font-family:'Orbitron',sans-serif; font-size:10px; color:var(--accent);
}
.rga-testi-name { font-family:'Orbitron',sans-serif; font-size:11px; font-weight:700; color:var(--tp); }
.rga-testi-company { font-size:10px; color:var(--accent); letter-spacing:2px; margin-top:2px; }

/* ── Contact ── */
.rga-contact-wrap { display:grid; grid-template-columns:1fr 1.4fr; gap:80px; align-items:start; }
.rga-contact-heading { font-family:'Orbitron',sans-serif; font-size:clamp(20px,2.5vw,34px); font-weight:700; color:var(--tp); margin-bottom:18px; }
.rga-contact-desc { font-size:15px; color:var(--tm); line-height:1.8; margin-bottom:36px; }
.rga-contact-details { display:flex; flex-direction:column; gap:16px; }
.rga-contact-detail {
  padding:22px; border:1px solid var(--bn);
  background:rgba(37, 99, 235, 0.02);
  clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
}
.rga-detail-label { font-family:'Share Tech Mono',monospace; font-size:10px; color:var(--accent); letter-spacing:3px; margin-bottom:7px; }
.rga-detail-value { font-size:15px; color:var(--tp); font-weight:500; }

.rga-contact-form { display:flex; flex-direction:column; gap:14px; }
.rga-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.rga-form-group { display:flex; flex-direction:column; gap:7px; }
.rga-form-label { font-family:'Share Tech Mono',monospace; font-size:10px; color:var(--accent); letter-spacing:2px; }
.rga-form-input, .rga-form-textarea {
  background:#ffffff; border:1px solid var(--bn);
  padding:13px 16px; color:var(--tp);
  font-family:'Rajdhani',sans-serif; font-size:15px;
  outline:none; transition:all 0.3s; resize:none;
  clip-path:polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%);
}
.rga-form-input:focus, .rga-form-textarea:focus {
  border-color:var(--accent); box-shadow:0 0 15px rgba(37,99,235,0.08);
  background:#ffffff;
}
.rga-form-input::placeholder, .rga-form-textarea::placeholder { color:var(--tm); }
.rga-form-textarea { height:120px; }
.rga-btn-submit {
  padding:16px;
  background:linear-gradient(135deg,var(--accent),var(--dark));
  color:var(--bd); font-family:'Orbitron',sans-serif;
  font-size:12px; font-weight:700; letter-spacing:3px;
  text-transform:uppercase; border:none; cursor:pointer;
  clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);
  transition:all 0.3s;
}
.rga-btn-submit:hover { box-shadow:0 10px 25px rgba(37,99,235,0.3); transform:scale(1.02); }

/* ── Follow ── */
.rga-follow-section {
  text-align:center; padding:80px 4rem;
  background:var(--bk); border-top:1px solid var(--bn);
  position:relative; z-index:10;
}
.rga-social-btns { display:flex; justify-content:center; gap:24px; margin-top:40px; }
.rga-social-btn {
  display:flex; align-items:center; gap:12px;
  padding:15px 34px; border:1px solid var(--bn);
  background:#ffffff; color:var(--tp);
  font-family:'Orbitron',sans-serif; font-size:11px; letter-spacing:2px;
  cursor:pointer; text-decoration:none;
  clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);
  transition:all 0.3s; animation:floatBtn 3s ease-in-out infinite;
}
.rga-social-btn:nth-child(2) { animation-delay:0.5s; }
.rga-social-btn:hover { border-color:var(--accent); color:var(--accent); box-shadow:0 10px 20px rgba(37, 99, 235, 0.08); }

/* ── Footer ── */
.rga-footer {
  position:relative; z-index:10; background:var(--bk);
  border-top:1px solid var(--bn); padding:28px 4rem;
  display:flex; justify-content:space-between; align-items:center;
}
.rga-footer-left { font-family:'Share Tech Mono',monospace; font-size:11px; color:var(--tm); letter-spacing:2px; }
.rga-footer-right { font-family:'Share Tech Mono',monospace; font-size:10px; color:rgba(37,99,235,0.5); }

/* ── Reveal animation ── */
.rga-reveal { opacity:0; transform:translateY(30px); transition:all 0.7s ease; }
.rga-reveal.visible { opacity:1; transform:translateY(0); }
.rga-reveal-d1 { transition-delay:0.1s; }
.rga-reveal-d2 { transition-delay:0.2s; }
.rga-reveal-d3 { transition-delay:0.3s; }

/* ── Form success/error ── */
.rga-form-msg { padding:12px 16px; font-family:'Share Tech Mono',monospace; font-size:11px; letter-spacing:2px; }
.rga-form-msg.success { background:rgba(21,128,61,0.1); border:1px solid rgba(21,128,61,0.4); color:var(--green); }
.rga-form-msg.error   { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.4); color:var(--gold); }
`;;

// ─── SVG Icons ──────────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.77 0 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 104.54 6.09V9.65a8.27 8.27 0 004.85 1.56V7.77a4.85 4.85 0 01-1.08-.08z" />
  </svg>
);
const ContentIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const ConsultIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const DMIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    <path d="M14.5 2A6.5 6.5 0 0121 8.5M14.5 6A2.5 2.5 0 0117 8.5" />
  </svg>
);
const LeadIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const RiselLogo = ({ size = 46, style = {} }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={{ display: 'inline-block', ...style }}>
    <defs>
      {/* Glow filters for neon effects */}
      <filter id="neonGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="neonGlowGreen" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="neonGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Gradients */}
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f2fe" /> {/* Neon Cyan */}
        <stop offset="100%" stopColor="#4facfe" /> {/* Neon Blue */}
      </linearGradient>
      <linearGradient id="rGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" /> {/* Pink */}
        <stop offset="50%" stopColor="#8b5cf6" /> {/* Violet */}
        <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
      </linearGradient>
      <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" /> {/* Emerald Green */}
        <stop offset="100%" stopColor="#4ade80" /> {/* Light Green */}
      </linearGradient>
      <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff7b00" />
        <stop offset="50%" stopColor="#ff007b" />
        <stop offset="100%" stopColor="#00f2fe" />
      </linearGradient>
    </defs>

    {/* 1. Globe wireframe background circles (neon globe lines) */}
    <g stroke="url(#globeGrad)" strokeWidth="0.7" opacity="0.45" fill="none">
      <circle cx="100" cy="100" r="92" />
      <circle cx="100" cy="100" r="88" strokeWidth="0.4" />
      {/* Ellipses representing lat/long wireframe lines */}
      <ellipse cx="100" cy="100" rx="92" ry="35" transform="rotate(30 100 100)" />
      <ellipse cx="100" cy="100" rx="92" ry="35" transform="rotate(60 100 100)" />
      <ellipse cx="100" cy="100" rx="92" ry="35" transform="rotate(90 100 100)" />
      <ellipse cx="100" cy="100" rx="92" ry="35" transform="rotate(120 100 100)" />
      <ellipse cx="100" cy="100" rx="92" ry="35" transform="rotate(150 100 100)" />

      {/* Interlacing diagonal lines forming the beautiful outer grid sphere */}
      <path d="M 8 100 Q 100 8 192 100 M 8 100 Q 100 192 192 100" strokeWidth="0.5" />
      <path d="M 100 8 Q 8 100 100 192 M 100 8 Q 192 100 100 192" strokeWidth="0.5" />
    </g>

    {/* 2. Shield in the center */}
    {/* Outer glowing shield stroke */}
    <path d="M 100 45 Q 68 49 62 58 L 62 95 Q 62 128 100 140 Q 138 128 138 95 L 138 58 Q 132 49 100 45 Z"
      stroke="url(#shieldGrad)" strokeWidth="2.5" fill="rgba(15,23,42,0.6)" filter="url(#neonGlowBlue)" />

    {/* Inner decorative grid and shield borders */}
    <path d="M 100 50 Q 72 54 67 62 L 67 92 Q 67 122 100 133 Q 133 122 133 92 L 133 62 Q 128 54 100 50 Z"
      stroke="#00f2fe" strokeWidth="0.7" fill="none" opacity="0.7" />

    {/* Shield vertical/horizontal grid lines */}
    <path d="M 70 85 L 130 85 M 72 100 L 128 100 M 100 50 L 100 133" stroke="url(#shieldGrad)" strokeWidth="0.4" fill="none" opacity="0.3" />

    {/* 3. Star at the top of shield */}
    <polygon points="100,56 102.5,62 109,62.5 104,67 105.5,73 100,70 94.5,73 96,67 91,62.5 97.5,62"
      fill="#ffffff" stroke="#ffffff" strokeWidth="0.5" filter="url(#neonGlowBlue)" />

    {/* 4. Elegant Capital 'R' in the center */}
    {/* Vertical left leg of the R */}
    <path d="M 86 115 L 86 75 C 86 75 92 72 98 72 C 108 72 118 78 118 88 C 118 97 108 102 98 102 L 86 102"
      stroke="url(#rGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#neonGlowPurple)" />
    <path d="M 98 102 L 118 115"
      stroke="url(#rGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" filter="url(#neonGlowPurple)" />

    {/* 5. Glowing Green Upward Growth Arrow crossing through R */}
    <path d="M 87 113 Q 95 90 106 82"
      stroke="url(#arrowGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" filter="url(#neonGlowGreen)" />
    <path d="M 100 81 L 108 81 L 108 89"
      stroke="url(#arrowGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#neonGlowGreen)" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    <path d="M9.4 8.5c-.3 0-.6.1-.9.4-.3.3-.8.8-.8 1.9s.8 2.2 1 2.4c.2.2 1.6 2.4 3.9 3.4.5.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-1-1c-.2-.2-.5-.3-.8-.1l-.4.5c-.2.2-.4.2-.7 0-.3-.1-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.7l.4-.4c.1-.1.2-.3.2-.4v-.4l-.5-1.2c-.2-.3-.5-.4-.7-.4z" fill="currentColor" stroke="none" />
  </svg>
);
const FleurIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M12 2C12 2 8 6 8 10C8 14.5 12 18 12 22C12 22 16 14.5 16 10C16 6 12 2 12 2Z" />
    <path d="M12 10C10.5 7.5 7 7 7 7C7 7 8 10.5 10 12" />
    <path d="M12 10C13.5 7.5 17 7 17 7C17 7 16 10.5 14 12" />
  </svg>
);
const AdopterzIcon = ({ size = 24, style = {} }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} style={{ fill: 'none', strokeWidth: 9, display: 'inline-block', ...style }}>
    <defs>
      <linearGradient id="adopGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" /> {/* Purple */}
        <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
      </linearGradient>
      <linearGradient id="adopGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" /> {/* Orange */}
        <stop offset="100%" stopColor="#ec4899" /> {/* Pink */}
      </linearGradient>
    </defs>
    {/* Right large chevron (purple-pink) */}
    <path d="M35 55 L55 25 L80 75" stroke="url(#adopGrad1)" strokeLinecap="round" strokeLinejoin="round" />
    {/* Left small chevron (orange-pink) */}
    <path d="M20 75 L35 55 L48 72" stroke="url(#adopGrad2)" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MagnifiscienceIcon = ({ size = 44, style = {} }) => (
  <svg viewBox="0 0 100 40" width={size} height={size * 0.4} style={{ fill: 'currentColor', stroke: 'none', display: 'inline-block', ...style }}>
    {/* Wave 1: left to right, high to low to high */}
    <circle cx="10" cy="10" r="2.2" />
    <circle cx="20" cy="13" r="2.2" />
    <circle cx="30" cy="20" r="2.2" />
    <circle cx="40" cy="27" r="2.2" />
    <circle cx="50" cy="30" r="2.2" />
    <circle cx="60" cy="27" r="2.2" />
    <circle cx="70" cy="20" r="2.2" />
    <circle cx="80" cy="13" r="2.2" />
    <circle cx="90" cy="10" r="2.2" />

    {/* Wave 2: left to right, low to high to low */}
    <circle cx="10" cy="30" r="2.2" />
    <circle cx="20" cy="27" r="2.2" />
    <circle cx="30" cy="20" r="2.2" />
    <circle cx="40" cy="13" r="2.2" />
    <circle cx="50" cy="10" r="2.2" />
    <circle cx="60" cy="13" r="2.2" />
    <circle cx="70" cy="20" r="2.2" />
    <circle cx="80" cy="27" r="2.2" />
    <circle cx="90" cy="30" r="2.2" />
  </svg>
);
const EanElliotIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M12 3L4 6v6c0 5.25 3.42 10.16 8 11 4.58-.84 8-5.75 8-11V6l-8-3z" />
    <path d="M9 8h6v3H9v3h6" />
  </svg>
);
const Digital365Icon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
    <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
  </svg>
);
const KFCIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M6 3h12l-2 15H8L6 3z" />
    <path d="M10 3v15M14 3v15" />
  </svg>
);

// ─── Main Component ──────────────────────────────────────────────────────────
export default function RiselGrowthAgency() {
  // Cursor
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [ringExpanded, setRingExpanded] = useState(false);
  const ringRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  // Stats counters
  const [stats, setStats] = useState({ years: 0, brands: 0, retention: 0, reach: 0 });
  const statsObsRef = useRef(null);
  const statsRef = useRef(null);

  // Form
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formMsg, setFormMsg] = useState(null);

  // Inject styles once
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'rga-styles';
    el.textContent = STYLES;
    if (!document.getElementById('rga-styles')) document.head.appendChild(el);
    return () => { const s = document.getElementById('rga-styles'); if (s) s.remove(); };
  }, []);

  // Cursor smooth ring
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', onMove);
    const animate = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.12;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.rga-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Stats counter animation
  useEffect(() => {
    const targets = { years: 4, brands: 200, retention: 98, reach: 50 };
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const animate = (ts) => {
            const progress = Math.min((ts - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setStats({
              years: Math.floor(eased * targets.years),
              brands: Math.floor(eased * targets.brands),
              retention: Math.floor(eased * targets.retention),
              reach: Math.floor(eased * targets.reach),
            });
            if (progress < 1) requestAnimationFrame(animate);
            else setStats(targets);
          };
          requestAnimationFrame(animate);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFormMsg({ type: 'error', text: 'PLEASE FILL ALL REQUIRED FIELDS' });
      return;
    }
    setFormMsg({ type: 'success', text: 'MESSAGE SENT — WE\'LL RESPOND WITHIN 24H' });
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setFormMsg(null), 5000);
  };

  // Orb orbit dots animation
  const orbRefs = useRef([]);
  useEffect(() => {
    const colors = ['#2563eb', '#1a1a1a', '#c8a96e'];
    const radii = [120, 165, 215];
    const speeds = [8000, 12000, 18000];
    let running = true;
    const animate = () => {
      if (!running) return;
      const now = Date.now();
      orbRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const angle = ((now / speeds[i]) * Math.PI * 2) * (i % 2 === 0 ? 1 : -1);
        dot.style.top = `calc(50% + ${Math.sin(angle) * radii[i]}px - 4px)`;
        dot.style.left = `calc(50% + ${Math.cos(angle) * radii[i]}px - 4px)`;
        dot.style.background = colors[i];
        dot.style.boxShadow = `0 0 12px ${colors[i]}`;
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => { running = false; };
  }, []);

  // Particle & run-line data (stable via useMemo-style ref)
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => {
      const cs = ['#2563eb', '#1a1a1a', '#c8a96e', '#16a34a'];
      const c = cs[i % cs.length];
      return {
        left: `${Math.random() * 100}%`,
        dur: `${8 + Math.random() * 15}s`,
        delay: `-${Math.random() * 10}s`,
        drift: `${(Math.random() - 0.5) * 200}px`,
        size: Math.random() > 0.7 ? 3 : 2,
        color: c,
      };
    })
  ).current;
  const runLines = useRef(
    Array.from({ length: 14 }, (_, i) => {
      const cs = ['#2563eb', '#1a1a1a', '#c8a96e'];
      const c1 = cs[i % 3], c2 = cs[(i + 1) % 3];
      return {
        left: `${Math.random() * 100}%`,
        dur: `${4 + Math.random() * 8}s`,
        delay: `-${Math.random() * 8}s`,
        gradient: `linear-gradient(transparent,${c1},${c2},transparent)`,
      };
    })
  ).current;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Custom Cursor */}
      <div className="rga-cursor" style={{ transform: `translate(${cursorPos.x - 6}px,${cursorPos.y - 6}px)` }} />
      <div className={`rga-cursor-ring${ringExpanded ? ' expanded' : ''}`}
        style={{ transform: `translate(${ringPos.x - (ringExpanded ? 27 : 18)}px,${ringPos.y - (ringExpanded ? 27 : 18)}px)` }} />

      {/* Background effects */}
      <div className="rga-scanlines" />
      <div className="rga-grid-bg" />

      {/* Particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {particles.map((p, i) => (
          <div key={i} className="rga-particle" style={{
            left: p.left, width: p.size, height: p.size,
            background: p.color, boxShadow: `0 0 6px ${p.color}`,
            animationDuration: p.dur, animationDelay: p.delay,
            '--drift': p.drift,
          }} />
        ))}
      </div>

      {/* Run lines */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {runLines.map((l, i) => (
          <div key={i} className="rga-run-line" style={{
            left: l.left, background: l.gradient,
            animationDuration: l.dur, animationDelay: l.delay,
          }} />
        ))}
      </div>

      {/* ── NAV ── */}
      <nav className="rga-nav">
        <a href="#home" className="rga-logo">
          <RiselLogo
            size={46}
            style={{
              borderRadius: 10,
              animation: 'logoPulse 2.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 10px rgba(37,99,235,0.25))'
            }}
          />
          <div>
            <div className="rga-logo-text">RISEL</div>
            <div className="rga-logo-sub">GROWTH AGENCY</div>
          </div>
        </a>
        <ul className="rga-nav-links">
          {['services', 'about', 'reviews', 'contact'].map(id => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}
                onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className="rga-nav-cta" onClick={() => scrollTo('contact')}
          onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
          Get Started
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="rga-hero" id="home">
        <div className="rga-hero-content">
          <div className="rga-hero-tag"><span className="rga-dot" /><span>SYSTEM ONLINE — PREMIUM SOCIAL MEDIA GROWTH</span></div>
          <h1 className="rga-hero-title">
            <span className="line1">TURNING</span>
            <span className="line2 rga-glitch">ATTENTION</span>
            <span className="line1">INTO GROWTH</span>
          </h1>
          <p className="rga-hero-sub">We help brands rise above the noise, crafting data-driven strategies that drive engagement, growth, and long-term success across every major platform.</p>
          <div className="rga-hero-btns">
            <button className="rga-btn-primary" onClick={() => scrollTo('contact')}
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              GET STARTED
            </button>
            <button className="rga-btn-secondary" onClick={() => scrollTo('services')}
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              EXPLORE SERVICES
            </button>
          </div>
        </div>

        {/* Animated Orb */}
        <div className="rga-hero-visual">
          <div className="rga-hero-orb">
            {[0, 1, 2].map(i => (
              <div key={i} className="rga-orb-ring">
                <div ref={el => orbRefs.current[i] = el} className="rga-orb-dot" />
              </div>
            ))}
            <div className="rga-orb-core" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="rga-stats-bar" ref={statsRef}>
        {[
          { val: `${stats.years}+`, label: 'Years Experience' },
          { val: `${stats.brands}+`, label: 'Brands Served' },
          { val: `${stats.retention}%`, label: 'Client Retention' },
          { val: `${stats.reach}M+`, label: 'Reach Generated' },
        ].map(({ val, label }, i) => (
          <div key={i} className={`rga-stat-item rga-reveal${i > 0 ? ` rga-reveal-d${i}` : ''}`}>
            <span className="rga-stat-number">{val}</span>
            <span className="rga-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ── MARQUEE ── */}
      <div className="rga-marquee-wrap">
        <div className="rga-marquee-track">
          {[...Array(2)].flatMap(() =>
            ['INSTAGRAM GROWTH', 'TIKTOK ORGANIC', 'CONTENT CREATION',
              'SOCIAL MEDIA CONSULTANCY', 'AI AUTOMATION', 'WHATSAPP BOOKING AI',
              'LEAD QUALIFICATION', 'INSTA DM AUTOMATION'].map((t, i) => (
                <span key={`${t}-${i}`} className="rga-marquee-item">{t}</span>
              ))
          )}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="rga-section">
        <div className="rga-section-header rga-reveal">
          <div className="rga-eyebrow">WHAT WE DO</div>
          <h2 className="rga-section-title">OUR <span>SERVICES</span></h2>
          <p className="rga-section-desc">Core social media growth services + cutting-edge AI automation to scale your business 24/7.</p>
        </div>

        {/* Core 4 */}
        <div className="rga-services-grid">
          {[
            {
              icon: <InstagramIcon />, name: 'INSTAGRAM', sub: 'ORGANIC GROWTH', color: 'var(--accent)',
              desc: 'Grow your Instagram organically with real followers who genuinely engage. Increase reach, visibility, and brand trust. No bots — just consistent, long-term results.'
            },
            {
              icon: <TikTokIcon />, name: 'TIKTOK', sub: 'ORGANIC GROWTH', color: 'var(--dark)',
              desc: 'Grow your TikTok organically with real followers who engage. Boost views, reach, and visibility using proven growth strategies. Real, consistent results only.'
            },
            {
              icon: <ContentIcon />, name: 'CONTENT', sub: 'SOCIAL MEDIA CREATION', color: 'var(--gold)',
              desc: 'Professional social media content creation tailored to your brand. Engaging visuals and captions designed to boost reach. Consistent, high-quality content that drives results.'
            },
            {
              icon: <ConsultIcon />, name: 'CONSULTANCY', sub: 'SOCIAL MEDIA', color: 'var(--green)',
              desc: 'Expert social media consultancy to grow strategically and sustainably. Personalized guidance on content, growth, and platform optimization that turns followers into results.'
            },
          ].map(({ icon, name, sub, color, desc }, i) => (
            <div key={i} className={`rga-service-card rga-reveal${i > 0 ? ` rga-reveal-d${i}` : ''}`}
              style={{ '--card-color': color }}
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              <div className="rga-service-icon" style={{ '--card-color': color }}>
                <div style={{ color }}>{icon}</div>
              </div>
              <div className="rga-service-name">{name}</div>
              <div className="rga-service-sub" style={{ color }}>{sub}</div>
              <p className="rga-service-desc">{desc}</p>
            </div>
          ))}
        </div>

        {/* AI 3 */}
        <div className="rga-ai-label rga-reveal" style={{ marginTop: 50 }}>NEW — AI-POWERED AUTOMATION SERVICES</div>
        <div className="rga-ai-services-grid">
          {[
            {
              icon: <DMIcon />, name: 'INSTA DM AUTOMATION', sub: 'AUTO-REPLY 24/7', color: 'var(--no)',
              desc: 'AI-powered Instagram DM automation that responds to leads instantly, 24/7. Auto-qualify prospects, answer FAQs, send offers, and book calls — all on autopilot. Never miss a lead again.'
            },
            {
              icon: <WhatsAppIcon />, name: 'WHATSAPP BOOKING AI', sub: 'SALES CHAT BOT', color: 'var(--green)',
              desc: 'WhatsApp AI sales agent that chats with prospects, handles objections, presents packages, and books appointments automatically. Your 24/7 sales rep that never sleeps.'
            },
            {
              icon: <LeadIcon />, name: 'LEAD QUALIFICATION', sub: 'AI SALES SYSTEM', color: 'var(--green)',
              desc: 'Intelligent AI lead qualification system that filters, scores, and prioritizes your hottest prospects automatically. Only serious buyers reach your calendar — maximizing conversions.'
            },
          ].map(({ icon, name, sub, color, desc }, i) => (
            <div key={i} className={`rga-service-card rga-reveal${i > 0 ? ` rga-reveal-d${i}` : ''}`}
              style={{ '--card-color': color }}
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              <div className="rga-ai-badge">AI POWERED</div>
              <div className="rga-service-icon" style={{ '--card-color': color }}>
                <div style={{ color }}>{icon}</div>
              </div>
              <div className="rga-service-name" style={{ color }}>{name}</div>
              <div className="rga-service-sub" style={{ color }}>{sub}</div>
              <p className="rga-service-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="rga-section" style={{ background: 'var(--bk)' }}>
        <div className="rga-about-inner">
          <div>
            <div className="rga-eyebrow">ABOUT US</div>
            <h2 className="rga-about-heading rga-reveal">About <span>Risel Growth</span> Agency</h2>
            <p className="rga-about-body rga-reveal">
              Risel Growth Agency is a full-service social media growth and marketing agency with over 4 years of proven experience across all major platforms. We have successfully worked with both individuals and big brands, helping them build a strong digital presence, increase engagement, and drive real results. Our expertise includes organic growth, content creation, social media consultancy, TikTok Shop management, and cutting-edge AI automation.
            </p>
            <div className="rga-about-pillars">
              {[
                { code: 'ORG', title: 'Organic Growth Expertise', desc: 'Authentic audiences, measurable growth, and sustainable impact for businesses worldwide.' },
                { code: 'AI', title: 'AI-Powered Automation', desc: 'Cutting-edge AI tools that automate DMs, bookings, and lead qualification 24/7.' },
                { code: 'DATA', title: 'Data-Driven Strategies', desc: 'Creative execution backed by analytics for long-term success on every platform.' },
              ].map(({ code, title, desc }, i) => (
                <div key={i} className={`rga-pillar rga-reveal${i > 0 ? ` rga-reveal-d${i}` : ''}`}>
                  <div className="rga-pillar-icon">{code}</div>
                  <div>
                    <div className="rga-pillar-title">{title}</div>
                    <div className="rga-pillar-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rga-vmg-stack">
            {[
              { icon: '👁', title: 'VISION', desc: 'To help brands and individuals achieve real, authentic growth on social media.' },
              { icon: '🎯', title: 'MISSION', desc: 'Deliver creative, results-driven strategies for engagement, visibility, and conversions.' },
              { icon: '📋', title: 'LONG-TERM PLAN', desc: 'To lead in social media growth and AI automation, delivering real results and lasting success.' },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className={`rga-vmg-card rga-reveal${i > 0 ? ` rga-reveal-d${i}` : ''}`}
                onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
                <div className="rga-vmg-icon">{icon}</div>
                <div>
                  <div className="rga-vmg-title">{title}</div>
                  <div className="rga-vmg-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="rga-section" style={{ background: 'var(--bg)' }}>
        <div className="rga-section-header rga-reveal">
          <div className="rga-eyebrow">TRUSTED BY</div>
          <h2 className="rga-section-title">TOP <span>BRANDS</span></h2>
          <p className="rga-section-desc">Empowering Brands, Elevating Success</p>
        </div>
        <div className="rga-brands-grid">
          {[
            { name: 'FLEUR & COMPAGNIE', icon: <FleurIcon /> },
            { name: 'ADOPTERZ', icon: <AdopterzIcon /> },
            { name: 'MAGNIFISCIENCE', icon: <MagnifiscienceIcon /> },
            { name: 'EAN ELLIOT', icon: <EanElliotIcon /> },
            { name: '365DIGITAL', icon: <Digital365Icon /> },
            { name: 'KFC', icon: <KFCIcon /> },
          ].map((b, i) => (
            <div key={i} className={`rga-brand-badge rga-reveal${i % 3 > 0 ? ` rga-reveal-d${i % 3}` : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center' }}>{b.icon}</span>
              <span>{b.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="rga-section" style={{ background: 'var(--bk)' }}>
        <div className="rga-section-header rga-reveal">
          <div className="rga-eyebrow">CLIENT FEEDBACK</div>
          <h2 className="rga-section-title"><span>TESTIMONIALS</span></h2>
        </div>
        <div className="rga-testi-grid">
          {[
            { text: 'Working with Risel Growth Agency was a great experience. They managed our social media with a clear strategy, consistent content planning, and strong audience targeting. We saw noticeable improvement in engagement, reach, and brand visibility.', logo: <FleurIcon />, name: 'Mehdi', company: 'FLEUR & COMPAGNIE' },
            { text: 'Risel Growth Agency delivered excellent social media marketing services for our brand. From content strategy to audience engagement, everything was handled professionally. Our follower growth and interaction rate improved steadily.', logo: <AdopterzIcon />, name: 'Tony', company: 'ADOPTERZ' },
            { text: 'Risel Growth Agency played a key role in enhancing our online presence. Their social media strategies helped us reach the right audience and build trust with our community. The content planning made a real difference in brand growth.', logo: <MagnifiscienceIcon />, name: 'Margaux', company: 'MAGNIFISCIENCE' },
          ].map(({ text, logo, name, company }, i) => (
            <div key={i} className={`rga-testi-card rga-reveal${i > 0 ? ` rga-reveal-d${i}` : ''}`}
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              <p className="rga-testi-text">{text}</p>
              <div className="rga-testi-brand">
                <div className="rga-testi-logo">
                  <span style={{ display: 'inline-flex', width: 20, height: 20 }}>{logo}</span>
                </div>
                <div>
                  <div className="rga-testi-name">{name}</div>
                  <div className="rga-testi-company">{company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="rga-section" style={{ background: 'var(--bg)' }}>
        <div className="rga-section-header rga-reveal">
          <div className="rga-eyebrow">REACH OUT</div>
          <h2 className="rga-section-title">CONTACT <span>US</span></h2>
        </div>
        <div className="rga-contact-wrap">
          <div>
            <h3 className="rga-contact-heading rga-reveal">Let's Build Something <span style={{ color: 'var(--accent)' }}>Extraordinary</span></h3>
            <p className="rga-contact-desc rga-reveal">Ready to scale your social media presence or automate your sales with AI? Get in touch and let's craft a strategy that delivers real, measurable results.</p>
            <div className="rga-contact-details">
              {[
                { label: 'PHONE', value: '+92 335 8169111' },
                { label: 'EMAIL', value: 'riselgrowthagency@gmail.com' },
              ].map(({ label, value }, i) => (
                <div key={i} className={`rga-contact-detail rga-reveal${i > 0 ? ' rga-reveal-d1' : ''}`}>
                  <div className="rga-detail-label">{label}</div>
                  <div className="rga-detail-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <form className="rga-contact-form rga-reveal" onSubmit={handleSubmit}>
            <div className="rga-form-row">
              <div className="rga-form-group">
                <label className="rga-form-label">YOUR NAME *</label>
                <input className="rga-form-input" type="text" placeholder="Enter your name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="rga-form-group">
                <label className="rga-form-label">YOUR EMAIL *</label>
                <input className="rga-form-input" type="email" placeholder="Enter your email"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="rga-form-group">
              <label className="rga-form-label">PHONE NUMBER</label>
              <input className="rga-form-input" type="tel" placeholder="Enter your phone"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="rga-form-group">
              <label className="rga-form-label">YOUR MESSAGE *</label>
              <textarea className="rga-form-textarea" placeholder="Tell us about your project..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            {formMsg && <div className={`rga-form-msg ${formMsg.type}`}>{formMsg.text}</div>}
            <button className="rga-btn-submit" type="submit"
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              SEND MESSAGE →
            </button>
          </form>
        </div>
      </section>

      {/* ── FOLLOW ── */}
      <div className="rga-follow-section">
        <div className="rga-eyebrow" style={{ marginBottom: 16 }}>STAY CONNECTED</div>
        <h2 className="rga-section-title">FOLLOW <span>US</span></h2>
        <div className="rga-social-btns">
          {[
            { icon: <InstagramIcon />, label: 'INSTAGRAM', href: 'https://www.instagram.com/riselgrowthagency' },
            { icon: <TikTokIcon />, label: 'TIKTOK', href: 'https://www.tiktok.com/@riselgrowthagency' },
          ].map(({ icon, label, href }) => (
            <a key={label} className="rga-social-btn" href={href} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              onMouseEnter={() => setRingExpanded(true)} onMouseLeave={() => setRingExpanded(false)}>
              <span style={{ display: 'inline-flex', width: 18, height: 18 }}>{icon}</span> {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="rga-footer">
        <div className="rga-footer-left">© 2026 RISEL GROWTH AGENCY — ALL RIGHTS RESERVED</div>
        <div className="rga-footer-right">SYSTEM v2.6 | ONLINE</div>
      </footer>
    </>
  );
}
