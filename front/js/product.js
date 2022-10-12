function main() {
    const apiUrl = 'http://localhost:3000/api';
    const id = getIdFromUrl();
    getProductFromApi(apiUrl, id).then(showProductDetails).catch(showError);
    let btnAddToCart = document.querySelector('#addToCart');
    btnAddToCart.addEventListener('click', handleAddToCartEvent);
}

main();

//récupère un produit depuis l'API avec l'ID
function getProductFromApi(url, id) {
    return fetch(`${url}/products/${id}`).then(function(response){
      if (response.ok){
        return response.json();
      }
      throw new Error('somethings wrent wrong');
    });
  }

//montre un message d'erreur si l'API n'est pas dispo
function showError(error){
    let itemSection = document.querySelector('.item');
    let errorMessage = document.createElement('p');
    errorMessage.textContent = "Désolée, le site n'est pas disponible pour le moment. Réessayez plus tard !";
    itemSection.replaceChildren(errorMessage);
}

//récupère l'ID du produit dans l'URL
function getIdFromUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
//montre les détails d'un produit
function showProductDetails(details){
   let imgContainer= document.querySelector('.item__img');
   let title = document.querySelector('#title');
   let price = document.querySelector('#price');
   let description = document.querySelector('#description');
   let colorSelect = document.querySelector('#colors');

   let img = document.createElement('img');
   img.setAttribute('src', details.imageUrl);
   img.setAttribute('alt', details.altTxt);
   imgContainer.appendChild(img);

   document.title = details.name;
   title.textContent = details.name;
   price.textContent = details.price;
   description.textContent = details.description;

   for (let color of details.colors){
    let colorOption = document.createElement('option');
    colorOption.value = color.toLowerCase();
    colorOption.textContent = color;
    colorSelect.appendChild(colorOption);
   }
}

//recupère la couleur, l'id et la quantité du produit choisit par l'utilisateur
function handleAddToCartEvent(){
    let id = getIdFromUrl();
    let color = document.querySelector('#colors').value;
    let quantity = parseInt(document.querySelector('#quantity').value);
    if (color != '' && quantity != 0){
        addProductToCart(id, color, quantity);
        addToCartValidationMessage();
    }
}

//créer un panier ou renvoie le panier stocké dans le storage
function getCartStore(){
    const cart = localStorage.getItem('cart');
    if (cart === null){
        return [];
    }
    return JSON.parse(cart);
}

//stock le panier dans le storage
function storeCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
}

//ajoute les données du produit choisit dans le local storage
function addProductToCart(id, color, quantity){
    const newProduct = {id, color, quantity};
    const cart = getCartStore();
    //recherche si le produit exxiste déjà dans le panier
    const index = cart.findIndex(function(product){
        return product.id == newProduct.id && product.color == newProduct.color; //comparaison
    })
    if (index == -1){
        cart.push(newProduct);
    } else {
        cart[index].quantity += quantity;
    }
    storeCart(cart);
}

//affiche un message quand un article à été ajouté au panier
function addToCartValidationMessage(message){
    let popUp = document.createElement('div');
    popUp.textContent = "Votre article à bien été ajouté au panier !";
    popUp.style.position = 'fixed';
    popUp.style.padding = '20px';
    popUp.style.bottom = '20px';
    popUp.style.right = '20px';
    popUp.style.zIndex = '9999';
    popUp.style.backgroundColor = '#51DB6B';
    popUp.style.borderRadius = '20px';
    setTimeout(function (){
        popUp.remove();
    }, 2000)
    document.body.appendChild(popUp);
}