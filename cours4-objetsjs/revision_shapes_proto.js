// Solution à l'exercice de révision (sous format "Quiz" sur GitHub)
/*
Considérez l'entité abstraite Shape qui modélise un objet géométrique en deux dimensions. Pour construire un objet Shape, il faut passer deux paramètres: x et y, qui représentent la position de l'objet.
Vous devez implémenter les méthodes suivantes:
- area: l'aire d'un objet Shape abstrait est 0
- perimeter: le périmètre d'un objet Shape abstrait est 0
- toString: retourne une chaine contenant le type d'objet (Shape)*, ainsi que les attributs, soit les coordonnées x et y pour Shape, sous le format suivant: 'Shape x:5, y:7' (par exemple)
- display: imprime à l'écran le type d'objet (Shape), ainsi que les attributs, soit les coordonnées x et y pour Shape (comme c'est le cas pour toString), puis le périmètre, et l'aire (sur 3 lignes différentes). Exemple:
  Shape x:5, y:7
  Perimeter: 0
  Area: 0

Considérez ensuite l'entité Circle qui modélise un cercle. Un cercle "est un" Shape. Les paramètres de constructeur sont: x, y, r.
Vous devez implémenter les méthodes pertinentes afin de modéliser le comportement voulu (équations mathématiques et attributs imprimés).
- La formule pour l'aire est: Math.PI * r * r
- La formule pour le périmètre est: Math.PI * 2 * r

Finalement, considérez l'entité Ellipse qui modélise une ellipse. Une ellipse "est un" Circle. Les paramètres de constructeur sont: x, y, r, r2.
Vous devez implémenter les méthodes pertinentes afin de modéliser le comportement voulu (équations mathématiques et attributs imprimés).
- La formule pour l'aire est: Math.PI * r * r2
- La formule pour le périmètre est: 2 * Math.PI * Math.sqrt((Math.pow(r,2) + Math.pow(r2,2)) / 2);

Notes:
- Cet exercice a des similitudes avec celui que nous avons fait en classe.
- Les méthodes ne doivent pas être définies sur chaque instance individuelle de l'objet (par exemple, il n'est pas permis de définir les méthodes via le constructeur).
- Vous devez éviter le dédoublement du code en invoquant des méthodes d'instances ou des méthodes parent, lorsque pertinent.
- *Indice: pouvez-vous penser à une manière d'obtenir le nom de de la fonction constructeur sans devoir le "hardcoder"?

Utilisez la syntaxe prototypale pré-ES6.
*/

const Shape = function (x, y) {
    this.x = x;
    this.y = y;
  };
  
  Shape.prototype.area = function() {
    return 0;
  }
  
  Shape.prototype.perimeter = function() {
    return 0;
  }
  
  Shape.prototype.toString = function() {
    return `${this.__proto__.constructor.name} x:${this.x}, y:${this.y}`;
  };
  
  Shape.prototype.display = function(){
    console.log(this.toString());
    console.log("Perimeter: "+this.perimeter());
    console.log("Area: "+this.area());
  }
  
  const Circle = function(x, y, r) {
    Shape.call(this, x, y);
    this.r = r;
  };
  
  Circle.prototype = Object.create(Shape.prototype);
  Circle.prototype.constructor = Circle;
  
  Circle.prototype.area = function() {
    return Math.PI * this.r * this.r;
  }
  
  Circle.prototype.perimeter = function() {
    return Math.PI * 2 * this.r;
  }
  
  Circle.prototype.toString = function() {
    return Shape.prototype.toString.call(this)+" r:"+this.r;
  }
  
  const Ellipse = function(x, y, r1, r2) { 
    Circle.call(this, x, y, r1);
    this.r2 = r2;
  };
  
  Ellipse.prototype = Object.create(Circle.prototype);
  Ellipse.prototype.constructor = Ellipse;
  
  Ellipse.prototype.area = function() {
    return Math.PI * this.r * this.r2;
  }
  
  Ellipse.prototype.perimeter = function() {
    return 2 * Math.PI * Math.sqrt((Math.pow(this.r,2) + Math.pow(this.r2,2)) / 2);
  }
  
  Ellipse.prototype.toString = function() {
    return Circle.prototype.toString.call(this)+" r2:"+this.r2;
  }