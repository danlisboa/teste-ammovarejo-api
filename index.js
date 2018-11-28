var express = require('express');
var app = express();
var productRoute = require('./routes/products');
var mongoosee = require('mongoose');
var config = require('./config/index');
var parser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(parser.json());

//connection
var store = mongoosee.connect(config.bd.url, { useNewUrlParser: true });

store.then(function(r){
  //console.log(config.bd.msg_connected);
}).catch(function(err){
  //console.log(config.bd.msg_not_connected)
});

//rotas
app.get('/', function (req, res) {
  res.status(200).send(config.wellcome_msg);
});

app.use('/products', productRoute);

//server
app.listen(config.port, function () {
  console.log(config.wellcome_msg);
});

module.exports = app;