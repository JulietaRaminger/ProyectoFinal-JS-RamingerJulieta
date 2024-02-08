const modal = new bootstrap.Modal("#modalCarrito", {});
const btnCarrito = document.querySelector("#btnCarrito");
const cartCount = document.querySelector("#cartCount");
const cartSum = document.querySelector("#cartSum");
const inputSearch = document.querySelector("#inputSearch");
const listProducts = document.querySelector("#listProducts");
const modalListProducts = document.querySelector("#modalListProducts");
const btnBuy = document.querySelector("#btnBuy");
const btnClose = document.querySelector("#btnClose");
const selectCategory = document.querySelector("#selectCategory");

const listCart = JSON.parse(localStorage.getItem("cart")) || [];
const cart = new Cart(listCart);

let lista_productos = [];

cartCount.innerText = cart.getCount();

btnCarrito.addEventListener("click", function () {
  const list = cart.getProducts();
  renderCart(list);

  cartSum.innerText = cart.getSum();
  modal.show(); //Abro carrito
});

btnBuy.addEventListener("click", () => {
  Swal.fire({
    title: "Compra realizada",
    text: "Muchas gracias 😊",
    icon: "success",
    confirmButtonText: "Aceptar",
  }).then(() => {
    localStorage.removeItem("cart"); // Limpio carrito
    location.reload(); // Recargo pagina
  });
});

btnClose.addEventListener("click", () => {
  modal.hide(); // Cierro carrito
});


inputSearch.addEventListener("input", (event) => {
  const search = event.target.value;
  const newList = lista_productos.filter((product) =>
    product.nombre.toLowerCase().includes(search.toLowerCase()));
  renderProducts(newList);
});


selectCategory.addEventListener("change", (e) => {
  const category = selectCategory.value;
  filtroCategoria(category);
});


const renderCategory = (list) => {
  selectCategory.innerHTML = "";
  list.forEach((categoria) => {
    selectCategory.innerHTML += //html
      `<option value= ${categoria.id_categoria}> ${categoria.name}</option>`;
  });
};

const filtroCategoria = (id_categoria) => {
  const nuevaLista = lista_productos.filter(
    (product) => product.id_categoria.includes(parseInt(id_categoria))
  );
  renderProducts(nuevaLista);
};


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

  const btns = document.querySelectorAll(".btnAddCart");
  btns.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
};

const addToCart = (e) => {
  const id = e.target.id;

  const product = lista_productos.find((item) => item.id == id);

  cart.addToCart(product);
  cartCount.innerText = cart.getCount();

  Toastify({
    text: "Se agrego un producto al carrito",
    duration: 1000,
    close: true,
    style: {
      background: "linear-gradient(to right, #9638ad, #ca7abd)",
    },
  }).showToast();
};

const renderCart = (list) => {
  modalListProducts.innerHTML = "";
  list.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML =
      //html
      `<td>${producto.nombre}</td>
      <td>
        <button class="boton btnDecrement" id="${producto.id}">
          <i class="bx bx-minus"></i>
        </button>
        ${producto.cantidad}
        <button class="boton btnIncrement" id="${producto.id}">
          <i class="bx bx-plus"></i>
        </button>
      </td>
      <td>${producto.precio}</td>
      <td>${producto.precio * producto.cantidad}</td>
      <td>
        <button class="boton btn-danger btnRemoveFromCart" id="${producto.id}">
          <i class="bx bx-x"></i>
        </button>
      </td>`;
    modalListProducts.appendChild(row);
  });

  setupCartEvents();
};

const setupCartEvents = () => {
  document.querySelectorAll(".btnRemoveFromCart").forEach((boton) => {
    boton.addEventListener("click", removeFromCart);
  });

  document.querySelectorAll(".btnIncrement").forEach((btn) => {
    btn.addEventListener("click", () => incrementOrDecrement(btn, "increment"));
  });

  document.querySelectorAll(".btnDecrement").forEach((btn) => {
    btn.addEventListener("click", () => incrementOrDecrement(btn, "decrement"));
  });
};

const removeFromCart = (e) => {
  const id = e.target.getAttribute("id");
  cart.removeFromCart(id);
  updateCart();
};

const incrementOrDecrement = (btn, action) => {
  const id = btn.getAttribute("id");
  if (action === "increment") {
    cart.incrementQuantity(id);
  } else if (action === "decrement") {
    cart.decrementQuantity(id);
  }
  updateCart();
};

const updateCart = () => {
  renderCart(cart.getProducts());
  cartCount.innerText = cart.getCount();
  cartSum.innerText = cart.getSum();
};

setupCartEvents();

const getProducts = async () => {
  try {
    const endPoint = "./data.json";
    const resp = await fetch(endPoint);
    const json = await resp.json();

    const { productos, categoria } = json;
    lista_productos = productos;
    renderProducts(productos);
    renderCategory(categoria);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Ocurrio un error 🫤. Por favor intente más tarde 🙏",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    console.log(error);
  }
};

getProducts();
