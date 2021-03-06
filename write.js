    module.exports = {
        putJson: function(key, json) {


            console.log("doctitle:" + key);
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
            let save = function() {

                var input = {
                    "EventID": key,
                    "updatedby": "admin",
                    "arr": json
                };
                var params = {
                    TableName: "Events",
                    Item: input
                };
                docClient.put(params, function(err, data) {
                    if (err)
                        console.log("error");
                    else {
                        console.log("success-events");

                    }
                });
                var eventid = key;
                var paid = true;
                var loc = json.location;
                var input = {
                    "EventID": eventid,
                    "paid": json.paid,
                    "location": loc
                };
                var params = {
                    TableName: "Paid-Events",
                    Item: input
                };
                docClient.put(params, function(err, data) {
                    if (err)
                        console.log("error");
                    else {
                        console.log("success-Paid-events");

                    }
                });
            };
            save();
        }

    }