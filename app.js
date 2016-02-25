var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/carAPI');

var Car = require('./models/carModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/carRoutes')(Car);

app.use('/api/Cars', bookRouter);


app.get('/', function(req, res){
    res.send('Check this API');
});

app.listen(port, function(){
    console.log( " Gulp is running on port:" + port);
});