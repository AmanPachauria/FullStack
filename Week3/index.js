// Three way to write callback function 

// 1 

const fs = require("fs");

function fn( err, data){
    console.log(data);
}

fs.readFile("a.txt", "uft-8", fn);


// 2 

const fs = require("fs");

fs.readFile("a.txt", "uft-8", function(err, data) {
    console.log(data);
})


// 3 
const fs = require("fs");

fs.readFile('a.txt', 'utf-8', (err, data) => {
    console.log(data);
})


