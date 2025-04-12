document.addEventListener("DOMContentLoaded", function () {
  console.log("結婚禮車頁面載入");

  const confirmWeddingBtn = document.getElementById("confirmWeddingBtn");

  if (confirmWeddingBtn) {
    confirmWeddingBtn.addEventListener("click", function () {
      const weddingDate = document.getElementById("weddingRideDate").value;

      if (!weddingDate) {
        alert("請選擇結婚日期！");
        return;
      }

      // 隱藏結婚禮車區塊
      document.getElementById("weddingRideSection").style.display = "none";

      // 顯示地址輸入浮出視窗
      const addressModal = document.getElementById("addressModal");
      if (addressModal) {
        addressModal.style.display = "block";  // 顯式設置浮層為顯示狀態
      }
    });
  }

  // 點擊取消按鈕關閉浮出視窗
  document.getElementById("closeModalBtn")?.addEventListener("click", function () {
    const addressModal = document.getElementById("addressModal");
    if (addressModal) {
      addressModal.style.display = "none";  // 隱藏浮層
    }
  });
});
