document.addEventListener("DOMContentLoaded", function () {
  console.log("結婚禮車頁面載入");

  // 類型選擇：結婚禮車
  const categoryBtns = document.querySelectorAll(".category-btn");
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.textContent === "結婚禮車") {
        // 顯示結婚禮車的選擇畫面
        const weddingRideSection = document.getElementById("weddingRideSection");
        const normalRideSection = document.getElementById("normalRideSection");

        if (weddingRideSection && normalRideSection) {
          console.log('Before removing hidden:', weddingRideSection.classList);
          weddingRideSection.classList.remove("hidden");
          console.log('After removing hidden:', weddingRideSection.classList);
          normalRideSection.classList.add("hidden");
        }
      }
    });
  });

  // 當結婚日期選擇後，跳轉到下一頁
  const weddingRideDate = document.getElementById("weddingRideDate");
  if (weddingRideDate) {
    weddingRideDate.addEventListener("change", function () {
      const weddingRideSection = document.getElementById("weddingRideSection");
      const finalWeddingMap = document.getElementById("finalWeddingMap");

      if (weddingRideSection && finalWeddingMap) {
        console.log('Before removing hidden from finalWeddingMap:', finalWeddingMap.classList);
        weddingRideSection.style.display = "none";
        finalWeddingMap.classList.remove("hidden");
        console.log('After removing hidden from finalWeddingMap:', finalWeddingMap.classList);
      }
    });
  }

  // 點擊「確認結婚禮車」按鈕後，處理後續動作
  const confirmWeddingBtn = document.getElementById("confirmWeddingBtn");
  if (confirmWeddingBtn) {
    confirmWeddingBtn.addEventListener("click", function () {
      // 可以進行相應的後續處理，跳轉到最終確認或是送出預約等
      alert("您已選擇結婚禮車，請繼續下一步!");
    });
  }
});
