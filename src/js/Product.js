import numeral from "numeral";

class Product {
  constructor(id, name, price, image) {
    this.id = parseInt(id);
    this.name = name;
    this.price = parseFloat(price);
    this.image = image;
  }

  renderCard() {
    let formattedPrice = numeral(this.price).format("0.00");

    return `<div class="card">                  
              <img src="${this.image}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">$ ${formattedPrice}</p>                    
                <a href="#" id='${this.id}' class="btn btn-primary btn-agregar">Agregar</a>
              </div>
            </div>`;
  }
}

export default Product;
