import { loadProducts, createCart } from "./loadProducts";
import { setNumeral } from "./configNumeral";
import numeral from "numeral";
import $ from "jquery";
import "bootstrap";
import Swal from "sweetalert2";

$(function () {
  setNumeral();
  loadProducts();
  updateCartButton();

  $("#cards").on("click", ".btn-agregar", agregar_Click);
  $("#ver-carrito").on("click", verCarrito_Click);
  $(".filter").on("click", filter_Click);
  $(".table").on("click", ".deleteProduct", eliminar_Click);
  $("#btnFinalizarCompra").on("click", finalizarCompra_Click);
});

function agregar_Click(e) {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const id = parseInt($(this).prop("id"));
  const product = products.find((p) => p.id === id);

  if (product) cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartButton();

  $("#productAddedToast").toast("show");
}

function verCarrito_Click(e) {
  e.preventDefault();
  renderCart();
}

function filter_Click(e) {
  e.preventDefault();
  let filter = $(this).data("filter");
  loadProducts(filter);
}

function eliminar_Click(e) {
  e.preventDefault();
  const id = $(this).data("id");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const currentCart = cart.filter((p) => p.id != id);

  localStorage.setItem("cart", JSON.stringify(currentCart));
  renderCart();
  updateCartButton();
  $(".tooltip").hide();
}

function finalizarCompra_Click(e) {
  e.preventDefault();
  localStorage.setItem("cart", JSON.stringify([]));
  renderCart();
  updateCartButton();
  $("#carrito-modal").modal("hide");
  Swal.fire("Compra exitosa", "Muchas gracias! vuelva prontoss", "success");
}

function updateCartButton() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  $("#ver-carrito")
    .empty()
    .append(
      `<i class="bi bi-cart4"></i> Ver carrito (<strong>${cart.length}</strong>)`
    );
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const $btnFinalizarCompra = $("#btnFinalizarCompra");
  const $itemsTable = $("#items-table");
  const $carritoModal = $("#carrito-modal");

  if (cart && cart.length === 0) {
    $itemsTable.find("tbody").empty();
    $itemsTable
      .find("tfoot")
      .empty()
      .append(
        `<td></td><td><strong>Carrito vacío :(</strong></td><td></td><td></td>`
      );

    $btnFinalizarCompra.hide();
    $carritoModal.modal("show");
    return;
  }

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
      <td>${formattedPrice}<td>
      <td><a href="#" data-id=${i.id} style="color:white;" class="deleteProduct" data-toggle="tooltip" data-placement="right" title="Eliminar producto">
         <i class="bi bi-trash"></i>
          </a>
      </td>
    </tr>`;
  });

  let formattedTotal = numeral(total).format("0.00");
  $itemsTable.find("tbody").empty().append(items);

  $itemsTable
    .find("tfoot")
    .empty()
    .append(
      `<td></td><td></td><td><strong>TOTAL</strong></td><td style="text-align:right"><strong>${formattedTotal} $</strong></td>`
    );
  $btnFinalizarCompra.show();

  $('[data-toggle="tooltip"]').tooltip();
  $carritoModal.modal("show");
}
