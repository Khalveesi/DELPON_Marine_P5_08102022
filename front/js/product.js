function main() {
    const id = getIdFromUrl();
    getProductFromApi(id).then(showProductDetails).catch(showError);
    let btnAddToCart = document.querySelector('#addToCart');
    btnAddToCart.addEventListener('click', handleAddToCartEvent);
}

main();

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
        try {
            addProductToCart(id, color, quantity);
            showPopUpSuccess('Votre article à bien été ajouté au panier !');
        } catch (err){
            showPopUpError(err.message);
        }
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
        if (cart[index].quantity + quantity > 100){
            throw new Error(`Impossible d'ajouter plus de produit dans le panier`)
        }
        cart[index].quantity += quantity;
    }
    storeCart(cart);
}

function showPopUp(message, type){
    let popUp = document.createElement('div');
    popUp.textContent = message;
    popUp.style.position = 'fixed';
    popUp.style.padding = '20px';
    popUp.style.bottom = '20px';
    popUp.style.right = '20px';
    popUp.style.zIndex = '9999';
    popUp.style.backgroundColor =  type === 'success' ? '#51DB6B' : '#D4575A';
    popUp.style.borderRadius = '20px';
    setTimeout(function (){
        popUp.remove();
    }, 2000)
    document.body.appendChild(popUp);
}

//affiche un message de succès
function showPopUpSuccess(message){
    showPopUp(message, "success");
}

//affiche un message d'erreur
function showPopUpError(message){
    showPopUp(message, "error")
}