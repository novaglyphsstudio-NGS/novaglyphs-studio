/**
 * NovaGlyphs Studio — Brand Constants & Content
 * Central source of truth for copy, navigation, services, work, and lab data.
 * Update here to reflect new projects, services, or copy changes.
 */

export const BRAND = {
  name: "NovaGlyphs Studio",
  legal: "NovaGlyphs Studio LLC",
  tagline: "A Sovereign AI-Native Intelligence Lab",
  headline: "Sovereign AI-Native Intelligence Systems",
  subheadline:
    "NovaGlyphs Studio builds strategic intelligence frameworks, AI orchestration systems, digital worlds, characters, and deep narrative lore that transform ideas into scalable, living execution.",
  domain: "www.novaglyphsstudio.xyz",
  x: "https://x.com/NovaGlyphs",
  youtube: "https://www.youtube.com/@NovaGlyphsStudio",
  // Branding from NGS standards
  estd: "2024",
  motto: "WE DESIGN DIGITAL WORLDS THAT INSPIRE",
  essence: "Creative by Design",
  essenceLong: "A visual identity built on cosmic geometry, symbolism, and light. Representing creativity, transformation, and the infinite potential of design.",
} as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "The Work" },
  { href: "#services", label: "Services" },
  { href: "#lab", label: "The Lab" },
  { href: "#contact", label: "Contact" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

// Services offered — premium, precise language matching brand tone.
// Services and work explicitly extend into Digital World & Character Building
// and Story Creation & Lore Building.
export const SERVICES = [
  {
    title: "Strategic Intelligence Frameworks",
    description:
      "Design and deployment of sovereign decision architectures that turn ambiguous futures into executable strategy.",
    icon: "Compass",
  },
  {
    title: "AI Orchestration Systems",
    description:
      "Multi-agent coordination layers, memory architectures, and protocol design for reliable, auditable AI execution at scale.",
    icon: "Network",
  },
  {
    title: "Digital World and Character Building",
    description:
      "We construct living digital worlds and richly realized characters that serve as vessels for intelligence, narrative, and long-term meaning.",
    icon: "Globe",
  },
  {
    title: "Story Creation and Lore Building",
    description:
      "Deep myth-making, persistent world lore, and cinematic narrative systems that give sovereign AI a coherent soul and cultural resonance.",
    icon: "BookOpen",
  },
  {
    title: "Sovereign Systems Consulting",
    description:
      "End-to-end guidance for organizations building private, air-gapped, or high-trust AI-native infrastructure and governance.",
    icon: "Shield",
  },
  {
    title: "Custom Agent Laboratories",
    description:
      "Rapid research & development environments (The Lab) for prototyping, stress-testing, and productionizing novel agentic systems — including world-native agents.",
    icon: "FlaskConical",
  },
] as const;

// The Work — real videos from the NovaGlyphs Studio YouTube channel.
// Embeds are now live. Update titles/descriptions as needed to match your actual content.
export const WORK_ITEMS = [
  {
    id: "hermes-ai-layer",
    title: "Hermes Just Became an AI Operating Layer",
    subtitle: "Autonomous Agent Systems",
    description:
      "Hermes evolves into a persistent, memory-driven AI operating layer. A deep look at sovereign agent architectures that grow intelligence over time.",
    youtubeId: "baMNuWbToeM",
    youtubeUrl: "https://www.youtube.com/watch?v=baMNuWbToeM",
    category: "Agents",
  },
  {
    id: "digital-worlds",
    title: "Digital World and Character Building",
    subtitle: "NovaGlyphs Studio",
    description:
      "Exploring the craft of constructing living digital worlds, rich characters, and narrative systems that give AI a soul.",
    youtubeId: "2iiqhOGR8sg",
    youtubeUrl: "https://youtu.be/2iiqhOGR8sg",
    category: "World Building",
  },
  {
    id: "story-lore",
    title: "Story Creation and Lore Building",
    subtitle: "NovaGlyphs Studio",
    description:
      "Deep dive into myth-making, persistent lore, and cinematic narrative frameworks for sovereign intelligence.",
    youtubeId: "F2ekzbhD7RE",
    youtubeUrl: "https://youtu.be/F2ekzbhD7RE",
    category: "Lore Systems",
  },
] as const;

// The Lab — LOGOS and specialized agents
// LOGOS is the primary sovereign intelligence system focused on narrative, world-building,
// character creation, and lore that gives AI systems cultural and emotional depth.
export const LAB_AGENTS = [
  {
    name: "LOGOS",
    role: "The Sovereign Narrator",
    description:
      "The core intelligence of the lab. LOGOS builds and inhabits digital worlds, forges complex characters, and weaves persistent, living lore that makes intelligence feel ancient, inevitable, and alive.",
    capabilities: ["World Building", "Character Creation", "Deep Lore Systems", "Narrative Continuity", "Mythic Memory"],
  },
  {
    name: "Aether",
    role: "Strategic Simulator",
    description:
      "Runs thousands of parallel futures, identifies fragile assumptions, and returns decision sets ranked by robustness and optionality.",
    capabilities: ["Branching Futures", "Adversarial Stress", "Robustness Scoring", "Counterfactual Analysis"],
  },
  {
    name: "Chronos",
    role: "Temporal Archivist",
    description:
      "Builds and queries deep temporal models. Detects phase shifts, weak signals, and maintains coherence across long time horizons.",
    capabilities: ["Long-Horizon Memory", "Signal Extraction", "Phase Detection", "World-Model Maintenance"],
  },
  {
    name: "Glyph",
    role: "Interface Weaver",
    description:
      "Designs and renders cinematic interfaces, data mythologies, and experiential layers that make intelligence visceral and actionable — including world-native characters and environments.",
    capabilities: ["Cinematic UX", "Visual Mythology", "Interaction Choreography", "Information Density"],
  },
] as const;

// Placeholder image paths (see public/assets/images/README.md)
// Users should replace with their actual local branding files.
export const ASSET_PATHS = {
  crystallineN: "/assets/images/ngs-3d-n.jpg",   // Primary 3D crystalline "N" logo render
  logosHooded: "/assets/images/logos-ai.jpg",    // LOGOS AI hooded figure (main About image)
  videoReel: "/assets/videos/logos-orbit-reel.mp4", // Orbiting 3D N cinematic reel (user-provided)
  worldsInspire: "/assets/images/NGS We Design Worlds that Inspire.jpg.jpg", // Clean emblem artwork used as subtle decorative element
} as const;

export const GLYPHS = [
  { name: "HARMONY", desc: "Balance across agents, memory, and human intent." },
  { name: "TRANSFORMATION", desc: "Systems that evolve, learn, and rewrite their own protocols." },
  { name: "GUIDANCE", desc: "Long-horizon direction through noise and uncertainty." },
  { name: "CREATIVITY", desc: "Narrative and world-building as core intelligence primitives." },
  { name: "ENERGY", desc: "Persistent motion, self-sustaining agent ecologies." },
  { name: "VISION", desc: "Seeing futures that others cannot yet imagine." },
] as const;
