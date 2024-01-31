const modal = new bootstrap.Modal("#modalCarrito", {});
const btnCarrito = document.querySelector("#btnCarrito");
const cartCount = document.querySelector("#cartCount");
const cartSum = document.querySelector('#cartSum')
const inputSearch = document.querySelector("#inputSearch");
const listProducts = document.querySelector("#listProducts");
const modalListProducts = document.querySelector("#modalListProducts");
const btnBuy = document.querySelector("#btnBuy");
const btnClose = document.querySelector("#btnClose");
const selectCategory = document.querySelector('#selectCategory');


const listCart = JSON.parse(localStorage.getItem('cart')) || [] ;
const cart = new Cart(listCart);

cartCount.innerText = cart.getCount();


btnCarrito.addEventListener("click", function () {
    const list = cart.getProducts();
     renderCart(list);

     cartSum.innerText = cart.getSum();
  modal.show(); //Abro carrito

});


btnBuy.addEventListener('click', () => {
    Swal.fire({
        title: "Compra realizada",
        text: "Muchas gracias 😃",
        icon: "success"
    }).then(() => {
        localStorage.removeItem('cart'); // Limpio carrito
        location.reload(); // Recargo pagina
    });
});

btnClose.addEventListener("click", () => {
  modal.hide(); // Cierro carrito
});


selectCategory.addEventListener('input', (e) => {
    const category = e.target.value;
    let list;

    if (category === 'productos') {
        list = productos;
    } else {
        list = productos.filter((product) => product.categoria == category);
    }

    renderProducts(list);
});


inputSearch.addEventListener('input', (event) => {
    const search = event.target.value; 
    const newList = productos.filter((product) => product.nombre.toLowerCase().includes(search.toLowerCase()));
    renderProducts(newList);
});



//Cargo mis productos
const renderProducts = (list) => {
  listProducts.innerHTML = "";
  list.forEach((product) => {
    listProducts.innerHTML += //html
      ` <div class="col-lg-3 col-md-4 col-sm-6 col-6 galeria">
    <div class="foto">
    <img src="${product.img}" alt="${product.nombre}">
      <div class="descripcion">
        <h2>${product.nombre}</h2>
        <h3>${product.precio}</h3>
        <button id="${product.id} " type="button" class="btn btnAddCart">
         Agregar
         <i class="bx bx-cart"></i>
        </button>
      </div>
      </div>`;
  });

  const btns = document.querySelectorAll('.btnAddCart');

  btns.forEach(btn =>{
btn.addEventListener('click', addToCart);
});

};

const addToCart = (e) =>{
    const id = e.target.id;
    const product = productos.find (item => item.id == id);
    console.table(product);
    cart.addToCart(product);
    cartCount.innerText = cart.getCount();
}

const renderCart = (list) => {
    modalListProducts.innerHTML = '';
    list.forEach(productos => {
        modalListProducts.innerHTML += //html
        `<tr>
        <td>${productos.nombre}</td>
        <td>${productos.cantidad}</td>
        <td>${productos.precio}</td>
        <td>${productos.precio * productos.cantidad}</td>
        <td>
        <button class="boton btn-danger btnRemoveFromCart" data-id="${productos.id}">
            <i class="bx bx-x"></i>
        </button>
        </td>
    </tr>`
    });


    const btnsRemoveFromCart = document.querySelectorAll('.btnRemoveFromCart');
    btnsRemoveFromCart.forEach(boton => {
        boton.addEventListener('click', removeFromCart);
    });
};

const removeFromCart = (e) => {
    const id = e.target.dataset.id;
    cart.removeFromCart(id);
    renderCart(cart.getProducts());
    cartCount.innerText = cart.getCount();
    cartSum.innerText = cart.getSum();
};




renderProducts(productos);
