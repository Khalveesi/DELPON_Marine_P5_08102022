//récupère les données depuis l'API
function getProductsFromApi(urlApi) {
  return fetch(`${urlApi}/products`).then(function(response){
    if (response.ok){
      return response.json();
    }
    throw new Error('somethings wrent wrong');
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
  let productLink = document.createElement('a');
  let article = document.createElement('article');
  let img = document.createElement('img');
  let header3 = document.createElement('h3');
  let paragraph = document.createElement('p');
  productLink.href = `./product.html?id=${product._id}`
  img.setAttribute('src', product.imageUrl);
  img.setAttribute('alt', product.altTxt);
  header3.classList.add('productName');
  header3.textContent = product.name;
  paragraph.classList.add('productDescription');
  paragraph.textContent = product.description;
  document.querySelector('#items').appendChild(productLink);
  productLink.appendChild(article);
  article.appendChild(img);
  article.appendChild(header3);
  article.appendChild(paragraph);
}

//montre un message d'erreur si l'API n'est pas disponible
function showError(error){
  let errorMessage = document.createElement('p');
  errorMessage.textContent = "Désolée, le site n'est pas disponible pour le moment. Réessayez plus tard !";
  document.querySelector('#items').appendChild(errorMessage);
}

//point d'entrée du script
function main() {
  let url = "http://localhost:3000/api";
  getProductsFromApi(url)
    .then(showProducts)
    .catch(showError);
}

main();
