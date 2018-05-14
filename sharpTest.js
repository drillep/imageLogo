const sharp = require('sharp');
const request = require('request')
var src = 'https://ichef.bbci.co.uk/redbutton-ichef/1920x1080/p0663jmv.jpg';


function modifyImage(src, dest, width, height) {
  request(src, { encoding: null }, function process(error, response, body) {
    if (error) return console.error(error);
      sharp(body)
        .resize(width, height)
        .greyscale()
        .extract({ left: 0, top: 0, width: 308, height: 156 })
        //.crop(sharp.strategy.entropy)
        //.pipe(roundedCornerResizer)
        .raw()
        .toBuffer(function(err, data) {
          // data is a Buffer containing uint8 values (0-255)
          // with each byte representing one pixel
          console.log(data)
          var myImg = data.map(parseInt)
          console.log(myImg)
        })
        // .toFile(dest);
    });
}

modifyImage(src, 'modifiedImage.png', 1920, 1080);

// sharp(Buffer)
//   .resize(320, 240)
//   .toFile('output.webp', (err, info) => {} );
//   // A Promises/A+ promise is returned when callback is not provided.
// sharp('dssm.png')
//   .rotate()
//   .resize(200)
//   .toBuffer()
//   .then( data => {} )
//   .catch( err => {} );

const cropTopRight =
  sharp()
    .resize(200, 200)
    .crop(sharp.gravity.north)
    .png();

const roundedCorners = new Buffer(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    // .resize(200, 200)
    .overlayWith(roundedCorners, { cutout: true })
    .png();

// readableStream
//   .pipe(roundedCornerResizer)
//   .pipe(writableStream);
