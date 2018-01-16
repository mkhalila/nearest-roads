# nearest-roads
Get nearest roads to a given location, or all roads within a bounding box.

## Version 1.0.1: Breaking Backwards Compatibility
Previously, this module would only return an array containing all the **names** of roads that matched the query. Quite clearly though, this was fairly limited. It also didn't take full advantage of the data coming from OpenStreetMaps.

Therefore, this update now returns an **array of objects** - one for each road. Each road object contains the following fields:
* `name`: Name of the road (yes, would you believe it.)
* `type`: If the road is a [residential, tertiary, secondary, service, ...] road
* `oneway`*: `true` if the road is a oneway
* `lit`*: `true` if the road has lighting
* `lanes`*: No. of lanes the road has
* `maxspeed`*: The maximum permitted speed limit as an integer

<nowiki>*</nowiki>The existence of these fields for each road is entirely dependent on if there is such data in OSM i.e., these will only exist if the relevant data is present in OSM, otherwise the fields will be undefined.

N.B. Some of the fields of the road objects have been converted to a more programmatically consumable type when compared to OSM data.

I have also removed the `array-unique` dependency that this module used to have, as it is no longer relevant.

Finally, this completes the intended requirements that were laid out when I aimed to create this module. Hence due to breaking backwards compatibility, and _completing_ the intended functionality of this module, this is officially version 1.x

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

#### Example Return: 
```
[ { name: 'Cuckoo Corner',
    type: 'trunk',
    oneway: true,
    lit: true,
    lanes: 2,
    maxspeed: 40 },
  { name: 'Prince Avenue',
    type: 'trunk',
    oneway: true,
    lit: true,
    lanes: 2,
    maxspeed: 40 },
  { name: 'Queensway',
    type: 'primary',
    oneway: true,
    lit: true,
    maxspeed: 40 },
  { name: 'Southchurch Avenue',
    type: 'primary',
    oneway: true,
    lit: true,
    maxspeed: 30 },
  { name: 'Prince Avenue',
    type: 'trunk',
    oneway: true,
    lit: true,
    lanes: 2,
    maxspeed: 40 },
    ...
    { name: 'Eastern Avenue', 
    type: 'primary', 
    maxspeed: 30 },
    ... 1526 more items ]
```
  
## Contributing

This project adheres to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

Add unit tests for any new or changed functionality. Lint and test your code.
