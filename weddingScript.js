// wedding.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("結婚禮車頁面載入");

  // 類型選擇：結婚禮車
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.textContent === "結婚禮車") {
        // 顯示結婚禮車的選擇畫面
        document.getElementById("weddingRideSection").classList.remove("hidden");
        document.getElementById("normalRideSection").classList.add("hidden");
      }
    });
  });

  // 當結婚日期選擇後，跳轉到下一頁
  document.getElementById("weddingRideDate")?.addEventListener("change", function () {
    // 選擇完日期後隱藏結婚禮車選擇頁面，顯示最終確認地圖
    document.getElementById("weddingRideSection").style.display = "none";
    document.getElementById("finalWeddingMap").classList.remove("hidden");
  });

  // 點擊「確認結婚禮車」按鈕後，處理後續動作
  document.getElementById("confirmWeddingBtn")?.addEventListener("click", function () {
    // 可以進行相應的後續處理，跳轉到最終確認或是送出預約等
    alert("您已選擇結婚禮車，請繼續下一步!");
  });
});
