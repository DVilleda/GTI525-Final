import fs from 'fs'

var fileName1 = "sample.txt";
var fileName2 = "sample-copy.txt";
var readStream = fs.createReadStream(fileName1);
var writeStream = fs.createWriteStream(fileName2);

readStream.on("data", function(blob) {
    console.log("Lus: " + blob.length);
    writeStream.write(blob);
} );

readStream.on("end", function() {
    console.log("Fin du flux");
    writeStream.end();
} );
