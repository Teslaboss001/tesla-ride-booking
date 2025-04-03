// 預約報價 → 顯示分類按鈕
document.getElementById('bookBtn')?.addEventListener('click', function () {
  this.style.display = 'none';
  document.getElementById('categoryBtns').style.display = 'flex';
});

// 點選「一般接送」 → 顯示預約區段
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (this.textContent === '一般接送') {
      document.querySelector('.hero')?.style.setProperty("display", "none");
      document.getElementById('normalRideSection')?.classList.remove('hidden');
    }
  });
});

// 動態新增下車地址
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

// 計算車資按鈕邏輯
document.getElementById('calculateBtn')?.addEventListener('click', async function () {
  const pickup = document.getElementById('pickup')?.value;
  const dropoffs = Array.from(document.querySelectorAll('input[name=dropoff]')).map(el => el.value).filter(Boolean);
  const vehicle = document.getElementById('cartype')?.value;
  const time = document.getElementById('rideTime')?.value;

  if (!pickup || dropoffs.length === 0) {
    alert('請輸入上車與下車地址');
    return;
  }

  const addresses = [pickup, ...dropoffs];
  let totalDistance = 0;

  for (let i = 0; i < addresses.length - 1; i++) {
    const origin = addresses[i];
    const destination = addresses[i + 1];
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=AIzaSyBYhjHSQTm68K_dnKgiiWFGRWX2RBiJMhQ`);
      const data = await response.json();
      if (data.rows[0].elements[0].status === "OK") {
        const distanceInMeters = data.rows[0].elements[0].distance.value;
        totalDistance += distanceInMeters / 1000;
      }
    } catch (error) {
      console.error("Google Maps API 發生錯誤", error);
    }
  }

  let baseFare = (totalDistance * 30 + 85) * 1.4;
  const hour = parseInt(time.split(":")[0]);
  if ((hour >= 23 && hour <= 24) || (hour >= 0 && hour < 6)) {
    baseFare *= 1.2;
  }

  if (vehicle === "五人座" && baseFare < 500) baseFare = 500;
  if (vehicle === "七人座" && baseFare < 800) baseFare = 800;

  document.querySelector('.hero')?.style.setProperty("display", "none");
  document.getElementById('normalRideSection')?.style.setProperty("display", "none");
  document.getElementById('finalMap')?.style.setProperty("display", "none");
  document.getElementById('welcomeSection')?.classList.remove('hidden');

  document.getElementById('fareAmount').textContent = `NT$ ${Math.round(baseFare)}`;
});