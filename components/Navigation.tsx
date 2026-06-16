"use client";

/**
 * NovaGlyphs Studio — Fixed Premium Navigation
 * - Glassmorphic dark bar
 * - Smooth scroll to sections with offset
 * - Active section detection via IntersectionObserver
 * - Mobile hamburger with slide-down menu
 * - Brand lockup + external social links (X + YouTube)
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Smooth scroll handler with fixed nav offset
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // Active section tracking (IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0.15, 0.4, 0.65, 0.9],
      }
    );

    // Observe all sections that have IDs matching our nav
    const sections = ["hero", "about", "work", "services", "lab", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 h-16 md:h-[72px] flex items-center justify-between">
        {/* Brand — styled closer to the NGS Branding Standards wordmark + glyph */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
          }}
          className="flex items-center gap-3 group"
          aria-label="NovaGlyphs Studio — Scroll to top"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00f0ff] via-[#ff2e9a] to-[#d4af37] flex items-center justify-center ring-1 ring-white/30 group-hover:ring-white/60 transition text-[10px] text-black/80 font-bold">N</div>
          <div>
            <div className="font-heading text-[17px] tracking-[-0.01em] leading-none text-white">
              {BRAND.name}
            </div>
            <div className="text-[9px] text-white/40 -mt-px font-mono tracking-[2px] uppercase flex items-center gap-1">
              EST {BRAND.estd} <span className="text-[#d4af37]">•</span> {BRAND.motto.split(' ').slice(-3).join(' ')}
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9 text-sm">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={cn(
                "nav-link text-sm font-medium tracking-wide uppercase text-white/80 hover:text-white transition-colors",
                activeSection === link.href.replace("#", "") && "active"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Social icons (desktop) */}
          <div className="hidden md:flex items-center gap-1.5">
            <a
              href={BRAND.x}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-md transition"
              aria-label="X / Twitter"
            >
              <X className="w-4 h-4" />
            </a>
            <a
              href={BRAND.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-md transition"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8zM9.6 15.5V8.5l6.2 3.5-6.2 3.5z"/></svg>
            </a>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:block px-5 py-1.5 text-xs uppercase tracking-[1.5px] font-medium border border-white/20 hover:border-white/40 rounded-full transition active:scale-[0.985]"
          >
            Begin Conversation
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#05050a]/98 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-4 text-lg">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "text-left py-1 text-white/90 active:text-white",
                  activeSection === link.href.replace("#", "") && "text-[#00f0ff]"
                )}
              >
                {link.label}
              </button>
            ))}

            <div className="h-px bg-white/10 my-1" />

            <div className="flex items-center gap-4 pt-1">
              <a
                href={BRAND.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <X className="w-4 h-4" /> X
              </a>
              <a
                href={BRAND.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8zM9.6 15.5V8.5l6.2 3.5-6.2 3.5z"/></svg> YouTube
              </a>
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="mt-2 w-full py-3 rounded-xl border border-white/20 active:bg-white/5 text-sm tracking-widest uppercase"
            >
              Begin Conversation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
