document.addEventListener("DOMContentLoaded", function () {
  // Step 1: 預約報價 → 顯示分類按鈕
  const bookBtn = document.getElementById("bookBtn");
  const categoryBtns = document.getElementById("categoryBtns");
  const hero = document.querySelector(".hero");

  bookBtn?.addEventListener("click", function () {
    this.style.display = "none";
    categoryBtns.style.display = "flex";
  });

  // Step 2: 選擇「一般接送」→ 顯示預約表單
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.textContent === "一般接送") {
        hero.style.display = "none";
        document.getElementById("normalRideSection").classList.remove("hidden");
      }
    });
  });

  // Step 3: 確認日期與時間後 → 顯示地圖與表單
  document.getElementById("confirmBtn")?.addEventListener("click", () => {
    const date = document.getElementById("rideDate")?.value;
    const time = document.getElementById("rideTime")?.value;
if (!pickup) {
  alert("請輸入上車地點！");
  return;
}
if (dropoffs.length === 0) {
  alert("請輸入至少一個下車地點！");
  return;
}
if (!date || !time) {
  alert("請選擇日期與時間！");
  return;
}
if (!carType) {
  alert("請選擇車型！");
  return;
}
    

    document.getElementById("normalRideSection").style.display = "none";
    document.getElementById("finalMap").classList.remove("hidden");
  });

  // Step 4: 計算車資
  const calculateBtn = document.getElementById("calculateBtn");

  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
      const pickup = document.getElementById("pickup")?.value.trim();
      const dropoffs = Array.from(document.querySelectorAll(".dropoff")).map(el => el.value.trim()).filter(Boolean);
      const carType = document.getElementById("carType")?.value;
      const people = document.getElementById("people")?.value;
      const luggage = document.getElementById("luggage")?.value;
      const date = document.getElementById("rideDate")?.value;
      const time = document.getElementById("rideTime")?.value;

      if (!pickup || dropoffs.length === 0 || !date || !time || !carType) {
        alert("請完整填寫預約資訊！");
        return;
      }

      let baseFare = carType === "seven" ? 800 : 500;
      const hour = parseInt(time.split(":")[0], 10);
      if ((hour >= 23 && hour <= 24) || (hour >= 0 && hour < 6)) {
        baseFare = Math.round(baseFare * 1.2);
      }

      const fareElement = document.getElementById("fare");
      if (fareElement) {
        fareElement.innerHTML = `<strong style="font-size: 2em;">預約報價費用：NT$ ${baseFare}</strong>`;
      }

      const summaryElement = document.getElementById("summary");
      if (summaryElement) {
        summaryElement.innerHTML = `
          <div style="font-size: 1.5em; margin-top: 20px;">
            <strong>預約資訊總結：</strong><br>
            日期與時間：${date} ${time}<br>
            上車地點：${pickup}<br>
            ${dropoffs.map((d, i) => `下車地點 ${i + 1}：${d}<br>`).join('')}
            車型：${carType === "seven" ? "七人座車型" : "五座轎車型"}<br>
            乘車人數：${people} 人<br>
            行李數量：${luggage} 件
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <button style="font-size: 1.2em; padding: 10px 30px; margin: 10px; background-color: #4CAF50; color: white; border: none;">我要預約</button>
            <button style="font-size: 1.2em; padding: 10px 30px; margin: 10px; background-color: #ccc; color: black; border: none;">我再考慮</button>
          </div>
        `;
      }
    });
  }
});
