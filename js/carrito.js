class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  addToCart({ id, nombre, precio }) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index == -1) {
      this.cart.push({ id, nombre, precio, cantidad: 1 });
    } else {
      this.cart[index].cantidad += 1;
    }
    this.saveCart();
  }

  incrementQuantity(id) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index !== -1) {
      this.cart[index].cantidad += 1;
    }
    this.saveCart();
  }

  decrementQuantity(id) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index !== -1 && this.cart[index].cantidad > 1) {
      this.cart[index].cantidad -= 1;
    }
    this.saveCart();
  }

  removeFromCart(id) {
    const index = this.cart.findIndex((product) => product.id == id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    this.saveCart();
  }

  getProducts() {
    return this.cart;
  }

  getCount() {
    return this.cart.reduce((cantidad, item) => cantidad + item.cantidad, 0);
  }

  getSum() {
    return this.cart.reduce(
      (acumulador, item) => acumulador + item.cantidad * item.precio,
      0
    );
  }
}