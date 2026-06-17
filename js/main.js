// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Typed text effect
const titles = [
  'Fresher Design',
  'Frontend Developer',
  'UI/UX Enthusiast',
  'Sinh viên CNTT'
];

const typedEl = document.getElementById('typedText');
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = titles[titleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.section-header, .about-grid, .skill-category, .timeline-item, .project-card, .edu-grid, .contact-wrapper'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent(`Liên hệ từ ${name} - Portfolio`);
  const body = encodeURIComponent(`Họ tên: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:huang.id.vn@gmail.com?subject=${subject}&body=${body}`;
});

// Footer dates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], header[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.querySelectorAll('a').forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--accent-light)'
          : '';
      });
    }
  });
});
