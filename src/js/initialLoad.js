import Product from "./Product";

export function loadProducts() {
  const products = [];

  products.push(new Product(1, "DONA", 6500));
  products.push(new Product(2, "PAN", 120.65));
  products.push(new Product(3, "MEDIA LUNA", 60));
  products.push(new Product(4, "CHURROS", 75));
  products.push(new Product(5, "CHIPA", 100));

  localStorage.setItem("products", JSON.stringify(products));

  renderCards(products, "#cards");
}

export function createCart() {
  localStorage.setItem("cart", JSON.stringify([]));
}

function renderCards(items, id) {
  items.forEach((item) => {
    $(id).append(item.renderCard());
  });
}
