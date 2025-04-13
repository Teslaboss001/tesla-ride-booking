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
          result.routes[0].legs.forEach(leg => {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
          });

          const km = (totalDistance / 1000).toFixed(1);
          const minutes = Math.round(totalDuration / 60);

          const formSection = document.getElementById("addressFormSection");
          const existing = document.getElementById("routeSummaryBox");
          if (existing) existing.remove();

          const summaryBox = document.createElement("div");
          summaryBox.id = "routeSummaryBox";
          summaryBox.style = "background: #fff; padding: 20px; margin-top: 20px; border-radius: 10px; text-align: center; font-size: 1.2em;";
          summaryBox.innerHTML = `
            <h3>迎娶路線資訊總結</h3>
            <p>總里程：<strong>${km} 公里</strong></p>
            <p>預估行車時間：<strong>${minutes} 分鐘</strong></p>
            <p style="color: red;">備註：總行程花費時間僅為參考，實際當天流程與行車時間多半稍有延遲。</p>
            <button id="acknowledgeBtn" class="btn" style="margin-top: 15px;">我知道了</button>
            <div id="carSelectionContainer" style="margin-top: 30px;"></div>
          `;
          formSection.insertBefore(summaryBox, formSection.firstChild);
          window.scrollTo({ top: summaryBox.offsetTop - 20, behavior: "smooth" });

          setTimeout(() => {
            document.getElementById("acknowledgeBtn").addEventListener("click", () => {
              const container = document.getElementById("carSelectionContainer");
              container.innerHTML = `
                <img src="marrycar.png" alt="Tesla 結婚車隊" style="width: 100%; max-width: 800px; display: block; margin: 0 auto 30px;" />
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap; text-align: center;">
                  <div>
                    <label>Model 3 數量</label><br>
                    <select id="model3Qty" style="font-size: 1.5em;">
                      ${[...Array(7).keys()].map(i => `<option value="${i}">${i} 輛</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label>Model Y 數量</label><br>
                    <select id="modelYQty" style="font-size: 1.5em;">
                      ${[...Array(7).keys()].map(i => `<option value="${i}">${i} 輛</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label>Model X 數量</label><br>
                    <select id="modelXQty" style="font-size: 1.5em;">
                      ${[...Array(7).keys()].map(i => `<option value="${i}">${i} 輛</option>`).join('')}
                    </select>
                  </div>
                </div>
                <div style="text-align:center; margin-top:20px;">
                  <label>是否需要捆綁甘蔗 / 儀式物品？</label>
                  <select id="bundleOption" style="font-size: 1.2em;">
                    <option value="0">否</option>
                    <option value="1000">是 (+1000)</option>
                  </select>
                </div>
                <button id="calculateTotal" class="btn" style="margin-top: 30px;">結算費用</button>
                <div id="totalCostDisplay" style="margin-top: 30px; font-size: 1.2em; color: darkgreen;"></div>
              `;

              document.getElementById("calculateTotal").addEventListener("click", () => {
                const m3 = parseInt(document.getElementById("model3Qty").value);
                const mY = parseInt(document.getElementById("modelYQty").value);
                const mX = parseInt(document.getElementById("modelXQty").value);
                const bundle = parseInt(document.getElementById("bundleOption").value);

                let total = 0;
                let comboName = "";
                if (m3 === 2 && mX === 1 && mY === 0) {
                  total = 16800;
                  comboName = "【組合價】Model 3 × 2 + Model X × 1";
                } else if (m3 === 5 && mX === 1 && mY === 0) {
                  total = 28888;
                  comboName = "【組合價】Model 3 × 5 + Model X × 1";
                } else if (mX === 3 && m3 === 0 && mY === 0) {
                  total = 20688;
                  comboName = "【組合價】Model X × 3";
                } else if (mX === 6 && m3 === 0 && mY === 0) {
                  total = 38888;
                  comboName = "【組合價】Model X × 6";
                } else {
                  total = m3 * 5000 + mY * 6000 + mX * 8000;
                }

                if (bundle > 0) total += bundle;

                const weddingDate = document.getElementById("weddingRideDate").value;
                const pickup = document.getElementById("pickup").value.trim();
                const dropoff1 = document.getElementById("dropoff1").value.trim();
                const dropoff2 = document.getElementById("dropoff2").value.trim();
                const dropoff3 = document.getElementById("dropoff3").value.trim();

                let modelList = "";
                if (m3 > 0) modelList += `<li>Model 3：${m3} 輛</li>`;
                if (mY > 0) modelList += `<li>Model Y：${mY} 輛</li>`;
                if (mX > 0) modelList += `<li>Model X：${mX} 輛</li>`;

                document.getElementById("totalCostDisplay").innerHTML = `
                  <div style="border: 2px solid #ccc; padding: 20px; background: #fff0f5; border-radius: 10px; text-align: left; position: relative;">
                    <img src="0322_nobg_4x.png" style="position: absolute; top: 15px; right: 15px; height: 160px;" />
                    <h3 style="color: #d63384; text-align: center; font-size: 1.6em;">TeslaMarryMe 線上報價單</h3>
                    <p><strong>結婚日期：</strong>${weddingDate}</p>
                    <p><strong>地址行程：</strong>${pickup} → ${dropoff1} → ${dropoff2} → ${dropoff3}</p>
                    <p><strong>預估行車時間：</strong>${minutes} 分鐘</p>
                    <ul style="padding-left: 20px; font-size: 1.1em;">${modelList}</ul>
                    <p><strong>儀式物品捆綁：</strong>${bundle > 0 ? "是（+1000元）" : "否"}</p>
                    ${comboName ? `<p style="color: green; font-weight: bold;">${comboName}</p>` : ""}
                    <p style="font-size: 1.3em; color: darkgreen; font-weight: bold;">
                      總費用：NT$ ${total.toLocaleString()}
                    </p>
                    <button onclick="downloadQuote()" style="margin-top: 20px; font-size: 1em;" class="btn">
                      儲存這張報價單圖片
                    </button>
                  </div>
                `;
              });
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

// 一鍵下載圖片
function downloadQuote() {
  const target = document.querySelector("#totalCostDisplay > div");
  if (!target) {
    alert("無法找到報價單內容！");
    return;
  }

  html2canvas(target).then(canvas => {
    const link = document.createElement("a");
    link.download = "Tesla報價單.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
