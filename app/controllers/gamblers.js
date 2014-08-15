'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

//exports.remove = function(id, cb){
//  Gambler.findyById(req.params.id, function(err, gambler){
//    Gambler.removeAsset();
//    Gambler.save(req.params.name, function(){
//      res.send({id:req.paraams.id, name:req.params.name, isDivorced:true/false, cash:cash});
//    });
//  });
//};
