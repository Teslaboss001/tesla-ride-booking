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

document.getElementById('confirmBtn')?.addEventListener('click', function () {
  const rideDate = document.getElementById('rideDate');
  const rideTime = document.getElementById('rideTime');
  if (rideDate?.value && rideTime?.value) {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('normalRideSection').style.display = 'none';
    document.getElementById('finalMap').classList.remove('hidden');
  } else {
    alert("請先選擇日期與時間！");
  }
});

// 新增下車地址欄位功能
document.getElementById('addStopBtn')?.addEventListener('click', function () {
  const container = document.getElementById('extraStops');
  const label = document.createElement('label');
  label.textContent = '輸入下車地址（必填）';
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'dropoff';
  input.placeholder = '下車地址';
  input.required = true;
  input.style.marginBottom = '12px';
  container.appendChild(label);
  container.appendChild(input);
});