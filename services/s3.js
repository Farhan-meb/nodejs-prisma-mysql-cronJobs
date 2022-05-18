const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const config = require('../config');
const sharp = require('sharp');

const { BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_KEY } = config.s3.public;

const s3 = new S3({
    region: BUCKET_REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
});

const uploadImage = async function (file) {
    const fileStream = fs.createReadStream(file.path);

    const buffer = fs.readFileSync(file.path);

    const data = await sharp(buffer)
        .rotate()
        .toFormat('webp')
        .webp({ quality: 15 })
        .withMetadata({
            exif: {
                IFD0: {
                    Copyright: 'ShohozDeal Ltd',
                },
            },
        })
        .toBuffer();

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Body: data,
        ContentType: 'image/webp',
        Key: 'images/' + file.filename + '.webp',
    };

    return s3.upload(uploadParams).promise();
};

const uploadOriginalImage = async function (file) {
    const buffer = fs.readFileSync(file.path);

    const data = await sharp(buffer).toBuffer();

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Body: data,
        ContentType: 'image/webp',
        Key: 'images/' + file.filename + '.webp',
    };

    return s3.upload(uploadParams).promise();
};

const uploadBase64File = async function (data, keyName) {
    const bufferData = Buffer.from(
        data.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
    );

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Body: bufferData,
        ContentEncoding: 'base64',
        ContentType: 'image/png',
        Key: 'qrcodes/' + keyName + '.png',
    };

    return s3.upload(uploadParams).promise();
};

const uploadPdfFile = async function (file) {
    const pdf = fs.readFileSync(file.path);

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Body: pdf,
        contentType: 'application/pdf',
        Key: 'pdfs/' + file.filename + '.pdf',
    };

    return s3.upload(uploadParams).promise();
};

const uploadDocuments = async function (file) {
    const buffer_file = fs.readFileSync(file.path);

    const uploadParams = {
        Bucket: BUCKET_NAME,
        Body: buffer_file,
        Key: 'files/' + file.filename + '.csv',
        ContentType: 'application/octet-stream',
        CacheControl: 'public, max-age=86400',
    };

    return s3.upload(uploadParams).promise();
};

// const deleteFile = async (file) => {
//     const deleteParams = {
//         Bucket: BUCKET_NAME,
//         Key: 'images/' + file.filename + '.webp',
//     };
//     await s3.deleteObject(deleteParams);
// };

module.exports = {
    uploadImage,
    uploadPdfFile,
    uploadOriginalImage,
    uploadBase64File,
    uploadDocuments,
    //deleteFile,
};
