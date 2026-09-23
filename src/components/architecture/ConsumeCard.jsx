import React from 'react';
import ArchitectureCard from './ArchitectureCard';
import { architectureAssets } from './architectureAssets';

export default function ConsumeCard({ className = '' }) {
  return (
    <ArchitectureCard
      type="consume"
      stepNumber="03"
      stepBadge="CONSUME"
      title="Direct Induction"
      description="Supersonic flame propagation inside existing internal combustion chambers. Pure water vapor exhaust."
      metric="3,200 M/S FLAME"
      engineImage={architectureAssets.consumeEngine}
      engineAlt="Direct Cylinder Induction Chamber"
      className={className}
    />
  );
}
