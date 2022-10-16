function main(){
   const products = getProductsFromLocalStorage();
   for (let cartProduct of products){
        getProductFromApi(cartProduct.id).then(function (product){
            showProductInCart(product, cartProduct.color, cartProduct.quantity);
            addToTotalPrice(product.price*cartProduct.quantity);
            addTotalQuantity(cartProduct.quantity);
        });
   }
}

main();

//recupère les produits de l'API depuis l'ID
function getProductFromApi(id){
    return fetch(`http://localhost:3000/api/products/${id}`).then(function(response){
        return response.json();
    });
}

//recupère les données des articles dans le local Storage
function getProductsFromLocalStorage(){
    const cart = localStorage.getItem('cart');
    if (cart === null){
        return [];
    }
    return JSON.parse(cart);
}

//ajoute une valeur à la quantité total des articles dans le panier 
function addTotalQuantity(quantity){
    let totalQuantity = document.querySelector('#totalQuantity');
    let totalQuantityNumber = parseInt(totalQuantity.textContent) || 0;
    totalQuantity.textContent = totalQuantityNumber + quantity;
}

//ajoute une valeur au prix total des articles dans le panier
function addToTotalPrice(price){
    let totalPrice = document.querySelector('#totalPrice');
    let totalPriceNumber = parseInt(totalPrice.textContent) || 0;
    totalPrice.textContent = totalPriceNumber + price;
}

//affiche les articles dans le panier
function showProductInCart(product, color, quantity){
    let cartItems = document.querySelector('#cart__items');

    let cartArticle = document.createElement('article');
    cartArticle.classList.add('cart__item');
    cartArticle.setAttribute('data-id', product._id);
    cartArticle.setAttribute('data-color', color);
    cartItems.appendChild(cartArticle);

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('cart__item__img');
    cartArticle.appendChild(imgContainer);

    let img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt', product.altTxt);
    imgContainer.appendChild(img);

    let cartItemContent = document.createElement('div');
    cartItemContent.classList.add('cart__item__content');
    cartArticle.appendChild(cartItemContent);

    let cartItemContentDesc = document.createElement('div');
    cartItemContentDesc.classList.add('cart__item__content__description');
    cartItemContent.appendChild(cartItemContentDesc);

    let h2CartItemContentDesc = document.createElement('h2');
    h2CartItemContentDesc.textContent = product.name;
    cartItemContentDesc.appendChild(h2CartItemContentDesc);

    let colorItemDesc = document.createElement('p');
    colorItemDesc.textContent = color;
    cartItemContentDesc.appendChild(colorItemDesc);

    let priceItemDesc = document.createElement('p');
    priceItemDesc.textContent = product.price;
    cartItemContentDesc.appendChild(priceItemDesc);

    let cartItemContentSettings = document.createElement('div');
    cartItemContentSettings.classList.add('cart__item__content__settings');
    cartItemContent.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement('div');
    cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    let quantityParagraph = document.createElement('p');
    quantityParagraph.textContent = 'Qté:';
    cartItemContentSettingsQuantity.appendChild(quantityParagraph);

    let inputQuantity = document.createElement('input');
    inputQuantity.setAttribute('type', 'number');
    inputQuantity.classList.add('itemQuantity');
    inputQuantity.setAttribute('name', 'itemQuantity');
    inputQuantity.setAttribute('min', '1');
    inputQuantity.setAttribute('max', '100');
    inputQuantity.setAttribute('value', quantity.toString());
    cartItemContentSettingsQuantity.appendChild(inputQuantity);

    let cartItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    let deleteParagraph = document.createElement('p');
    deleteParagraph.classList.add('deleteItem');
    deleteParagraph.textContent = 'Supprimer';
    cartItemContentSettingsDelete.appendChild(deleteParagraph);
}