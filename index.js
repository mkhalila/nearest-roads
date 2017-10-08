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

  if (typeof lat !== 'number' || typeof long !== 'number' || typeof distance !== 'number') {
    return callback(new Error('Lat, Long, and Distance must be numbers'), null);
  }

  if (Math.abs(lat) > 90) {
    return callback(new Error('Latitude must be between -90 and 90'), null);
  }

  if (Math.abs(long) > 180) {
    return callback(new Error('Longitude must be between -180 and 180'), null);
  }

  if (distance < 0) {
    return callback(new Error('Distance must be greater than 0'), null);
  }

  return getJSON(`${overpass}${query}`, (err, result) => {
    if (err) return callback(err, null);

    let roads = [];
    result.elements.forEach(element => roads.push(element.tags.name));
    roads = unique(roads);

    return callback(null, roads);
  });
}

module.exports = { fromLocation };
