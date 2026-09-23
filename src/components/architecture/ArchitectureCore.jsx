import React from 'react';
import { architectureAssets } from './architectureAssets';

export default function ArchitectureCore({ className = '' }) {
  return (
    <div className={`arch-core ${className}`} id="prop-core">
      {/* Layer 1: Outer soft radial energy glow */}
      <div className="arch-core__glow" id="prop-core-glow" aria-hidden="true" />

      {/* Layer 2: Outer circular concentric ring dial */}
      <img
        src={architectureAssets.coreDial}
        alt="Concentric Core Dial"
        className="arch-core__dial"
        id="prop-core-dial"
        draggable="false"
      />
    </div>
  );
}
