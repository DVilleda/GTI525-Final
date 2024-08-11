// Override the incomplete functions in domproms.js
// (load this script after domproms.js)

// Rend visible le "p" indiquant que tous les boutons ont été cliqués
function allClicked() {
    document.getElementById("allclicked").style = ""
}

// Doit retourner un tableau de promesses, une promesse par bouton
// Chaque promesse devra être résolue quand le bouton est cliqué
function getPromises() {
    const buttons = document.getElementsByTagName("button")
    let proms = []

    for (let i=0; i<buttons.length; i++) {
        let button = buttons[i]
        proms.push( new Promise( function(resolve,reject) {

            button.addEventListener("click", (event) => {
                resolve(event.target)
            })
            
        }) )
    }

    return proms
}

// Gestion de chaque bouton cliqué:
// Changer la couleur du bouton lorsque cliqué en
// invoquant la méthode "color" sur le bouton qui a été appuyé
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
function waitForButtons(proms) {
    proms.forEach( (prom) => {
        prom.then( (button) => {
            button.color()
        })
    })
}

// Attendre que le premier bouton ne soit cliqué
// Invoquer la méthode firstClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
function waitForFirstButton(proms) {
    Promise.race( proms ).then( (button) => {
        firstClicked(button)
    })
}

// Attendre que tous les boutons aient été cliqués
// Invoquer la méthode allClicked
// Note: il faut utiliser les promesses
// Interdit: ne pas ajouter d'événement click au bouton
function waitForAllButtons(proms) {
    Promise.all( proms ).then( (buttons) => {
        allClicked()
    })
}
