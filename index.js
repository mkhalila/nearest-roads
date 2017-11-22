const getJSON = require('get-json');
const unique = require('array-unique');

/** URL of the Overpass API being used */
const overpass = 'http://overpass-api.de/api/interpreter?data=';

/**
 * Validation checks for fromLocation params
 * @param {Number} lat - Latitude of centre location.
 * @param {Number} long - Longitude of centre location.
 * @param {Number} distance - Radius distance in metres.
 * @returns {Error} - Error object if validation fails, null otherwise
 */
function validateFromLocation(lat, long, distance) {
  if (typeof lat !== 'number' || typeof long !== 'number' || typeof distance !== 'number') {
    return new Error('Lat, Long, and Distance must be numbers');
  }

  if (Math.abs(lat) > 90) {
    return Error('Latitude must be between -90 and 90');
  }

  if (Math.abs(long) > 180) {
    return Error('Longitude must be between -180 and 180');
  }

  if (distance < 0) {
    return Error('Distance must be greater than 0');
  }

  return null;
}

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

  const validationError = validateFromLocation(lat, long, distance);

  if (validationError) {
    return callback(validationError);
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
