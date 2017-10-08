const should = require('chai').should();
const nearestRoads = require('../index');

// Using object destructuring, like a boss :P :D
const { fromLocation } = nearestRoads;
const lat = 51.426163;
const long = -0.146079;

describe('#fromLocation', () => {
  it('gets nimrod and woodnook roads 30m from home', (done) => {
    fromLocation(lat, long, 30, (err, roads) => {
      should.not.exist(err);
      should.exist(roads);
      roads.should.be.an('array');
      roads.should.have.length(2);
      roads.should.include('Woodnook Road');
      roads.should.include('Nimrod Road');
      roads.should.not.include('Longstone Road');
      done();
    });
  });

  it('gets empty array for distance 0', (done) => {
    fromLocation(lat, long, 0, (err, roads) => {
      should.not.exist(err);
      should.exist(roads);
      roads.should.be.an('array');
      roads.should.have.length(0);
      done();
    });
  });

  it('returns error when type of lat is not number', (done) => {
    fromLocation('bananas', long, 30, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Lat, Long, and Distance must be numbers');
      done();
    });
  });

  it('returns error when type of long is not number', (done) => {
    fromLocation(lat, false, 30, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Lat, Long, and Distance must be numbers');
      done();
    });
  });

  it('returns error when type of distance is not number', (done) => {
    fromLocation(lat, long, [], (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Lat, Long, and Distance must be numbers');
      done();
    });
  });

  it('returns error for invalid latitude value', (done) => {
    fromLocation(-120, long, 30, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Latitude must be between -90 and 90');
      done();
    });
  });

  it('returns error for invalid longitude value', (done) => {
    fromLocation(lat, 190, 30, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Longitude must be between -180 and 180');
      done();
    });
  });

  it('returns error for negative distance', (done) => {
    fromLocation(lat, long, -30, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Distance must be greater than 0');
      done();
    });
  });
});
