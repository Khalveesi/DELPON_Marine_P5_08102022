function main() {
    const id = getIdFromUrl();
}

main();

//récupère l'ID du produit dans l'URL
function getIdFromUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}