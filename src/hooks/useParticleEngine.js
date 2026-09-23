import { useEffect } from 'react';
import gsap from 'gsap';

export function useParticleEngine(dropletStateRef) {
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const trailDropletImg = new Image();
    trailDropletImg.src = '/images/droplet-isolated.webp';

    const wakeParticles = [];

    let prevDropX = null;
    let prevDropY = null;
    let smoothVx = 0;
    let smoothVy = 0;
    let animTick = 0;
    let rafId = null;

    function animateDropletTrails() {
      animTick++;
      ctx.clearRect(0, 0, w, h);

      let dropX = w * 0.5;
      let dropY = h * 0.5;
      let dropRadius = 50;
      let currentSpeed = 0;
      let dropVx = 0;
      let dropVy = 0;
      let dropHeadingX = 0;
      let dropHeadingY = 1;
      let isMoving = false;
      let hasValidPosition = false;

      const kineticDroplet = document.getElementById('kinetic-droplet');
      if (kineticDroplet) {
        const rect = kineticDroplet.getBoundingClientRect();
        const dropOpacity = gsap.getProperty(kineticDroplet, 'opacity');
        if (rect.width > 0 && dropOpacity > 0.05) {
          dropX = rect.left + rect.width / 2;
          dropY = rect.top + rect.height / 2;
          dropRadius = rect.width * 0.48;
          hasValidPosition = true;

          if (prevDropX !== null && prevDropY !== null) {
            dropVx = dropX - prevDropX;
            dropVy = dropY - prevDropY;
            currentSpeed = Math.hypot(dropVx, dropVy);

            smoothVx += (dropVx - smoothVx) * 0.35;
            smoothVy += (dropVy - smoothVy) * 0.35;
            const filteredSpeed = Math.hypot(smoothVx, smoothVy);
            const isScrolling = dropletStateRef?.current?.isScrolling || false;

            if (filteredSpeed > 0.25 || (isScrolling && Math.abs(dropVx) + Math.abs(dropVy) > 0.25)) {
              isMoving = true;
              const effectiveSpeed = Math.max(0.15, filteredSpeed);
              dropHeadingX = smoothVx / effectiveSpeed;
              dropHeadingY = smoothVy / effectiveSpeed;

              const emissionCount = Math.min(2, Math.max(1, Math.floor(effectiveSpeed * 0.8)));
              const normalX = -dropHeadingY;
              const normalY = dropHeadingX;

              for (let i = 0; i < emissionCount; i++) {
                const subStep = (i + Math.random()) / (emissionCount + 1);
                const pathX = prevDropX + dropVx * subStep;
                const pathY = prevDropY + dropVy * subStep;

                const lateralSpread = (Math.random() - Math.random()) * (dropRadius * 0.35);
                const spawnX = pathX - dropHeadingX * (dropRadius * 0.65) + normalX * lateralSpread;
                const spawnY = pathY - dropHeadingY * (dropRadius * 0.65) + normalY * lateralSpread;

                const forwardMomentum = 0.28 + Math.random() * 0.14;
                const turbulence = (Math.random() - 0.5) * 0.4;
                const pVx = smoothVx * forwardMomentum + normalX * turbulence;
                const pVy = smoothVy * forwardMomentum + normalY * turbulence + (dropVy > 0 ? 0.2 : 0);

                const baseSize = dropRadius * (0.16 + Math.random() * 0.14);

                wakeParticles.push({
                  x: spawnX,
                  y: spawnY,
                  vx: pVx,
                  vy: pVy,
                  initialSize: baseSize,
                  life: 0,
                  maxLife: 24 + Math.floor(Math.random() * 16),
                  headingX: dropHeadingX,
                  headingY: dropHeadingY,
                });
              }
            }
          }

          prevDropX = dropX;
          prevDropY = dropY;
        }
      }

      const imgLoaded = trailDropletImg.complete && trailDropletImg.naturalWidth > 0;

      for (let i = wakeParticles.length - 1; i >= 0; i--) {
        const p = wakeParticles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          wakeParticles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const pSpeed = Math.hypot(p.vx, p.vy);
        const dragFactor = 0.05 + pSpeed * 0.025;
        p.vx -= p.vx * dragFactor;
        p.vy -= p.vy * dragFactor;

        if (isMoving) {
          p.vx += dropHeadingX * 0.1 * (1 - progress);
          p.vy += dropHeadingY * 0.1 * (1 - progress);
        }
        if (p.vy > 0) {
          p.vy += 0.05 * (1 - progress);
        }

        p.x += p.vx;
        p.y += p.vy;

        const sizeRatio = Math.pow(1 - progress, 0.65);
        const currentSize = Math.max(2, p.initialSize * sizeRatio);
        const alpha = Math.sin(progress * Math.PI) * (1 - progress * 0.35) * 0.82;
        const particleAngle = Math.atan2(p.vy, p.vx) + Math.PI / 2;
        const stretch = 1 + Math.min(0.5, pSpeed * 0.06);

        if (imgLoaded && alpha > 0.01) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(particleAngle);
          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.shadowColor = 'rgba(10, 40, 25, 0.14)';
          ctx.shadowBlur = currentSize * 0.25;
          ctx.shadowOffsetY = currentSize * 0.08;
          ctx.drawImage(
            trailDropletImg,
            -currentSize / 2,
            (-currentSize * stretch) / 2,
            currentSize,
            currentSize * stretch
          );
          ctx.restore();
        }
      }

      rafId = requestAnimationFrame(animateDropletTrails);
    }

    rafId = requestAnimationFrame(animateDropletTrails);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [dropletStateRef]);
}
