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

        // Créer un tableau HTML à partir de l'API DOM
        const table = document.createElement("table")
        table.border = 1

        // Rangée en-tête
        const headerRow = document.createElement("thead")
        table.appendChild(headerRow)

        // Colonnes d'en-tête
        const columns = ["secteur", "valeur", "date", "heure"]
        columns.forEach( (col) => {
            const headerColumn = document.createElement("th")
            headerColumn.appendChild( document.createTextNode( col ) )
            headerRow.appendChild(headerColumn)
        })

        // Parsing des enregistrements

        let records = data.result.records
        for (let record of records) {
            // Rangée
            const row = document.createElement("tr")
            table.appendChild(row)

            // Colonnes
            columns.forEach( (col) => {
                const column = document.createElement("td")
                column.appendChild( document.createTextNode( record[col] ) )
                row.appendChild(column)
            })
        }

        // Ajout du tableau à la page
        document.body.appendChild( table )
    })
    .catch((error) => {
        console.log("Une erreur est survenue: " + error);
    })

