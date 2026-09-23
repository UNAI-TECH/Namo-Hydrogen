import { useEffect } from 'react';
import gsap from 'gsap';

export function useMouseParallax() {
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 12;

      gsap.to('.pin-stage', {
        x: mouseX * 0.35,
        y: mouseY * 0.35,
        duration: 0.9,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}
