function main(){
    const id = getOrderFromURL();
    if (id !== null){
        showOrderNumber(id);
    } else {
        window.location = '/front/html/index.html'
    } 
}

main();

//récupère l'order de la commande dans l'URL
function getOrderFromURL(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('order');
}

function showOrderNumber (id){
    const orderId = document.querySelector('#orderId');
    orderId.textContent = id.toString();
}
