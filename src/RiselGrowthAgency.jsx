import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import fleurLogo from './assets/Fleur.png';
import adopterzLogo from './assets/Adopterz.png';
import magnifiscienceLogo from './assets/Magnifiscience.png';
import eanElliotLogo from './assets/EanElliot.png';
import logo365 from './assets/365Digital.png';
import kfcLogo from './assets/KFC.png';
import riselLogo from './assets/risellogo.png';

// ─── CSS ────────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

:root {
  --primary: #1e3a5f;
  --primary-light: #2a5a8f;
  --accent: #ff6b35;
  --accent-light: #ff8c5a;
  --accent-glow: rgba(255, 107, 53, 0.15);
  --dark: #0d1b2a;
  --text: #334155;
  --text-light: #64748b;
  --text-dark: #1e293b;
  --bg: #ffffff;
  --bg-warm: #faf8f5;
  --bg-section: #f8f6f3;
  --border: #e8e4df;
  --green: #10b981;
  --green-bg: rgba(16, 185, 129, 0.08);
  --card-shadow: 0 4px 24px rgba(0,0,0,0.06);
  --card-shadow-hover: 0 12px 40px rgba(0,0,0,0.12);
  --radius: 16px;
  --radius-sm: 10px;
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ─── Typography ─── */
.rga-heading {
  font-family: 'DM Serif Display', Georgia, serif;
  color: var(--text-dark);
  line-height: 1.15;
}

/* ─── Container ─── */
.rga-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Navbar ─── */
.rga-nav {
  position: fixed; top: 0; width: 100%; z-index: 1000;
  padding: 0 40px; height: 72px;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(232,228,223,0.7);
  transition: var(--transition);
}
.rga-nav.scrolled {
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
}

.rga-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.rga-logo-mark {
  width: 52px; height: 52px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg);
  overflow: hidden;
  transition: var(--transition);
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid var(--border);
}
.rga-logo-mark img {
  width: 100%; height: 100%; 
  object-fit: cover;
}
.rga-logo:hover .rga-logo-mark { transform: scale(1.05); }
.rga-logo-text {
  font-family: 'DM Serif Display', serif; font-size: 20px;
  color: var(--text-dark); letter-spacing: -0.3px;
}
.rga-logo-sub {
  font-size: 11px; color: var(--accent); letter-spacing: 1.5px;
  font-weight: 600; text-transform: uppercase; margin-top: -2px;
}

.rga-nav-links {
  display: flex; gap: 32px; list-style: none; align-items: center;
}
.rga-nav-links a {
  font-size: 14px; font-weight: 500; color: var(--text);
  text-decoration: none; position: relative; transition: color var(--transition);
  padding: 4px 0;
}
.rga-nav-links a::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 2px; background: var(--accent);
  border-radius: 1px; transition: width var(--transition);
}
.rga-nav-links a:hover { color: var(--accent); }
.rga-nav-links a:hover::after { width: 100%; }

.rga-nav-cta {
  padding: 10px 24px; border-radius: 50px;
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  color: #fff; font-size: 14px; font-weight: 600;
  border: none; cursor: pointer; transition: var(--transition);
  box-shadow: 0 4px 14px rgba(255,107,53,0.3);
}
.rga-nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255,107,53,0.4);
}

/* Hamburger */
.rga-hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 6px;
  z-index: 1001;
}
.rga-hamburger span {
  display: block; width: 24px; height: 2px;
  background: var(--text-dark); border-radius: 2px;
  transition: var(--transition);
}
.rga-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.rga-hamburger.open span:nth-child(2) { opacity: 0; }
.rga-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

/* Mobile nav overlay */
.rga-mobile-overlay {
  display: none; position: fixed; inset: 0; z-index: 999;
  background: rgba(255,255,255,0.98);
  backdrop-filter: blur(20px);
  flex-direction: column; align-items: center; justify-content: center; gap: 28px;
  opacity: 0; pointer-events: none; transition: opacity 0.3s;
}
.rga-mobile-overlay.open { opacity: 1; pointer-events: all; }
.rga-mobile-overlay a {
  font-size: 22px; font-weight: 600; color: var(--text-dark);
  text-decoration: none; transition: color var(--transition);
}
.rga-mobile-overlay a:hover { color: var(--accent); }

/* ─── Hero ─── */
.rga-hero {
  position: relative; min-height: 100vh; display: flex; align-items: center;
  padding: 120px 40px 80px; overflow: hidden;
  background: linear-gradient(165deg, #faf8f5 0%, #fff 40%, #fef3ed 100%);
}
.rga-hero-inner {
  max-width: 1200px; margin: 0 auto; width: 100%;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: center;
}
.rga-hero-content { position: relative; z-index: 2; }

.rga-hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 18px; border-radius: 50px;
  background: var(--accent-glow); border: 1px solid rgba(255,107,53,0.2);
  font-size: 13px; font-weight: 600; color: var(--accent);
  margin-bottom: 28px; animation: fadeInUp 0.6s ease both;
}
.rga-hero-badge-dot {
  width: 7px; height: 7px; background: var(--green);
  border-radius: 50%; animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.rga-hero-title {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(38px, 5.5vw, 64px); font-weight: 400;
  line-height: 1.1; color: var(--text-dark);
  margin-bottom: 24px; animation: fadeInUp 0.7s 0.1s ease both;
}
.rga-hero-title .highlight {
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rga-hero-sub {
  font-size: 17px; color: var(--text-light); line-height: 1.75;
  margin-bottom: 40px; max-width: 500px;
  animation: fadeInUp 0.7s 0.2s ease both;
}
.rga-hero-btns {
  display: flex; gap: 16px; flex-wrap: wrap;
  animation: fadeInUp 0.7s 0.3s ease both;
}
.rga-btn-primary {
  padding: 14px 32px; border-radius: 50px;
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  color: #fff; font-size: 15px; font-weight: 600;
  border: none; cursor: pointer; transition: var(--transition);
  box-shadow: 0 4px 16px rgba(255,107,53,0.3);
}
.rga-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(255,107,53,0.4);
}
.rga-btn-secondary {
  padding: 14px 32px; border-radius: 50px;
  background: transparent; color: var(--text-dark);
  font-size: 15px; font-weight: 600;
  border: 2px solid var(--border); cursor: pointer;
  transition: var(--transition);
}
.rga-btn-secondary:hover {
  border-color: var(--accent); color: var(--accent);
  background: var(--accent-glow);
}

/* Hero visual */
.rga-hero-visual {
  position: relative; display: flex; align-items: center;
  justify-content: center; animation: fadeInUp 0.8s 0.3s ease both;
}
.rga-hero-graphic {
  width: 100%; max-width: 500px; aspect-ratio: 1;
  position: relative;
}
.rga-hero-circle {
  position: absolute; border-radius: 50%;
  border: 1.5px solid; animation: float 6s ease-in-out infinite;
}
.rga-hero-circle-1 {
  width: 100%; height: 100%; border-color: rgba(255,107,53,0.15);
  animation-delay: 0s;
}
.rga-hero-circle-2 {
  width: 80%; height: 80%; top: 10%; left: 10%;
  border-color: rgba(30,58,95,0.1); animation-delay: -2s;
}
.rga-hero-circle-3 {
  width: 60%; height: 60%; top: 20%; left: 20%;
  border-color: rgba(255,107,53,0.1); animation-delay: -4s;
}
.rga-hero-center-icon {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 120px; height: 120px; border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 20px 60px rgba(255,107,53,0.2);
}
.rga-hero-center-icon svg { width: 50px; height: 50px; }

/* Floating badges on hero graphic */
.rga-float-badge {
  position: absolute; padding: 10px 18px;
  background: #fff; border-radius: var(--radius-sm);
  box-shadow: var(--card-shadow); display: flex;
  align-items: center; gap: 10px; font-size: 13px;
  font-weight: 600; color: var(--text-dark);
  animation: floatBadge 4s ease-in-out infinite;
  white-space: nowrap;
}
.rga-float-badge-icon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}
@keyframes float {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ─── Stats ─── */
.rga-stats {
  position: relative; z-index: 10;
  padding: 48px 40px;
  background: var(--dark);
}
.rga-stats-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
}
.rga-stat {
  text-align: center; padding: 20px;
  position: relative;
}
.rga-stat:not(:last-child)::after {
  content: ''; position: absolute; right: 0; top: 20%; height: 60%;
  width: 1px; background: rgba(255,255,255,0.1);
}
.rga-stat-number {
  font-family: 'DM Serif Display', serif;
  font-size: 42px; color: #fff; display: block;
  margin-bottom: 4px;
}
.rga-stat-label {
  font-size: 13px; color: rgba(255,255,255,0.5);
  letter-spacing: 1px; text-transform: uppercase; font-weight: 500;
}

/* ─── Section commons ─── */
.rga-section {
  position: relative; z-index: 10;
  padding: 70px 40px;
}
.rga-section-header {
  text-align: center; margin-bottom: 64px; max-width: 600px;
  margin-left: auto; margin-right: auto;
}
.rga-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 600; letter-spacing: 2px;
  color: var(--accent); text-transform: uppercase; margin-bottom: 16px;
}
.rga-eyebrow::before, .rga-eyebrow::after {
  content: ''; width: 24px; height: 1.5px; background: var(--accent);
  border-radius: 1px;
}
.rga-section-title {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(30px, 4vw, 46px);
  color: var(--text-dark); line-height: 1.2; margin-bottom: 16px;
}
.rga-section-title span {
  color: var(--accent);
}
.rga-section-desc {
  font-size: 16px; color: var(--text-light); line-height: 1.7;
}

/* ─── Web Development Section ─── */
.rga-webdev-section {
  background: linear-gradient(160deg, #0d1b2a 0%, #1e3a5f 50%, #0d2440 100%);
  padding: 100px 40px;
  position: relative;
  overflow: hidden;
  z-index: 10;
}
.rga-webdev-section::before {
  content: '';
  position: absolute;
  top: -200px; right: -200px;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.rga-webdev-section::after {
  content: '';
  position: absolute;
  bottom: -150px; left: -150px;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.rga-webdev-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 2;
}
.rga-webdev-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #ff6b35;
  text-transform: uppercase;
  margin-bottom: 20px;
}
.rga-webdev-label::before, .rga-webdev-label::after {
  content: '';
  width: 20px; height: 1.5px;
  background: #ff6b35;
  border-radius: 1px;
}
.rga-webdev-title {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(32px, 4.5vw, 52px);
  color: #ffffff;
  line-height: 1.15;
  margin-bottom: 20px;
}
.rga-webdev-title span {
  background: linear-gradient(135deg, #ff6b35, #ff9a6c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.rga-webdev-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.65);
  line-height: 1.8;
  margin-bottom: 36px;
}
.rga-webdev-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 36px;
}
.rga-webdev-feature {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  transition: 0.3s ease;
}
.rga-webdev-feature:hover {
  background: rgba(255,107,53,0.08);
  border-color: rgba(255,107,53,0.2);
  transform: translateY(-3px);
}
.rga-webdev-feature-icon {
  font-size: 22px;
  flex-shrink: 0;
  line-height: 1;
}
.rga-webdev-feature-text strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 3px;
}
.rga-webdev-feature-text span {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  line-height: 1.5;
}
.rga-webdev-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 50px;
  background: linear-gradient(135deg, #ff6b35, #e85d2c);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 0 4px 20px rgba(255,107,53,0.35);
}
.rga-webdev-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(255,107,53,0.45);
}
.rga-webdev-visual {
  position: relative;
}
.rga-webdev-mockup {
  background: #111827;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
}
.rga-webdev-mockup-bar {
  background: #1f2937;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.rga-webdev-mockup-dots {
  display: flex;
  gap: 6px;
}
.rga-webdev-mockup-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.rga-webdev-mockup-url {
  flex: 1;
  background: rgba(255,255,255,0.06);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  font-family: monospace;
}
.rga-webdev-mockup-body {
  padding: 24px;
}
.rga-webdev-mockup-hero {
  background: linear-gradient(135deg, #1e3a5f 0%, #ff6b35 100%);
  border-radius: 12px;
  height: 140px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}
.rga-webdev-mockup-lines {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}
.rga-webdev-mockup-line {
  border-radius: 6px;
  background: rgba(255,255,255,0.07);
  height: 10px;
}
.rga-webdev-mockup-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.rga-webdev-mockup-card {
  background: rgba(255,107,53,0.12);
  border: 1px solid rgba(255,107,53,0.2);
  border-radius: 10px;
  height: 60px;
}
.rga-webdev-tech-badges {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background: #0d1b2a;
  padding: 12px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  white-space: nowrap;
}
.rga-webdev-tech-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 50px;
  letter-spacing: 0.5px;
}
@media (max-width: 1024px) {
  .rga-webdev-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .rga-webdev-section {
    padding: 80px 24px;
  }
}
@media (max-width: 640px) {
  .rga-webdev-section {
    padding: 60px 16px;
  }
  .rga-webdev-features {
    grid-template-columns: 1fr;
  }
  .rga-webdev-tech-badges {
    flex-wrap: wrap;
    justify-content: center;
    bottom: -30px;
  }
}

/* ─── Services ─── */
.rga-services-grid {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.rga-service-card {
  background: #fff; border: 1px solid var(--border);
  border-radius: var(--radius); padding: 32px 28px;
  transition: var(--transition); cursor: default;
  position: relative; overflow: hidden;
}
.rga-service-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px; background: linear-gradient(90deg, var(--card-accent, var(--accent)), transparent);
  transform: scaleX(0); transform-origin: left; transition: transform 0.4s;
}
.rga-service-card:hover::before { transform: scaleX(1); }
.rga-service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--card-shadow-hover);
  border-color: transparent;
}
.rga-service-icon {
  width: 56px; height: 56px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px; transition: var(--transition);
}
.rga-service-icon svg { width: 26px; height: 26px; }
.rga-service-card:hover .rga-service-icon { transform: scale(1.08); }
.rga-ai-tag {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 4px 12px; border-radius: 50px;
  background: var(--green-bg); color: var(--green);
  font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  margin-bottom: 14px;
}
.rga-ai-tag::before {
  content: ''; width: 5px; height: 5px; background: var(--green);
  border-radius: 50%;
}
.rga-service-name {
  font-family: 'DM Serif Display', serif; font-size: 20px;
  color: var(--text-dark); margin-bottom: 6px;
}
.rga-service-sub {
  font-size: 12px; font-weight: 600; letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 14px;
}
.rga-service-desc {
  font-size: 14px; color: var(--text-light); line-height: 1.7;
}

.rga-ai-divider {
  max-width: 1200px; margin: 48px auto;
  display: flex; align-items: center; gap: 16px;
  font-size: 13px; font-weight: 600; color: var(--green);
  letter-spacing: 1.5px;
}
.rga-ai-divider::before, .rga-ai-divider::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent);
}

/* ABOUT SECTION */
.about-section {
  padding: 120px 8%;
  background: #0f0f0f;
  color: white;
}

.about-intro {
  text-align: center;
  max-width: 950px;
  margin: 0 auto 70px;
}

.section-tag {
  display: inline-block;
  color: #7dff8d;
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: 20px;
}

.about-intro h2 {
  font-size: 52px;
  margin-bottom: 25px;
  font-weight: 700;
  line-height: 1.2;
}

.about-intro h2 span {
  color: #7dff8d;
}

.main-about-text {
  font-size: 18px;
  line-height: 1.9;
  color: #cfcfcf;
}

/* GRID */
.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  align-items: stretch;
}

/* CARDS */
.about-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  padding: 40px 35px;
  transition: 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 320px;
}

.about-card:hover {
  transform: translateY(-10px);
  border-color: #7dff8d;
  box-shadow: 0 20px 40px rgba(125,255,141,0.15);
}

.about-icon {
  font-size: 42px;
  margin-bottom: 25px;
}

.about-card h3 {
  font-size: 24px;
  margin-bottom: 18px;
  font-weight: 600;
}

.about-card p {
  color: #cfcfcf;
  line-height: 1.8;
  font-size: 16px;
  flex-grow: 1;
}

/* MOBILE */
@media(max-width:768px){

  .about-section {
    padding: 90px 6%;
  }

  .about-intro h2 {
    font-size: 38px;
  }

  .main-about-text {
    font-size: 16px;
  }

  .about-card {
    min-height: auto;
  }

}
  .about-intro,
.about-card {
  opacity: 0;
  transform: translateY(60px);
  animation: riseUp 1s ease forwards;
}

.about-intro {
  animation-delay: 0.2s;
}

.about-card:nth-child(1) {
  animation-delay: 0.4s;
}

.about-card:nth-child(2) {
  animation-delay: 0.6s;
}

.about-card:nth-child(3) {
  animation-delay: 0.8s;
}

@keyframes riseUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* ─── Brands ─── */
.rga-brands-grid {
  max-width: 1200px; margin: 0 auto;
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: 16px; align-items: center;
}
.rga-brand-badge {
  padding: 14px 28px; border-radius: var(--radius-sm);
  border: 1px solid var(--border); background: #fff;
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; font-weight: 700; color: var(--text);
  letter-spacing: 1px; transition: var(--transition);
}
.rga-brand-badge:hover {
  border-color: rgba(255,107,53,0.3);
  box-shadow: 0 4px 16px rgba(255,107,53,0.06);
  color: var(--accent); transform: translateY(-3px);
}
.rga-brand-badge svg { color: var(--accent); }
@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scrollRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* ─── Testimonials ─── */
.rga-testi-grid {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.rga-testi-card {
  padding: 32px 28px; border-radius: var(--radius);
  border: 1px solid var(--border); background: #fff;
  position: relative; overflow: hidden; transition: var(--transition);
}
.rga-testi-card::before {
  content: '"'; position: absolute; top: 12px; right: 20px;
  font-family: 'DM Serif Display', serif;
  font-size: 72px; color: rgba(255,107,53,0.07); line-height: 1;
}
.rga-testi-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--card-shadow-hover);
  border-color: transparent;
}
.rga-testi-stars { margin-bottom: 16px; color: #f59e0b; font-size: 16px; letter-spacing: 2px; }
.rga-testi-text {
  font-size: 15px; line-height: 1.8; color: var(--text);
  margin-bottom: 24px; font-style: italic;
}
.rga-testi-author { display: flex; align-items: center; gap: 12px; }
.rga-testi-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #e8e4df;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}
.rga-testi-name { font-weight: 700; font-size: 14px; color: var(--text-dark); }
.rga-testi-company { font-size: 12px; color: var(--accent); font-weight: 500; margin-top: 2px; }

/* ─── Contact ─── */
.rga-contact-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1.4fr;
  gap: 64px; align-items: start;
}
.rga-contact-heading {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(24px, 3vw, 36px);
  color: var(--text-dark); margin-bottom: 16px; line-height: 1.2;
}
.rga-contact-heading span { color: var(--accent); }
.rga-contact-desc {
  font-size: 15px; color: var(--text-light); line-height: 1.8; margin-bottom: 32px;
}
.rga-contact-details { display: flex; flex-direction: column; gap: 14px; }
.rga-contact-detail {
  padding: 18px 20px; border-radius: var(--radius-sm);
  border: 1px solid var(--border); background: #fff;
  transition: var(--transition);
}
.rga-contact-detail:hover { border-color: rgba(255,107,53,0.2); }
.rga-detail-label {
  font-size: 11px; font-weight: 700; color: var(--accent);
  letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;
}
.rga-detail-value { font-size: 15px; color: var(--text-dark); font-weight: 500; }

.rga-form { display: flex; flex-direction: column; gap: 16px; }
.rga-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.rga-form-group { display: flex; flex-direction: column; gap: 6px; }
.rga-form-label {
  font-size: 13px; font-weight: 600; color: var(--text-dark);
}
.rga-form-input, .rga-form-textarea {
  background: #fff; border: 1.5px solid var(--border);
  border-radius: var(--radius-sm); padding: 14px 18px;
  color: var(--text-dark); font-family: 'Inter', sans-serif;
  font-size: 15px; outline: none; transition: var(--transition);
  resize: none;
}
.rga-form-input:focus, .rga-form-textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}
.rga-form-input::placeholder, .rga-form-textarea::placeholder {
  color: var(--text-light);
}
.rga-form-textarea { height: 130px; }
.rga-btn-submit {
  padding: 16px; border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  color: #fff; font-size: 15px; font-weight: 700;
  letter-spacing: 0.5px; border: none; cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 16px rgba(255,107,53,0.25);
}
.rga-btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(255,107,53,0.35);
}
.rga-form-msg {
  padding: 14px 18px; border-radius: var(--radius-sm);
  font-size: 14px; font-weight: 500;
}
.rga-form-msg.success {
  background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3);
  color: var(--green);
}
.rga-form-msg.error {
  background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.3);
  color: #ef4444;
}

/* ─── Social / Follow ─── */
.rga-follow {
  text-align: center; padding: 80px 40px;
  background: var(--bg-warm); border-top: 1px solid var(--border);
  position: relative; z-index: 10;
}
.rga-social-btns {
  display: flex; justify-content: center; gap: 16px;
  margin-top: 36px; flex-wrap: wrap;
}
.rga-social-btn {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 28px; border-radius: 50px;
  border: 1.5px solid var(--border); background: #fff;
  color: var(--text-dark); font-size: 14px; font-weight: 600;
  cursor: pointer; text-decoration: none; transition: var(--transition);
}
.rga-social-btn:hover {
  border-color: var(--accent); color: var(--accent);
  box-shadow: 0 4px 16px rgba(255,107,53,0.08);
  transform: translateY(-2px);
}
.rga-social-btn svg { width: 20px; height: 20px; }

/* ─── Footer ─── */
.rga-footer {
  position: relative; z-index: 10;
  background: var(--dark); padding: 36px 40px;
  display: flex; justify-content: space-between; align-items: center;
}
.rga-footer-left {
  font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 400;
}
.rga-footer-right {
  font-size: 12px; color: rgba(255,255,255,0.3);
}

/* ─── Reveal animation ─── */
.rga-reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.rga-reveal.visible { opacity: 1; transform: translateY(0); }
.rga-reveal-d1 { transition-delay: 0.1s; }
.rga-reveal-d2 { transition-delay: 0.2s; }
.rga-reveal-d3 { transition-delay: 0.3s; }

/* ─── RESPONSIVE: Tablet ─── */
@media (max-width: 1024px) {
  .rga-nav { padding: 0 24px; }
  .rga-nav-links { display: none; }
  .rga-nav-cta { display: none; }
  .rga-hamburger { display: flex; }
  .rga-mobile-overlay { display: flex; }

  .rga-hero { padding: 100px 24px 60px; }
  .rga-hero-inner { grid-template-columns: 1fr; gap: 40px; text-align: center; }
  .rga-hero-sub { margin-left: auto; margin-right: auto; }
  .rga-hero-btns { justify-content: center; }
  .rga-hero-graphic { max-width: 360px; margin: 0 auto; }

  .rga-stats-inner { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .rga-stat:nth-child(2)::after { display: none; }

  .rga-section { padding: 80px 24px; }
  .rga-about-inner { grid-template-columns: 1fr; gap: 48px; }
  .rga-contact-inner { grid-template-columns: 1fr; gap: 40px; }

  .rga-float-badge { display: none; }
}

/* ─── RESPONSIVE: Mobile ─── */
@media (max-width: 640px) {

  .rga-nav { padding: 0 16px; height: 64px; }
  .rga-hero { padding: 90px 16px 48px; min-height: auto; }
  .rga-hero-title { font-size: clamp(30px, 8vw, 42px); }
  .rga-hero-sub { font-size: 15px; }
  .rga-hero-btns { flex-direction: column; align-items: stretch; }
  .rga-hero-btns button { width: 100%; text-align: center; }
  .rga-hero-graphic { max-width: 260px; }

  .rga-stats { padding: 32px 16px; }
  .rga-stats-inner { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .rga-stat { padding: 14px 8px; }
  .rga-stat-number { font-size: 30px; }
  .rga-stat-label { font-size: 11px; }
  .rga-stat:not(:last-child)::after { display: none; }

  .rga-section { padding: 60px 16px; }
  .rga-section-header { margin-bottom: 40px; }
  .rga-section-title { font-size: clamp(26px, 6vw, 36px); }

  .rga-services-grid { grid-template-columns: 1fr; gap: 16px; }
  .rga-testi-grid { grid-template-columns: 1fr; gap: 16px; }

  .rga-form-row { grid-template-columns: 1fr; }

  .rga-brands-grid { gap: 10px; }
  .rga-brand-badge { padding: 10px 18px; font-size: 11px; }

  .rga-follow { padding: 60px 16px; }
  .rga-social-btns { flex-direction: column; align-items: stretch; }
  .rga-social-btn { justify-content: center; }

  .rga-footer {
    padding: 24px 16px;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .rga-section {
    overflow: hidden;
  }
}

/* ─── RESPONSIVE: Small phones ─── */
@media (max-width: 380px) {
  .rga-hero-title { font-size: 28px; }
  .rga-section-title { font-size: 24px; }
  .rga-stat-number { font-size: 26px; }
  .rga-about-heading { font-size: 24px; }
  .rga-contact-heading { font-size: 22px; }
}

/* ─── Chatbot ─── */
.rga-chat-fab {
  position: fixed; bottom: 28px; right: 28px; z-index: 9999;
  width: 62px; height: 62px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  border: none; cursor: pointer;
  box-shadow: 0 8px 32px rgba(255,107,53,0.5);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  color: #fff;
}
.rga-chat-fab:hover {
  transform: scale(1.12);
  box-shadow: 0 14px 44px rgba(255,107,53,0.6);
}
.rga-chat-fab-pulse {
  position: absolute; top: 2px; right: 2px;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--green); border: 2px solid #fff;
  animation: chatPulse 2s ease-in-out infinite;
}
@keyframes chatPulse {
  0%,100%{transform:scale(1);opacity:1}
  50%{transform:scale(1.35);opacity:0.65}
}
.rga-chat-window {
  position: fixed; bottom: 104px; right: 28px; z-index: 9998;
  width: 380px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 28px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05);
  display: flex; flex-direction: column; overflow: hidden;
  transform: translateY(20px) scale(0.94);
  opacity: 0; pointer-events: none;
  transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  max-height: 570px;
}
.rga-chat-window.open {
  transform: translateY(0) scale(1);
  opacity: 1; pointer-events: all;
}
.rga-chat-header {
  background: linear-gradient(135deg, #0d1b2a 0%, #1e3a5f 100%);
  padding: 18px 20px;
  display: flex; align-items: center; gap: 12px;
  flex-shrink: 0;
}
.rga-chat-header-avatar {
  width: 46px; height: 46px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(255,107,53,0.4);
}
.rga-chat-header-info { flex: 1; }
.rga-chat-header-name {
  font-weight: 700; font-size: 15px; color: #fff; line-height: 1.2;
}
.rga-chat-header-status {
  font-size: 11.5px; color: rgba(255,255,255,0.65);
  display: flex; align-items: center; gap: 5px; margin-top: 3px;
}
.rga-chat-status-dot {
  width: 7px; height: 7px; background: var(--green);
  border-radius: 50%; flex-shrink: 0;
  animation: chatPulse 2.5s ease-in-out infinite;
}
.rga-chat-header-close {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.1); border: none; cursor: pointer;
  color: #fff; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s; flex-shrink: 0;
}
.rga-chat-header-close:hover { background: rgba(255,255,255,0.22); }
.rga-chat-messages {
  flex: 1; overflow-y: auto; padding: 18px 14px;
  display: flex; flex-direction: column; gap: 10px;
  background: #f8f6f3;
}
.rga-chat-messages::-webkit-scrollbar { width: 4px; }
.rga-chat-messages::-webkit-scrollbar-track { background: transparent; }
.rga-chat-messages::-webkit-scrollbar-thumb { background: #ded9d3; border-radius: 4px; }
.rga-chat-msg-row {
  display: flex; align-items: flex-end; gap: 8px;
}
.rga-chat-msg-row.user { flex-direction: row-reverse; }
.rga-chat-bot-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; flex-shrink: 0;
}
.rga-chat-bubble {
  max-width: 78%; padding: 11px 15px;
  border-radius: 18px; font-size: 13.5px; line-height: 1.65;
  animation: bubbleIn 0.28s ease;
}
@keyframes bubbleIn {
  from{opacity:0;transform:translateY(8px) scale(0.95)}
  to{opacity:1;transform:translateY(0) scale(1)}
}
.rga-chat-msg-row.bot .rga-chat-bubble {
  background:#fff; color:var(--text-dark);
  border-bottom-left-radius:4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
}
.rga-chat-msg-row.user .rga-chat-bubble {
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  color:#fff; border-bottom-right-radius:4px;
}
.rga-chat-typing {
  display: flex; align-items: flex-end; gap: 8px;
}
.rga-chat-typing-dots {
  background:#fff; padding:12px 16px;
  border-radius:18px; border-bottom-left-radius:4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.07);
  display:flex; gap:5px; align-items:center;
}
.rga-chat-typing-dot {
  width:7px; height:7px; border-radius:50%;
  background:#ccc; animation: typingDot 1.4s ease-in-out infinite;
}
.rga-chat-typing-dot:nth-child(2){animation-delay:0.2s}
.rga-chat-typing-dot:nth-child(3){animation-delay:0.4s}
@keyframes typingDot {
  0%,60%,100%{transform:translateY(0);background:#ccc}
  30%{transform:translateY(-6px);background:var(--accent)}
}
.rga-chat-chips {
  display:flex; flex-direction:column; gap:7px;
  padding-left:36px;
}
.rga-chat-chip {
  display:flex; align-items:center; gap:10px;
  padding:10px 15px; border-radius:12px;
  border:1.5px solid var(--border); background:#fff;
  font-size:13px; font-weight:600; color:var(--text-dark);
  cursor:pointer; transition:all 0.22s; text-align:left;
  box-shadow:0 2px 8px rgba(0,0,0,0.04);
  animation: bubbleIn 0.28s ease;
}
.rga-chat-chip:hover {
  border-color:var(--accent); color:var(--accent);
  background:var(--accent-glow); transform:translateX(5px);
}
.rga-chat-actions {
  display:flex; flex-direction:column; gap:8px;
  padding-left:36px;
}
.rga-chat-action-primary {
  padding:12px 20px; border-radius:50px;
  background:linear-gradient(135deg,var(--accent),#e85d2c);
  color:#fff; font-size:13px; font-weight:700;
  border:none; cursor:pointer; transition:all 0.25s;
  box-shadow:0 4px 14px rgba(255,107,53,0.32);
  text-align:center; width:100%;
  animation: bubbleIn 0.28s ease;
}
.rga-chat-action-primary:hover {
  transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(255,107,53,0.44);
}
.rga-chat-action-secondary {
  padding:11px 20px; border-radius:50px;
  background:transparent; color:var(--text-dark);
  font-size:13px; font-weight:600;
  border:1.5px solid var(--border); cursor:pointer;
  transition:all 0.25s; text-align:center; width:100%;
  animation: bubbleIn 0.28s ease;
}
.rga-chat-action-secondary:hover {
  border-color:var(--accent); color:var(--accent);
  background:var(--accent-glow);
}
.rga-chat-calendly-card {
  background:linear-gradient(135deg,#0d1b2a,#1e3a5f);
  border-radius:16px; padding:18px;
  display:flex; flex-direction:column; gap:12px;
  box-shadow:0 8px 28px rgba(0,0,0,0.18);
  animation: bubbleIn 0.28s ease;
}
.rga-chat-calendly-title {
  font-size:14px; font-weight:700; color:#fff;
}
.rga-chat-calendly-desc {
  font-size:12px; color:rgba(255,255,255,0.6); line-height:1.6;
}
.rga-chat-calendly-btn {
  display:flex; align-items:center; justify-content:center; gap:8px;
  padding:12px 20px; border-radius:50px;
  background:linear-gradient(135deg,var(--accent),#e85d2c);
  color:#fff; font-size:13px; font-weight:700;
  border:none; cursor:pointer; transition:all 0.25s;
  text-decoration:none;
  box-shadow:0 4px 14px rgba(255,107,53,0.4);
}
.rga-chat-calendly-btn:hover {
  transform:translateY(-2px);
  box-shadow:0 10px 26px rgba(255,107,53,0.5);
}
@media(max-width:640px){
  .rga-chat-window{
    width:calc(100vw - 24px); right:12px; bottom:88px;
    max-height:520px;
  }
  .rga-chat-fab{right:16px;bottom:20px}
}

/* ─── Review System ─── */
.rga-review-actions {
  display: flex; gap: 16px; justify-content: center;
  margin-top: 32px; flex-wrap: wrap;
}
.rga-btn-review {
  padding: 14px 36px; border-radius: 50px;
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  color: #fff; font-size: 15px; font-weight: 700;
  border: none; cursor: pointer; transition: var(--transition);
  box-shadow: 0 4px 18px rgba(255,107,53,0.3);
  display: inline-flex; align-items: center; gap: 8px;
}
.rga-btn-review:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(255,107,53,0.45);
}
.rga-btn-admin {
  padding: 14px 36px; border-radius: 50px;
  background: transparent; color: var(--text);
  font-size: 15px; font-weight: 600;
  border: 2px solid var(--border); cursor: pointer;
  transition: var(--transition);
  display: inline-flex; align-items: center; gap: 8px;
}
.rga-btn-admin:hover {
  border-color: var(--primary); color: var(--primary);
  background: rgba(30,58,95,0.04);
}

/* Review Modal Overlay */
.rga-modal-overlay {
  position: fixed; inset: 0; z-index: 10000;
  background: rgba(13,27,42,0.65);
  backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  animation: modalFadeIn 0.3s ease;
}
@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.rga-modal {
  background: #fff; border-radius: 24px;
  width: 100%; max-width: 560px;
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 32px 80px rgba(0,0,0,0.25);
  animation: modalSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes modalSlideIn {
  from { opacity: 0; transform: translateY(30px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.rga-modal-header {
  padding: 28px 32px 0;
  display: flex; align-items: center; justify-content: space-between;
}
.rga-modal-title {
  font-family: 'DM Serif Display', serif;
  font-size: 24px; color: var(--text-dark);
}
.rga-modal-close {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--bg-section); border: none; cursor: pointer;
  font-size: 20px; color: var(--text-light);
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}
.rga-modal-close:hover {
  background: #fee2e2; color: #ef4444;
}
.rga-modal-body { padding: 24px 32px 32px; }

/* Star Rating */
.rga-star-rating {
  display: flex; gap: 6px; margin: 8px 0 4px;
}
.rga-star-btn {
  background: none; border: none; cursor: pointer;
  font-size: 32px; transition: transform 0.15s;
  color: #e0ddd8; line-height: 1;
}
.rga-star-btn.active { color: #f59e0b; }
.rga-star-btn:hover { transform: scale(1.2); }

/* Review Form Fields */
.rga-review-form .rga-form-group { margin-bottom: 20px; }
.rga-review-form .rga-form-label {
  display: block; font-size: 13px; font-weight: 600;
  color: var(--text-dark); margin-bottom: 8px;
  letter-spacing: 0.3px;
}
.rga-review-form .rga-form-input,
.rga-review-form .rga-form-textarea {
  width: 100%; padding: 14px 18px; border-radius: 12px;
  border: 1.5px solid var(--border); background: var(--bg-section);
  font-family: 'Inter', sans-serif; font-size: 14px;
  color: var(--text-dark); transition: var(--transition);
  outline: none;
}
.rga-review-form .rga-form-input:focus,
.rga-review-form .rga-form-textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-glow);
}
.rga-review-form .rga-form-textarea {
  min-height: 120px; resize: vertical;
}
.rga-review-submit {
  width: 100%; padding: 16px; border-radius: 14px;
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  color: #fff; font-size: 16px; font-weight: 700;
  border: none; cursor: pointer; transition: var(--transition);
  box-shadow: 0 6px 20px rgba(255,107,53,0.35);
  margin-top: 8px;
}
.rga-review-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255,107,53,0.45);
}
.rga-review-submit:disabled {
  opacity: 0.6; cursor: not-allowed; transform: none;
}
.rga-review-success {
  text-align: center; padding: 40px 20px;
  animation: modalSlideIn 0.4s ease;
}
.rga-review-success-icon {
  font-size: 56px; margin-bottom: 16px;
}
.rga-review-success h3 {
  font-family: 'DM Serif Display', serif;
  font-size: 22px; color: var(--text-dark); margin-bottom: 8px;
}
.rga-review-success p {
  font-size: 14px; color: var(--text-light); line-height: 1.6;
}

/* Admin Panel */
.rga-admin-modal {
  max-width: 800px;
}
.rga-admin-password {
  text-align: center; padding: 40px 32px;
}
.rga-admin-password p {
  font-size: 14px; color: var(--text-light); margin-bottom: 20px;
}
.rga-admin-password input {
  width: 100%; max-width: 300px; padding: 14px 18px;
  border-radius: 12px; border: 1.5px solid var(--border);
  background: var(--bg-section); font-size: 14px;
  text-align: center; outline: none; transition: var(--transition);
}
.rga-admin-password input:focus {
  border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-glow);
}
.rga-admin-password button {
  display: block; margin: 16px auto 0; padding: 12px 40px;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  color: #fff; font-weight: 700; font-size: 14px;
  border: none; cursor: pointer; transition: var(--transition);
}
.rga-admin-password button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30,58,95,0.3);
}
.rga-admin-password .rga-admin-error {
  color: #ef4444; font-size: 13px; margin-top: 12px;
}
.rga-admin-list {
  display: flex; flex-direction: column; gap: 16px;
}
.rga-admin-item {
  padding: 20px; border-radius: 16px;
  border: 1px solid var(--border); background: var(--bg-section);
  transition: var(--transition);
}
.rga-admin-item:hover { border-color: rgba(255,107,53,0.3); }
.rga-admin-item-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}
.rga-admin-item-info {
  display: flex; align-items: center; gap: 10px;
}
.rga-admin-item-name {
  font-weight: 700; font-size: 14px; color: var(--text-dark);
}
.rga-admin-item-company {
  font-size: 12px; color: var(--accent); font-weight: 500;
}
.rga-admin-item-stars {
  color: #f59e0b; font-size: 14px; letter-spacing: 1px;
}
.rga-admin-item-text {
  font-size: 13px; color: var(--text); line-height: 1.7;
  font-style: italic; margin-bottom: 12px;
}
.rga-admin-item-actions {
  display: flex; gap: 8px;
}
.rga-admin-btn {
  padding: 8px 20px; border-radius: 8px;
  font-size: 12px; font-weight: 700;
  border: none; cursor: pointer; transition: var(--transition);
}
.rga-admin-btn-edit {
  background: rgba(30,58,95,0.08); color: var(--primary);
}
.rga-admin-btn-edit:hover {
  background: rgba(30,58,95,0.15);
}
.rga-admin-btn-delete {
  background: rgba(239,68,68,0.08); color: #ef4444;
}
.rga-admin-btn-delete:hover {
  background: rgba(239,68,68,0.15);
}
.rga-admin-edit-form {
  margin-top: 12px; padding-top: 12px;
  border-top: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 10px;
}
.rga-admin-edit-form input,
.rga-admin-edit-form textarea {
  width: 100%; padding: 10px 14px; border-radius: 10px;
  border: 1.5px solid var(--border); background: #fff;
  font-family: 'Inter', sans-serif; font-size: 13px;
  color: var(--text-dark); outline: none; transition: var(--transition);
}
.rga-admin-edit-form input:focus,
.rga-admin-edit-form textarea:focus {
  border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow);
}
.rga-admin-edit-form textarea {
  min-height: 80px; resize: vertical;
}
.rga-admin-edit-actions {
  display: flex; gap: 8px; justify-content: flex-end;
}
.rga-admin-btn-save {
  background: linear-gradient(135deg, var(--accent), #e85d2c);
  color: #fff; padding: 10px 24px; border-radius: 8px;
  font-size: 13px; font-weight: 700;
  border: none; cursor: pointer; transition: var(--transition);
}
.rga-admin-btn-save:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(255,107,53,0.3);
}
.rga-admin-btn-cancel {
  background: var(--bg-section); color: var(--text);
  padding: 10px 24px; border-radius: 8px;
  font-size: 13px; font-weight: 600;
  border: 1px solid var(--border); cursor: pointer;
  transition: var(--transition);
}
.rga-admin-btn-cancel:hover {
  border-color: var(--text-light);
}
.rga-admin-empty {
  text-align: center; padding: 40px; color: var(--text-light);
  font-size: 14px;
}

/* Footer admin link */
.rga-footer-admin {
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.25); font-size: 11px;
  padding: 2px 6px; transition: color 0.3s;
}
.rga-footer-admin:hover { color: rgba(255,255,255,0.6); }

@media(max-width:640px){
  .rga-modal { margin: 12px; border-radius: 20px; }
  .rga-modal-header { padding: 20px 20px 0; }
  .rga-modal-body { padding: 20px; }
  .rga-modal-title { font-size: 20px; }
  .rga-admin-modal { max-width: 100%; }
  .rga-review-actions { flex-direction: column; align-items: stretch; }
  .rga-btn-review, .rga-btn-admin {
    justify-content: center; width: 100%;
  }
}
`;

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
const CameraIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
const ConsultIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const WebDevIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 7l-4 10" />
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', stroke: '#fff', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const GrowIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
    <path d="M12 22v-6" />
    <path d="M4 22H15" />
    <path d="M9 22h-7" />
    <path d="M5 22l4-14 4 14" />
    <path d="M9.5 8a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
  </svg>
);

// ─── Chatbot Data ────────────────────────────────────────────────────────────
const CHAT_SERVICES = [
  {
    id: 'instagram',
    label: '📸 Instagram Growth & DM',
    detail: `Our Instagram Growth & DM service builds you a genuine, engaged audience organically.

✅ Real follower growth with targeted strategies
✅ Automated DM systems that convert followers into clients
✅ Increased reach, visibility & brand trust
✅ Proven methods used by 200+ brands worldwide`,
  },
  {
    id: 'tiktok',
    label: '🎵 TikTok Growth',
    detail: `Grow your TikTok with our proven organic strategies and platform expertise.

✅ Real, engaged TikTok followers
✅ Viral content strategies & scroll-stopping hooks
✅ Boosted views, reach & discoverability
✅ Algorithm-aligned, sustainable growth`,
  },
  {
    id: 'organic',
    label: '📈 Organic Social Growth',
    detail: `Multi-platform organic growth across Instagram, TikTok, Facebook & beyond.

✅ Authentic community building across all platforms
✅ Cross-platform content strategy
✅ Engagement rate improvement
✅ Sustainable growth — zero paid ads needed`,
  },
  {
    id: 'content',
    label: '📷 Content Creation',
    detail: `Premium social media content crafted to match your brand identity perfectly.

✅ Professional visuals, graphics & reels
✅ Engaging captions & scroll-stopping copy
✅ Platform-optimised formats for every channel
✅ Consistent brand voice & posting schedule`,
  },
  {
    id: 'consultancy',
    label: '📊 Social Media Consultancy',
    detail: `Strategic, personalised social media consultancy to accelerate your growth.

✅ Full social media audit & in-depth analysis
✅ Custom growth roadmap for your brand
✅ Platform optimisation & content strategy
✅ Ongoing expert guidance & 1-on-1 support`,
  },
  {
    id: 'webdev',
    label: '💻 Web Development',
    detail: `Custom websites, landing pages, e-commerce stores & web apps built to convert.

✅ Bespoke design & full-stack development
✅ Mobile-first & fully responsive on all devices
✅ SEO optimised from day one
✅ React, Next.js, Shopify, WordPress & more`,
  },
];

// ─── Chatbot Component ────────────────────────────────────────────────────────
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);
  const CALENDLY_URL = 'https://calendly.com/riselgrowthagency/30min'; // ← replace with your Calendly link

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !started) {
      setStarted(true);
      botSay('greeting',
        `👋 Hey there! Welcome to **Risel Growth Agency**!\n\nI'm your virtual assistant. I'm here to help you discover our services and book a strategy call with our team.\n\nReady to grow your brand? 🚀`,
        1300
      );
    }
  }, [isOpen]);

  const botSay = (type, text, delay = 950, extra = {}) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { from: 'bot', type, text, ...extra }]);
    }, delay);
  };

  const userSay = text =>
    setMessages(prev => [...prev, { from: 'user', type: 'text', text }]);

  const handleStart = () => {
    userSay("Let's get started! 🚀");
    botSay('services',
      "Great! Here are all our services. Tap the one you're interested in and I'll tell you everything about it 👇"
    );
  };

  const handleService = svc => {
    userSay(svc.label);
    botSay('detail', svc.detail, 1200, { service: svc });
  };

  const handleBook = () => {
    userSay("I'd like to book a meeting 📅");
    botSay('booking',
      "Awesome! 🎉 Pick a time that works for you — our team is ready to craft a strategy just for your brand.",
      1000
    );
  };

  const handleOtherServices = () => {
    userSay('Show me other services');
    botSay('services', 'Of course! Here are all our services:');
  };

  const handleRestart = () => {
    userSay('Explore more services');
    botSay('services', 'No problem! Here are all our services again:');
  };

  const renderText = text =>
    text.split(/\*\*(.*?)\*\*/g).map((p, i) =>
      i % 2 === 1 ? <strong key={i}>{p}</strong> : p
    );

  return (
    <>
      {/* ── Floating button ── */}
      <button
        className="rga-chat-fab"
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#fff', fill: 'none', strokeWidth: 2.5 }}>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, stroke: '#fff', fill: 'none', strokeWidth: 2 }}>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
        {!isOpen && <span className="rga-chat-fab-pulse" />}
      </button>

      {/* ── Chat window ── */}
      <div className={`rga-chat-window${isOpen ? ' open' : ''}`}>

        {/* Header */}
        <div className="rga-chat-header">
          <div className="rga-chat-header-avatar">🚀</div>
          <div className="rga-chat-header-info">
            <div className="rga-chat-header-name">Risel Assistant</div>
            <div className="rga-chat-header-status">
              <span className="rga-chat-status-dot" />
              Online · replies instantly
            </div>
          </div>
          <button className="rga-chat-header-close" onClick={() => setIsOpen(false)}
            aria-label="Close chat">
            <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: '#fff', fill: 'none', strokeWidth: 2.5 }}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="rga-chat-messages">
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

              {/* User bubble */}
              {msg.from === 'user' && (
                <div className="rga-chat-msg-row user">
                  <div className="rga-chat-bubble">{msg.text}</div>
                </div>
              )}

              {/* Bot bubble */}
              {msg.from === 'bot' && (
                <>
                  <div className="rga-chat-msg-row bot">
                    <div className="rga-chat-bot-avatar">🚀</div>
                    <div className="rga-chat-bubble" style={{ whiteSpace: 'pre-line' }}>
                      {renderText(msg.text)}
                    </div>
                  </div>

                  {/* Greeting CTA */}
                  {msg.type === 'greeting' && (
                    <div style={{ paddingLeft: 36 }}>
                      <button className="rga-chat-action-primary" onClick={handleStart}>
                        Let's get started 🚀
                      </button>
                    </div>
                  )}

                  {/* Services chips */}
                  {msg.type === 'services' && (
                    <div className="rga-chat-chips">
                      {CHAT_SERVICES.map(svc => (
                        <button key={svc.id} className="rga-chat-chip"
                          onClick={() => handleService(svc)}>
                          {svc.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Detail actions */}
                  {msg.type === 'detail' && (
                    <div className="rga-chat-actions">
                      <button className="rga-chat-action-primary" onClick={handleBook}>
                        📅 Book a Free Meeting
                      </button>
                      <button className="rga-chat-action-secondary" onClick={handleOtherServices}>
                        ← See Other Services
                      </button>
                    </div>
                  )}

                  {/* Booking card */}
                  {msg.type === 'booking' && (
                    <div className="rga-chat-actions">
                      <div className="rga-chat-calendly-card">
                        <div className="rga-chat-calendly-title">📅 Schedule a Free Strategy Call</div>
                        <div className="rga-chat-calendly-desc">
                          Choose a convenient time slot. Our strategy session is completely free — no commitments.
                        </div>
                        <a href={CALENDLY_URL} target="_blank" rel="noreferrer"
                          className="rga-chat-calendly-btn">
                          <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: '#fff', fill: 'none', strokeWidth: 2 }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                          </svg>
                          Open Calendly Booking
                        </a>
                      </div>
                      <button className="rga-chat-action-secondary" onClick={handleRestart}>
                        ← Explore More Services
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="rga-chat-typing">
              <div className="rga-chat-bot-avatar">🚀</div>
              <div className="rga-chat-typing-dots">
                <div className="rga-chat-typing-dot" />
                <div className="rga-chat-typing-dot" />
                <div className="rga-chat-typing-dot" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function RiselGrowthAgency() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [stats, setStats] = useState({ years: 0, brands: 0, retention: 0, reach: 0 });
  const statsRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formMsg, setFormMsg] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // ── Review System State ──
  const DEFAULT_REVIEWS = [
    { id: 1, text: 'Working with Risel Growth Agency was a great experience. They managed our social media with a clear strategy, consistent content planning, and strong audience targeting. We saw noticeable improvement in engagement, reach, and brand visibility.', name: 'Mehdi', company: 'Fleur & Compagnie', rating: 5 },
    { id: 2, text: 'Risel Growth Agency delivered excellent social media marketing services for our brand. From content strategy to audience engagement, everything was handled professionally. Our follower growth and interaction rate improved steadily.', name: 'Tony', company: 'Adopterz', rating: 5 },
    { id: 3, text: 'Risel Growth Agency played a key role in enhancing our online presence. Their strategies helped us reach the right audience and build trust with our community. The content planning made a real difference in brand growth.', name: 'Margaux', company: 'Magnifiscience', rating: 5 },
    { id: 4, text: 'Risel Digital Agency demonstrated strong expertise in social media marketing while working on KFC Pakistan–related campaigns. His strategic content planning and audience-focused approach helped increase engagement and improve overall brand visibility. He understands how to align global brand standards with local market trends.', name: 'Noor', company: 'KFC', rating: 5 },
    { id: 5, text: 'Risel Digital Agency provided high-quality social media marketing support with a strong focus on brand consistency and engagement. His strategic approach helped improve visibility, audience interaction, and overall performance across platforms. A dedicated professional who understands how to grow brands digitally.', name: 'Ankit Jaitly', company: '365Digital', rating: 5 },
    { id: 6, text: 'Working with Risel Digital Agency was a smooth and productive experience. He managed social media activities professionally, focusing on consistency, engagement, and performance. His insights into audience behavior and content optimization contributed to stronger reach and better interaction across platforms.', name: 'Michael', company: 'Ean Elliot', rating: 5 },
  ];

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('risel_reviews');
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch { return DEFAULT_REVIEWS; }
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', company: '', text: '', rating: 5 });
  const [reviewForm, setReviewForm] = useState({ name: '', company: '', text: '', rating: 5 });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const ADMIN_PASSWORD = 'risel2026';

  // Persist reviews to localStorage
  useEffect(() => {
    localStorage.setItem('risel_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleReviewSubmit = () => {
    if (!reviewForm.name || !reviewForm.text || !reviewForm.rating) return;
    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      company: reviewForm.company || '',
      text: reviewForm.text,
      rating: reviewForm.rating,
    };
    setReviews(prev => [...prev, newReview]);
    setReviewForm({ name: '', company: '', text: '', rating: 5 });
    setReviewSubmitted(true);
    setTimeout(() => { setReviewSubmitted(false); setShowReviewForm(false); }, 2500);
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      setAdminError('');
    } else {
      setAdminError('Incorrect password. Please try again.');
    }
  };

  const startEditReview = (review) => {
    setEditingReviewId(review.id);
    setEditForm({ name: review.name, company: review.company, text: review.text, rating: review.rating });
  };

  const saveEditReview = () => {
    setReviews(prev => prev.map(r => r.id === editingReviewId
      ? { ...r, name: editForm.name, company: editForm.company, text: editForm.text, rating: editForm.rating }
      : r
    ));
    setEditingReviewId(null);
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // ── EmailJS config ──────────────────────────────────────────────────────────
  const EMAILJS_SERVICE_ID = 'service_2cjtfgk';
  const EMAILJS_TEMPLATE_ID = 'template_5jdgmdi';
  const EMAILJS_PUBLIC_KEY = 'gmwjYtXITk2_uswG8';

  // Inject styles
  useEffect(() => {
    const el = document.createElement('style');
    el.id = 'rga-styles';
    el.textContent = STYLES;
    if (!document.getElementById('rga-styles')) document.head.appendChild(el);
    return () => { const s = document.getElementById('rga-styles'); if (s) s.remove(); };
  }, []);

  // Scroll nav shadow
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

  // Stats counter
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
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFormMsg({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    setIsSending(true);
    setFormMsg(null);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Not provided',
          message: form.message,
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setFormMsg({ type: 'success', text: "Message sent! We'll get back to you within 24 hours." });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setFormMsg({ type: 'error', text: 'Failed to send message. Please try again or email us directly.' });
    } finally {
      setIsSending(false);
      setTimeout(() => setFormMsg(null), 6000);
    }
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);


  const navItems = ['services', 'webdev', 'about', 'reviews', 'contact'];
  const navLabels = { services: 'Services', webdev: 'Web Dev', about: 'About', reviews: 'Reviews', contact: 'Contact' };
  const serviceColors = [
    { bg: 'rgba(255,107,53,0.08)', color: '#ff6b35' },
    { bg: 'rgba(30,58,95,0.08)', color: '#1e3a5f' },
    { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b' },
    { bg: 'rgba(16,185,129,0.08)', color: '#10b981' },
    { bg: 'rgba(99,102,241,0.08)', color: '#6366f1' },
  ];
  const logos = [
    { src: fleurLogo, h: '50px' },
    { src: adopterzLogo, h: '40px' },
    { src: magnifiscienceLogo, h: '28px' },
    { src: eanElliotLogo, h: '50px' },
    { src: logo365, h: '44px' },
    { src: kfcLogo, h: '60px' },
  ];
  return (
    <>
      {/* ── NAV ── */}
      <nav className={`rga-nav${navScrolled ? ' scrolled' : ''}`}>
        <a href="#home" className="rga-logo" onClick={e => { e.preventDefault(); scrollTo('home'); }}>
          <div className="rga-logo-mark">
            <img src={riselLogo} alt="Risel Growth Agency" />
          </div>
          <div>
            <div className="rga-logo-text">Risel Growth</div>
            <div className="rga-logo-sub">Digital Agency</div>
          </div>
        </a>

        <ul className="rga-nav-links">
          {navItems.map(id => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                {navLabels[id] || id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <button className="rga-nav-cta" onClick={() => scrollTo('contact')}>
          Let's Talk
        </button>

        <button
          className={`rga-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`rga-mobile-overlay${menuOpen ? ' open' : ''}`}>
        {navItems.map(id => (
          <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
            {navLabels[id] || id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <button className="rga-nav-cta" style={{ marginTop: 12 }} onClick={() => scrollTo('contact')}>
          Let's Talk
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="rga-hero" id="home">
        <div className="rga-hero-inner">
          <div className="rga-hero-content">
            <div className="rga-hero-badge">
              <span className="rga-hero-badge-dot" />
              Premium Social Media Growth
            </div>
            <h1 className="rga-hero-title">
              We Turn Your <span className="highlight">Digital Presence</span> Into Real Growth
            </h1>
            <p className="rga-hero-sub">
              We help brands rise above the noise, crafting data-driven strategies that drive engagement, growth, and long-term success across every major platform.
            </p>
            <div className="rga-hero-btns">
              <button className="rga-btn-primary" onClick={() => scrollTo('contact')}>
                Get Started Today
              </button>
              <button className="rga-btn-secondary" onClick={() => scrollTo('services')}>
                Explore Services
              </button>
            </div>
          </div>

          <div className="rga-hero-visual">
            <div className="rga-hero-graphic">
              <div className="rga-hero-circle rga-hero-circle-1" />
              <div className="rga-hero-circle rga-hero-circle-2" />
              <div className="rga-hero-circle rga-hero-circle-3" />
              <div className="rga-hero-center-icon">
                <RocketIcon />
              </div>

              {/* Floating badges */}
              <div className="rga-float-badge" style={{ top: '10%', right: '-10%', animationDelay: '0s' }}>
                <div className="rga-float-badge-icon" style={{ background: 'rgba(16,185,129,0.1)' }}>📈</div>
                200+ Brands
              </div>
              <div className="rga-float-badge" style={{ bottom: '20%', left: '-5%', animationDelay: '-1.5s' }}>
                <div className="rga-float-badge-icon" style={{ background: 'rgba(255,107,53,0.1)' }}>⭐</div>
                98% Retention
              </div>
              <div className="rga-float-badge" style={{ bottom: '5%', right: '5%', animationDelay: '-3s' }}>
                <div className="rga-float-badge-icon" style={{ background: 'rgba(30,58,95,0.1)' }}>🚀</div>
                50M+ Reach
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="rga-stats" ref={statsRef}>
        <div className="rga-stats-inner">
          {[
            { val: `${stats.years}+`, label: 'Years Experience' },
            { val: `${stats.brands}+`, label: 'Brands Served' },
            { val: `${stats.retention}%`, label: 'Client Retention' },
            { val: `${stats.reach}M+`, label: 'Reach Generated' },
          ].map(({ val, label }, i) => (
            <div key={i} className="rga-stat">
              <span className="rga-stat-number">{val}</span>
              <span className="rga-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="rga-section" style={{ background: 'var(--bg)' }}>
        <div className="rga-section-header rga-reveal">
          <div className="rga-eyebrow">What We Do</div>
          <h2 className="rga-section-title">Services That Drive <span>Real Results</span></h2>
          <p className="rga-section-desc">Core social media growth services paired with cutting-edge AI automation to scale your business around the clock.</p>
        </div>

        <div className="rga-services-grid">
          {[
            {
              icon: <InstagramIcon />, name: 'Instagram Growth and DM Services', sub: 'Organic Strategy',
              desc: 'Grow your Instagram organically with real followers who genuinely engage. Increase reach, visibility, and brand trust with proven strategies — plus automated DM systems that instantly respond to leads, nurture prospects, and convert followers into paying clients.',
              ci: 0
            },
            {
              icon: <TikTokIcon />, name: 'TikTok Growth', sub: 'Organic Strategy',
              desc: 'Grow your TikTok organically with real followers who engage. Boost views, reach, and visibility using proven growth strategies designed for sustainable, authentic results.',
              ci: 1
            },
            {
              icon: <GrowIcon />,
              name: 'Organic Social Media Growth',
              sub: 'Multi-Platform Strategy',
              desc: 'Comprehensive organic growth strategies across Instagram, TikTok, Facebook, and other platforms. We help brands build authentic communities, increase engagement, and scale sustainably without relying on paid ads.',
              ci: 3
            },
            {
              icon: <CameraIcon />, name: 'Content Creation', sub: 'Social Media',
              desc: 'Professional social media content tailored to your brand. Engaging visuals and captions designed to boost reach, with consistent, high-quality content that drives real results.',
              ci: 2
            },
            {
              icon: <ConsultIcon />, name: 'Consultancy', sub: 'Social Media',
              desc: 'Expert social media consultancy to help you grow strategically and sustainably. Personalized guidance on content, growth, and platform optimization that turns followers into results.',
              ci: 3
            },
            {
              icon: <WebDevIcon />, name: 'Web Development', sub: 'Full-Stack & Design',
              desc: 'Professional websites, landing pages, e-commerce stores, and web apps built with modern technologies. Fast, responsive, SEO-optimised, and crafted to convert visitors into customers.',
              ci: 4
            },
          ].map(({ icon, name, sub, desc, ci }, i) => (
            <div key={i} className={`rga-service-card rga-reveal${i > 0 ? ` rga-reveal-d${Math.min(i, 3)}` : ''}`}
              style={{ '--card-accent': serviceColors[ci].color }}>
              <div className="rga-service-icon" style={{ background: serviceColors[ci].bg, color: serviceColors[ci].color }}>
                {icon}
              </div>
              <div className="rga-service-name">{name}</div>
              <div className="rga-service-sub" style={{ color: serviceColors[ci].color }}>{sub}</div>
              <p className="rga-service-desc">{desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ── WEB DEVELOPMENT ── */}
      <section id="webdev" className="rga-webdev-section">
        <div className="rga-webdev-inner">

          {/* Left content */}
          <div className="rga-reveal">
            <div className="rga-webdev-label">New Service</div>
            <h2 className="rga-webdev-title">
              We Build Websites That <span>Win Clients</span>
            </h2>
            <p className="rga-webdev-desc">
              From sleek landing pages to full-scale e-commerce platforms and custom web apps — we design and develop digital experiences that look stunning, load fast, and convert visitors into paying customers.
            </p>

            <div className="rga-webdev-features">
              {[
                { icon: '🌐', title: 'Custom Websites', desc: 'Bespoke design & dev from scratch' },
                { icon: '🛒', title: 'E-Commerce Stores', desc: 'Shopify, WooCommerce & custom shops' },
                { icon: '🚀', title: 'Landing Pages', desc: 'High-converting pages that sell' },
                { icon: '⚡', title: 'Web Applications', desc: 'Scalable apps for your business' },
                { icon: '📱', title: 'Mobile-First Design', desc: 'Responsive on every device' },
                { icon: '🔍', title: 'SEO Optimised', desc: 'Built to rank on Google from day one' },
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className="rga-webdev-feature rga-reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <div className="rga-webdev-feature-icon">{icon}</div>
                  <div className="rga-webdev-feature-text">
                    <strong>{title}</strong>
                    <span>{desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="rga-webdev-cta" onClick={() => scrollTo('contact')}>
              Start Your Project →
            </button>
          </div>

          {/* Right visual — browser mockup */}
          <div className="rga-webdev-visual rga-reveal rga-reveal-d1">
            <div className="rga-webdev-mockup">
              <div className="rga-webdev-mockup-bar">
                <div className="rga-webdev-mockup-dots">
                  <div className="rga-webdev-mockup-dot" style={{ background: '#ef4444' }} />
                  <div className="rga-webdev-mockup-dot" style={{ background: '#f59e0b' }} />
                  <div className="rga-webdev-mockup-dot" style={{ background: '#10b981' }} />
                </div>
                <div className="rga-webdev-mockup-url">yourwebsite.com</div>
              </div>
              <div className="rga-webdev-mockup-body">
                <div className="rga-webdev-mockup-hero">🚀</div>
                <div className="rga-webdev-mockup-lines">
                  <div className="rga-webdev-mockup-line" style={{ width: '70%' }} />
                  <div className="rga-webdev-mockup-line" style={{ width: '90%' }} />
                  <div className="rga-webdev-mockup-line" style={{ width: '55%' }} />
                </div>
                <div className="rga-webdev-mockup-cards">
                  <div className="rga-webdev-mockup-card" />
                  <div className="rga-webdev-mockup-card" />
                  <div className="rga-webdev-mockup-card" />
                </div>
              </div>
            </div>
            <div className="rga-webdev-tech-badges">
              {[
                { label: 'React', bg: 'rgba(99,226,255,0.15)', color: '#63e2ff' },
                { label: 'Next.js', bg: 'rgba(255,255,255,0.1)', color: '#fff' },
                { label: 'Shopify', bg: 'rgba(150,191,75,0.15)', color: '#96bf4b' },
                { label: 'WordPress', bg: 'rgba(33,117,155,0.15)', color: '#21759b' },
              ].map(({ label, bg, color }) => (
                <span key={label} className="rga-webdev-tech-badge" style={{ background: bg, color }}>{label}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="container">

          {/* Main About Intro */}
          <div className="about-intro">
            <span className="section-tag">ABOUT US</span>

            <h2>
              About <span>Risel Growth Agency</span>
            </h2>

            <p className="main-about-text">
              Risel Growth Agency is a full-service social media growth and marketing agency with over 4 years of proven experience across all major platforms. We've successfully worked with both individuals and major brands, helping them build a strong digital presence, increase engagement, and drive real results. Our expertise spans organic growth, content creation, social media consultancy, TikTok Shop management, and cutting-edge AI automation.
            </p>
          </div>

          {/* About Cards */}
          <div className="about-grid">

            <div className="about-card">
              <div className="about-icon">📈</div>
              <h3>Organic Growth</h3>
              <p>
                We help brands grow naturally with real engagement, targeted strategies, and consistent audience development across Instagram and TikTok.
              </p>
            </div>

            <div className="about-card">
              <div className="about-icon">🎨</div>
              <h3>Content Creation</h3>
              <p>
                We craft premium social media content designed to elevate your brand identity, boost engagement, and attract loyal audiences.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="rga-section" style={{ background: 'var(--bg)', overflow: 'hidden', padding: '80px 0' }}>
        <div className="rga-section-header rga-reveal" style={{ padding: '0 40px' }}>
          <div className="rga-eyebrow">Trusted By</div>
          <h2 className="rga-section-title">Brands That <span>Trust Us</span></h2>
          <p className="rga-section-desc">Empowering brands with strategies that elevate their success.</p>
        </div>
        {/* Row 1 */}
        <div style={{ overflow: 'hidden', position: 'relative', marginBottom: '24px' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: 'clamp(40px, 8vw, 150px)',
            height: '100%',
            background: 'linear-gradient(right, #ffffff, transparent)',
            zIndex: 2, pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: 'clamp(40px, 8vw, 150px)',
            height: '100%',
            background: 'linear-gradient(to right, #ffffff, transparent)',
            zIndex: 2, pointerEvents: 'none'
          }} />
          <div style={{
            display: 'flex',
            animation: 'scrollLeft 18s linear infinite',
            width: 'max-content',
          }}>
            {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 36px',
                  background: '#fff',
                  borderRadius: '14px',
                  border: '1px solid #e8e4df',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                  margin: '0 12px',
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
              >
                <img
                  src={logo.src}
                  alt={`brand-${i}`}
                  style={{
                    height: `clamp(24px, 4vw, ${logo.h})`,
                    width: 'auto',
                    maxWidth: 'clamp(80px, 15vw, 140px)',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 — moves right (opposite direction) */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute', right: 0, top: 0,
            width: 'clamp(40px, 8vw, 150px)',
            height: '100%',
            background: 'linear-gradient(to left, #ffffff, transparent)',
            zIndex: 2, pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0,
            width: 'clamp(40px, 8vw, 150px)',
            height: '100%',
            background: 'linear-gradient(to left, #ffffff, transparent)',
            zIndex: 2, pointerEvents: 'none'
          }} />
          <div style={{
            display: 'flex',
            animation: 'scrollRight 18s linear infinite',
            width: 'max-content',
          }}>
            {[...[...logos].reverse(), ...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 20px',
                  background: '#fff',
                  borderRadius: '14px',
                  border: '1px solid #e8e4df',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                  margin: '0 8px',
                  transition: 'transform 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
              >
                <img
                  src={logo.src}
                  alt={`brand-${i}`}
                  style={{
                    height: `clamp(24px, 4vw, ${logo.h})`,
                    width: 'auto',
                    maxWidth: 'clamp(80px, 15vw, 140px)',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── TESTIMONIALS / REVIEWS ── */}
      <section id="reviews" className="rga-section" style={{ background: 'var(--bg-section)' }}>
        <div className="rga-section-header rga-reveal">
          <div className="rga-eyebrow">Client Feedback</div>
          <h2 className="rga-section-title">What Our <span>Clients Say</span></h2>
          <p className="rga-section-desc">Don't just take our word for it — hear from the brands we've helped grow.</p>
        </div>
        <div className="rga-testi-grid">
          {reviews.map((review, i) => (
            <div key={review.id} className={`rga-testi-card rga-reveal${i > 0 ? ` rga-reveal-d${Math.min(i, 5)}` : ''}`}>
              <div className="rga-testi-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              <p className="rga-testi-text">"{review.text}"</p>
              <div className="rga-testi-author">
                <div className="rga-testi-avatar" style={{
                  background: `linear-gradient(135deg, ${['#ff6b35', '#1e3a5f', '#f59e0b', '#10b981', '#6366f1', '#e85d2c'][i % 6]}, ${['#e85d2c', '#2a5a8f', '#d97706', '#059669', '#4f46e5', '#ff6b35'][i % 6]})`,
                  color: '#fff', fontWeight: 700, fontSize: '18px',
                }}>
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="rga-testi-name">{review.name}</div>
                  {review.company && <div className="rga-testi-company">{review.company}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rga-review-actions rga-reveal">
          <button className="rga-btn-review" onClick={() => setShowReviewForm(true)}>
            ✍️ Leave a Review
          </button>
        </div>
      </section>

      {/* ── REVIEW FORM MODAL ── */}
      {showReviewForm && (
        <div className="rga-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setShowReviewForm(false); setReviewSubmitted(false); } }}>
          <div className="rga-modal">
            <div className="rga-modal-header">
              <h3 className="rga-modal-title">{reviewSubmitted ? '' : 'Share Your Experience'}</h3>
              <button className="rga-modal-close" onClick={() => { setShowReviewForm(false); setReviewSubmitted(false); }}>✕</button>
            </div>
            <div className="rga-modal-body">
              {reviewSubmitted ? (
                <div className="rga-review-success">
                  <div className="rga-review-success-icon">🎉</div>
                  <h3>Thank You!</h3>
                  <p>Your review has been submitted successfully. We truly appreciate your feedback!</p>
                </div>
              ) : (
                <div className="rga-review-form">
                  <div className="rga-form-group">
                    <label className="rga-form-label">Your Name *</label>
                    <input className="rga-form-input" type="text" placeholder="Enter your name"
                      value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} />
                  </div>
                  <div className="rga-form-group">
                    <label className="rga-form-label">Company / Brand</label>
                    <input className="rga-form-input" type="text" placeholder="Your company name (optional)"
                      value={reviewForm.company} onChange={e => setReviewForm({ ...reviewForm, company: e.target.value })} />
                  </div>
                  <div className="rga-form-group">
                    <label className="rga-form-label">Rating *</label>
                    <div className="rga-star-rating">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} type="button"
                          className={`rga-star-btn${reviewForm.rating >= star ? ' active' : ''}`}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}>★</button>
                      ))}
                    </div>
                  </div>
                  <div className="rga-form-group">
                    <label className="rga-form-label">Your Review *</label>
                    <textarea className="rga-form-textarea" placeholder="Tell us about your experience working with Risel..."
                      value={reviewForm.text} onChange={e => setReviewForm({ ...reviewForm, text: e.target.value })} />
                  </div>
                  <button className="rga-review-submit" onClick={handleReviewSubmit}
                    disabled={!reviewForm.name || !reviewForm.text}>
                    Submit Review →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN PANEL MODAL ── */}
      {showAdminPanel && (
        <div className="rga-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setShowAdminPanel(false); setAdminAuthed(false); setAdminPassword(''); setAdminError(''); setEditingReviewId(null); } }}>
          <div className="rga-modal rga-admin-modal">
            <div className="rga-modal-header">
              <h3 className="rga-modal-title">Manage Reviews</h3>
              <button className="rga-modal-close" onClick={() => { setShowAdminPanel(false); setAdminAuthed(false); setAdminPassword(''); setAdminError(''); setEditingReviewId(null); }}>✕</button>
            </div>
            <div className="rga-modal-body">
              {!adminAuthed ? (
                <div className="rga-admin-password">
                  <p>Enter the admin password to manage reviews.</p>
                  <input type="password" placeholder="Enter password"
                    value={adminPassword}
                    onChange={e => setAdminPassword(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleAdminLogin(); }} />
                  <button onClick={handleAdminLogin}>Unlock</button>
                  {adminError && <div className="rga-admin-error">{adminError}</div>}
                </div>
              ) : (
                <div className="rga-admin-list">
                  {reviews.length === 0 && <div className="rga-admin-empty">No reviews yet.</div>}
                  {reviews.map(review => (
                    <div key={review.id} className="rga-admin-item">
                      <div className="rga-admin-item-header">
                        <div className="rga-admin-item-info">
                          <span className="rga-admin-item-name">{review.name}</span>
                          {review.company && <span className="rga-admin-item-company">— {review.company}</span>}
                        </div>
                        <div className="rga-admin-item-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                      </div>
                      <div className="rga-admin-item-text">"{review.text}"</div>
                      {editingReviewId === review.id ? (
                        <div className="rga-admin-edit-form">
                          <input placeholder="Name" value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                          <input placeholder="Company" value={editForm.company}
                            onChange={e => setEditForm({ ...editForm, company: e.target.value })} />
                          <div className="rga-star-rating" style={{ margin: '4px 0' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                              <button key={star} type="button"
                                className={`rga-star-btn${editForm.rating >= star ? ' active' : ''}`}
                                style={{ fontSize: '24px' }}
                                onClick={() => setEditForm({ ...editForm, rating: star })}>★</button>
                            ))}
                          </div>
                          <textarea placeholder="Review text" value={editForm.text}
                            onChange={e => setEditForm({ ...editForm, text: e.target.value })} />
                          <div className="rga-admin-edit-actions">
                            <button className="rga-admin-btn-cancel" onClick={() => setEditingReviewId(null)}>Cancel</button>
                            <button className="rga-admin-btn-save" onClick={saveEditReview}>Save Changes</button>
                          </div>
                        </div>
                      ) : (
                        <div className="rga-admin-item-actions">
                          <button className="rga-admin-btn rga-admin-btn-edit" onClick={() => startEditReview(review)}>✏️ Edit</button>
                          <button className="rga-admin-btn rga-admin-btn-delete" onClick={() => deleteReview(review.id)}>🗑️ Delete</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="rga-section" style={{ background: 'var(--bg)' }}>
        <div className="rga-section-header rga-reveal">
          <div className="rga-eyebrow">Get In Touch</div>
          <h2 className="rga-section-title">Let's Start <span>Growing Together</span></h2>
        </div>
        <div className="rga-contact-inner">
          <div>
            <h3 className="rga-contact-heading rga-reveal">
              Ready to build something <span>extraordinary?</span>
            </h3>
            <p className="rga-contact-desc rga-reveal">
              Ready to scale your social media presence or automate your sales with AI? Get in touch and let's craft a strategy that delivers real, measurable results.
            </p>
            <div className="rga-contact-details">
              {[
                { label: 'Phone', value: '+92 335 8169111' },
                { label: 'Email', value: 'riselgrowthagency@gmail.com' },
              ].map(({ label, value }, i) => (
                <div key={i} className={`rga-contact-detail rga-reveal${i > 0 ? ' rga-reveal-d1' : ''}`}>
                  <div className="rga-detail-label">{label}</div>
                  <div className="rga-detail-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <form className="rga-form rga-reveal" onSubmit={handleSubmit}>
            <div className="rga-form-row">
              <div className="rga-form-group">
                <label className="rga-form-label">Your Name *</label>
                <input className="rga-form-input" type="text" placeholder="Enter your name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="rga-form-group">
                <label className="rga-form-label">Your Email *</label>
                <input className="rga-form-input" type="email" placeholder="Enter your email"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="rga-form-group">
              <label className="rga-form-label">Phone Number</label>
              <input className="rga-form-input" type="tel" placeholder="Enter your phone"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="rga-form-group">
              <label className="rga-form-label">Your Message *</label>
              <textarea className="rga-form-textarea" placeholder="Tell us about your project..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            {formMsg && <div className={`rga-form-msg ${formMsg.type}`}>{formMsg.text}</div>}
            <button className="rga-btn-submit" type="submit" disabled={isSending}
              style={isSending ? { opacity: 0.7, cursor: 'not-allowed' } : {}}>
              {isSending ? 'Sending…' : 'Send Message →'}
            </button>
          </form>
        </div>
      </section>

      {/* ── FOLLOW ── */}
      <div className="rga-follow">
        <div className="rga-eyebrow" style={{ marginBottom: 16 }}>Stay Connected</div>
        <h2 className="rga-section-title">Follow <span>Us</span></h2>
        <div className="rga-social-btns">
          {[
            { icon: <InstagramIcon />, label: 'Instagram', href: 'https://www.instagram.com/risel.growth.agency' },
            { icon: <TikTokIcon />, label: 'TikTok', href: 'https://www.tiktok.com/@riselgrowthagency' },
          ].map(({ icon, label, href }) => (
            <a key={label} className="rga-social-btn" href={href} target="_blank" rel="noreferrer">
              {icon} {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="rga-footer">
        <div className="rga-footer-left">© 2026 Risel Growth Agency — All Rights Reserved</div>
        <div className="rga-footer-right">
          Crafted with care
          <button className="rga-footer-admin" onClick={() => setShowAdminPanel(true)}>Manage Reviews</button>
        </div>
      </footer>

      {/* ── CHATBOT ── */}
      <Chatbot />
    </>
  );
}
