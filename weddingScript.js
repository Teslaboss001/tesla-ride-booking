document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("confirmWeddingBtn").addEventListener("click", function () {
    const weddingDate = document.getElementById("weddingRideDate").value;
    if (!weddingDate) {
      alert("請選擇結婚日期！");
      return;
    }

    // 隱藏結婚禮車區塊
    document.getElementById("weddingRideSection").style.display = "none";

    // 顯示最終地圖
    document.getElementById("finalWeddingMap").classList.remove("hidden");  // 顯示最終地圖
    document.getElementById("finalWeddingMap").style.display = "block";  // 設置顯示

    // 顯示地址輸入浮出視窗
    document.getElementById("addressModal").classList.remove("hidden");  // 顯示浮層
    document.getElementById("addressModal").style.display = "flex";  // 設定顯示
  });

  // 點擊取消按鈕關閉浮出視窗
  document.getElementById("closeModalBtn").addEventListener("click", function () {
    document.getElementById("addressModal").style.display = "none";  // 隱藏浮層
  });
});
