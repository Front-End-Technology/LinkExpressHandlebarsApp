var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var mysql = require('mysql');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

var jsondata =  {"productList" : [{"name" : "IPhone", "price" : "450" ,"img" : "https://ss7.vzw.com/is/image/VerizonWireless/apple_iPhoneSE_Svr?fmt=jpg&bgc=f6f6f6&resmode=sharp2&qlt=80,1&wid=352&hei=717"} ,{"name" : "TV","price" : "1001","img" : "http://i.ebayimg.com/images/g/UZEAAOSwPcVVrSvR/s-l500.jpg"}, {"name" : "IPAD","price" : "900","img" : "http://thumbs.ebaystatic.com/images/g/jBEAAOSwPCVYBYOC/s-l225.jpg"}, {"name" : "Laptop","price" : "560","img" : "http://i.ebayimg.com/00/z/IhAAAOSw4CFYrLI1/$_57.png"}] };

app.engine('handlebars', exphbs({defaultLayout: 'index',partialsDir : __dirname + '/views'}));
app.set('view engine', 'handlebars');


var connection = mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"nodeproduct"
})
connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});






app.get('/', function (req, res) {    
    res.render('home');

});

app.get('/products', function (req, res) {
	console.log("test123");
var queryString = 'SELECT * FROM product';
connection.query(queryString, function(err, rows,fields) {
    if (err) {
        console.log('Error in returning data'+err.stack);
    return;
    }
 
    
        console.log('Product Name: ', rows);
        jsondata = { 'productList' : rows};
        res.render('products',{rows:rows});
    
});
 

    
});

app.get('/myaccount', function (req, res) {
    res.render('myaccount',{layout: false});
});

app.get('/productdetails/:id', function (req, res) {
	productList = jsondata.productList;
    for(var i = 0; i < productList.length; i++) {
        if(productList[i].ID == req.params.id) {
            res.render('productDetails',productList[i]);
        }
    }
 });

app.get('/addproduct', function (req, res) {
    res.render('addproduct');
});

app.post('/addproduct', function (req, res) {

var product1 = { 'name': req.body.name, 'category': req.body.category, 'price': req.body.price, 'image': req.body.img};

connection.query('INSERT INTO product SET ?', product1, function(err,res){
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});


    res.render('home');
});


console.log("server running");

app.listen(3000);