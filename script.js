function initApp() {
  const bookBtn = document.getElementById("bookBtn");
  const categoryBtns = document.getElementById("categoryBtns");

  bookBtn?.addEventListener("click", function () {
    this.style.display = "none";
    categoryBtns.style.display = "flex";
  });

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".hero").style.display = "none";
      if (this.textContent.includes("一般")) {
        document.getElementById("normalRideSection").classList.remove("hidden");
      } else {
        document.getElementById("weddingSection").classList.remove("hidden");
      }
    });
  });

  document.getElementById("confirmBtn")?.addEventListener("click", () => {
    const date = document.getElementById("rideDate").value;
    const time = document.getElementById("rideTime").value;
    if (!date || !time) return alert("請選擇日期與時間！");
    document.getElementById("normalRideSection").classList.add("hidden");
    document.getElementById("finalMap").classList.remove("hidden");
  });

  document.getElementById("addStopBtn")?.addEventListener("click", () => {
    const container = document.getElementById("dropoffContainer");
    const newGroup = document.createElement("div");
    newGroup.className = "dropoff-group";
    newGroup.innerHTML = `
      <input type="text" class="dropoff" placeholder="輸入下車地址(必填)" required />
      <button type="button" class="removeStopBtn">－</button>`;
    container.insertBefore(newGroup, container.lastElementChild);
    newGroup.querySelector(".removeStopBtn").addEventListener("click", () => {
      container.removeChild(newGroup);
    });
  });

  document.getElementById("calculateBtn")?.addEventListener("click", () => {
    const pickup = document.getElementById("pickup").value.trim();
    const dropoffs = Array.from(document.querySelectorAll(".dropoff")).map(el => el.value.trim()).filter(Boolean);
    const carType = document.getElementById("cartype").value;
    const people = document.getElementById("passengers").value;
    const luggage = document.getElementById("luggage").value;
    const date = document.getElementById("rideDate").value;
    const time = document.getElementById("rideTime").value;

    if (!pickup || dropoffs.length === 0 || !date || !time || !carType) {
      alert("請完整填寫所有欄位！");
      return;
    }

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [pickup],
      destinations: dropoffs,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }, function (response, status) {
      if (status !== "OK") {
        alert("無法計算距離，請確認地址正確！");
        return;
      }

      let totalDistance = 0;
      response.rows[0].elements.forEach(el => {
        if (el.status === "OK") totalDistance += el.distance.value;
      });

      const km = totalDistance / 1000;
      const hour = parseInt(time.split(":")[0], 10);
      let fare = 85 + km * 30;
      if (hour >= 23 || hour < 6) fare *= 1.2;
      fare = Math.max(fare, carType.includes("七") ? 800 : 500);
      fare = Math.round(fare / 10) * 10;
      window.latestFare = fare;

      document.getElementById("fare").innerHTML = `費用：NT$ ${fare}<br>距離：約 ${km.toFixed(1)} 公里`;

      document.getElementById("summary").innerHTML = `
        <div>預約時間：${date} ${time}</div>
        <div>上車地點：${pickup}</div>
        ${dropoffs.map((d, i) => `<div>下車地點 ${i+1}：${d}</div>`).join("")}
        <div>車型：${carType}｜人數：${people}｜行李：${luggage}</div>
        <strong>總價：NT$ ${fare}</strong>`;
    });
  });
}
