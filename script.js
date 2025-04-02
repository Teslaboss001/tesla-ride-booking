
document.getElementById("startButton").addEventListener("click", () => {
  const form = document.createElement("div");
  form.innerHTML = `
    <p>這裡可以放表單選項</p>
  `;
  document.getElementById("formContainer").appendChild(form);
  document.getElementById("startButton").style.display = "none";
});
