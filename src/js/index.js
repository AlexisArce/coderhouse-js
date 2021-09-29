import { loadProducts, createCart } from "./initialLoad";
import $ from "jquery";

loadProducts();
createCart();

const cart = JSON.parse(localStorage.getItem("cart"));
const products = JSON.parse(localStorage.getItem("products"));

$("#cards").on("click", ".btn-agregar", agregar_Click);

function agregar_Click(e) {
  e.preventDefault();

  const id = parseInt($(this).prop("id"));
  const product = products.find((p) => p.id === id);

  if (product) cart.push(product);

  console.log(cart);
}
