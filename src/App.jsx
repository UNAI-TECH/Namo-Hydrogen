import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import FloatingHeader from './components/FloatingHeader';
import ScrollWrapper from './components/ScrollWrapper';
import TextLoopSection from './components/TextLoopSection';
import BriefingModal from './components/BriefingModal';
import { useLenis } from './hooks/useLenis';
import { useDropletRenderer } from './hooks/useDropletRenderer';
import { useScrollTimeline } from './hooks/useScrollTimeline';
import { useParticleEngine } from './hooks/useParticleEngine';
import { useMouseParallax } from './hooks/useMouseParallax';

import { STEP_SCROLL_TARGETS } from './constants';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);

  const { lenisRef, scrollTo } = useLenis();
  const { dropletStateRef, renderDroplet } = useDropletRenderer(lenisRef);
  useScrollTimeline(dropletStateRef, renderDroplet);
  useParticleEngine(dropletStateRef);
  useMouseParallax();

  // Prevent background scrolling while BriefingModal is open or during preloading
  useEffect(() => {
    if (isModalOpen || !isPreloaded) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    };
  }, [isModalOpen, isPreloaded, lenisRef]);

  const handleStepClick = (stepIdx) => {
    const targetScroll = STEP_SCROLL_TARGETS[stepIdx] ?? (stepIdx * 1600);
    scrollTo(targetScroll, { duration: 1.2, force: true });
  };

  const handleExplore = () => {
    scrollTo(STEP_SCROLL_TARGETS[1], { duration: 1.25, force: true });
  };

  const handleGotoDiscuss = () => {
    scrollTo(STEP_SCROLL_TARGETS[5], { duration: 1.3, force: true });
  };

  const handleExploreFounderStory = () => {
    scrollTo(7900, { duration: 1.1, force: true });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FloatingHeader onOpenModal={handleOpenModal} onStepClick={handleStepClick} />
      <ScrollWrapper
        onExplore={handleExplore}
        onOpenModal={handleOpenModal}
        onGotoDiscuss={handleGotoDiscuss}
        onExploreStory={handleExploreFounderStory}
        onStepClick={handleStepClick}
      />
      <TextLoopSection />
      <BriefingModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Preloader onComplete={() => setIsPreloaded(true)} />
    </>
  );
}
