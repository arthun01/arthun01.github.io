export function initMobileMenu(): void {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!hamburgerBtn || !mobileMenu) return;

  function toggleMenu(forceClose = false) {
    const isCurrentlyOpen = mobileMenu!.classList.contains('open');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    mobileMenu!.classList.toggle('open', shouldOpen);
    hamburgerBtn!.classList.toggle('active', shouldOpen);
    hamburgerBtn!.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    mobileMenu!.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  hamburgerBtn.addEventListener('click', () => toggleMenu());
  closeBtn?.addEventListener('click', () => toggleMenu(true));

  // Close when clicking any nav link
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // Close on resize if going from mobile to desktop
  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
        toggleMenu(true);
      }
    },
    { passive: true }
  );
}
