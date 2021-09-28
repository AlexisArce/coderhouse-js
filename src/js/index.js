import Producto from "./Producto";
import $ from "jquery";

const carrito = [];
const productos = [];

productos.push(new Producto(1, "DONA", 6500));
productos.push(new Producto(2, "PAN", 120.65));
productos.push(new Producto(3, "MEDIA LUNA", 60));
productos.push(new Producto(4, "CHURROS", 75));
productos.push(new Producto(5, "CHIPA", 100));

renderCards(productos, "#cards");

function renderCards(items, id) {
  items.forEach((item) => {
    $(id).append(item.renderCard());
  });
}

$("#cards").on("click", ".btn-agregar", agregar_Click);

function agregar_Click(e) {
  e.preventDefault();
  carrito.push($(this).prop("id"));
  console.log(carrito);
}

/*
let agregarProducto = true;

while (agregarProducto) {
  const nombre = prompt("Por favor ingrese el nombre del producto");
  const precio = parseFloat(prompt("Por favor ingrese el precio del producto"));
  const cantidad = parseInt(prompt("Por favor ingrese la cantidad: "));

  const item = new Producto(nombre, precio, cantidad);
  carrito.push(item);

  agregarProducto = confirm("¿Desea agregar otro producto al carrito?");
}

console.log("Carrito: ");

let total = 0;
carrito.forEach((item) => {
  console.log(`Nombre: ${item.nombre}`);
  console.log(`Precio: ${item.precio}`);
  console.log(`Cantidad: ${item.cantidad}`);
  console.log("-------------------------");

  total += item.precio * item.cantidad;
});

console.log(`Total: $ ${total}`);
*/

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
