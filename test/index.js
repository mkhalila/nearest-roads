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
});
