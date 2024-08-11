const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

class Contact {
    constructor(id, firstName, lastName) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }
}

let contacts = []
contacts.find = function(id, lastName) {
    if (lastName) {
        // Search by firstName and lastName
        let firstName = id
        let matches = []
        contacts.forEach( (contact) => {
            if (firstName == contact.firstName && lastName == contact.lastName) {
                matches.push( contact )
            }
        })
        return matches
    } else {
        for (let i=0; i<contacts.length; i++) {
            if (contacts[i].id == id)
                return contacts[i]
        }
        return null
    }
}

// Route on the collection. Supported operations:
// get (all, all with pagination, all from search)
// post (add new contact)
app.route("/contacts/")
    .get((req, res) => {
        if ("offset" in req.query && "limit" in req.query) {
            // Pagination
            
            res.json( contacts.splice( parseInt(req.query.offset), parseInt(req.query.limit)) )
            
            console.log("Get contacts with pagination, offset=" + req.query["offset"] + ", limit=" + req.query["limit"]);
            
        } else if ("firstname" in req.query && "lastname" in req.query) {
            
            // Recherche (exact match)
            
            let matches = contacts.find(req.query.firstname, req.query.lastname)
            
            res.json( matches )
            
            console.log("Get contacts from search, firstname=" + req.query["firstname"] + ", lastname=" + req.query["lastname"]);
            
        } else {

            // Tous les contacts
            
            res.json(contacts)
            
            console.log("Get all contacts");
        }
    })
    .post((req, res) => {

        // Ajouter
        
        console.log(req.body)

        let contact = new Contact(contacts.length, req.body.firstName, req.body.lastName)
        contacts.push(contact)

        // Une bonne option très restful (HATEOAS) consiste à retourner 201 avec l'URL
        res.set("Content-Location", "/contacts/" + contact.id)
        res.status(201)
        res.send(contact)
                
        console.log("Add a new contact")
    })

// Route on a specific contact id. Supported operations:
// get (get specific contact)
// put (replace specific contact)
// patch (partially replace specific contact)
// delete (delete specific contact)
app.route("/contacts/:id")
    .get((req, res) => {
        res.json( contacts.find(req.params.id) )
        console.log("Get contact, id=" + req.params["id"])
    })
    .put((req, res) => {
        let contact = contacts.find(req.params.id)
        contact.firstName = req.body.firstName
        contact.lastName = req.body.lastName
        res.json(contact)
        console.log("Replace contact, id=" + req.params["id"])
    })
    .patch((req, res) => {
        let contact = contacts.find(req.params.id)
        if (req.body.firstName)
            contact.firstName = req.body.firstName
        if (req.body.lastName)
            contact.lastName = req.body.lastName
        res.json(contact)
        console.log("Replace contact partially, id=" + req.params["id"])
    })
    .delete((req, res) => {
        let contact = contacts.find(req.params.id)
        contacts.splice( contacts.indexOf(contact), 1 )
        res.status(204)
        res.json( {} )
        console.log("Delete contact, id=" + req.params["id"])
    })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable
