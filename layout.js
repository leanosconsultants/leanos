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
  activateRoiCalculator();
  activateStickyActionBar();
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
  const revealItems = document.querySelectorAll("section, .card, .offer-card, .case-card, .course-card, .testimonial-card, .process-step, .method-step, .founder-card, .roi-calculator, .proof-stats");

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

function activateRoiCalculator() {
  const calculator = document.querySelector("[data-roi-calculator]");
  if (!calculator) {
    return;
  }

  const hours = calculator.querySelector("#roiHours");
  const rate = calculator.querySelector("#roiRate");
  const reduction = calculator.querySelector("#roiReduction");
  const hoursValue = calculator.querySelector("#roiHoursValue");
  const rateValue = calculator.querySelector("#roiRateValue");
  const reductionValue = calculator.querySelector("#roiReductionValue");
  const monthlyOutput = calculator.querySelector("#roiMonthly");
  const annualOutput = calculator.querySelector("#roiAnnual");
  const currency = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "USD"
  });

  function updateRoi() {
    const monthly = Number(hours.value) * Number(rate.value) * (Number(reduction.value) / 100);
    const annual = monthly * 12;
    hoursValue.textContent = hours.value;
    rateValue.textContent = currency.format(Number(rate.value));
    reductionValue.textContent = `${reduction.value}%`;
    monthlyOutput.textContent = `${currency.format(monthly)} per month`;
    annualOutput.textContent = currency.format(annual);
  }

  [hours, rate, reduction].forEach(input => input.addEventListener("input", updateRoi));
  updateRoi();
}

function activateStickyActionBar() {
  if (localStorage.getItem("leanosStickyActionDismissed") === "true") {
    document.body.classList.add("sticky-action-hidden");
    return;
  }

  const bar = document.createElement("aside");
  bar.className = "sticky-action-bar";
  bar.setAttribute("aria-label", "LeanOS quick actions");
  const whatsappUrl = "https://wa.me/17789962619?text=Hello%20LeanOS%20Consultants%2C%20I%20would%20like%20to%20discuss%20workflow%20improvement%20or%20a%20LeanOS%20assessment.";
  bar.innerHTML = `
    <p>Ready to find the clearest improvement opportunity?<span>Start with a LeanOS assessment or book a strategy call.</span></p>
    <a class="sticky-call page-link" href="booking.html">Book a Call</a>
    <a class="sticky-assessment page-link" href="office_assessment.html">Start Assessment</a>
    <a class="sticky-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener">WhatsApp</a>
    <button class="sticky-action-close" type="button" aria-label="Hide quick action bar">x</button>
  `;
  document.body.appendChild(bar);

  const whatsappFloat = document.createElement("a");
  whatsappFloat.className = "whatsapp-float";
  whatsappFloat.href = whatsappUrl;
  whatsappFloat.target = "_blank";
  whatsappFloat.rel = "noopener";
  whatsappFloat.setAttribute("aria-label", "Send LeanOS Consultants a WhatsApp message");
  document.body.appendChild(whatsappFloat);

  bar.querySelector(".sticky-action-close").addEventListener("click", function () {
    localStorage.setItem("leanosStickyActionDismissed", "true");
    document.body.classList.add("sticky-action-hidden");
  });
}
