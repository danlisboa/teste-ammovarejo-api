var express = require('express');
var router = express.Router();
var productModel = require('../models/products.model');

router.get('/', function(req, res){
  res.status(200).send('API - products');
});

router.post('/save-products', function(req, res){ 
  if (!req.body.name) {
    return res.status(400).json({
      message: 'Nenhum produto enviado'
    });
  }
  
  var product = new productModel(req.body);
  
  product.save().then(function(r){
    res.status(200).json({message: req.body});
  }).catch(function(err){
    res.status(400).json({message: err.message});
  });



});

router.get('/get-products', function(req, res) {
  var offset = req.query.offset ? Number(req.query.offset) : 0;
  var limit = req.query.limit ? Number(req.query.limit) : 5;
  var productsObj = {};
  
  productModel.find().limit(limit).skip(offset).then(function(rp) {    
    productModel.find().then(function(rc) {
      productsObj.list = rp;
      productsObj.num_rows = rc.length;

      res.status(200).json(productsObj);
    });

  }).catch(function(err){
    res.status(400).json(err);
  });
});

router.get('/search', function(req, res){
  productModel.find({name: { $regex: '.*' + req.query.name + '.*' } }).limit(5).then(function(r){
    res.status(200).json(r);
  }).catch(function(err){
    res.status(400).json(productCollections);
  });
});

router.get('/update-product', function(req, res){
  var query = { _id: req.query.id ? req.query.id : req.body.id};
  
  productModel.updateOne(query, req.body).then(function(r){
    res.status(200).json({message: 'item '+ req.query.id+' atualizado'});
  }).catch(function(err){
    res.status(200).json({message: 'item '+ req.query.id+' atualizado'});
  });
  
});

router.get('/remove-product', function(req, res){
  productModel.findByIdAndDelete({
    _id: req.query.id
  }).then(function(){
    res.status(200).json({message: 'item '+req.query.id+' removido'})
  });
});

module.exports = router;