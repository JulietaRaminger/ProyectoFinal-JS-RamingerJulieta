const fulImgBox = document.getElementById('fulImgBox');
const fulImg = document.getElementById('fulImg');

function openFulImg(reference) {
  fulImg.src = reference;
  fulImgBox.style.display = "flex";
}

function closeImg() {
  fulImgBox.style.display = 'none';
}

fulImg.addEventListener('click', closeImg); // Cerrar la imagen si se hace clic en ella
document.getElementById('closeImg').addEventListener('click', closeImg);





