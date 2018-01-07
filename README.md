# nearest-roads
Get nearest roads to a given location, or all roads within a bounding box.

## Version 0.2.0: Bounding Box Support!
Previously, you could only retrieve the nearest roads to a central (lat, lon) location and a given radius distance.

Now, there is support for getting all the roads inside a [Bounding box](http://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#The_bounding_box).

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

#### Roads within a Bounding Box: `boundingBox(northLat, eastLong, southLat, westLong, callback)`

```
nearestRoads.boundingBox(51.5707755427, 0.922651543, 51.5046221724, 0.6790402342, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});
```

Which returns: 
```
[ 'Cuckoo Corner',
  'Prince Avenue',
  'Queensway',
  'Southchurch Avenue',
  ...
  'Wallace Street',
  'Friars Street',
  'Wakering Avenue',
  ... 810 more items ]
```
  
## Contributing

This project adheres to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

See [here](http://www.acuriousanimal.com/2016/08/14/configuring-atom-with-eslint.html) on how to configure ESLinter with Atom.

Add unit tests for any new or changed functionality. Lint and test your code.
