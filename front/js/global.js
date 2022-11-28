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

  //Affiche une pop vup informativex
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

//affiche un message d'erreur
function showPopUpError(message){
  showPopUp(message, "error")
}

//affiche un message de succès
function showPopUpSuccess(message){
  showPopUp(message, "success");
}

//permet de contenir une valeur entre un minimum et un maximum
function clamp(value, min, max) {
  return Math.max(Math.min(parseInt(value), max), min);
}