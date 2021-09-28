import numeral from "numeral";

numeral.register("locale", "ar", {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
});

numeral.locale("ar");

class Producto {
  constructor(id, nombre, precio) {
    this.id = parseInt(id);
    this.nombre = nombre;
    this.precio = parseFloat(precio);
  }

  renderCard() {
    let image = `https://picsum.photos/${200 + this.id}`;
    let price = numeral(this.precio).format("0.00");

    return `<div class="card" style="width: 15rem;">                  
              <img src="${image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${this.nombre}</h5>
                <p class="card-text">$ ${price}</p>                    
                <a href="#" id='${this.id}' class="btn btn-primary btn-agregar">Agregar</a>
              </div>
            </div>`;
  }
}

export default Producto;
