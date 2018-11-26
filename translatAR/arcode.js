/////////////////////////
// Update with text
/////////////////////////

document.querySelector('#urlQrCode').addEventListener('change', updateARCode)

/////////////////////////
// Build Canvas
/////////////////////////

var canvas = document.createElement('canvas');
canvas.width  = 1024;
canvas.height = 1024;
canvas.style.width  = '512px';
canvas.style.height = '512px';
document.querySelector('#arcode-container').appendChild(canvas)

/////////////////////////
// Upload Hiro marker
/////////////////////////

var hiroImage = new Image;
hiroImage.onload = () => updateARCode();
hiroImage.src = './tools/hiro.png';

/////////////////////////
// Generate ARcode
/////////////////////////

function generateArCodeCanvas(canvas, text, onLoad) {
  var context = canvas.getContext('2d')
  context.drawImage(hiroImage, 0, 0, canvas.width, canvas.height);

  generateQrCodeImage(text, (qrCodeImage) => {
    context.drawImage(qrCodeImage, 
      canvas.width * 0.5, 
      canvas.height * 0.3, 
      canvas.width * 0.2, 
      canvas.height * 0.2);      
    onLoad && onLoad();
  })
}

function generateQrCodeImage(text, onLoaded){
  var container = document.createElement('div')
  var qrcode = new QRCode(container, {
    text: text,
    width: 256,
    height: 256,
    colorDark : '#000000',
    colorLight : '#ffffff',
  });

  var qrCodeImage = container.querySelector('img');
  qrCodeImage.addEventListener('load', () => onLoaded(qrCodeImage));
}

/////////////////////////
// Main executer
/////////////////////////

function updateARCode() {
  var urlQrCode = document.querySelector('#urlQrCode').value
  // generate the ar-code canvas
  generateArCodeCanvas(canvas, urlQrCode, () => {
    console.log('AR-code generated: ', urlQrCode)
  })
}

