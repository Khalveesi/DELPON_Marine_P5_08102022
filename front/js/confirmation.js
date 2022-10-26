//récupère l'order de la commande dans l'URL
function getOrderFromURL(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('order');
}