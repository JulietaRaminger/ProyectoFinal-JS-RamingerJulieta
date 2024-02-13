const fulImgBox = document.querySelector('#fulImgBox');
const fulImg = document.querySelector('#fulImg');


const openFulImg = (reference) => {
  fulImg.src = reference;
  fulImgBox.style.display = "flex";
};

const closeImg = () => {
  fulImgBox.style.display = 'none';
};

fulImg.addEventListener('click', closeImg); 
document.querySelector('#closeImg').addEventListener('click', closeImg);




