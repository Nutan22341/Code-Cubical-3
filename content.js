//importScripts('Readbility.js');
let doc = document.cloneNode(true);
let reader = new Readability(doc);
let article = reader.parse();
console.log(article)