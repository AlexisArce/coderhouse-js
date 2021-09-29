import { loadProducts, createCart } from "./initialLoad";
import { setNumeral } from "./configNumeral";
import numeral from "numeral";

setNumeral();
loadProducts();
createCart();

const cart = JSON.parse(localStorage.getItem("cart"));
const products = JSON.parse(localStorage.getItem("products"));

$("#cards").on("click", ".btn-agregar", agregar_Click);
$("#ver-carrito").on("click", verCarrito_Click);

function agregar_Click(e) {
  e.preventDefault();

  const id = parseInt($(this).prop("id"));
  const product = products.find((p) => p.id === id);

  if (product) cart.push(product);

  $("#ver-carrito")
    .empty()
    .append(
      `<i class="bi bi-cart4"></i> Ver carrito (<strong>${cart.length}</strong>)`
    );
}

function verCarrito_Click(e) {
  e.preventDefault();

  let total = 0;
  let items = cart.map((i) => {
    total += i.price;
    let formattedPrice = numeral(i.price).format("0.00");
    return `<tr><td>${i.name}</td><td style="text-align:right">${formattedPrice}<td></tr>`;
  });

  let formattedTotal = numeral(total).format("0.00");
  $("#items-table")
    .empty()
    .append(items)
    .append(
      `<tfoot><td><strong>TOTAL</strong></td><td>${formattedTotal}</td><tfoot>`
    );

  console.log($("#items-table").html());

  $("#carrito-modal").modal("show");
}
