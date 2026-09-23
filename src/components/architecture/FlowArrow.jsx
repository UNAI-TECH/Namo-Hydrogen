import React from 'react';
import FlowParticles from './FlowParticles';

/**
 * Exact geometric SVG flow vectors mapped to 1536x1024 normalized coordinate system.
 */
const FLOW_PATHS = {
  'generate-to-core': {
    d: 'M 768 355 L 768 470',
    particleCount: 3,
    duration: 2.2,
    delay: 0,
  },
  'core-to-control': {
    d: 'M 675 640 C 605 675 545 695 480 715',
    particleCount: 3,
    duration: 2.6,
    delay: 0.8,
  },
  'control-to-consume': {
    d: 'M 510 830 C 690 915 846 915 1026 830',
    particleCount: 4,
    duration: 3.4,
    delay: 1.5,
  },
  'consume-to-generate': {
    d: 'M 1050 670 C 1140 480 1030 320 900 280',
    particleCount: 4,
    duration: 3.6,
    delay: 2.4,
  },
  // Companion outer arc from Control to Generate as shown in reference diagram
  'control-to-generate': {
    d: 'M 410 670 C 320 480 430 320 636 280',
    particleCount: 4,
    duration: 3.6,
    delay: 0.5,
  },
};

export default function FlowArrow({ from, to, showParticles = false }) {
  const key = `${from}-to-${to}`;
  const config = FLOW_PATHS[key];

  if (!config) return null;

  return (
    <g className={`flow-connector flow-connector--${key}`}>
      {/* Background Soft Track */}
      <path
        d={config.d}
        className="flow-track-base"
        stroke="rgba(22, 163, 74, 0.22)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Luminous Animated Flow Line */}
      <path
        d={config.d}
        className="flow-track-luminous"
        stroke="url(#flowTrackGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        markerEnd="url(#flowArrowTip)"
        filter="url(#flowLineGlow)"
      />

      {/* Dynamic Traveling Energy Particles */}
      {showParticles && (
        <FlowParticles
          pathD={config.d}
          particleCount={config.particleCount}
          duration={config.duration}
          delayOffset={config.delay}
        />
      )}
    </g>
  );
}
