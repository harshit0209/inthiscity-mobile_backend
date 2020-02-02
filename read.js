var AWS = require("aws-sdk");

var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' }); //reference of credential//saved in c/users/.aws/credentials
AWS.config.credentials = credentials;
// Set the region 
AWS.config.update({ region: 'ap-south-1' });


// import AWS object without services
var AWS = require('aws-sdk/global');
// import individual service
var S3 = require('aws-sdk/clients/s3');


let docClient = new AWS.DynamoDB.DocumentClient();
let reada = function() {


    var params = {
        TableName: "Events",
        Key: {
            "Title": "Example Title"
        }
    };
    docClient.get(params, function(err, data) {
        if (err)
            console.log("error");
        else
            console.log("success" + JSON.stringify(data, null, 2));
    });
};
reada();