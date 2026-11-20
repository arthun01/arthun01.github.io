import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playTypewriter } from './typewriter.ts';

export function initHeroNavbarAnimation(): void {
  gsap.registerPlugin(ScrollTrigger);

  const hero = document.querySelector('.hero');
  const heroTitle = document.querySelector('.hero-title');
  const navbar = document.querySelector('.navbar');
  const navBrand = document.querySelector('.nav-brand');

  if (!hero || !heroTitle || !navbar || !navBrand) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    navBrand.classList.add('visible');
    navbar.classList.add('scrolled');
    playTypewriter();
    return;
  }

  // Trigger typewriter on initial load
  playTypewriter();

  // Navbar background blur & shadow on scroll
  ScrollTrigger.create({
    trigger: hero,
    start: '100px top',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });

  // Name transition from Hero to Navbar & Replay on Scroll-Back-Up
  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom 20%',
    scrub: 0.8,
    onEnterBack: () => {
      // Re-trigger typing animation whenever user scrolls back up to the hero!
      playTypewriter(true);
    },
    onUpdate: (self) => {
      const progress = self.progress;

      // Parallax & fade hero title
      gsap.set(heroTitle, {
        y: progress * -40,
        opacity: Math.max(0, 1 - progress * 1.5),
      });

      // Reveal nav-brand smoothly as hero title fades
      if (progress > 0.45) {
        navBrand.classList.add('visible');
      } else {
        navBrand.classList.remove('visible');
      }
    },
  });

  // Smooth Section Scroll-Reveal using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
}
