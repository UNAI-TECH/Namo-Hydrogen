import React from 'react';

/**
 * FlowParticles renders glowing energy beads that travel continuously
 * along a designated SVG path using native GPU-accelerated animateMotion.
 */
export default function FlowParticles({ pathD, particleCount = 4, duration = 3.2, delayOffset = 0 }) {
  const particles = Array.from({ length: particleCount }, (_, idx) => {
    const fraction = idx / particleCount;
    const begin = `${(fraction * duration + delayOffset) % duration}s`;
    const radius = idx === 1 ? 5.2 : idx === 2 ? 4.8 : 4.0;
    const opacity = idx === 0 ? 0.75 : idx === particleCount - 1 ? 0.7 : 0.95;

    return (
      <circle
        key={idx}
        r={radius}
        fill="#00e599"
        opacity={opacity}
        filter="url(#particleEnergyGlow)"
      >
        <animateMotion
          dur={`${duration}s`}
          repeatCount="indefinite"
          begin={begin}
          path={pathD}
        />
      </circle>
    );
  });

  return <g className="flow-particles-group">{particles}</g>;
}
