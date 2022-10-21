const cartProducts = [];

async function main() {
    const products = getProductsFromLocalStorage();
    for (let cartProduct of products) {
        const product = await getProductFromApi(cartProduct.id);
        cartProducts.push({
            id: cartProduct.id,
            quantity: cartProduct.quantity,
            color: cartProduct.color,
            details: product,
        });
        showProductInCart(product, cartProduct.color, cartProduct.quantity);
    }
    showTotalPrice(calculateTotalPrice(cartProducts));
    showTotalProduct(calculateTotalQuantity(cartProducts));
    refreshFormVisibility();
    attachEventListenerToFormField();
}

main();

//enlève le formulaire de commande quand le panier est vide
function refreshFormVisibility(){
    if (cartProducts.length === 0) {
        let cartOrder = document.querySelector('.cart__order');
        cartOrder.style.display = 'none'
    }
}

//recupère les données des articles dans le local Storage
function getProductsFromLocalStorage() {
    const cart = localStorage.getItem("cart");
    if (cart === null) {
        return [];
    }
    return JSON.parse(cart);
}

//affiche le prix total
function showTotalPrice(price) {
    let totalPrice = document.querySelector("#totalPrice");
    totalPrice.textContent = price;
}

//calcule ou recalcule le prix total
function calculateTotalPrice(products) {
    const result = products.reduce(function (total, product) {
        return total + product.details.price * product.quantity;
    }, 0);
    return result;
}

//affiche le total des produits
function showTotalProduct(quantity) {
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = quantity;
}

//calcule la quantité total
function calculateTotalQuantity(products) {
    const result = products.reduce(function (total, product) {
        return total + product.quantity;
    }, 0);
    return result;
}

//affiche les articles dans le panier
function showProductInCart(product, color, quantity) {
    let cartItems = document.querySelector("#cart__items");

    let cartArticle = document.createElement("article");
    cartArticle.classList.add("cart__item");
    cartArticle.setAttribute("data-id", product._id);
    cartArticle.setAttribute("data-color", color);
    cartItems.appendChild(cartArticle);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("cart__item__img");
    cartArticle.appendChild(imgContainer);

    let img = document.createElement("img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
    imgContainer.appendChild(img);

    let cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    cartArticle.appendChild(cartItemContent);

    let cartItemContentDesc = document.createElement("div");
    cartItemContentDesc.classList.add("cart__item__content__description");
    cartItemContent.appendChild(cartItemContentDesc);

    let h2CartItemContentDesc = document.createElement("h2");
    h2CartItemContentDesc.textContent = product.name;
    cartItemContentDesc.appendChild(h2CartItemContentDesc);

    let colorItemDesc = document.createElement("p");
    colorItemDesc.textContent = `color: ${color}`;
    cartItemContentDesc.appendChild(colorItemDesc);

    let priceItemDesc = document.createElement("p");
    priceItemDesc.textContent = `prix: ${product.price} €`;
    cartItemContentDesc.appendChild(priceItemDesc);

    let cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
    );
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    let quantityParagraph = document.createElement("p");
    quantityParagraph.textContent = "Qté:";
    cartItemContentSettingsQuantity.appendChild(quantityParagraph);

    let inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("value", quantity.toString());
    cartItemContentSettingsQuantity.appendChild(inputQuantity);

    let cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.classList.add(
        "cart__item__content__settings__delete"
    );
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    let deleteParagraph = document.createElement("p");
    deleteParagraph.classList.add("deleteItem");
    deleteParagraph.textContent = "Supprimer";
    cartItemContentSettingsDelete.appendChild(deleteParagraph);

    deleteParagraph.addEventListener(
        "click",
        function(){
            onProductRemove(product, color)
        }
    );

    inputQuantity.addEventListener(
        "change",
        function(evt){
            onProductQuantityChange(product, color, parseInt(evt.target.value))
        }
    );
}

//gère l'évènement de la supression d'un produit
function onProductRemove(product, color) {
    let cartArticle = document.querySelector(
        `.cart__item[data-id="${product._id}"][data-color="${color}"]`
    );
    cartArticle.remove();
    removeProduct(cartProducts, product._id, color);
    storeCartProducts(cartProducts);
    showTotalPrice(calculateTotalPrice(cartProducts));
    showTotalProduct(calculateTotalQuantity(cartProducts));
}

//gère l'évènement du changement de la quantité dde produit
function onProductQuantityChange(product, color, quantity){
    updateProductQuantity(cartProducts, product._id, color, quantity);
    storeCartProducts(cartProducts);
    showTotalPrice(calculateTotalPrice(cartProducts));
    showTotalProduct(calculateTotalQuantity(cartProducts));
}

//stock le panier dans le storage
function storeCartProducts(products) {
    localStorage.setItem(
        "cart",
        JSON.stringify(
            products.map(function (product) {
                return {
                    id: product.id,
                    quantity: product.quantity,
                    color: product.color,
                };
            })
        )
    );
}

//enlève les données du produit choisit dans le local storage
function removeProduct(products, id, color) {
    //recherche si le produit existe déjà dans le panier
    const index = products.findIndex(function (product) {
        return product.id == id && product.color == color; //comparaison
    });
    if (index >= 0) {
        products.splice(index, 1);
    }
    refreshFormVisibility();
}

function updateProductQuantity(products, id, color, quantity){
    const index = products.findIndex(function (product) {
        return product.id == id && product.color == color; //comparaison
    });
    if (index >= 0) {
        products[index].quantity = quantity
    }
}

//vérifie si le champ prénom est valide
function checkFirstNameField() {
    const firstNameValidation = /^[a-zA-Z]+[- ']{0,1}[a-zA-Z]+$/;
    const userName = document.querySelector("#firstName").value;
    let firstNameErrorMessage = document.querySelector("#firstNameErrorMsg");
    firstNameErrorMessage.textContent = firstNameValidation.test(userName) && userName !== '' ? null : "Champ invalide";
    firstNameErrorMessage.style.color = "red";
}

function attachEventListenerToFormField(){
    const userFirstName = document.querySelector('#firstName');
    const userLastName = document.querySelector('#lastName');
    const emailContent = document.querySelector('#email');
    const adressContent = document.querySelector('#address');
    const cityContent = document.querySelector('#city');

    userFirstName.addEventListener(
        'blur',
        function(){
            checkFirstNameField();
        }
    )
    userLastName.addEventListener(
        'blur',
        function(){
            checkLastNameField();
        }
    )
    emailContent.addEventListener(
        'blur',
        function(){
            checkMail();
        }
    )
    adressContent.addEventListener(
        'blur',
        function(){
            checkIfFieldsEmpty('#address', '#addressErrorMsg');
        }
    )
    cityContent.addEventListener(
        'blur',
        function(){
            checkIfFieldsEmpty('#city', '#cityErrorMsg');
        }
    )
}

function checkLastNameField() {
    const lastNameValidation = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
    const userLastName = document.querySelector("#lastName").value;
    let lastNameErrorMessage = document.querySelector("#lastNameErrorMsg");
    lastNameErrorMessage.textContent = lastNameValidation.test(userLastName) && userLastName !== '' ? null : "Champ invalide";
    lastNameErrorMessage.style.color = "red";
}

//vérifie si l'email est valide
function checkMail() {
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailContent = document.querySelector('#email').value;
    let emailErrorMessage = document.querySelector('#emailErrorMsg');
    emailErrorMessage.textContent = emailValidation.test(emailContent) && emailContent !== '' ? null : "Champ invalide";
    emailErrorMessage.style.color = 'red';
}

//vérifie que le champ n'est pas vide 
function checkIfFieldsEmpty(idContent, idErrMsg){
    const errMsg = document.querySelector(idErrMsg);
    const content = document.querySelector(idContent).value;
    errMsg.textContent = content !== '' ? null : "Champ invalide";
    errMsg.style.color = 'red';
}