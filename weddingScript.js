document.addEventListener("DOMContentLoaded", function () {
  // 當點擊確認按鈕時，檢查結婚日期並顯示地址表單
  document.getElementById("confirmWeddingBtn").addEventListener("click", function () {
    const weddingDate = document.getElementById("weddingRideDate").value;
    if (!weddingDate) {
      alert("請選擇結婚日期！");
      return;
    }

    // 隱藏結婚禮車區塊，顯示地址輸入表單
    document.getElementById("weddingRideSection").style.display = "none";
    document.getElementById("addressFormSection").classList.remove("hidden");
  });

  // 提交地址並顯示計算結果
  document.getElementById("submitAddressBtn").addEventListener("click", function () {
    const pickup = document.getElementById("pickup").value.trim();
    const dropoff1 = document.getElementById("dropoff1").value.trim();
    const dropoff2 = document.getElementById("dropoff2").value.trim();

    if (!pickup || !dropoff1 || !dropoff2) {
      alert("請填寫所有地址欄位！");
      return;
    }

    // 顯示計算結果（這裡假設是顯示路徑、計算結果等）
    alert(`上車地點：${pickup}\n女方家：${dropoff1}\n婚宴館：${dropoff2}`);

    // 你可以在這裡加上 Google Maps API 或其他邏輯來計算路程
  });
});
