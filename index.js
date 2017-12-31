const getJSON = require('get-json');
const unique = require('array-unique');

/** URL of the Overpass API being used */
const overpass = 'http://overpass-api.de/api/interpreter?data=';

/**
 * Validation checks for fromLocation params
 *
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
 * Validation checks for boundingBox params
 *
 * @param {any} northLat - the north latitude of the bounding box.
 * @param {any} eastLong - the east longitude of the bounding box.
 * @param {any} southLat - the south latitude of the bounding box.
 * @param {any} westLong - the west longitude of the bounding box.
 * @returns {Error} - Error object if validation fails, null otherwise
 */
function validateBoundingBox(northLat, eastLong, southLat, westLong) {
  if (typeof northLat !== 'number' || typeof eastLong !== 'number' || typeof southLat !== 'number' || typeof westLong !== 'number') {
    return new Error('northLat, eastLong, southLat and westLong must all be numbers.');
  }

  if (northLat < southLat) {
    return new Error('northLat must be greater than southLat.');
  }

  // The western limit is higher than the eastern limit if and only if the query surpasses
  // the longitude ±180.0 degrees with a bounding box passing through the Antimeridian

  return null;
}

/**
 * Get all road names within a specified distance from a location.
 *
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
    return callback(validationError, null);
  }

  return getJSON(`${overpass}${query}`, (err, result) => {
    if (err) return callback(err, null);

    let roads = [];
    result.elements.forEach(element => roads.push(element.tags.name));
    roads = unique(roads);

    return callback(null, roads);
  });
}

/**
 * Get all road names within a bounding box.
 *
 * @param {any} northLat - the north latitude of the bounding box.
 * @param {any} eastLong - the east longitude of the bounding box.
 * @param {any} southLat - the south latitude of the bounding box.
 * @param {any} westLong - the west longitude of the bounding box.
 * @param {Function} callback - callback(err, data)
 * @returns {Array} - Array of road names, use callback.
 */
function boundingBox(northLat, eastLong, southLat, westLong, callback) {
  // Overpass expects (S, W, N, E)
  const query = `[out:json]; way["highway"](${southLat}, ${westLong}, ${northLat}, ${eastLong}); out;`;

  const validationError = validateBoundingBox(northLat, eastLong, southLat, westLong);

  if (validationError) {
    return callback(validationError, null);
  }

  return getJSON(`${overpass}${query}`, (err, result) => {
    if (err) return callback(err, null);

    let roads = [];

    result.elements.forEach((element) => {
      if (element.tags.name !== undefined) {
        roads.push(element.tags.name);
      }
    });

    roads = unique(roads);

    return callback(null, roads);
  });
}

module.exports = {

  fromLocation,

  boundingBox,

};
