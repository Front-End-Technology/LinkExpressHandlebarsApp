var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var app = express();

var jsondata = {"productList" : [{"name" : "IPhone", "price" : "450" ,"img" : "https://ss7.vzw.com/is/image/VerizonWireless/apple_iPhoneSE_Svr?fmt=jpg&bgc=f6f6f6&resmode=sharp2&qlt=80,1&wid=352&hei=717"} ,{"name" : "TV","price" : "1001","img" : "http://i.ebayimg.com/images/g/UZEAAOSwPcVVrSvR/s-l500.jpg"}, {"name" : "IPAD","price" : "900","img" : "http://thumbs.ebaystatic.com/images/g/jBEAAOSwPCVYBYOC/s-l225.jpg"}, {"name" : "Laptop","price" : "560","img" : "http://i.ebayimg.com/00/z/IhAAAOSw4CFYrLI1/$_57.png"}] };

app.engine('handlebars', exphbs({defaultLayout: 'index',partialsDir : __dirname + '/views'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {    
    res.render('home');

});

app.get('/products', function (req, res) {
	console.log("test");
    res.render('products',jsondata);
});

app.get('/myaccount', function (req, res) {
    res.render('myaccount',{layout: false});
});

app.get('/productdetails/:productName', function (req, res) {
	productList = jsondata.productList;
    for(var i = 0; i < productList.length; i++) {
        if(productList[i].name == req.params.productName) {
            res.render('productDetails',productList[i]);
        }
    }
 });
console.log("server running");
app.listen(3000);