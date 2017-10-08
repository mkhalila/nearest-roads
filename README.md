# nearest-roads
A standard library providing methods to retrieve a list of the nearest roads from OpenStreetMaps.

## Installation

  npm install nearest-roads --save

## Usage
  `const nearestRoads = require('nearest-roads');`

#### Nearest roads from a location: `fromLocation(lat, long, distance, callback)`
  Returns an array containing the names of the roads that are within `distance` metres radius of `lat` `long` location.
  ```
  nearestRoads.fromLocation(51.42, -0.148, 100, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
  ```

## Contributing

This project adheres to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

See [here](http://www.acuriousanimal.com/2016/08/14/configuring-atom-with-eslint.html) on how to configure ESLinter with Atom.

Add unit tests for any new or changed functionality. Lint and test your code.
