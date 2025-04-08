document.addEventListener("DOMContentLoaded", function () {
  console.log("頁面已完全載入");

  const bookBtn = document.getElementById("bookBtn");
  const categoryBtns = document.getElementById("categoryBtns");

  // 預約報價按鈕
  bookBtn?.addEventListener("click", function () {
    this.style.display = "none";
    categoryBtns.style.display = "flex";
  });

  // 選擇類型
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

  // 確認搭乘時間
  document.getElementById("confirmBtn")?.addEventListener("click", () => {
    const date = document.getElementById("rideDate")?.value;
    const time = document.getElementById("rideTime")?.value;
    if (!date || !time) {
      alert("請選擇日期與時間！");
      return;
    }
    document.getElementById("normalRideSection").style.display = "none";
    document.getElementById("finalMap").classList.remove("hidden");
  });

  // 新增停靠點
  document.getElementById("addStopBtn")?.addEventListener("click", () => {
    const container = document.getElementById("dropoffContainer");
    const newGroup = document.createElement("div");
    newGroup.className = "dropoff-group";
    newGroup.style = "display: flex; align-items: center; margin-top: 5px;";
    newGroup.innerHTML = `
      <input type="text" class="dropoff" placeholder="輸入下車地址(必填)" required style="flex: 1; margin-right: 10px;" />
      <button type="button" class="removeStopBtn" style="font-size: 1.2em; background: none; border: none; color: red;">－</button>`;
    container.insertBefore(newGroup, container.lastElementChild);
    newGroup.querySelector(".removeStopBtn").addEventListener("click", () => {
      container.removeChild(newGroup);
    });
  });

  // 綁定計算車資按鈕（正常方式）
  const calculateBtn = document.getElementById("calculateBtn");
  calculateBtn?.addEventListener("click", () => {
    console.log("計算車資按鈕被點擊");

    const pickup = document.getElementById("pickup")?.value.trim();
    const dropoffs = Array.from(document.querySelectorAll(".dropoff")).map(el => el.value.trim()).filter(Boolean);
    const carType = document.getElementById("cartype")?.value;
    const people = document.getElementById("passengers")?.value;
    const luggage = document.getElementById("luggage")?.value;
    const date = document.getElementById("rideDate")?.value;
    const time = document.getElementById("rideTime")?.value;

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
      let totalDuration = 0;
      response.rows[0].elements.forEach(el => {
        if (el.status === "OK") {
          totalDistance += el.distance.value;
          totalDuration += el.duration.value;
        }
      });

      const distanceInKm = totalDistance / 1000;
      const hour = parseInt(time.split(":")[0], 10);
      let fare = 85 + distanceInKm * 30;
      if (hour >= 23 || hour < 6) fare *= 1.2;
      const minFare = carType.includes("七") ? 800 : 500;
      fare = Math.max(fare, minFare);
      fare = Math.round(fare / 10) * 10;
      window.latestFare = fare;

      document.getElementById("fare").innerHTML =
        `<strong style="font-size: 2em;">預約報價費用：NT$ ${fare}</strong><br>
         <span style="font-size: 1.2em;">距離 ${distanceInKm.toFixed(1)} 公里</span>`;

      document.getElementById("summary").innerHTML = `
        <div style="font-size: 1.3em;">
          日期時間：${date} ${time}<br>
          上車地點：${pickup}<br>
          ${dropoffs.map((d, i) => `下車地點 ${i + 1}：${d}`).join("<br>")}<br>
          車型：${carType}｜人數：${people}｜行李：${luggage}<br>
          <strong>報價：NT$ ${fare}</strong>
        </div>
        <div style="margin-top: 20px;">
          <button class="btn" id="confirmBtnGo">我要預約</button>
          <button class="btn" onclick="window.close()">我再考慮</button>
        </div>`;

      document.getElementById("summary").scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        document.getElementById("confirmBtnGo")?.addEventListener("click", async () => {
          const res = await fetch("https://teslamarryme.vercel.app/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, time, pickup, dropoffs, carType, people, luggage, fare })
          });
          if (res.ok) {
            window.open("https://line.me/R/ti/p/@529umkeu", "_blank");
          } else {
            alert("預約傳送失敗！");
          }
        });
      }, 100);
    });
  });
});
