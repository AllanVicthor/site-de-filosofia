/**
 * Filosofia Clássica — Script principal
 * Navegação, menu mobile, scroll suave e animações
 */

document.addEventListener("DOMContentLoaded", () => {
  // ========== Elementos ==========
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearEl = document.getElementById("year");

  // ========== Ano no footer ==========
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ========== Header com scroll ==========
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // ========== Menu mobile ==========
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      nav.classList.toggle("open");
      document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        nav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ========== Navegação ativa por seção ==========
  const sections = document.querySelectorAll("section[id]");

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // ========== Animações de entrada (Intersection Observer) ==========
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elementos a animar
  const animateTargets = document.querySelectorAll(
    ".intro-card, .text-block, .comparison-card, .about-card, .philosopher-bio, .reading-path"
  );

  animateTargets.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // ========== Scroll suave extra (para navegadores mais antigos) ==========
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = header.offsetHeight + 10;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });
});
