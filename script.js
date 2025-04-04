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

// 動態新增下車地址輸入框（按 +）
document.getElementById('addStopBtn')?.addEventListener('click', function () {
  const container = document.getElementById('dropoffContainer');
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.marginTop = "10px";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "dropoff";
  input.placeholder = "設定下車地址（必填）";
  input.required = true;
  input.style.flex = "1";
  input.style.marginRight = "10px";

  wrapper.appendChild(input);
  container.appendChild(wrapper);
});

// 計算車資邏輯（含多段地址距離）
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
      fareBox.style.fontSize = "7em";
      fareBox.style.fontWeight = "bold";
      fareBox.style.color = "#00ffcc";
      fareBox.style.marginTop = "-20px";
      fareBox.innerHTML = "<div style='font-size: 0.4em; margin-bottom: 10px;'>預約報價費用</div>" + `NT$ ${Math.round(baseFare)}`;
    } else {
      alert("無法計算路線，請確認地址是否正確！");
    }
  });
});