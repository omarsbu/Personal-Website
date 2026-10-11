const animatedText = document.querySelectorAll('h1, h2, h3, p, a, .nav-brand, .timeline-date');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  animatedText.forEach((element, index) => {
    element.style.animationDelay = `${index * 50}ms`;
  });
}

const buttons = document.querySelectorAll('.button');

const projectCarousel = document.querySelector('.project-carousel');
const carouselButtons = document.querySelectorAll('.carousel-button');

carouselButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const projectCard = projectCarousel?.querySelector('.project-card');
    if (!projectCard) return;

    const direction = button.dataset.direction === 'next' ? 1 : -1;
    const cardGap = parseFloat(getComputedStyle(projectCarousel).gap) || 0;

    projectCarousel.scrollBy({
      left: direction * (projectCard.offsetWidth + cardGap),
      behavior: 'smooth'
    });
  });
});

buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.02)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

const nav = document.querySelector('.top-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', String(expanded));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('main section[id]');

const setActiveLink = () => {
  const scrollPosition = window.scrollY + 160;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!link) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const offset = Math.min(window.scrollY / 300, 0.2);
    hero.style.filter = `brightness(${1 - offset})`;
  }

  setActiveLink();
});

setActiveLink();
