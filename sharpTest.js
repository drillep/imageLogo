const sharp = require('sharp');
const request = require('request')
// const fetchUrl = require('fetch').fetchUrl
// const fetch = require('node-fetch');
var newSrc = 'https://rawgit.com/drillep/imageLogo/master/drillep.jpg'
var originalsrc = 'https://rawgit.com/drillep/imageLogo/\{this\}/5050.png'
var src = originalsrc.replace('{this}', 'master')
var total = 0
var subtotal = 0

function modifyImage(src, dest, width, height) {
  request(src, { encoding: null }, function process(error, response, body) {
  if (error) return console.error(error);
  // fetchUrl(src, function(error, meta, body) {
  //   if(error) {
  //     console.log('fin')
  //   } else {
  // fetch(src)
  //   .then(res => res.buffer())
  //   .then(body =>
      sharp(body)
      .greyscale()
      .extract({ left: 0, top: 0, width: 308, height: 156 })
      .pipe(roundedCornerResizer)
      .raw()
      .toBuffer(function(err, data) {
        for (b of data) {
          subtotal++
          total += parseInt(b,10)
        }
        total = total/subtotal
        console.log('the total is ' + total)
      })
      // .toFile(dest)
    })
    console.log('return: ', total)
    console.log('hey')
    // console.log(returnValue)
  }

console.log(originalsrc)
console.log(src)
modifyImage(newSrc, 'modifiedImage.jpg', 1920, 1080);
console.log('after async' + total)

const roundedCorners = new Buffer(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    .resize(1920, 1080)
    .overlayWith(roundedCorners, { cutout: true })
    .png();
