const sharp = require('sharp');
const request = require('request')
var src = 'https://raw.githubusercontent.com/jwagner/smartcrop-gm/master/test/flower.jpg';


function modifyImage(src, dest, width, height) {
  request(src, { encoding: null }, function process(error, response, body) {
    if (error) return console.error(error);
      sharp(body)
        .resize(width, height)
        .rotate(90)
        .greyscale()
        .toFile(dest);
    });
}

modifyImage(src, 'flower-square.jpg', 200, 200);

sharp(Buffer)
  .resize(320, 240)
  .toFile('output.webp', (err, info) => {} );
  // A Promises/A+ promise is returned when callback is not provided.
sharp('dssm.png')
  .rotate()
  .resize(200)
  .toBuffer()
  .then( data => {} )
  .catch( err => {} );

const roundedCorners = new Buffer(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    .resize(200, 200)
    .overlayWith(roundedCorners, { cutout: true })
    .png();

readableStream
  .pipe(roundedCornerResizer)
  .pipe(writableStream);
