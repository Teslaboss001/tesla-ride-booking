
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

// 新增：偵測日期與時間是否都選擇後，跳出地圖
const rideDate = document.getElementById('rideDate');
const rideTime = document.getElementById('rideTime');

function checkInputsAndShowMap() {
  if (rideDate.value && rideTime.value) {
    document.body.querySelectorAll('.hero, #normalRideSection').forEach(el => el.style.display = 'none');
    document.getElementById('finalMap').classList.remove('hidden');
  }
}

rideDate.addEventListener('change', checkInputsAndShowMap);
rideTime.addEventListener('change', checkInputsAndShowMap);
