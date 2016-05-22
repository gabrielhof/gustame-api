var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var connection = null;

mongoClient.connect(process.env.MONGO_URL || "mongodb://localhost:27017/gustame", function(error, db) {
  connection = db;
  
  connection.createCollection("pratos");
  connection.createCollection("pedidos");
});

router.get('/pratos', function(req, res, next) {

  var pratos = connection.collection("pratos");

  pratos.find().toArray(function(data) {
    console.log(data);

    res.json([
      {
        id: 1,
        nome: "Pudim",
        descricao: "Delicioso pudim!",
        imagemUrl: "http://s.glbimg.com/po/rc/media/2015/11/10/12_07_13_265_pudim_de_leite_condensado_4.jpg",
        cozinheiro: {
          nome: "Gabriel Hoff",
          cidade: "Novo Hamburgo",
          imagemUrl: "http://www.gravatar.com/avatar/39ea753c11ef1d94e09c1a9265767b4a"
        }
      }
    ]);
  });
});

router.get('/pratos/:id', function(req, res, next) {
  var pratos = connection.createCollection("pratos");

  pratos.find({"_id": ObjectId(req.params.id)}).toArray(function(data) {
    console.log(data);

    res.json({
      id: 1,
      nome: "Pudim",
      descricao: "Delicioso pudim!",
      imagemUrl: "http://s.glbimg.com/po/rc/media/2015/11/10/12_07_13_265_pudim_de_leite_condensado_4.jpg",
      cozinheiro: {
        nome: "Gabriel Hoff",
        cidade: "Novo Hamburgo",
        imagemUrl: "http://www.gravatar.com/avatar/39ea753c11ef1d94e09c1a9265767b4a"
      }
    });
  });
});

router.post('/pedidos', function(req, res, next) {
  var pedido = req.body;
  res.json(pedido);
});

module.exports = router;
