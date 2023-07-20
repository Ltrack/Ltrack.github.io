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
  // do something with dataURL here, e.g. display it in an img element
});
