// Copie un fichier en utilisant les tuyaux (pipes)
import fs from 'fs'

// Ouvre les flux de lecture et d'écriture
var readStream = fs.createReadStream("sample.txt");
var writeStream = fs.createWriteStream("sample-copy.txt");

// Copie le contenu du flux de lecture vers le flux d'écriture
readStream.pipe( writeStream );
