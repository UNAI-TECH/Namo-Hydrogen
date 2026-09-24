// Centralized animation & scroll configuration for Namo Hydrogen

// Scroll distance in pixels (higher = slower, more cinematic scroll animations)
export const SCROLL_DISTANCE = 9600;

// Exact scroll targets for each cinematic stage in the FloatingHeader navigation
export const STEP_SCROLL_TARGETS = [
  0,     // 01 WATER (Hero - timeline 0.0)
  2320,  // 02 TRANSFORM (Split Cards settled - timeline 1.45)
  3920,  // 03 GENERATE (Data Orbit settled with transformed Logo - timeline 2.45)
  6320,  // 04 PROPULSION (Full Propulsion Architecture loop settled - timeline 3.95)
  7900,  // 05 FOUNDER (Founder Biography - timeline 4.93)
  8800   // 06 BRIEFING (Dedicated Request Briefing Page - timeline 5.50)
];
