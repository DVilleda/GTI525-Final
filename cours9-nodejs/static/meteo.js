// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

// Obtient les données via une requête fetch
let divs = document.getElementsByTagName("DIV")

for (let i=0; i<divs.length; i++) {

    const div = divs[i]

    const url = "/weather/" + div.id
    fetch(url)
        .then( handleErrors )
        .then( response => response.json() )
        .then( data => {
            
            console.log(data)

            // Détruire tous les noeuds enfants            
            while (div.firstChild) {
                div.removeChild(div.lastChild);
            }

            // Regénérer les noeuds enfants selon les données obtenues
            let h1Node = document.createElement("H1")
            h1Node.appendChild( document.createTextNode(div.id ) )
            div.appendChild(h1Node)
            let ulNode = document.createElement("UL")
            div.appendChild(ulNode)
            let tempLiNode = document.createElement("LI")
            tempLiNode.appendChild( document.createTextNode( "Temperature: " + data.temperature ) )
            div.appendChild(tempLiNode)
            let windspeedLiNode = document.createElement("LI")
            windspeedLiNode.appendChild( document.createTextNode( "Vitesse vent: " + data.windspeed ) )
            div.appendChild(windspeedLiNode)
            let winddirectionLiNode = document.createElement("LI")
            winddirectionLiNode.appendChild( document.createTextNode( "Direction vent: " + data.winddirection ) )
            div.appendChild(winddirectionLiNode)
        })
        .catch( error => {

            // Détruire tous les noeuds enfants            
            while (div.firstChild) {
                div.removeChild(div.lastChild);
            }

            let h1Node = document.createElement("H1")
            h1Node.appendChild( document.createTextNode(div.id ) )
            div.appendChild(h1Node)

            // Imprimer message d'erreur
            let errorNode = document.createElement("P")
            errorNode.appendChild(document.createTextNode( error ) )
            div.appendChild(errorNode)
            
        })

}
