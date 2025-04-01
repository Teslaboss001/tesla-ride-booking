
document.getElementById('bookBtn').addEventListener('click', function () {
  this.style.display = 'none';
  document.getElementById('categoryBtns').style.display = 'flex';
});

document.getElementById('btnRide').addEventListener('click', function () {
  this.style.display = 'none';
  showNextStep('sectionDate');
});

function showNextStep(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const inputs = section.querySelectorAll("input, select");
    inputs.forEach(input => {
      input.addEventListener('change', function () {
        section.style.display = 'none';
        const next = section.getAttribute('data-next');
        if (next) showNextStep(next);
      }, { once: true });
    });
  }
}
