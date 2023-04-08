const Jimp = require('jimp');

module.exports = async function (context, inBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", inBlob.length, "Bytes");

    try {
        // Read input image from inputBlob
        const image = await Jimp.read(inBlob);

        // Resize the image to 64x64 pixels
        image.resize(64, 64);

        // Convert the image to a buffer
        const outputBuffer = await image.getBufferAsync(Jimp.AUTO);

        // Set the output binding to the resized image buffer
        context.bindings.outBlob = outputBuffer;

        context.log('Thumbnail created successfully');

    } catch (error) {
        context.log.error('Error processing image: ', error);
    }
};