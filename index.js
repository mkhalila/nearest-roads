const getJSON = require('get-json');
const unique = require('array-unique');

/** URL of the Overpass API being used */
const overpass = 'http://overpass-api.de/api/interpreter?data=';

/**
 * Get all road names within a specified distance from a location.
 * @param {number} lat - Latitude of centre location.
 * @param {number} long - Longitude of centre location.
 * @param {number} distance - Radius distance in metres.
 * @param {function} callback - callback(err, data)
 * @returns {array} - Array of road names, use callback.
 */
function fromCentre(lat, long, distance, callback) {
  const query = `[out:json]; way["highway"](around:${distance},${lat},${long}); out;`;

  getJSON(`${overpass}${query}`, (err, result) => {
    if (err) callback(err, null);

    if (result.elements.length === 0) callback(new Error('Found 0 Roads'), null);

    let roads = [];
    result.elements.forEach(element => roads.push(element.tags.name));
    roads = unique(roads);

    callback(null, roads);
  });
}

fromCentre(51.424037, -0.148666, 100, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
