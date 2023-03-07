const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// const image = new Image();
// image.src = './konon.jpg';

// image.addEventListener('load', () => {
//   canvas.width = 500;
  
//   context.transform(1, Math.tan(degreesToRadians(20)), Math.tan(degreesToRadians(20)), 1, 0, 0);
//   context.fillStyle = 'red';
//   context.fillRect(0, 0, 500, 500);
//   context.drawImage(image, 30, 0);
// });

// image.addEventListener('error', (error) => {
//   console.error('Error loading image:', error);
// });

// function degreesToRadians(deg) {
//   return deg * Math.PI / 180;
// }


// function

var myDegreeX = 35;
var myDegreeY = -80;
var myWidth = 300;
var myHeight = 300;

const { width, height } = getSkewedSize(myWidth, myHeight, myDegreeX, myDegreeY);
const movedX = myDegreeX < 0 ? width - myWidth : 0;
const movedY = myDegreeY < 0 ? height - myHeight : 0;

canvas.width = width > 0 ? width : canvas.width - width;
canvas.height = height > 0 ? height : canvas.height - height;

console.log(width, height)

// show unskewed as red:
context.fillStyle = 'rgba(255,0,0,.3)';
context.fillRect(0,0,myWidth,myHeight);

// show skewed as green:
context.translate(movedX, movedY);
context.transform(1,setSkew(myDegreeY),setSkew(myDegreeX),1,0,0);
context.fillStyle = 'rgba(0,255,0,.3)';
context.fillRect(0,0,myWidth,myHeight);

// Show where we assume the length to be:
context.setTransform(1,0,0,1,0,0);
var widthSkewed = setSkew(myDegreeX)*myHeight;
var heightSkewed = setSkew(myDegreeY)*myWidth;
context.fillStyle = 'black';
context.fillRect(widthSkewed + (myDegreeX >= 0 ? myWidth : 0), myHeight, 4, 4);
context.fillStyle = 'red';
context.fillRect(myWidth, heightSkewed + (myDegreeY > 0 ? myHeight : 0), 4, 4);

function getRadians(degrees){
  return degrees * (Math.PI / 180);
}
function setSkew(degrees){
  return Math.tan(getRadians(degrees));
}
function getSkewedSize(width, height, degreeX, degreeY) {
  /* https://stackoverflow.com/questions/9281320/calculate-new-width-when-skewing-in-canvas */
  /* http://jsfiddle.net/LBzUt/33/ */

  degreeX = Math.abs(degreeX);
  degreeY = Math.abs(degreeY);

  const widthSkewed = setSkew(degreeX) * height;
  const heightSkewed = setSkew(degreeY) * width;

  return {
    width: Math.round(widthSkewed + (degreeX >= 0 ? width : 0)),
    height: Math.round(heightSkewed + (degreeY > 0 ? height : 0)),
  };
}