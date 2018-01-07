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

  if (Math.abs(northLat) > 90 || Math.abs(southLat) > 90) {
    return Error('Latitude must be between -90 and 90');
  }

  if (Math.abs(eastLong) > 180 || Math.abs(westLong) > 180) {
    return Error('Longitude must be between -180 and 180');
  }

  if (northLat < southLat) {
    return new Error('northLat must be greater than southLat.');
  }

  // The western limit is higher than the eastern limit if and only if the query surpasses
  // the longitude ±180.0 degrees with a bounding box passing through the Antimeridian

  return null;
}

module.exports = {

  validateFromLocation,

  validateBoundingBox,

};
