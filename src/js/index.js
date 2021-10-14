import { loadProducts, createCart } from "./loadProducts";
import { setNumeral } from "./configNumeral";
import numeral from "numeral";
import $ from "jquery";
import "bootstrap";

setNumeral();
loadProducts();

updateCartButton();

$("#cards").on("click", ".btn-agregar", agregar_Click);
$("#ver-carrito").on("click", verCarrito_Click);
$(".filter").on("click", filter_Click);

function agregar_Click(e) {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("products"));
  const id = parseInt($(this).prop("id"));
  const product = products.find((p) => p.id === id);

  if (product) cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartButton();
}

function updateCartButton() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  $("#ver-carrito")
    .empty()
    .append(
      `<i class="bi bi-cart4"></i> Ver carrito (<strong>${cart.length}</strong>)`
    );
}

function verCarrito_Click(e) {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("products"));
  let total = 0;
  let items = cart.map((i) => {
    total += i.price;
    let formattedPrice = numeral(i.price).format("0.00");
    return `<tr> <th scope="row">
      <img
        class="img-fluid"
        width="30"
        height="30"
        src="${i.image}"
      />
    </th>
    </td><td>${i.name}</td>
    <td style="text-align:right">${formattedPrice}<td></tr>`;
  });

  const $itemsTable = $("#items-table");
  const $btnFinalizarCompra = $("#btnFinalizarCompra");

  if (!items || items.length === 0) {
    $itemsTable
      .find("tfoot")
      .empty()
      .append(`<td></td><td><strong>Carrito vacío :(</strong></td><td></td>`);
    $btnFinalizarCompra.hide();
  } else {
    let formattedTotal = numeral(total).format("0.00");
    $itemsTable.find("tbody").empty().append(items);

    $itemsTable
      .find("tfoot")
      .empty()
      .append(
        `<td></td><td><strong>TOTAL</strong></td><td style="text-align:right"><strong>${formattedTotal} $</strong></td>`
      );
    $btnFinalizarCompra.show();
  }

  $("#carrito-modal").modal("show");
}

function filter_Click(e) {
  e.preventDefault();

  const styles = e.currentTarget.classList;
  const female = "Female";
  const male = "Male";
  const genderless = "Genderless";

  let filter = "";

  if (styles.contains(female)) {
    filter = female;
  } else if (styles.contains(male)) {
    filter = male;
  } else if (styles.contains(genderless)) {
    filter = genderless;
  }

  loadProducts(filter);
}
