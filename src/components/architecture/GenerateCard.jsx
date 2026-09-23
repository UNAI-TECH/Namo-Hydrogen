import React from 'react';
import ArchitectureCard from './ArchitectureCard';
import { architectureAssets } from './architectureAssets';

export default function GenerateCard({ className = '' }) {
  return (
    <ArchitectureCard
      type="generate"
      stepNumber="01"
      stepBadge="GENERATE"
      title="Thermal Dissociation"
      description="Recover 650°C+ engine waste heat to dissociate water into pure on-demand H₂ directly onboard."
      metric="99.99% H₂ PURITY"
      engineImage={architectureAssets.generateEngine}
      engineAlt="Thermal Dissociation Reactor with H2O Ingestion"
      className={className}
    />
  );
}
