//récupère les données depuis l'API
function getProductsFromApi(urlApi) {
  return fetch(urlApi).then(function (response) {
    return response.json();
  });
}

//affichage des produits
function showProducts(products) {
  for (const product of products) {
    showProduct(product);
  }
}

//affichage d'un produit
function showProduct(product) {
  let productLink = document.createElement("a");
  productLink.href = `./product.html?id=${product._id}`
  productLink.innerHTML = `
    <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
    </article>
    `;
   document.querySelector('#items').appendChild(productLink);
}

//point d'entrée du script
function main() {
  let url = "http://localhost:3000/api/products";
  getProductsFromApi(url).then(showProducts);
}

main();
