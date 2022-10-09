function main() {
    const id = getIdFromUrl();
    getProductFromApi(id).then(showProductDetails)
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