const express = require('express');
const router = express.Router();
const Minio = require('minio');

const app = express();
const port = 8089;
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello Storage!')
})


// const minioClient = new Minio.Client({
//     endPoint: 'play.min.io',
//     port: 9000,
//     useSSL: true,
//     accessKey: 'Q3AM3UQ867SPQQA43P2F',
//     secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
// });
const minioClient = new Minio.Client({
    endPoint: '192.168.1.47', // server minio ip - your local ip address
    port: 9000,
    useSSL: false,
    accessKey: 'AKIAIOSFODNN7EXAMPLE',
    secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
});

router.post("/s3upload/presigned", (req, res) => {
    const {bucket, path, fileName } = req.body ;
    const expireOneDay = 24*60*60; // expires in a day.
    const expireTwoMinute = 2*60;
    
    minioClient.presignedPutObject(bucket, fileName, expireTwoMinute, (err, presignedUrl) => 
    {
        if (err) return console.log(err)
        res.send(presignedUrl);
    })
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})