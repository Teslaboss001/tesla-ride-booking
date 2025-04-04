// 預約報價按鈕 → 顯示分類按鈕
document.getElementById('bookBtn')?.addEventListener('click', function () {
  this.style.display = 'none';
  document.getElementById('categoryBtns').style.display = 'flex';
});

// 點擊「一般接送」按鈕 → 顯示一般預約區塊
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (this.textContent === '一般接送') {
      document.querySelector('.hero')?.style.setProperty("display", "none");
      document.getElementById('normalRideSection')?.classList.remove('hidden');
    }
  });
});

// 顯示預約摘要與美化按鈕
function showBookingSummary(date, time, pickup, dropoffs, vehicle, passengers, luggage) {
  const summaryBlock = document.createElement("div");
  summaryBlock.style.marginTop = "40px";
  summaryBlock.style.fontSize = "1.8em";
  summaryBlock.style.fontWeight = "500";
  summaryBlock.style.color = "#fff";
  summaryBlock.style.textAlign = "center";
  summaryBlock.style.backgroundColor = "rgba(0,0,0,0.5)";
  summaryBlock.style.padding = "20px";
  summaryBlock.style.borderRadius = "10px";
  summaryBlock.innerHTML = `
    <div><strong>預約日期：</strong>${date}</div>
    <div><strong>搭乘時間：</strong>${time}</div>
    <div><strong>上車地點：</strong>${pickup}</div>
    <div><strong>下車地點：</strong>${dropoffs.join(" → ")}</div>
    <div><strong>車型：</strong>${vehicle}</div>
    <div><strong>乘車人數：</strong>${passengers} 人</div>
    <div><strong>行李數量：</strong>${luggage} 件</div>
  `;
  document.getElementById("welcomeSection").appendChild(summaryBlock);

  document.querySelectorAll('#welcomeSection button').forEach(btn => {
    btn.style.display = "inline-block";
    btn.style.margin = "10px 15px";
    btn.style.padding = "10px 24px";
    btn.style.fontSize = "1.2em";
    btn.style.borderRadius = "8px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.backgroundColor = (btn.textContent.includes("預約")) ? "#00cc66" : "#999";
    btn.style.color = "#fff";
  });
}

document.getElementById('confirmBtn')?.addEventListener('click', function () {
  const rideDate = document.getElementById('rideDate')?.value;
  const rideTime = document.getElementById('rideTime')?.value;

  if (!rideDate || !rideTime) {
    alert("請先選擇日期與時間！");
    return;
  }

  document.querySelector('.hero')?.style.setProperty("display", "none");
  document.getElementById('normalRideSection')?.style.setProperty("display", "none");
  document.getElementById('finalMap')?.classList.remove('hidden');
});

document.getElementById('calculateBtn')?.addEventListener('click', function () {
  const pickup = document.getElementById('pickup')?.value;
  const dropoffs = Array.from(document.querySelectorAll('input[name=dropoff]'))
                        .map(el => el.value)
                        .filter(Boolean);
  const vehicle = document.getElementById('cartype')?.value;
  const time = document.getElementById('rideTime')?.value;
  const date = document.getElementById('rideDate')?.value;
  const passengers = document.getElementById('passengers')?.value;
  const luggage = document.getElementById('luggage')?.value;

  if (!pickup || dropoffs.length === 0 || !time || !date) {
    alert("請完整填寫上車、下車地址、日期與時間");
    return;
  }

  const directionsService = new google.maps.DirectionsService();
  const waypoints = dropoffs.slice(0, -1).map(location => ({ location, stopover: true }));
  const origin = pickup;
  const destination = dropoffs[dropoffs.length - 1];

  directionsService.route({
    origin,
    destination,
    waypoints,
    travelMode: google.maps.TravelMode.DRIVING
  }, function (response, status) {
    if (status === 'OK') {
      let totalDistance = 0;
      response.routes[0].legs.forEach(leg => {
        totalDistance += leg.distance.value / 1000;
      });

      let baseFare = (totalDistance * 30 + 85) * 1.4;
      const hour = parseInt(time.split(":")[0]);
      if ((hour >= 23 || hour < 6)) baseFare *= 1.2;
      if (vehicle === "五人座" && baseFare < 500) baseFare = 500;
      if (vehicle === "七人座" && baseFare < 800) baseFare = 800;

      document.querySelector('.hero')?.style.setProperty("display", "none");
      document.getElementById('normalRideSection')?.style.setProperty("display", "none");
      document.getElementById('finalMap')?.style.setProperty("display", "none");
      document.getElementById('welcomeSection')?.classList.remove('hidden');

      const fareText = document.getElementById('fareAmount');
      fareText.innerHTML = "<div style='font-size: 0.4em;'>預約報價費用</div>NT$ " + Math.round(baseFare);
      fareText.style.fontSize = "5em";
      fareText.style.color = "#00ffcc";
      fareText.style.fontWeight = "bold";

      showBookingSummary(date, time, pickup, dropoffs, vehicle, passengers, luggage);
    } else {
      alert("Google Maps 無法計算距離，請檢查地址是否正確！");
    }
  });
});