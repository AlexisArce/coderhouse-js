import numeral from "numeral";

numeral.register("locale", "ar", {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
});

numeral.locale("ar");

class Product {
  constructor(id, name, price) {
    this.id = parseInt(id);
    this.name = name;
    this.price = parseFloat(price);
  }

  renderCard() {
    let randomImage = `https://picsum.photos/${200 + this.id}`;
    let formattedPrice = numeral(this.price).format("0.00");

    return `<div class="card" style="width: 15rem;">                  
              <img src="${randomImage}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">$ ${formattedPrice}</p>                    
                <a href="#" id='${this.id}' class="btn btn-primary btn-agregar">Agregar</a>
              </div>
            </div>`;
  }
}

export default Product;
