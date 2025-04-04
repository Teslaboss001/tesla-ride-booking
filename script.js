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

// 按下「確認」後顯示 Google 表單區塊
document.getElementById('confirmBtn')?.addEventListener('click', function () {
  const rideDate = document.getElementById('rideDate');
  const rideTime = document.getElementById('rideTime');
  if (rideDate?.value && rideTime?.value) {
    document.querySelector('.hero')?.style.setProperty("display", "none");
    document.getElementById('normalRideSection')?.style.setProperty("display", "none");
    document.getElementById('finalMap')?.classList.remove('hidden');
  } else {
    alert("請先選擇日期與時間！");
  }
});

// 顯示預約摘要資訊
function showBookingSummary(date, time, pickup, dropoffs, vehicle, passengers, luggage) {
  const summary = document.createElement("div");
  summary.style.position = "absolute";
  summary.style.top = "65%";
  summary.style.left = "50%";
  summary.style.transform = "translate(-50%, 0)";
  summary.style.color = "white";
  summary.style.fontSize = "1.1em";
  summary.style.fontWeight = "normal";
  summary.style.textAlign = "left";
  summary.style.backgroundColor = "rgba(0,0,0,0.6)";
  summary.style.padding = "20px";
  summary.style.borderRadius = "12px";
  summary.style.maxWidth = "90%";

  summary.innerHTML = `
    <div><strong>預約日期：</strong>${date}</div>
    <div><strong>搭乘時間：</strong>${time}</div>
    <div><strong>上車地點：</strong>${pickup}</div>
    <div><strong>下車地點：</strong>${dropoffs.join(" → ")}</div>
    <div><strong>車型：</strong>${vehicle}</div>
    <div><strong>乘車人數：</strong>${passengers} 人</div>
    <div><strong>行李數量：</strong>${luggage} 件</div>
  `;
  document.getElementById("welcomeSection").appendChild(summary);
}

// 使用 Google Maps DirectionsService 計算距離與金額
document.getElementById('calculateBtn')?.addEventListener('click', async function () {
  const pickup = document.getElementById('pickup')?.value;
  const dropoffs = Array.from(document.querySelectorAll('input[name=dropoff]')).map(el => el.value).filter(Boolean);
  const vehicle = document.getElementById('cartype')?.value;
  const time = document.getElementById('rideTime')?.value;

  if (!pickup || dropoffs.length === 0) {
    alert('請輸入上車與下車地址');
    return;
  }

  const directionsService = new google.maps.DirectionsService();
  const waypoints = dropoffs.slice(0, -1).map(address => ({ location: address, stopover: true }));
  const origin = pickup;
  const destination = dropoffs[dropoffs.length - 1];

  directionsService.route({
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    travelMode: google.maps.TravelMode.DRIVING
  }, function (response, status) {
    if (status === 'OK') {
      let totalDistance = 0;
      const route = response.routes[0];
      route.legs.forEach(leg => {
        totalDistance += leg.distance.value / 1000;
      });

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

      const fareBox = document.getElementById('fareAmount');
      fareBox.style.fontSize = "3.5em";
      fareBox.style.fontWeight = "bold";
      fareBox.style.color = "#00ffcc";
      fareBox.textContent = `NT$ ${Math.round(baseFare)}`;

      showBookingSummary(
        document.getElementById('rideDate')?.value,
        time,
        pickup,
        dropoffs,
        vehicle,
        document.getElementById('passengers')?.value,
        document.getElementById('luggage')?.value
      );
    } else {
      alert("無法計算路線，請確認地址是否正確！");
    }
  });
});