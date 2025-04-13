document.addEventListener("DOMContentLoaded", function () {
  // 點擊確認結婚日期後才跳轉
  const confirmWeddingBtn = document.getElementById("confirmWeddingBtn");
  if (confirmWeddingBtn) {
    confirmWeddingBtn.addEventListener("click", function () {
      const weddingDate = document.getElementById("weddingRideDate").value;
      if (!weddingDate) {
        alert("請選擇結婚日期！");
        return;
      }

      document.getElementById("weddingRideSection").style.display = "none";
      document.getElementById("finalWeddingMap").classList.remove("hidden");
      document.getElementById("addressFormSection").classList.remove("hidden");
    });
  }

  // 新增停靠點
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "addStopBtn") {
      const container = document.getElementById("extraStops");
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.placeholder = "額外停靠點地址";
      newInput.className = "stop-input";
      newInput.style = "display: block; margin-top: 10px; width: 100%;";
      container.appendChild(newInput);
    }
  });

  // 確認迎娶路線
  const submitBtn = document.getElementById("submitAddressBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const rawStops = [
        document.getElementById("pickup").value.trim(),
        document.getElementById("dropoff1").value.trim(),
        document.getElementById("dropoff2").value.trim(),
        document.getElementById("dropoff3").value.trim(),
        ...Array.from(document.querySelectorAll(".stop-input")).map(el => el.value.trim())
      ];

      const allStops = rawStops.filter(Boolean);
      if (allStops.length < 2) {
        alert("請至少填寫兩個地點以規劃路線");
        return;
      }

      const origin = allStops[0];
      const destination = allStops[allStops.length - 1];
      const waypoints = allStops.slice(1, -1).map(loc => ({ location: loc, stopover: true }));

      const directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === "OK") {
          let totalDistance = 0;
          let totalDuration = 0;
          const legs = result.routes[0].legs;

          legs.forEach(leg => {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
          });

          const km = (totalDistance / 1000).toFixed(1);
          const minutes = Math.round(totalDuration / 60);

          const existing = document.getElementById("routeSummaryBox");
          if (existing) existing.remove();

          const summaryBox = document.createElement("div");
          summaryBox.id = "routeSummaryBox";
          summaryBox.style = "background: #fff; padding: 20px; margin-top: 20px; border-radius: 10px; text-align: center; font-size: 1.2em;";
          summaryBox.innerHTML = `
            <h3>迎娶路線資訊總結</h3>
            <p>總里程：<strong>${km} 公里</strong></p>
            <p>預估行車時間：<strong>${minutes} 分鐘</strong></p>
            <p style="color: red; font-size: 0.9em; margin-top: 10px;">備註：總行程花費時間僅為參考，實際當天流程與行車時間多半稍有延遲。</p>
            <button id="acknowledgeBtn" class="btn" style="margin-top: 15px;">我知道了</button>
            <div id="carSelectionContainer" style="margin-top: 30px;"></div>
          `;

          const formSection = document.getElementById("addressFormSection");
          formSection.insertBefore(summaryBox, formSection.firstChild);

          // 捲動畫面
          setTimeout(() => {
            window.scrollTo({
              top: summaryBox.offsetTop - 20,
              behavior: "smooth"
            });
          }, 200);

          // 綁定我知道了
          setTimeout(() => {
            const ackBtn = document.getElementById("acknowledgeBtn");
            ackBtn?.addEventListener("click", () => {
              const container = document.getElementById("carSelectionContainer");
              container.innerHTML = `
                <img src="marrycar.png" alt="Tesla 結婚車隊" style="width: 100%; max-width: 800px; display: block; margin: 0 auto 30px;" />
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap; text-align: center;">
                  <div>
                    <label>Model 3 數量</label><br>
                    <select>${[...Array(7).keys()].map(i => `<option value="${i}">${i} 輛</option>`).join('')}</select>
                  </div>
                  <div>
                    <label>Model Y 數量</label><br>
                    <select>${[...Array(7).keys()].map(i => `<option value="${i}">${i} 輛</option>`).join('')}</select>
                  </div>
                  <div>
                    <label>Model X 數量</label><br>
                    <select>${[...Array(7).keys()].map(i => `<option value="${i}">${i} 輛</option>`).join('')}</select>
                  </div>
                </div>
              `;
            });
          }, 300);
        } else {
          alert("無法規劃路線，請確認地址是否正確！");
        }
      });

      document.getElementById("routeNote").classList.remove("hidden");
    });
  }
});
