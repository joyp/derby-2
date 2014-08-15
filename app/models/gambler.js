'use strict';
var Mongo    = require('mongodb'),
    _        = require('lodash');

function Gambler(o){
  this.name       = o.name;
  this.photo      = o.photo;
  this.spouse     = o.spouse;
  this.cash       = parseFloat(o.cash);
//  this.assets     = this.assets.split(',').map(function(a){return a.trim();});
  this.assets     = o.assets;
  this._results   = {};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.create = function(o, cb){
  var g = new Gambler(o);
  console.log(g);
  Gambler.collection.save(g, cb);
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, obj){
    var gambler = changePrototype(obj);
    cb(gambler);
  });
};

Gambler.prototype.addAsset = function(a, cb){
  this.assets.push(a);
  Gambler.collection.update({_id:this._id}, {$push:{assets:a}}, cb);
};

Gambler.prototype.removeAsset = function(id, cb){
  var _id = Mongo.ObjectID(id);
  var g = Gambler.findById(_id);

};
module.exports = Gambler;

// PRIVATE FUNCTIONS//

function changePrototype(obj){
  return _.create(Gambler.prototype, obj);
}
