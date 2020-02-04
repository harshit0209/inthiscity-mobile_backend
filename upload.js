module.exports = {
    uploadImage: function(filee, namee, folder) {


        let filen = filee;
        let nam = namee;
        var bodyParser = require('body-parser');
        var formidable = require('formidable'); //for fetching image path from home.pug form
        const fs = require('fs');
        const AWS = require('aws-sdk');
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        const uploadFile = (file, name) => {
            console.log("file to upload : " + file);
            fs.readFile(file, (err, data) => {
                if (err) console.log("error: " + err);
                const params = {
                    Bucket: 'repositoryimg/events/' + folder, // pass your bucket name
                    Key: name, // file will be saved as testBucket/contacts.csv
                    Body: fs.createReadStream(file)
                };
                s3.upload(params, function(s3Err, data) {
                    if (s3Err) console.log("s3err " + s3Err);
                    else
                        console.log(`File uploaded successfully at ${data.Location}`)
                });
            });
        };
        uploadFile(filen, nam);
    }

}