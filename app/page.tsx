"use client";

/**
 * NovaGlyphs Studio — Main Landing Page
 *
 * Complete cinematic experience for NovaGlyphs Studio LLC.
 * - Fixed premium navigation with active section + smooth scroll
 * - Full-screen interactive 3D crystalline "N" hero (R3F)
 * - All required sections: Hero, About/LOGOS, The Work, Services, The Lab (LOGOS), Contact
 * - Heavy use of Framer Motion for premium reveals, parallax hints, and micro-interactions
 * - Film grain overlay (global)
 * - Dark void aesthetic strictly enforced throughout
 *
 * Assets:
 *  - Primary 3D experience built procedurally (see components/NovaNScene)
 *  - Place your local jpg/mp4 files in public/assets/ per the READMEs.
 *  - YouTube IDs in lib/brand.ts are placeholders — replace with real channel content.
 *
 * Production notes:
 *  - Fully responsive, mobile-first
 *  - Performance: dynamic import for 3D Canvas, low dpr, memoized geometry
 *  - Well-commented for maintainability
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Compass,
  ExternalLink,
  FlaskConical,
  Globe,
  Network,
  Play,
  Shield,
  Star,
  Zap,
} from "lucide-react";

import Navigation from "@/components/Navigation";
import VideoModal from "@/components/VideoModal";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BRAND, SERVICES, WORK_ITEMS, LAB_AGENTS, ASSET_PATHS, NAV_LINKS, GLYPHS } from "@/lib/brand";

// Dynamically import the heavy 3D scene (no SSR — R3F + Canvas)
const NovaNScene = dynamic(() => import("@/components/NovaNScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#020205] flex items-center justify-center">
      <div className="text-[#00f0ff]/60 text-xs tracking-[3px] uppercase font-mono">Loading NovaGlyphs Void</div>
    </div>
  ),
});

export default function NovaGlyphsStudio() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Subtle scroll progress hint for hero (optional visual only)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020205] text-[#f5f5f7] selection:bg-[#00f0ff] selection:text-black">
      {/* Fixed premium navigation (active state + mobile) */}
      <Navigation />

      {/* Global cinematic film grain (subtle, mysterious) */}
      <div className="film-grain" aria-hidden="true" />

      {/* =========================================
          1. HERO — Full-screen cinematic 3D interactive
          Rotating LOGOS logo video from your assets floats as the cosmic background graphic.
         ========================================= */}
      <section id="hero" className="relative h-[100dvh] min-h-[620px] w-full flex items-center justify-center overflow-hidden">
        {/* Rotating LOGOS crystalline N video — the graphic floating behind the landing page.
           Scaled ~15% smaller per request so the turning N is clearly visible as the primary graphic.
           Subtle 3D particles provide atmospheric depth without obscuring the rotation. */}
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <video
            className="w-[118%] h-[118%] object-cover opacity-55 mix-blend-screen"
            style={{ transform: 'scale(0.85)', transformOrigin: 'center center' }}
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/images/ngs-3d-n.jpg"
          >
            <source src={ASSET_PATHS.videoReel} type="video/mp4" />
          </video>
        </div>

        {/* The interactive 3D galaxy "N" — floating on top of the video background for depth and interactivity */}
        <div className="absolute inset-0 z-10">
          <NovaNScene />
        </div>

        {/* Gradient vignette + depth layers for text legibility and cinematic mood */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,2,5,0.35)_25%,rgba(2,2,5,0.78)_62%,rgba(2,2,5,0.95)_78%)] z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#020205] via-[#020205]/85 to-transparent z-20" />

        {/* Hero content overlay — elegant, minimal, mysterious. Branding from NGS standards applied. */}
        <div className="relative z-30 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-4 py-1 mb-4 text-[10px] tracking-[3px] text-white/70 font-mono uppercase">
            EST. {BRAND.estd} &nbsp;•&nbsp; SOVEREIGN AI-NATIVE LAB
          </div>

          <h1 className="hero-headline text-6xl md:text-[92px] leading-[0.86] tracking-[-4.4px] font-semibold mb-3">
            {BRAND.headline}
          </h1>

          {/* Direct pull from your branding standards */}
          <div className="text-[#d4af37] text-sm md:text-base tracking-[3px] mb-6 font-medium">
            {BRAND.motto}
          </div>

          <p className="max-w-[48ch] mx-auto text-xl md:text-2xl text-white/70 tracking-tight mb-9">
            {BRAND.subheadline}
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              onClick={() => scrollToSection("lab")}
              className="btn-primary h-12 px-9 rounded-full text-sm tracking-[1.5px] uppercase"
            >
              Enter The Lab <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsVideoOpen(true)}
              className="btn-outline h-12 px-7 rounded-full text-sm tracking-[1.5px] uppercase flex items-center gap-2 border-white/20 hover:border-white/40"
            >
              <Play className="w-4 h-4" /> Watch Cinematic Reel
            </Button>

            <Button
              variant="ghost"
              onClick={() => scrollToSection("about")}
              className="h-12 px-6 text-white/70 hover:text-white text-sm tracking-widest uppercase hidden sm:inline-flex"
            >
              Discover More
            </Button>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[10px] tracking-[2.5px] text-white/40 hover:text-white/70 transition group"
            aria-label="Scroll to About"
          >
            SCROLL TO BEGIN
            <ArrowRight className="w-3.5 h-3.5 mt-1 rotate-90 group-hover:translate-y-px transition" />
          </button>
        </div>

        {/* Subtle logo reference at bottom-right of hero (small static fallback glyph) — now with branding essence */}
        <div className="absolute bottom-9 right-6 z-30 hidden lg:block text-right text-[10px] tracking-[1px] text-white/30 font-mono">
          NOVA<span className="text-[#d4af37]">GLYPHS</span><br />
          <span className="text-[8px] text-white/20">{BRAND.essence}</span>
        </div>
      </section>

      {/* =========================================
          2. ABOUT / LOGOS
         ========================================= */}
      <section id="about" className="section relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12 items-center">
          {/* Left: LOGOS hooded figure image area */}
          <div className="md:col-span-7">
            <div className="relative aspect-[16/10] md:aspect-[15/10] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 bg-[#05050a]">
              {/* Image reference — replace with your local LOGOS AI hooded figure asset */}
              <img
                src={ASSET_PATHS.logosHooded}
                alt="LOGOS — The Sovereign AI Figure"
                className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity"
                onError={(e) => {
                  // Elegant fallback if no image present yet
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Cinematic overlay + grain on the image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020205] via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.6px,transparent_1px)] bg-[length:3px_3px] opacity-[0.035]" />

              {/* Small badge */}
              <div className="absolute bottom-5 left-5 bg-black/60 border border-white/10 text-xs tracking-widest px-4 py-1.5 rounded font-mono text-white/70">
                LOGOS — ARCHETYPE 01
              </div>
            </div>
          </div>

          {/* Right: Copy block */}
          <div className="md:col-span-5">
            <div className="uppercase tracking-[3px] text-xs text-[#00f0ff] mb-3">A SOVEREIGN AI-NATIVE INTELLIGENCE LAB</div>

            <h2 className="font-heading text-5xl md:text-6xl leading-[0.9] tracking-[-1.6px] mb-6">
              We build the<br /> frameworks<br /> that think.
            </h2>

            <div className="space-y-5 text-[15px] leading-relaxed text-white/75 max-w-[44ch]">
              <p>
                NovaGlyphs Studio LLC exists at the intersection of strategy, narrative, and advanced AI systems.
                We design sovereign intelligence architectures, living digital worlds, and deeply realized characters
                that remain under human control while achieving superhuman coherence and cultural scale.
              </p>
              <p>
                Our work extends into Digital World and Character Building as well as Story Creation and Lore Building —
                cinematic, precise, and built for organizations that treat intelligence as a strategic and mythic asset.
              </p>
              {/* Direct from your NGS Branding Standards */}
              <p className="text-xs text-white/50 pt-2 border-t border-white/10">
                {BRAND.essenceLong}
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Button onClick={() => scrollToSection("work")} className="btn-primary h-10 px-7 rounded-full text-xs tracking-widest">SEE THE WORK</Button>
              <Button onClick={() => scrollToSection("contact")} variant="outline" className="btn-outline h-10 px-6 rounded-full text-xs tracking-widest">START A PROJECT</Button>
            </div>
          </div>
        </div>

        {/* Stylized Visual Language — inspired by the NGS Branding Standards (cosmic geometry, glyphs, palette, essence).
            Not a direct document paste: reinterpreted as elegant, site-native elements with custom glyphs, refined typography, and subtle decorative marks. */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto text-center">
          <div className="uppercase tracking-[4px] text-xs text-[#d4af37] mb-2">VISUAL LANGUAGE</div>
          <h4 className="font-heading text-3xl tracking-tight mb-4">Cosmic Geometry. Symbolism. Light.</h4>
          <p className="text-white/70 max-w-prose mx-auto mb-8">
            {BRAND.essenceLong}
          </p>

          {/* Subtle emblem graphic pulled from your branding assets (used decoratively with blend + low opacity) */}
          <div className="mx-auto mb-6 w-36 opacity-30">
            <img 
              src={ASSET_PATHS.worldsInspire} 
              alt="" 
              className="w-full h-auto mix-blend-screen" 
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>

          {/* Elegant reinterpretation of the Glyph System from the standards sheet.
              Custom geometric SVGs echoing the cosmic starbursts, mandalas, rays, and polyhedra in the document — not literal screenshots. */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {GLYPHS.map((glyph, i) => {
              // Stylized geometric glyphs inspired by the branding standards (rays, concentric, stars, facets)
              const glyphs = [
                // HARMONY — balanced 8-point star with rays
                <svg key="0" viewBox="0 0 48 48" className="w-9 h-9 text-[#d4af37]"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="3"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M10 10l4 4M38 38l-4-4M10 38l4-4M38 10l-4 4"/><circle cx="24" cy="24" r="11" strokeOpacity="0.5"/></g></svg>,
                // TRANSFORMATION — dynamic spiral / mandala
                <svg key="1" viewBox="0 0 48 48" className="w-9 h-9 text-[#d4af37]"><path d="M24 8c8 0 12 4 12 12s-4 12-12 12-12 4-12 12 4 4 12 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg>,
                // GUIDANCE — concentric circles + guiding rays
                <svg key="2" viewBox="0 0 48 48" className="w-9 h-9 text-[#d4af37]"><g fill="none" stroke="currentColor" strokeWidth="1.25"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="12"/><circle cx="24" cy="24" r="6"/><path d="M24 2v6M24 40v6M2 24h6M40 24h6"/></g></svg>,
                // CREATIVITY — radiating facets / star
                <svg key="3" viewBox="0 0 48 48" className="w-9 h-9 text-[#d4af37]"><path d="M24 6l3 9h9l-7 6 3 10-8-5-8 5 3-10-7-6h9z" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="24" cy="24" r="2" fill="currentColor"/></svg>,
                // ENERGY — dynamic angled poly / energy lines
                <svg key="4" viewBox="0 0 48 48" className="w-9 h-9 text-[#d4af37]"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 12l24 0M12 24l24 0M12 36l24 0"/><path d="M18 6l-6 6 6 6M30 42l6-6-6-6" strokeOpacity="0.6"/></g></svg>,
                // VISION — eye-like or focused diamond with rays
                <svg key="5" viewBox="0 0 48 48" className="w-9 h-9 text-[#d4af37]"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 10l10 14-10 14-10-14z"/><circle cx="24" cy="24" r="4"/><path d="M24 2v4M24 42v4M4 24h4M40 24h4" strokeOpacity="0.5"/></g></svg>,
              ];
              return (
                <div key={i} className="group border border-white/10 hover:border-[#d4af37]/40 rounded-xl p-5 transition-all bg-[#05050a]/60 flex flex-col items-center">
                  <div className="mb-3 group-hover:scale-110 transition-transform" aria-hidden>
                    {glyphs[i]}
                  </div>
                  <div className="font-heading tracking-[1px] text-sm text-white mb-1.5">{glyph.name}</div>
                  <div className="text-[11px] text-white/55 leading-snug">{glyph.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Subtle palette nod and core tagline — stylized, not literal swatches from the document */}
          <div className="flex flex-col items-center gap-3 text-xs tracking-[2px] text-white/50">
            <div className="flex gap-2">
              <span className="text-[#d4af37]">CREATIVE BY DESIGN</span>
              <span>•</span>
              <span>DESIGN — SYMBOLISM — INNOVATION</span>
            </div>
            <div>WE DESIGN DIGITAL WORLDS THAT INSPIRE</div>
          </div>
        </div>

        <div className="cosmic-divider my-16 md:my-20" />
      </section>

      {/* =========================================
          3. THE WORK
         ========================================= */}
      <section id="work" className="section bg-[#05050a] border-y border-white/5 py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-9">
            <div>
              <div className="flex items-center gap-2 text-[#00f0ff] uppercase text-xs tracking-[3.5px] mb-2">
                SELECTED MISSIONS
                <svg width="32" height="5" viewBox="0 0 32 5" className="text-[#d4af37]/50"><path d="M0 2.5h10M22 2.5h10" fill="none" stroke="currentColor" strokeWidth="0.75"/></svg>
              </div>
              <h3 className="font-heading text-5xl tracking-[-1.8px]">The Work</h3>
            </div>
            <a
              href={BRAND.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm text-white/70 hover:text-white group"
            >
              VIEW FULL ARCHIVE ON YOUTUBE <ExternalLink className="w-3.5 h-3.5 group-hover:-translate-y-px transition" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {WORK_ITEMS.map((work, index) => (
              <Card key={work.id} className="premium-card work-card flex flex-col overflow-hidden border-white/5">
                <div className="relative bg-black aspect-video overflow-hidden">
                  {/* Live YouTube embed — now using real videos from your channel */}
                  <div className="yt-embed">
                    <iframe
                      title={work.title}
                      src={`https://www.youtube.com/embed/${work.youtubeId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute top-3 right-3 text-[10px] tracking-widest px-3 py-px rounded bg-black/60 border border-white/10 font-mono text-white/60">
                    {work.category}
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl tracking-tight">{work.title}</CardTitle>
                  <CardDescription className="text-[#00f0ff]/90 text-[13px] tracking-wide">{work.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-white/70 leading-relaxed flex-1">
                  {work.description}
                </CardContent>

                {/* Direct link to the real YouTube video for sharing / full experience */}
                {work.youtubeUrl && (
                  <div className="px-6 pb-6">
                    <a
                      href={work.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/60 hover:text-[#00f0ff] transition border-b border-white/20 hover:border-[#00f0ff]/60 pb-px"
                    >
                      Watch full video on YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href={BRAND.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white border-b border-white/20 pb-px">
              Explore the full NovaGlyphs archive on YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================
          4. SERVICES
         ========================================= */}
      <section id="services" className="section max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="uppercase tracking-[3px] text-xs text-[#ff2e9a]">WHAT WE DELIVER</div>
            {/* Subtle geometric ray accent echoing the branding standards starbursts */}
            <svg width="48" height="6" viewBox="0 0 48 6" className="text-[#d4af37]/60"><path d="M0 3h16M32 3h16M24 1v4" fill="none" stroke="currentColor" strokeWidth="0.75"/></svg>
          </div>
          <h3 className="font-heading text-5xl md:text-[56px] tracking-[-1.6px] leading-none">Services</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, idx) => {
            // Map icon name string from brand constants to actual lucide component
            const IconMap: Record<string, React.ElementType> = {
              Compass,
              Network,
              BookOpen,
              Shield,
              FlaskConical,
              Globe,
            };
            const Icon = (IconMap[service.icon as keyof typeof IconMap] || Star) as any;

            return (
              <div key={idx} className="premium-card group p-8 rounded-2xl flex flex-col">
                <div className="mb-6 text-[#00f0ff] group-hover:text-white transition">
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-heading text-2xl tracking-[-0.6px] mb-4 leading-tight">{service.title}</h4>
                <p className="text-[15px] text-white/70 leading-relaxed flex-1">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================
          5. THE LAB (LOGOS Agents)
         ========================================= */}
      <section id="lab" className="section bg-[#05050a] border-y border-white/5 py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-[#d4af37] text-xs tracking-[3px] mb-2">
              <Star className="w-3.5 h-3.5" /> RESEARCH &amp; DEPLOYMENT
            </div>
            <h3 className="font-heading text-6xl md:text-[64px] tracking-[-2.2px] leading-none mb-5">The Lab</h3>
            <p className="text-xl text-white/75">
              LOGOS and the specialized agent systems that power NovaGlyphs intelligence work.
              These are not generic assistants — they are persistent, world-aware, lore-rich sovereign intelligences
              focused on digital world building, character creation, and deep story architecture.
            </p>
          </div>

          <div className="mt-14 grid md:grid-cols-2 gap-5">
            {LAB_AGENTS.map((agent, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="premium-card p-8 md:p-9 rounded-2xl border-white/5 group"
              >
                <div className="flex items-baseline justify-between mb-5">
                  <div>
                    <div className="font-heading text-3xl tracking-tight">{agent.name}</div>
                    <div className="text-[#ff2e9a] text-sm tracking-widest">{agent.role}</div>
                  </div>
                  <div className="text-[10px] px-3 py-px border border-white/15 rounded font-mono text-white/50">AGENT</div>
                </div>

                <p className="text-[15px] leading-relaxed text-white/75 mb-7">{agent.description}</p>

                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap, i) => (
                    <div key={i} className="text-xs border border-white/10 bg-white/[0.018] px-3.5 py-1 rounded-full text-white/70 tracking-tight">
                      {cap}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-9 text-sm text-white/50 max-w-prose">
            All agents operate inside private, auditable environments. They do not train on client data.
            They remember. They reason. They serve the mission.
          </div>
        </div>
      </section>

      {/* =========================================
          6. CONTACT
         ========================================= */}
      <section id="contact" className="section max-w-5xl mx-auto px-6 pt-20 pb-28 md:pt-24">
        <div className="grid md:grid-cols-5 gap-x-12 gap-y-12">
          <div className="md:col-span-2">
            <div className="sticky top-24">
              <div className="text-[#00f0ff] tracking-[3px] text-xs mb-3">NEXT STEP</div>
              <h3 className="font-heading text-[52px] md:text-[60px] tracking-[-2px] leading-none mb-6">Begin a conversation.</h3>

              <div className="text-lg text-white/75 mb-8">
                We work with a small number of sovereign organizations and founders at any given time.
              </div>

              <div className="space-y-3 text-sm">
                <a href={BRAND.x} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white">
                  <ExternalLink className="w-3.5 h-3.5" /> {BRAND.x.replace("https://", "")}
                </a>
                <a href={BRAND.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white">
                  <ExternalLink className="w-3.5 h-3.5" /> {BRAND.youtube.replace("https://www.", "")}
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40 max-w-[26ch]">
                NovaGlyphs Studio LLC<br />A Sovereign AI-Native Intelligence Lab
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-9 text-xs text-white/40">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-y-3">
          <div>© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <button onClick={() => scrollToSection("hero")} className="hover:text-white/70 transition">Back to top</button>
            <span className="text-white/20">•</span>
            <a href={BRAND.x} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition">X</a>
            <a href={BRAND.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition">YouTube</a>
          </div>
          <div className="font-mono tracking-[1px]">WWW.NOVAGLYPHSSTUDIO.XYZ</div>
        </div>
      </footer>

      {/* Video Modal (Cinematic Reel fallback) */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title="NovaGlyphs — LOGOS Crystalline Orbit"
        videoSrc={ASSET_PATHS.videoReel}
      />
    </div>
  );
}
