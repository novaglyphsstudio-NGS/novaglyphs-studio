"use client";

/**
 * Cinematic Video Modal
 * Used for the "Watch Cinematic Reel" button (orbiting 3D N video fallback)
 * and potentially other brand videos.
 *
 * Gracefully handles missing video file (shows helpful message + instructions).
 */

import { useEffect } from "react";
import { X } from "lucide-react";
import { ASSET_PATHS } from "@/lib/brand";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  videoSrc?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  title = "NovaGlyphs — Orbital Crystalline N",
  videoSrc = ASSET_PATHS.videoReel,
}: VideoModalProps) {
  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-6xl rounded-2xl overflow-hidden bg-[#05050a] ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="font-heading text-lg tracking-tight">{title}</div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-full transition"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video or Placeholder */}
        <div className="relative bg-black aspect-video">
          <video
            key={videoSrc}
            className="w-full h-full object-contain bg-black"
            controls
            autoPlay
            loop
            muted
            playsInline
            // If the file is not present the browser will show native controls error state.
            // The poster + instructions below help the user.
            poster="/assets/images/nova-n-crystalline.jpg"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Helpful overlay when the actual asset hasn't been added yet */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 text-sm text-white/70">
            <p className="max-w-prose">
              Place your orbiting 3D N animation at{" "}
              <code className="font-mono text-xs text-[#00f0ff]/90">{videoSrc}</code>.
              See <code>public/assets/videos/README.md</code> for encoding guidance.
            </p>
          </div>
        </div>

        <div className="px-6 py-3 text-right text-xs text-white/40 border-t border-white/10">
          Press ESC or click outside to close
        </div>
      </div>
    </div>
  );
}
