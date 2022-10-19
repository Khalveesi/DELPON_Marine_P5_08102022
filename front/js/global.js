const URL = "http://localhost:3000/api";

//recupère un produit dans l'API avec l'ID
function getProductFromApi(id) {
    return fetch(`${URL}/products/${id}`).then(function(response){
      if (response.ok){
        return response.json();
      }
      throw new Error('somethings wrent wrong');
    });
  }