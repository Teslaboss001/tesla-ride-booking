document.addEventListener("DOMContentLoaded", function () {
  // 點擊確認結婚日期後才跳轉
  document.getElementById("confirmWeddingBtn").addEventListener("click", function () {
    const weddingDate = document.getElementById("weddingRideDate").value;
    if (!weddingDate) {
      alert("請選擇結婚日期！");
      return;
    }

    // 顯示 wedding_map.png
    document.getElementById("weddingRideSection").style.display = "none";
    document.getElementById("finalWeddingMap").classList.remove("hidden");

    // 顯示地址輸入區塊
    document.getElementById("addressFormSection").classList.remove("hidden");
  });

  // 新增停靠點欄位
  document.getElementById("addStopBtn")?.addEventListener("click", () => {
    const container = document.getElementById("extraStops");
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = "額外停靠點地址";
    newInput.className = "stop-input";
    newInput.style = "display: block; margin-top: 10px; width: 100%;";
    container.appendChild(newInput);
  });

  // 確認迎娶路線並用 Google Maps 規劃路徑
  document.getElementById("submitAddressBtn").addEventListener("click", function () {
    const pickup = document.getElementById("pickup").value.trim();
    const dropoff1 = document.getElementById("dropoff1").value.trim();
    const dropoff2 = document.getElementById("dropoff2").value.trim();
    const dropoff3 = document.getElementById("dropoff3").value.trim();
    const extraStops = Array.from(document.querySelectorAll(".stop-input"))
      .map(el => el.value.trim()).filter(Boolean);

    if (!pickup || !dropoff1 || !dropoff2 || !dropoff3) {
      alert("請填寫所有主要地址欄位！");
      return;
    }

    const allStops = [pickup, dropoff1, dropoff2, dropoff3, ...extraStops];
    const directionsService = new google.maps.DirectionsService();

    directionsService.route({
      origin: allStops[0],
      destination: allStops[allStops.length - 1],
      waypoints: allStops.slice(1, -1).map(loc => ({ location: loc, stopover: true })),
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === "OK") {
        alert("迎娶路線規劃成功！");
        console.log("總路線：", result);
      } else {
        alert("無法規劃路線，請檢查地址！");
      }
    });

    document.getElementById("routeNote").classList.remove("hidden");
  });
});
