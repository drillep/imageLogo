const sharp = require('sharp');
const request = require('request')
var src = 'https://rawgit.com/drillep/imageLogo/master/5050.png'


function modifyImage(src, dest, width, height) {
  request(src, { encoding: null }, function process(error, response, body) {
    if (error) return console.error(error);
      sharp(body)
        .greyscale()
        .resize(1, 1)
        //.extract({ left: 0, top: 0, width: 308, height: 156 })
        //.pipe(roundedCornerResizer)
        .raw()
        .toBuffer(function(err, data) {
          var total = 0
          var subtotal
          for (b of data) {
            console.log(parseInt(b,10))
            total += parseInt(b,10)
          }
          console.log('the total is ' + total)
        })
        // .toFile(dest);
    });
}

modifyImage(src, 'modifiedImage.png', 189, 189);

const roundedCorners = new Buffer(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    // .resize(200, 200)
    .overlayWith(roundedCorners, { cutout: true })
    .png();
