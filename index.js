const getJSON = require('get-json');

const overpass = 'http://overpass-api.de/api/interpreter?data=';
const query = '[out:json];way[%22highway%22](around:50,51.424037,-0.148666);out;';

getJSON(`${overpass}${query}`, (err, result) => {
  if (err) console.log(err);
  console.log(result);
});
