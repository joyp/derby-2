/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'derby-test',
//    _         = require('lodash'),
    Mongo     = require('mongodb');

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should save a Gambler object to the database', function(done){
      Gambler.create({name:'Bob', photo:'http://myhairstylespictures.com/wp-content/uploads/2014/03/short-professional-male-hairstyles-photo.jpg', spouse:{name:'Sara', photo:'http://media-cache-ak0.pinimg.com/736x/5a/a6/99/5aa69946dc23cd5c66a79f659a76f3ba.jpg'}, cash:10000.00, assets:[{name:'Ring', photo:'http://www.houstondiamondoutlet.com/images/diamond_rings.jpg', value:4000}, {name:'House', photo:'http://youveneverheardofjentidwell.files.wordpress.com/2012/03/house.jpg', value:62000}, {name:'Car', photo:'http://www.picturesnew.com/media/images/car-image.jpg', value:17000}]}, function(err, gambler){
        expect(gambler._id).to.be.instanceof(Mongo.ObjectID);
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.cash).to.equal(10000);
        expect(gambler.name).to.equal('Bob');
        expect(gambler.photo).to.equal('http://myhairstylespictures.com/wp-content/uploads/2014/03/short-professional-male-hairstyles-photo.jpg');
        expect(gambler.assets).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a gambler by its id - as object id', function(done){
      Gambler.findById(Mongo.ObjectID('000000000000000000000002'), function(gambler){
        expect(gambler.name).to.equal('Alice');
        expect(gambler).to.be.instanceof(Gambler);
        done();
      });
    });
  });

  describe('#addAsset', function(){
    it('should add an asset to the gambler\'s asset array', function(done){
      var janet = Gambler.findById(Mongo.ObjectID('000000000000000000000003'), function(gambler){
        console.log(janet);
        janet.addAsset({name: 'ring', photo: 'ring.png', value:6000}, function(){
          expect(janet.assets).to.have.length(4);
          done();
        });
      });
    });
  });

});

