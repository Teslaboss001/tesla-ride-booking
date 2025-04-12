document.addEventListener("DOMContentLoaded", function () {
  console.log("結婚禮車頁面載入");

  const confirmWeddingBtn = document.getElementById("confirmWeddingBtn");

  if (confirmWeddingBtn) {
    confirmWeddingBtn.addEventListener("click", function () {
      const weddingDate = document.getElementById("weddingRideDate").value;

      // 檢查日期是否選擇
      if (!weddingDate) {
        alert("請選擇結婚日期！");
        return;
      }

      // 隱藏結婚禮車區塊
      const weddingRideSection = document.getElementById("weddingRideSection");
      if (weddingRideSection) {
        weddingRideSection.style.display = "none";
      }

      // 顯示地址輸入浮出視窗
      const addressModal = document.getElementById("addressModal");
      if (addressModal) {
        addressModal.style.display = "block"; // 顯式設置浮層為顯示狀態
      } else {
        alert("浮出視窗未加載！");
      }
    });
  }

  // 點擊取消按鈕關閉浮出視窗
  const closeModalBtn = document.getElementById("closeModalBtn");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      const addressModal = document.getElementById("addressModal");
      if (addressModal) {
        addressModal.style.display = "none"; // 隱藏浮層
      }
    });
  }
});
