function main() {
    const id = getIdFromUrl();
    getProductFromApi(id).then(showProductDetails)
    let btnAddToCart = document.querySelector('#addToCart');
    btnAddToCart.addEventListener('click', handleAddToCartEvent)
}

main();

//récupère l'ID du produit dans l'URL
function getIdFromUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

//récupère un produit depuis l'API avec l'ID

function getProductFromApi(id){
    return fetch(`http://localhost:3000/api/products/${id}`).then(function(response){
        return response.json();
    });
}

//montre les détails d'un produit

function showProductDetails(details){
   let img = document.querySelector('.item__img');
   let title = document.querySelector('#title');
   let price = document.querySelector('#price');
   let description = document.querySelector('#description');
   let colorSelect = document.querySelector('#colors');

   document.title = details.name;
   img.innerHTML = `<img src="${details.imageUrl}" alt="${details.altTxt}">`;
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