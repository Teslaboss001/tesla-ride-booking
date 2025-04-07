document.addEventListener("DOMContentLoaded", function () {
  const bookBtn = document.getElementById("bookBtn");
  const categoryBtns = document.getElementById("categoryBtns");
  const hero = document.querySelector(".hero");

  // 預約報價按鈕
  bookBtn?.addEventListener("click", function () {
    this.style.display = "none";
    categoryBtns.style.display = "flex";
  });

  // 選擇類型
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      hero.style.display = "none";
      if (this.textContent === "一般接送") {
        document.getElementById("normalRideSection").classList.remove("hidden");
      } else if (this.textContent === "結婚禮車") {
        document.getElementById("weddingSection")?.classList.remove("hidden");
      }
    });
  });

  // 確認搭乘日期與時間
  document.getElementById("confirmBtn")?.addEventListener("click", () => {
    const date = document.getElementById("rideDate")?.value;
    const time = document.getElementById("rideTime")?.value;

    if (!date || !time) {
      alert("請先選擇日期與時間！");
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
      <input type="text" name="dropoff" class="dropoff" placeholder="輸入下車地址(必填)" required style="flex: 1; margin-right: 10px;" />
      <button type="button" class="removeStopBtn" style="font-size: 1.2em; background: none; border: none; color: red;">－</button>
    `;
    container.insertBefore(newGroup, container.lastElementChild);
    newGroup.querySelector(".removeStopBtn").addEventListener("click", () => {
      container.removeChild(newGroup);
    });
  });

  // 我要預約／我再考慮按鈕
  document.addEventListener("click", function (e) {
    if (e.target.textContent === "我要預約") {
      const lineURL = "https://line.me/R/ti/p/@teslamarryme";
      window.open(lineURL, "_blank");
    }

    if (e.target.textContent === "我再考慮") {
      alert("尊榮的客戶您好，我們期待下次為您服務。");
      window.open('', '_self'); // 為了 Safari
      window.close();
    }
  });

  // 計算車資
  const calculateBtn = document.getElementById("calculateBtn");
  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
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
        const durationText = `約 ${Math.round(totalDuration / 60)} 分鐘`;
        const hour = parseInt(time.split(":")[0], 10);
        let fare = 85 + (distanceInKm * 30);
        if (hour >= 23 || hour < 6) fare *= 1.2;

        const minFare = carType.includes("七") ? 800 : 500;
        fare = Math.max(fare, minFare);
        fare = Math.round(fare / 10) * 10; // 四捨五入至個位數

        const fareElement = document.getElementById("fare");
        if (fareElement) {
          fareElement.innerHTML = `<strong style="font-size: 2em;">預約報價費用：NT$ ${fare}</strong><br><span style="font-size: 1.2em;">預估距離：${distanceInKm.toFixed(1)} 公里，預估時間：${durationText}</span>`;
        }

        const summaryElement = document.getElementById("summary");
        if (summaryElement) {
          summaryElement.innerHTML = `
            <div style="font-size: 1.5em; margin-top: 20px;">
              <strong>預約資訊總結：</strong><br>
              日期與時間：${date} ${time}<br>
              上車地點：${pickup}<br>
              ${dropoffs.map((d, i) => `下車地點 ${i + 1}：${d}<br>`).join('')}
              車型：${carType}<br>
              乘車人數：${people} 人<br>
              行李數量：${luggage} 件<br>
              距離：${distanceInKm.toFixed(1)} 公里 / 時間：${durationText}<br>
              <strong>預估金額：NT$ ${fare}</strong>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <button style="font-size: 1.2em; padding: 10px 30px; margin: 10px; background-color: #4CAF50; color: white; border: none;">我要預約</button>
              <button style="font-size: 1.2em; padding: 10px 30px; margin: 10px; background-color: #ccc; color: black; border: none;">我再考慮</button>
            </div>
          `;

          summaryElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
  }
}); //
