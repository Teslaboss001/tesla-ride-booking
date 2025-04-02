
document.addEventListener("DOMContentLoaded", () => {
  const bookBtn = document.getElementById("bookBtn");
  const categoryBtns = document.getElementById("categoryBtns");
  const categoryBtnList = document.querySelectorAll(".category-btn");
  const formContainer = document.getElementById("formContainer");

  bookBtn.addEventListener("click", () => {
    categoryBtns.classList.remove("hidden");
  });

  categoryBtnList.forEach(btn => {
    btn.addEventListener("click", () => {
      formContainer.classList.remove("hidden");
    });
  });
});
