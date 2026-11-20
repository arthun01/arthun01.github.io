import { projects, type Project } from '../data/projects.ts';

export function initProjectModal(): void {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalIndex = document.getElementById('modal-index');
  const modalTitle = document.getElementById('modal-title');
  const modalSummary = document.getElementById('modal-summary');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTags = document.getElementById('modal-tags');
  const modalGithub = document.getElementById('modal-github') as HTMLAnchorElement | null;
  const modalLive = document.getElementById('modal-live') as HTMLAnchorElement | null;
  const modalMediaWrap = document.getElementById('modal-media-wrap');
  const modalMediaImg = document.getElementById('modal-media-img') as HTMLImageElement | null;

  if (!modal || !closeBtn) return;

  let lastActiveCard: HTMLElement | null = null;

  function openModal(project: Project, x: number, y: number, triggerEl: HTMLElement) {
    lastActiveCard = triggerEl;

    modal!.style.setProperty('--click-x', `${x}px`);
    modal!.style.setProperty('--click-y', `${y}px`);

    if (modalIndex) modalIndex.textContent = `${project.index} · ${project.year}`;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalSummary) modalSummary.textContent = project.summary;

    if (modalHighlights) {
      modalHighlights.innerHTML = project.highlights
        .map((h) => `<li>${h}</li>`)
        .join('');
    }

    if (modalTags) {
      modalTags.innerHTML = project.stack
        .map((tech) => `<span class="modal-tag">${tech}</span>`)
        .join('');
    }

    if (modalGithub) {
      if (project.githubUrl) {
        modalGithub.href = project.githubUrl;
        modalGithub.style.display = 'inline-flex';
      } else {
        modalGithub.style.display = 'none';
      }
    }

    if (modalLive) {
      if (project.liveUrl) {
        modalLive.href = project.liveUrl;
        modalLive.style.display = 'inline-flex';
      } else {
        modalLive.style.display = 'none';
      }
    }

    if (modalMediaWrap && modalMediaImg) {
      if (project.imageUrl && project.imageUrl.trim() !== '') {
        modalMediaImg.src = project.imageUrl;
        modalMediaImg.alt = `Imagem de ${project.title}`;
        modalMediaWrap.style.display = 'block';
      } else {
        modalMediaWrap.style.display = 'none';
        modalMediaImg.src = '';
      }
    }

    document.body.style.overflow = 'hidden';
    modal!.scrollTop = 0;
    modal!.classList.add('open');

    setTimeout(() => {
      closeBtn?.focus();
    }, 250);
  }

  function closeModal() {
    modal!.classList.remove('open');
    document.body.style.overflow = '';
    if (lastActiveCard) {
      lastActiveCard.focus();
    }
  }

  // Bind Cards
  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    card.addEventListener('click', (e: MouseEvent) => {
      const projectId = card.dataset.projectId;
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      const rect = card.getBoundingClientRect();
      const clickX = e.clientX || rect.left + rect.width / 2;
      const clickY = e.clientY || rect.top + rect.height / 2;

      openModal(project, clickX, clickY, card);
    });

    // Keyboard access (Enter / Space)
    card.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.dataset.projectId;
        const project = projects.find((p) => p.id === projectId);
        if (!project) return;

        const rect = card.getBoundingClientRect();
        openModal(project, rect.left + rect.width / 2, rect.top + rect.height / 2, card);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Click on backdrop to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}
