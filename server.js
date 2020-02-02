const express = require('express')
const app = express();
const people = require('./people.json');

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


app.get('/dynamo', (req, res) => {
    // Create the DynamoDB service object


    var params = {
        TableName: 'Events',
        Item: {
            'Title': { S: 'hello' },
            'CUSTOMER_NAME': { S: 'helllooooo harshit' }
        }
    };

    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.CUSTOMER_NAME);
        }
    });

});




// POST http://localhost:8080/api/users
// parameters sent with 




app.post('/home', (req, res) => {
    console.log(req.headers);
    if (req.body.key == 'pass') {
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

    console.log(req.body);
    //    putdata(req.body);

    const fs = require('fs');
    const AWS = require('aws-sdk');

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const fileName = req.body.img;

    const uploadFile = () => {
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            const params = {
                Bucket: 'repositoryimg', // pass your bucket name
                Key: fileName, // file will be saved as testBucket/contacts.csv
                Body: fs.createReadStream(fileName)
            };
            s3.upload(params, function(s3Err, data) {
                if (s3Err) throw s3Err
                console.log(`File uploaded successfully at ${data.Location}`)
            });
        });
    };

    uploadFile();


});

function putdata(data) {

    let docClient = new AWS.DynamoDB.DocumentClient();
    let save = function() {

        var input = {
            "Title": "Example Title",
            "updatedby": "Harshit",
            "arr": data
        };
        var params = {
            TableName: "Events",
            Item: input
        };
        docClient.put(params, function(err, data) {
            if (err)
                console.log("error");
            else {
                console.log("success");

            }
        });
    };
    save();
}