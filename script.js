function initApp() {
  console.log("Google Maps API 載入成功，initApp 執行");

  document.getElementById("bookBtn")?.addEventListener("click", function () {
    this.style.display = "none";
    document.getElementById("categoryBtns").style.display = "flex";
  });

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".hero").style.display = "none";
      if (this.textContent === "一般接送") {
        document.getElementById("normalRideSection").classList.remove("hidden");
      } else {
        document.getElementById("weddingSection").classList.remove("hidden");
      }
    });
  });

  document.getElementById("confirmBtn")?.addEventListener("click", () => {
    const date = document.getElementById("rideDate").value;
    const time = document.getElementById("rideTime").value;
    if (!date || !time) {
      alert("請選擇日期與時間！");
      return;
    }
    document.getElementById("normalRideSection").style.display = "none";
    document.getElementById("finalMap").classList.remove("hidden");
  });

  document.getElementById("addStopBtn")?.addEventListener("click", () => {
    const container = document.getElementById("dropoffContainer");
    const newGroup = document.createElement("div");
    newGroup.className = "dropoff-group";
    newGroup.style = "display: flex; align-items: center; margin-top: 5px;";
    newGroup.innerHTML = `
      <input type="text" class="dropoff" placeholder="輸入下車地址(必填)" required style="flex: 1; margin-right: 10px;" />
      <button type="button" class="removeStopBtn" style="font-size: 1.2em; background: none; border: none; color: red;">－</button>
    `;
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

      const distanceInKm = totalDistance / 1000;
      const hour = parseInt(time.split(":")[0], 10);
      let fare = 85 + (distanceInKm * 30);
      if (hour >= 23 || hour < 6) fare *= 1.2;
      const minFare = carType.includes("七") ? 800 : 500;
      fare = Math.max(fare, minFare);
      fare = Math.round(fare / 10) * 10;

      // 建立浮層遮罩與彈窗
      const modal = document.createElement("div");
      modal.style = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.6); display: flex;
        justify-content: center; align-items: center; z-index: 9999;
      `;
      const popup = document.createElement("div");
      popup.style = `
        background: white; padding: 30px; border-radius: 12px; max-width: 500px; width: 90%;
        text-align: center; font-size: 1.2em;
      `;
      popup.innerHTML = `
        <h2>預約資訊總結</h2>
        <p>日期時間：${date} ${time}</p>
        <p>上車地點：${pickup}</p>
        ${dropoffs.map((d, i) => `<p>下車地點 ${i + 1}：${d}</p>`).join("")}
        <p>車型：${carType}｜人數：${people}｜行李：${luggage}</p>
        <p style="font-weight: bold; color: #27AC00;">報價：NT$ ${fare}</p>
        <p style="color: red; font-weight: bold;">請截圖預約資訊並傳送</p>
        <button id="screenshotDone" class="btn" style="margin-top: 20px;">已截圖</button>
      `;
      modal.appendChild(popup);
      document.body.appendChild(modal);

      document.getElementById("screenshotDone")?.addEventListener("click", () => {
        window.open("https://line.me/R/ti/p/@teslamarryme", "_blank");
        modal.remove();
      });
    });
  });
}
