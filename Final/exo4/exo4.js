// Solution:
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
class Ville {
  constructor(name, count) {
    this.name = name;
    this.count = count;
  }
}
let villes = [];
villes.getByName = function (name) {
  for (let i = 0; i < villes.length; i++) {
    if (villes[i].name == name) return villes[i];
  }
  return null;
};
villes.getByCaseCount = function (countMin, countMax) {
  let results = [];
  for (let i = 0; i < villes.length; i++) {
    if (villes[i].count >= countMin && villes[i].count <= countMax)
      return villes[i];
  }
  return results;
};
villes.getPartial = function (offset, limit) {
  return villes.splice(parseInt(offset), parseInt(limit));
};
// TODO: implémentez votre code ici
app
  .route("/villes/")
  .get((req, res) => {
    if ("offset" in req.query && "limit" in req.query) {
      // Pagination
      res.json(villes.getPartial(req.query.offset), parseInt(req.query.limit));
    } else if ("countMin" in req.query && "countMax" in req.query) {
      // Recherche (exact match)
      let matches = villes.getByCaseCount(
        req.query.countMin,
        req.query.countMax
      );
      res.json(matches);
    } else {
      // Tous les contacts
      res.json(villes);
    }
  })
  .post((req, res) => {
    // Ajouter
    console.log(req.body);
    let ville = new Ville(req.body.name, req.body.count);
    villes.push(ville);
    // Une bonne option très restful (HATEOAS) consiste à retourner 201 avec l'URL
    res.set("Content-Location", "/villes/" + ville.name);
    res.status(201);
    res.send(ville);
    console.log("Add a new ville");
  });
// Route on a specific ville name. Supported operations:
// get (get specific ville)
// put (replace specific ville)
// patch (partially replace specific ville)
// delete (delete specific ville)
app
  .route("/villes/:name")
  .get((req, res) => {
    res.json(villes.getByName(req.params.name));
  })
  .put((req, res) => {
    let ville = villes.getByName(req.params.name);
    ville.name = req.body.name;
    ville.count = req.body.count;
    res.json(ville);
  })
  .patch((req, res) => {
    let ville = villes.getByName(req.params.name);
    if (req.body.name) ville.name = req.body.name;
    if (req.body.count) ville.count = req.body.count;
    res.json(ville);
    console.log("Replace ville partially, name=" + req.params["name"]);
  })
  .delete((req, res) => {
    let ville = villes.getByName(req.params.name);
    villes.splice(villes.indexOf(ville), 1);
    res.status(204);
    res.json({});
    console.log("Delete ville, name=" + req.params["name"]);
  });
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable
