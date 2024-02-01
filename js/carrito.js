class Cart {
  constructor(list = []) {
    this.cart = list;
  }

  addToCart({ id, nombre, precio }) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index == -1) {
      this.cart.push({ id, nombre, precio, cantidad: 1 });
    } else {
      this.cart[index].cantidad += 1;
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  incrementQuantity(id) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index !== -1) {
      this.cart[index].cantidad += 1;
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  decrementQuantity(id) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index !== -1 && this.cart[index].cantidad > 1) {
      this.cart[index].cantidad -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  //Eliminar productos en el carrito
  removeFromCart(id) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getProducts() {
    return this.cart;
  }

  getCount() {
    return this.cart.reduce((cantidad, item) => 
     cantidad + item.cantidad, 0);
  }

  getSum() {
    return this.cart.reduce((acumulador, item) =>  acumulador + item.cantidad * item.precio, 0);
  }
}
