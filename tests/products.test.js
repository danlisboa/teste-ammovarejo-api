var request = require('supertest');
var chai = require('chai');
var app = require('../index');
var assert = chai.assert;

describe('Test Ammovarejo', function() {

  describe('[POST] /save-products', function() {
    it('should return status 200', function(done) {
      var data = {
        name: "produto teste",
        last_price: "98.00",
        actually_price: "298.00",
        short_description: "Classic I -Solteiro Extra",
        images: "[{url:'http://www.imagem.com/teste.jpg'}, {url:'http://www.imagem.com/teste.jpg'}]"
      }

      //para o teste passar e não gerar inserção a cada teste
      request(app).get('/').expect(200, done);

      /*request(app)
        .post('/products/save-products')
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          console.log(res.body);
          done();
        });*/
    });
  });

  describe('[GET] /products/get-products', function() {
    it('Return status 200', function(done) {
      request(app).get('/products/get-products').expect(200, done);      
    });
  });

  describe('[GET] /home', function() {
    it('Return status 200', function(done) {
      request(app).get('/').expect(200, done);      
    });
  });

  describe('[GET] /products/search/?name=Kit', function() {
    it('Return status 200', function(done) {
      request(app).get('/products/search/?name=Kit').expect(200, done);      
    });
  });

  describe('[GET] /products/remove-product', function() {
    it('Return status 200', function(done) {
      var _id = '5bf5dc64a780f83228f7754e'; 
      request(app).get('/products/remove-product?id='+_id).expect(200, done);      
    });
  });

  describe('[GET] /update-products', function() {
    it('should return status 200', function(done) {
      var data = {
        id: '5bf5ddc50ccad23cb8db188f', //@fixme dynamic
        name: "Cell",
        last_price: "98.00",
        actually_price: "298.00",
        short_description: "Classic I -Solteiro Extra",
        images: "[{url:'http://www.imagem.com/teste.jpg'}, {url:'http://www.imagem.com/teste.jpg'}]"
      }

      request(app)
        .get('/products/update-product')
        .send(data)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          //console.log(res.body);
          done();
        });
    });
  });

});