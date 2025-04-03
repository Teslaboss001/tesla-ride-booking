document.getElementById('bookBtn').addEventListener('click', function () {
  this.style.display = 'none';
  document.getElementById('categoryBtns').style.display = 'flex';
});

document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (this.textContent === '一般接送') {
      document.querySelector('.hero').style.display = 'none';
      document.getElementById('normalRideSection').classList.remove('hidden');
    }
  });
});

const rideDate = document.getElementById('rideDate');
const rideTime = document.getElementById('rideTime');

function checkInputsAndShowMap() {
  if (rideDate.value && rideTime.value) {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('normalRideSection').style.display = 'none';
    document.getElementById('finalMap').classList.remove('hidden');
  }
}

rideDate?.addEventListener('change', checkInputsAndShowMap);
rideTime?.addEventListener('change', checkInputsAndShowMap);