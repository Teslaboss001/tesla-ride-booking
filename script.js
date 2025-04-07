document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  const bookBtn = document.getElementById("bookBtn");
  const categoryBtns = document.getElementById("categoryBtns");

  // 加上這段！處理預約報價按鈕點擊
  bookBtn?.addEventListener("click", function () {
    console.log("預約報價按鈕被點擊");
    this.style.display = "none";
    categoryBtns.style.display = "flex";
  });

  // ...（你原本的 calculateBtn、google maps、fare 計算等都保留）

});
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
          console.error("Google Maps API 回傳錯誤：", status, response);
          alert("無法計算距離，請確認地址正確！（錯誤代碼：" + status + "）");
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
        fare = Math.round(fare / 10) * 10;
        window.latestFare = fare;

        const fareElement = document.getElementById("fare");
        if (fareElement) {
          fareElement.innerHTML = `<strong style="font-size: 2em;">預約報價費用：NT$ ${fare}</strong><br><span style="font-size: 1.2em;">預估距離：${distanceInKm.toFixed(1)} 公里，預估時間：${durationText}</span>`;
        }

        const summaryElement = document.getElementById("summary");
        if (summaryElement) {
          summaryElement.innerHTML = `<div>總結資訊...（略）</div>`;
          summaryElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });
  }
});
