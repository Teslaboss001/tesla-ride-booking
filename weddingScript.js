document.addEventListener("DOMContentLoaded", function () {
  // 點擊確認結婚日期後才跳轉
  document.getElementById("confirmWeddingBtn").addEventListener("click", function () {
    const weddingDate = document.getElementById("weddingRideDate").value;
    if (!weddingDate) {
      alert("請選擇結婚日期！");
      return;
    }
    document.getElementById("weddingRideSection").style.display = "none";
    document.getElementById("finalWeddingMap").classList.remove("hidden");
    document.getElementById("addressFormSection").classList.remove("hidden");
  });

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
  document.getElementById("submitAddressBtn").addEventListener("click", function () {
    const pickup = document.getElementById("pickup").value.trim();
    const dropoff1 = document.getElementById("dropoff1").value.trim();
    const dropoff2 = document.getElementById("dropoff2").value.trim();
    const dropoff3 = document.getElementById("dropoff3").value.trim();
    const extraStops = Array.from(document.querySelectorAll(".stop-input"))
      .map(el => el.value.trim()).filter(Boolean);

    const allStops = [pickup, dropoff1, dropoff2, dropoff3, ...extraStops].filter(Boolean);
    if (allStops.length < 2) {
      alert("請至少填寫兩個地點以規劃路線");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: allStops[0],
      destination: allStops[allStops.length - 1],
      waypoints: allStops.slice(1, -1).map(loc => ({ location: loc, stopover: true })),
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

        const summaryBox = document.createElement("div");
        summaryBox.style = "background: #fff; padding: 20px; margin-top: 20px; border-radius: 10px; text-align: center; font-size: 1.2em;";
        summaryBox.innerHTML = `
          <h3>迎娶路線資訊總結</h3>
          <p>總里程：<strong>${km} 公里</strong></p>
          <p>預估行車時間：<strong>${minutes} 分鐘</strong></p>
          <p style="color: red; font-size: 0.9em; margin-top: 10px;">備註：總行程花費時間僅為參考，實際當天流程與行車時間多半稍有延遲。</p>
        `;

        document.getElementById("addressFormSection").appendChild(summaryBox);
      } else {
        alert("無法規劃路線，請確認地址是否正確！");
      }
    });

    document.getElementById("routeNote").classList.remove("hidden");
  });
});
