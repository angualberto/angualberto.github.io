const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const projectButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 12);
}

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    projectButtons.forEach((item) => item.classList.toggle('active', item === button));
    projectCards.forEach((card) => {
      const visible = filter === 'todos' || card.dataset.category.split(' ').includes(filter);
      card.classList.toggle('hidden', !visible);
    });
  });
});

if (reducedMotion) {
  document.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((node) => revealObserver.observe(node));
}

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-38% 0px -52% 0px', threshold: 0.01 });
sections.forEach((section) => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
