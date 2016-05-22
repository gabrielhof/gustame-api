var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var connection = null;

mongoClient.connect(process.env.MONGO_URL || "mongodb://localhost:27017/gustame", function(error, db) {
  connection = db;
});

router.get('/pratos/', function(req, res, next) {
  var collection = connection.collection("pratos");

  collection.find().toArray(function(error, pratos) {
    res.json(pratos);
  });
});

router.get('/pratos/:id', function(req, res, next) {
  var collection = connection.collection("pratos");

  collection.findOne({"_id": ObjectId(req.params.id)}, function(error, prato) {
    res.json(prato);
  });
});

router.post('/pedidos', function(req, res, next) {
  var pedido = req.body;

  var collection = connection.collection("pedidos");

  collection.insert(pedido, function() {
    res.json(pedido);
  });
});

module.exports = router;
