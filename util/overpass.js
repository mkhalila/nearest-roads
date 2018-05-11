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
  * Sort comparison function for two Road objects
  *
  * @param {Object} a road
  * @param {Object} b road
  * @returns {Number} 1 if a larger, -1 if a smaller and 0 if equal
  */
function compareRoads(a, b) {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else return 0;
}

 * Reorganise ways into buckets using road name
 *
 * @param {array} roads from OSM
 * @returns {array} Object containing road names as keys mapped to array of ways with that name.
 */
function bucketByName(roads) {
  const dupes = {};
  roads.forEach((road) => {
    const key = road.name;
    if (dupes[key]) {
      dupes[key].push(road);
    } else {
      dupes[key] = [road];
    }
  });
  return dupes;
}

/**
 * Best effort to remove duplicate ways for a road
 *
 * @param {array} roadBucket from OSM
 * @returns {array} Deduped set of ways
 */
function dedupeRoad(roadBucket) {
  return roadBucket.filter((way, index, self) =>
    self.findIndex(w =>
      w.type === way.type &&
      w.oneway === way.oneway &&
      w.lit === way.lit &&
      w.lanes === way.lanes &&
      w.maxspeed === way.maxspeed)
    === index);
}

/**
 * Best effort to remove duplicates
 *
 * @param {array} roads post-format roads from OSM
 * @returns {array} Deduped set of roads
 */
function dedupe(roads) {
  const waysByName = bucketByName(roads);
  Object.keys(waysByName).forEach((roadName) => {
    waysByName[roadName] = dedupeRoad(waysByName[roadName]);
  });
  return [].concat(...Object.values(waysByName));
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

    roads.sort(compareRoads);

    return callback(null, roads);
  });
}

module.exports = {
  getRoads,
};
