'use strict';
const Readable = require('stream').Readable;
const PassThrough = require('stream').PassThrough;
const fs = require('fs');
const axios = require('axios');

const bufferToStream = function (buffer) {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
};

const convertImage = function (image, outputFormat) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        const passthrough = new PassThrough();
        ffmpeg()
            .input(image)
            .outputFormat(outputFormat)
            .on('error', reject)
            .stream(passthrough, { end: true });
        passthrough.on('data', (data) => chunks.push(data));
        passthrough.on('error', reject);
        passthrough.on('end', () => {
            const originalImage = Buffer.concat(chunks);
            const editedImage = originalImage
                // copy everything after the last 4 bytes into the 4th position
                .copyWithin(4, -4)
                // trim off the extra last 4 bytes ffmpeg adde
                .slice(0, -4);
            return resolve(editedImage);
        });
    });
};

const download_image = (url, image_path) => {
    axios({
        url,
        responseType: 'stream',
    }).then(
        (response) =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on('finish', () => resolve())
                    .on('error', (e) => reject(e));
            })
    );
};

module.exports = {
    convertImage,
    bufferToStream,
    download_image,
};
