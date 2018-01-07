const getJSON = require('get-json');
const unique = require('array-unique');

/** URL of the Overpass API being used */
const overpass = 'http://overpass-api.de/api/interpreter?data=';

/**
 * 
 * 
 * @param {any} query 
 * @param {any} callback 
 */
function getRoads(query, callback) {
  getJSON(`${overpass}${query}`, (err, result) => {
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

module.exports = { getRoads };
