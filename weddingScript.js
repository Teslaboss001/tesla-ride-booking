document.addEventListener("DOMContentLoaded", function () {
  console.log("結婚禮車頁面載入");

  // 類型選擇：結婚禮車
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log("選擇了結婚禮車");
      if (this.textContent === "結婚禮車") {
        // 顯示結婚禮車的選擇畫面
        const weddingRideSection = document.getElementById("weddingRideSection");
        const normalRideSection = document.getElementById("normalRideSection");

        if (weddingRideSection && normalRideSection) {
          // 移除 hidden 類別
          weddingRideSection.classList.remove("hidden");
          normalRideSection.classList.add("hidden");
        }
      }
    });
  });

  // 點擊“確認”按鈕後顯示浮出視窗
  const confirmWeddingBtn = document.getElementById("confirmWeddingBtn");
  if (confirmWeddingBtn) {
    confirmWeddingBtn.addEventListener("click", function () {
      const weddingDate = document.getElementById("weddingRideDate").value;
      console.log("確認按鈕被點擊，結婚日期為：", weddingDate);

      if (!weddingDate) {
        alert("請選擇結婚日期！");
        return;
      }

      // 隱藏結婚禮車區塊
      const weddingRideSection = document.getElementById("weddingRideSection");
      if (weddingRideSection) {
        weddingRideSection.style.display = "none";
        console.log("結婚禮車區塊已隱藏");
      }

      // 顯示地址輸入浮出視窗
      const addressModal = document.getElementById("addressModal");
      if (addressModal) {
        addressModal.classList.remove("hidden");
        console.log("地址浮出視窗顯示");
      }
    });
  }

  // 設置停靠點邏輯
  document.getElementById("addStopBtn").addEventListener("click", function () {
    const dropoffContainer = document.getElementById("dropoffContainer");
    const newGroup = document.createElement("div");
    newGroup.className = "dropoff-group";
    newGroup.style = "display: flex; align-items: center; margin-top: 5px;";
    newGroup.innerHTML = `
      <input type="text" class="dropoff" placeholder="輸入停靠點地址" style="flex: 1; margin-right: 10px;" />
      <button type="button" class="removeStopBtn" style="font-size: 1.2em; background: none; border: none; color: red;">－</button>
    `;
    dropoffContainer.appendChild(newGroup);

    // 事件綁定刪除停靠點
    newGroup.querySelector(".removeStopBtn").addEventListener("click", () => {
      dropoffContainer.removeChild(newGroup);
    });
  });

  // 提交地址並計算路徑
  document.getElementById("submitAddressBtn").addEventListener("click", function () {
    const pickup = document.getElementById("pickup").value.trim();
    const dropoff1 = document.getElementById("dropoff1").value.trim();
    const dropoff2 = document.getElementById("dropoff2").value.trim();

    if (!pickup || !dropoff1 || !dropoff2) {
      alert("請填寫所有地址欄位！");
      return;
    }

    // 顯示最終地圖區塊
    const addressModal = document.getElementById("addressModal");
    if (addressModal) {
      addressModal.classList.add("hidden");
      console.log("地址浮出視窗已隱藏");
    }
    const finalWeddingMap = document.getElementById("finalWeddingMap");
    if (finalWeddingMap) {
      finalWeddingMap.classList.remove("hidden");
      console.log("最終地圖顯示");
    }

    // 使用 Google API 計算路徑時間
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [pickup],
      destinations: [dropoff1, dropoff2],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC
    }, function (response, status) {
      if (status === "OK") {
        let totalDistance = 0;
        response.rows[0].elements.forEach(el => {
          if (el.status === "OK") totalDistance += el.distance.value;
        });
        const distanceInKm = totalDistance / 1000;
        alert(`總路程距離：${distanceInKm.toFixed(1)} 公里`);
      } else {
        alert("無法計算路徑，請檢查地址是否正確！");
      }
    });
  });

  // 點擊取消按鈕
  document.getElementById("closeModalBtn").addEventListener("click", function () {
    const addressModal = document.getElementById("addressModal");
    if (addressModal) {
      addressModal.classList.add("hidden");
      console.log("地址浮出視窗已關閉");
    }
  });
});
