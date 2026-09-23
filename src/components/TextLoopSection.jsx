import React from 'react';
import TextLoop from './TextLoop';

export default function TextLoopSection() {
  return (
    <section className="namo-textloop-section" id="namo-textloop-section">
      <div className="namo-textloop-header">
        <div className="hud-kicker">SUSTAINABLE PROPULSION // CONTINUOUS POWER</div>
        <h2 className="namo-textloop-title">Redefining Mobility Onboard</h2>
      </div>
      <div className="namo-textloop-wrapper">
        <div id="text-loop-root">
          <TextLoop
            text="Namo hydrogen"
            shape="wave"
            speed={90}
            direction="forward"
            separator="."
            curviness={70}
            fontSize={46}
            fontWeight={900}
            letterSpacing={9}
            uppercase={false}
            color="#e7ecde"
            ribbon
            ribbonColor="#b9d78d"
            ribbonWidth={88}
            pauseOnHover
          />
        </div>
      </div>
      <div className="namo-textloop-footer">
        <span>NAMO HYDROGEN TECHNOLOGY · ZERO-CARBON MOBILITY · PATENT VALIDATED</span>
      </div>
    </section>
  );
}
