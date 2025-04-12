document.addEventListener("DOMContentLoaded", function () {
  const confirmWeddingBtn = document.getElementById("confirmWeddingBtn");

  if (confirmWeddingBtn) {
    confirmWeddingBtn.addEventListener("click", function () {
      const weddingDate = document.getElementById("weddingRideDate").value;

      // 確保選擇結婚日期
      if (!weddingDate) {
        alert("請選擇結婚日期！");
        return;
      }

      // 隱藏結婚禮車區塊
      document.getElementById("weddingRideSection").style.display = "none";

      // 顯示地址輸入浮出視窗
      const addressModal = document.getElementById("addressModal");
      addressModal.classList.remove("hidden");
      addressModal.style.display = "block"; // 顯示浮層
    });
  }

  // 點擊取消按鈕關閉浮層
  document.getElementById("closeModalBtn").addEventListener("click", function () {
    const addressModal = document.getElementById("addressModal");
    addressModal.classList.add("hidden");
    addressModal.style.display = "none"; // 隱藏浮層
  });
});
