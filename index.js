const validators = require('./util/validators');
const overpass = require('./util/overpass');

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

  const validationError = validators.validateFromLocation(lat, long, distance);

  if (validationError) {
    return callback(validationError, null);
  }

  return overpass.getRoads(query, (err, roads) => {
    if (err) return callback(err, null);
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

  const validationError = validators.validateBoundingBox(northLat, eastLong, southLat, westLong);

  if (validationError) {
    return callback(validationError, null);
  }

  return overpass.getRoads(query, (err, roads) => {
    if (err) return callback(err, null);
    return callback(null, roads);
  });
}

module.exports = {

  fromLocation,

  boundingBox,

};
