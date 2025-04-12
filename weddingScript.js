document.addEventListener("DOMContentLoaded", function () {
  // 结婚礼车确认按钮点击事件
  document.getElementById("confirmWeddingBtn").addEventListener("click", function () {
    const weddingDate = document.getElementById("weddingRideDate").value;
    if (!weddingDate) {
      alert("請選擇結婚日期！");
      return;
    }

    // 隐藏结婚礼车区块，显示最终地图
    document.getElementById("weddingRideSection").style.display = "none";
    document.getElementById("finalWeddingMap").classList.remove("hidden");  // 显示最终地图
    document.getElementById("finalWeddingMap").classList.add("visible");  // 显示并应用平滑过渡
  });

  // 点击确认按钮后，显示地址输入浮层
  document.getElementById("confirmWeddingBtn").addEventListener("click", function () {
    // 隐藏结婚礼车区块
    document.getElementById("weddingRideSection").style.display = "none";

    // 显示地址输入浮层，并应用平滑过渡
    document.getElementById("addressModal").classList.remove("hidden");
    document.getElementById("addressModal").classList.add("visible");
  });

  // 点击取消按钮关闭浮层
  document.getElementById("closeModalBtn").addEventListener("click", function () {
    // 隐藏浮层
    document.getElementById("addressModal").classList.remove("visible");
    document.getElementById("addressModal").classList.add("hidden");
  });
});
