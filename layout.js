document.addEventListener("DOMContentLoaded", function () {

  function loadComponent(id, file) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;

        if (id === "header-placeholder") {
          activateNavAnimation();
        }
      });
  }

  loadComponent("header-placeholder", "partials/header.html");
  loadComponent("footer-placeholder", "partials/footer.html");
  activateScrollReveal();

});

/* ===== Navigation Animation Activation ===== */

function activateNavAnimation() {
  window.addEventListener("pageshow", function () {
    document.body.classList.add("loaded");
  });

  document.querySelectorAll(".page-link").forEach(link => {
    link.addEventListener("click", function (e) {

      const isSamePage =
        this.pathname === window.location.pathname;

      const isExternal =
        this.hostname !== window.location.hostname;

      if (!isSamePage && !isExternal) {
        e.preventDefault();
        const url = this.href;

        document.body.classList.remove("loaded");
        document.body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = url;
        }, 400);
      }

    });
  });

  /* Header shrink effect */
  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

}

function activateScrollReveal() {
  const revealItems = document.querySelectorAll("section, .card, .offer-card, .case-card, .course-card, .testimonial-card, .process-step, .founder-card");

  revealItems.forEach(item => item.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
}
