import Product from "./Product";
import fakerStatic from "faker";
import $ from "jquery";

export function loadProducts(filter = "Female") {
  const products = [];
  const url = `https://rickandmortyapi.com/api/character/?gender=${filter}`;

  $.get(url).done((data) => {
    if (data && data.results) {
      data.results.map((item) => {
        products.push(
          new Product(
            item.id,
            item.name,
            fakerStatic.finance.amount(),
            item.image || fakerStatic.image.imageUrl()
          )
        );
      });

      localStorage.setItem("products", JSON.stringify(products));
      renderCards(products, "#cards");
    }
  });
}

function renderCards(items, id) {
  $(id).empty();
  items.forEach((item) => {
    $(id).append(item.renderCard());
  });
}
