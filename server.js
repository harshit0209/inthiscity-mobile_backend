const express = require('express')
const app = express();

var formidable = require('formidable'); //for fetching image path from home.pug form

var AWS = require("aws-sdk");
var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' }); //reference of credential//saved in c/users/.aws/credentials
AWS.config.credentials = credentials;
// Set the region 
AWS.config.update({ region: 'ap-south-1' });
// import AWS object without services
var AWS = require('aws-sdk/global');
// import individual service
var S3 = require('aws-sdk/clients/s3');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' }); //init dynamodb
//____________________________________________for receving post parameter formbody
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//____________________________________________

const server = app.listen(80, () => {
    console.log(`Express running -> PORT ${server.address().port}`);
});



app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('login')
});

app.get('/cred', (req, res) => { res.send(console.log("Access key:", AWS.config.credentials.secretAccessKey)); });

app.post('/home', (req, res) => {
    console.log(req.headers);
    if (req.body.key == 'Gmvz$=GY3B*UPCPQ' && req.body.id == 'admin') {
        res.render('home', {
            val: req.body.key
        });
    } else {
        res.render('404', {
            val: req.query.key
        });
    }
});

app.post('/addevent', (req, res) => {
    var random = require('./otherfun.js');
    var ranval = random.getRanKey();
    console.log("ranval: " + ranval);

    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.parse(req, function(err, fields, files) {



        var u = require('./upload.js');
        /*  var popup = require('popups');

        popup.alert({
            content: ranval
        });
*/
        console.log("Cover Image is : " + files["img-cover"].path);
        u.uploadImage(files["img-cover"].path, ranval + ".png", ranval);

        var len = files.img.length;
        for (var i = 0; i < len; i++) {


            u.uploadImage(files.img[i].path, ranval + i + ".png", ranval);
            console.log("imagepath: " + files.img[i].path);
            console.log("nameS3: " + ranval + "/" + ranval + i + ".png");


        } //upload multiple files

        fields.image = ranval + ".png";
        fields.imageTotal = len;
        var wri = require("./write.js"); //
        wri.putJson(ranval, fields); //write data to dynamodb

        console.log("files : " + files);



        res.render('home')

    });
});

app.get('/add', (req, res) => {
    var o = require("./write.js");
    o.putJson("this is data");
});

app.get('/*', (req, res) => {
    res.render("404");
});