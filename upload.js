const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const fileName = "cat.jpg";

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