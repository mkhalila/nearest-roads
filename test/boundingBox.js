const should = require('chai').should();
const nearestRoads = require('../index');

const { boundingBox } = nearestRoads;
const northLat = 51.4279553567;
const eastLong = -0.1409986702;
const southLat = 51.4201937049;
const westLong = -0.1537517291;

describe('#boundingBox', () => {
  it('returns error when northLat is not a number', (done) => {
    boundingBox('northLat', eastLong, southLat, westLong, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('northLat, eastLong, southLat and westLong must all be numbers.');
      done();
    });
  });

  it('returns error when eastLong is not a number', (done) => {
    boundingBox(northLat, false, southLat, westLong, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('northLat, eastLong, southLat and westLong must all be numbers.');
      done();
    });
  });

  it('returns error when southLat is not a number', (done) => {
    boundingBox(northLat, eastLong, [], westLong, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('northLat, eastLong, southLat and westLong must all be numbers.');
      done();
    });
  });

  it('returns error when westLong is not a number', (done) => {
    boundingBox(northLat, eastLong, southLat, {}, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('northLat, eastLong, southLat and westLong must all be numbers.');
      done();
    });
  });

  it('returns error when northLat is an invalid latitude', (done) => {
    boundingBox(91.01111111, eastLong, southLat, westLong, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Latitude must be between -90 and 90');
      done();
    });
  });

  it('returns error when southLat is an invalid latitude', (done) => {
    boundingBox(northLat, eastLong, 178.123456789, westLong, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Latitude must be between -90 and 90');
      done();
    });
  });

  it('returns error when eastLong is an invalid longitude', (done) => {
    boundingBox(northLat, 231.123456789, southLat, westLong, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Longitude must be between -180 and 180');
      done();
    });
  });

  it('returns error when westLong is an invalid longitude', (done) => {
    boundingBox(northLat, eastLong, southLat, 181.987654321, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('Longitude must be between -180 and 180');
      done();
    });
  });

  it('returns error when northLat is smaller than southLat', (done) => {
    boundingBox(northLat - southLat, eastLong, southLat, westLong, (err, roads) => {
      should.exist(err);
      should.not.exist(roads);
      err.message.should.equal('northLat must be greater than southLat.');
      done();
    });
  });

  it('returns correct roads when northLat and southLat are equal', (done) => {
    boundingBox(northLat, eastLong, northLat, westLong, (err, roads) => {
      should.not.exist(err);
      should.exist(roads);
      roads.should.be.an('array');
      roads[0].should.be.an('object');
      roads[0].should.have.property('name');
      roads[0].should.have.property('type');
      done();
    });
  });

  it('returns empty array when bounding box is all ocean', (done) => {
    boundingBox(14.7898478659, -38.1601217896, 14.0850962343, -39.5743702909, (err, roads) => {
      should.not.exist(err);
      should.exist(roads);
      roads.should.be.an('array');
      roads.should.have.length(0);
      done();
    });
  });

  it('returns roads when bounding box is part ocean', (done) => {
    boundingBox(51.5707755427, 0.922651543, 51.5046221724, 0.6790402342, (err, roads) => {
      should.not.exist(err);
      should.exist(roads);
      roads.should.be.an('array');
      roads.length.should.be.greaterThan(0);
      roads[0].should.be.an('object');
      roads[0].should.have.property('name');
      roads[0].should.have.property('type');
      done();
    });
  });

  it('returns correct roads within small local bounding box', (done) => {
    boundingBox(northLat, eastLong, southLat, westLong, (err, roads) => {
      should.not.exist(err);
      should.exist(roads);
      roads.should.be.an('array');
      roads.length.should.be.greaterThan(0);
      roads[0].should.be.an('object');
      roads[0].should.have.property('name');
      roads[0].should.have.property('type');
      done();
    });
  });
});
