const videoElem = document.getElementById("screen-view");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

document.getElementById("share-screen").addEventListener("click", async function() {
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia();
    document.getElementById("take-screenshot").disabled = false;
  } catch (err) {
    console.error("Error: " + err);
  }
});

document.getElementById("take-screenshot").addEventListener("click", function() {
  canvas.width = videoElem.videoWidth;
  canvas.height = videoElem.videoHeight;
  ctx.drawImage(videoElem, 0, 0, videoElem.videoWidth, videoElem.videoHeight);
  var dataURL = canvas.toDataURL('image/png');

  Tesseract.recognize(
    dataURL,
    'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log('OCR Result:', text);
    document.getElementById('ocr-result').innerText = text;
  })
});
