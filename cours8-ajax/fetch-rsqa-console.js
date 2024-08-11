// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
handleErrors = (response) => {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

fetch("https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=9c7434e9-f5af-4154-991c-293fbd5cb626")
    .then(handleErrors)
    .then((response) => {
        return response.json(); // retourne une autre promesse qu'il faut résoudre
    })
    .then((data) => {
        let records = data.result.records
        for (let record of records) {
            // Backtick
            console.log( `secteur: ${record.secteur}, valeur: ${record.valeur}, date: ${record.date}, heure: ${record.heure}` )
        }
    })
    .catch((error) => {
        console.log("Une erreur est survenue: " + error);
    })

