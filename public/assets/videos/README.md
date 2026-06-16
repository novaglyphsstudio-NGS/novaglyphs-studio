# NovaGlyphs Studio - Brand Assets / Videos

Place your local video files here.

## Primary Video Assets:

- `nova-n-orbit.mp4` (or `orbiting-3d-n-animation.mp4`)
  The orbiting 3D N animation video (cosmic crystalline N rotating slowly in nebula/galaxy void).
  - Recommended: MP4 H.264, 1080p or 4K, subtle film grain baked if possible.
  - Used as:
    - Hero background video fallback (when 3D WebGL disabled or for "Play Cinematic" button)
    - Modal lightbox for "Watch the Reel"
  - Duration: 15-45s seamless loop preferred. Muted, no audio or atmospheric only.

- Optional supporting:
  - `lab-logos-demo.mp4` (or similar)
  - `work-showreel-clip.mp4`

## Fallback Strategy in Code
The Hero uses a rich interactive @react-three/fiber 3D scene as primary (galaxy "N" + particles).
A "View Cinematic Reel" button will attempt to open a <video> modal if `/assets/videos/nova-n-orbit.mp4` exists.
Graceful degradation: if no video file, the 3D is the experience + a static image option.

## Encoding Tips
ffmpeg -i input.mov -c:v libx264 -crf 20 -preset slow -movflags +faststart -an nova-n-orbit.mp4

# NovaGlyphs Studio LLC
