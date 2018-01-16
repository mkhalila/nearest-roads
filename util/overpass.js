const getJSON = require('get-json');

/** URL of the Overpass API being used */
const overpass = 'http://overpass-api.de/api/interpreter?data=';

/**
 * Formats a raw OSM road into a custom format to make fields more programmatically consumable.
 *
 * @param {Object} osmRoad Tags of OSM Road (element.tags)
 * @returns {Object} Formatted road containing name, type, oneway, lit, lanes and maxspeed.
 */
function formatRoad(osmRoad) {
  const road = {
    name: osmRoad.name,
    type: osmRoad.highway,
  };

  if (osmRoad.oneway) {
    road.oneway = (osmRoad.oneway === 'yes');
  }

  if (osmRoad.lit) {
    road.lit = (osmRoad.lit === 'yes');
  }

  if (osmRoad.lanes) {
    road.lanes = parseInt(osmRoad.lanes, 10);
  }

  if (osmRoad.maxspeed) {
    road.maxspeed = parseInt(osmRoad.maxspeed.match(/\d+/), 10);
  }

  return road;
}

/**
 * Retrieve and process roads from the the Overpass API
 *
 * @param {String} query The Overpass query describing the request.
 * @param {Function} callback (err, roads)
 * @returns {Array} Array of road names matching query.
 */
function getRoads(query, callback) {
  getJSON(`${overpass}${query}`, (err, result) => {
    if (err) return callback(err, null);

    const roads = [];

    result.elements.forEach((element) => {
      if (element.tags.name) {
        const road = formatRoad(element.tags);
        roads.push(road);
      }
    });

    return callback(null, roads);
  });
}

module.exports = { getRoads };
