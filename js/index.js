function Item(nombre, precio, cantidad) {
  this.nombre = nombre;
  this.precio = precio;
  this.cantidad = cantidad;
}

const carrito = [];
let agregarProducto = true;

while (agregarProducto) {
  const nombre = prompt("Por favor ingrese el nombre del producto");
  const precio = parseFloat(prompt("Por favor ingrese el precio del producto"));
  const cantidad = parseInt(prompt("Por favor ingrese la cantidad"));

  const item = new Item(nombre, precio, cantidad);
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
