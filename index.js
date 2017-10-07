const getJSON = require('get-json');

const overpass = 'http://overpass-api.de/api/interpreter?data=';

const lat = 51.424037;
const long = -0.148666;
const distance = 50;

const query = `[out:json]; way["highway"](around:${distance},${lat},${long}); out;`;

getJSON(`${overpass}${query}`, (err, result) => {
  if (err) console.log(err);
  console.log(result);
});
