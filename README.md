# nearest-roads
This is a standard Node module to retrieve a list of the nearest roads from OpenStreetMaps.

`const nearestRoads = require('nearest-roads');`

### Usage

1. Nearest roads from a Location: `fromLocation(lat, long, distance, callback)`
  ```
  nearestRoads.fromLocation(51.42, -0.148, 100, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
  ```

The data is then parsed to abstract away some of the less relevant data returned from OpenStreetMap.

Run `npm install` to install the dependencies.

This project adheres to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

See [here](http://www.acuriousanimal.com/2016/08/14/configuring-atom-with-eslint.html) on how to configure ESLinter with Atom.
