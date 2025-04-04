// 預約報價按鈕 → 顯示分類按鈕
document.getElementById('bookBtn')?.addEventListener('click', function () {
  this.style.display = 'none';
  document.getElementById('categoryBtns').style.display = 'flex';
});

// 點擊「一般接送」按鈕 → 顯示一般預約區塊
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    if (this.textContent === '一般接送') {
      document.querySelector('.hero')?.style.setProperty("display", "none");
      document.getElementById('normalRideSection')?.classList.remove('hidden');
    }
  });
});

// 顯示預約摘要與美化按鈕
function showBookingSummary(date, time, pickup, dropoffs, vehicle, passengers, luggage) {
  const summaryBlock = document.createElement("div");
  summaryBlock.style.marginTop = "40px";
  summaryBlock.style.fontSize = "1.8em";
  summaryBlock.style.fontWeight = "500";
  summaryBlock.style.color = "#fff";
  summaryBlock.style.textAlign = "center";
  summaryBlock.style.backgroundColor = "rgba(0,0,0,0.5)";
  summaryBlock.style.padding = "20px";
  summaryBlock.style.borderRadius = "10px";
  summaryBlock.innerHTML = `
    <div><strong>預約日期：</strong>${date}</div>
    <div><strong>搭乘時間：</strong>${time}</div>
    <div><strong>上車地點：</strong>${pickup}</div>
    <div><strong>下車地點：</strong>${dropoffs.join(" → ")}</div>
    <div><strong>車型：</strong>${vehicle}</div>
    <div><strong>乘車人數：</strong>${passengers} 人</div>
    <div><strong>行李數量：</strong>${luggage} 件</div>
  `;
  document.getElementById("welcomeSection").appendChild(summaryBlock);

  document.querySelectorAll('#welcomeSection button').forEach(btn => {
    btn.style.display = "inline-block";
    btn.style.margin = "10px 15px";
    btn.style.padding = "10px 24px";
    btn.style.fontSize = "1.2em";
    btn.style.borderRadius = "8px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.backgroundColor = (btn.textContent.includes("預約")) ? "#00cc66" : "#999";
    btn.style.color = "#fff";
  });
}