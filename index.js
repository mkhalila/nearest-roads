const getJSON = require('get-json');
const unique = require('array-unique');

/** URL of the Overpass API being used */
const overpass = 'http://overpass-api.de/api/interpreter?data=';

/**
 * Get all road names within a specified distance from a location.
 * @param {Number} lat - Latitude of centre location.
 * @param {Number} long - Longitude of centre location.
 * @param {Number} distance - Radius distance in metres.
 * @param {Function} callback - callback(err, data)
 * @returns {Array} - Array of road names, use callback.
 */
function fromLocation(lat, long, distance, callback) {
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

module.exports = { fromLocation };
