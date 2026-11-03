import { useState } from 'react';

// Exact vector paths extracted from the official SafeSync emblem
const MARK_PATHS = {
  stem: "M 534.8 349.4 c 5.7 2.5 12.6 10.3 14.1 16.0 c 1.9 7.7 2.6 -0.1 -9.9 114.6 c -3.8 34.9 -7.6 69.6 -8.4 77.0 c -1.7 15.7 -2.3 17.8 -6.6 21.3 c -3.0 2.6 -3.7 2.7 -14.7 2.7 c -10.0 0.0 -11.9 -0.3 -14.4 -2.1 c -3.7 -2.6 -4.7 -4.5 -5.4 -10.0 c -0.7 -5.8 -12.3 -122.5 -15.0 -151.4 c -0.9 -9.4 -2.2 -23.3 -3.1 -31.1 c -0.8 -7.7 -1.1 -15.6 -0.8 -17.5 c 2.0 -10.4 10.2 -18.4 21.9 -21.3 c 1.1 -0.2 10.1 -0.4 20.0 -0.2 c 14.8 0.2 18.8 0.5 22.3 2.0 z",
  dot: "M 525.5 614.0 c 7.7 3.9 12.2 8.6 16.6 17.2 c 4.4 8.5 5.2 20.3 2.1 29.1 c -6.6 18.6 -26.7 29.6 -44.3 24.3 c -9.5 -2.9 -17.3 -8.8 -22.1 -16.7 c -7.0 -11.3 -7.0 -27.1 -0.1 -38.6 c 4.4 -7.4 6.7 -9.9 12.2 -13.1 c 12.3 -7.2 24.2 -8.0 35.6 -2.2 z",
  leftInner: "M 396.3 453.2 c 2.7 3.2 2.0 7.6 -2.3 15.3 l -4.0 7.0 l 0.0 -12.8 l 0.0 -12.8 l 2.3 0.6 c 1.2 0.4 3.0 1.6 4.0 2.7 z M 398.0 574.6 c 0.0 3.1 -2.7 6.5 -6.2 7.7 c -1.7 0.6 -1.8 -0.4 -1.8 -12.1 l 0.0 -12.7 l 4.0 7.0 c 2.2 3.9 4.0 8.4 4.0 10.1 z",
  leftOuter: "M 359.8 424.6 c 2.7 3.1 2.9 7.7 0.3 11.2 c -1.0 1.5 -4.1 7.1 -7.0 12.5 c -12.9 24.5 -18.7 53.8 -16.1 80.7 c 2.4 24.6 8.7 43.5 21.5 64.7 c 4.1 6.8 4.4 10.2 1.1 13.9 c -1.8 2.2 -3.2 2.8 -5.9 2.7 c -4.5 -0.1 -5.0 -0.5 -8.5 -5.6 c -17.4 -25.4 -27.5 -62.4 -25.9 -94.7 c 0.7 -13.4 4.4 -33.9 8.2 -46.0 c 2.9 -9.1 12.8 -29.7 17.7 -36.8 c 4.7 -6.8 10.0 -7.7 14.6 -2.6 z M 390.0 462.7 c 0.0 12.1 -0.2 13.3 -3.5 22.7 c -7.1 19.6 -7.0 41.3 0.0 62.3 c 3.2 9.7 3.5 11.4 3.5 22.9 c 0.0 6.8 -0.2 12.4 -0.5 12.4 c -2.8 0.0 -7.0 -4.0 -10.5 -10.1 c -13.0 -22.2 -17.9 -53.0 -12.5 -79.0 c 4.3 -20.4 16.2 -43.5 22.8 -43.9 c 0.4 0.0 0.7 5.7 0.7 12.7 z",
  rightInner: "M 635.0 464.7 c -0.1 13.1 -0.2 14.5 -1.4 11.8 c -0.7 -1.7 -3.0 -5.7 -5.0 -9.0 c -4.6 -7.6 -4.7 -11.4 -0.5 -14.9 c 1.7 -1.4 3.9 -2.6 5.0 -2.6 c 1.8 0.0 1.9 0.8 1.9 14.7 z M 635.0 568.6 l 0.0 14.6 l -2.7 -0.6 c -1.6 -0.4 -3.9 -1.9 -5.2 -3.3 c -3.0 -3.5 -2.5 -6.8 2.8 -15.8 c 2.3 -3.8 4.1 -7.5 4.1 -8.2 c 0.0 -0.7 0.2 -1.3 0.5 -1.3 c 0.3 0.0 0.5 6.6 0.5 14.6 z",
  rightOuter: "M 674.9 423.6 c 4.0 3.4 13.0 19.3 18.0 32.1 c 7.8 19.7 11.3 38.4 11.3 60.8 c 0.0 25.6 -5.7 49.7 -17.5 73.1 c -9.3 18.4 -13.3 22.5 -19.7 20.3 c -7.0 -2.5 -6.7 -8.0 1.1 -21.9 c 7.1 -12.7 11.5 -24.1 15.5 -40.0 c 2.7 -10.7 2.9 -12.8 2.9 -31.5 c 0.0 -12.9 -0.5 -22.1 -1.3 -26.0 c -4.5 -20.1 -10.7 -36.3 -19.7 -51.0 c -5.0 -8.1 -4.9 -14.1 0.3 -17.0 c 3.9 -2.0 5.6 -1.8 9.1 1.1 z M 640.3 453.9 c 6.6 7.9 15.6 31.1 17.6 45.4 c 1.4 10.0 1.4 24.3 0.0 34.4 c -2.4 18.1 -15.9 48.3 -21.5 48.3 c -1.3 0.0 -1.4 -2.4 -1.2 -15.3 c 0.3 -13.3 0.7 -16.3 3.1 -24.2 c 5.1 -16.3 4.8 -40.2 -0.8 -55.7 c -2.2 -6.2 -2.5 -8.5 -2.5 -21.4 c 0.0 -15.8 0.6 -17.1 5.3 -11.5 z",
};

interface SafeSyncAnimatedLogoProps {
  className?: string;
  size?: number | string;
  isHovered?: boolean;
}

export default function SafeSyncAnimatedLogo({
  className = "w-11 h-11",
  size,
  isHovered = false,
}: SafeSyncAnimatedLogoProps) {
  const [internalHover, setInternalHover] = useState(false);
  const activeHover = isHovered || internalHover;

  const style = size
    ? { width: typeof size === "number" ? `${size}px` : size, height: typeof size === "number" ? `${size}px` : size }
    : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none flex-shrink-0 transition-transform duration-300 ${activeHover ? "scale-105" : ""} ${className}`}
      style={style}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      title="SafeSync - Emergency Response Active"
    >
      {/* Ambient live pulse glow */}
      <span className="absolute inset-0 bg-red-500/20 rounded-full blur-sm animate-pulse -z-10" />

      {/* Base Cloudinary image provided by user (transparent PNG) */}
      <img
        src="https://res.cloudinary.com/di15s67o/image/upload/v1793289415/ss_icon-removebg-preview_hsvzoh.png"
        alt="SafeSync Emergency Mark"
        className="w-full h-full object-contain pointer-events-none rounded-none"
        loading="eager"
      />

      {/* SVG overlay animating the mark inside */}
      <svg
        viewBox="0 0 1024 1024"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle radar sweep gradient */}
          <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dynamic red background disc to seamlessly cover static JPG mark */}
        <circle cx="512" cy="512" r="238" fill="#e00c18" />

        {/* Concentric broadcast radar ripples */}
        <circle
          cx="512"
          cy="512"
          r="120"
          className="safesync-sonar-ring-1 fill-none stroke-white/30 stroke-[4]"
        />
        <circle
          cx="512"
          cy="512"
          r="190"
          className="safesync-sonar-ring-2 fill-none stroke-white/20 stroke-[3]"
        />

        {/* Animated Left Radio Waves */}
        <g className={activeHover ? "safesync-wave-left-active" : "safesync-wave-left"}>
          <path
            d={MARK_PATHS.leftInner}
            fill="#ffffff"
            className="safesync-wave-inner-left"
          />
          <path
            d={MARK_PATHS.leftOuter}
            fill="#ffffff"
            className="safesync-wave-outer-left"
          />
        </g>

        {/* Animated Right Radio Waves */}
        <g className={activeHover ? "safesync-wave-right-active" : "safesync-wave-right"}>
          <path
            d={MARK_PATHS.rightInner}
            fill="#ffffff"
            className="safesync-wave-inner-right"
          />
          <path
            d={MARK_PATHS.rightOuter}
            fill="#ffffff"
            className="safesync-wave-outer-right"
          />
        </g>

        {/* Center Exclamation Heartbeat / Alert Pulse */}
        <g className={activeHover ? "safesync-heartbeat-fast" : "safesync-heartbeat"}>
          <path
            d={MARK_PATHS.stem}
            fill="#ffffff"
            className="safesync-stem-glow"
          />
          <path
            d={MARK_PATHS.dot}
            fill="#ffffff"
            className="safesync-dot-glow"
          />
        </g>
      </svg>
    </div>
  );
}
