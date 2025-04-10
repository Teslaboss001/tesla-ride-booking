
// 結婚禮車：選擇完結婚日期後，自動跳轉下一步
document.getElementById("weddingDate")?.addEventListener("change", function () {
  const selectedDate = this.value;
  if (selectedDate) {
    document.getElementById("weddingSection").classList.add("hidden");
    document.getElementById("finalMap").classList.remove("hidden");
  }
});
