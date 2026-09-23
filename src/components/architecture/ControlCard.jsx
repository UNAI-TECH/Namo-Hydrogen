import React from 'react';
import ArchitectureCard from './ArchitectureCard';
import { architectureAssets } from './architectureAssets';

export default function ControlCard({ className = '' }) {
  return (
    <ArchitectureCard
      type="control"
      stepNumber="02"
      stepBadge="CONTROL"
      title="Dynamic Metering"
      description="Transient pulse injection matches instant engine RPM demand with microsecond precision."
      metric="8 PSI REGULATED"
      engineImage={architectureAssets.controlEngine}
      engineAlt="Dynamic Transient Metering Injector"
      className={className}
    />
  );
}
