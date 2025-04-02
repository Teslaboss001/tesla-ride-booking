
const bookBtn = document.getElementById('bookBtn');
const categoryBtns = document.getElementById('categoryBtns');

bookBtn.addEventListener('click', function() {
  bookBtn.style.display = 'none';
  categoryBtns.style.display = 'block';
});
