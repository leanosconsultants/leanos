const leanosPaymentLinks = {
  assessment: "",
  workshop: "",
  course: ""
};

document.querySelectorAll(".payment-link").forEach(link => {
  const key = link.dataset.paymentKey;
  const paymentUrl = leanosPaymentLinks[key];

  if (paymentUrl) {
    link.href = paymentUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Pay Securely";
  }
});
