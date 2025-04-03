document.addEventListener('DOMContentLoaded', function () {
  alert("JS 已成功載入，互動功能啟動");

  const bookBtn = document.getElementById('bookBtn');
  const categoryBtns = document.getElementById('categoryBtns');
  const rideDate = document.getElementById('rideDate');
  const rideTime = document.getElementById('rideTime');
  const finalMap = document.getElementById('finalMap');
  const normalSection = document.getElementById('normalRideSection');

  if (bookBtn && categoryBtns) {
    bookBtn.addEventListener('click', function () {
      this.style.display = 'none';
      categoryBtns.style.display = 'flex';
    });
  }

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.textContent === '一般接送') {
        document.querySelector('.hero').style.display = 'none';
        normalSection.classList.remove('hidden');
      }
    });
  });

  function checkInputsAndShowMap() {
    if (rideDate.value && rideTime.value) {
      document.body.querySelectorAll('.hero, #normalRideSection').forEach(el => el.style.display = 'none');
      finalMap.classList.remove('hidden');
    }
  }

  if (rideDate && rideTime) {
    rideDate.addEventListener('change', checkInputsAndShowMap);
    rideTime.addEventListener('change', checkInputsAndShowMap);
  }
});