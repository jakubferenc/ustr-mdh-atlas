export const dataUrlToBlob = (url) => {
  const arr = url.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const str = atob(arr[1]);
  let length = str.length;
  const uintArr = new Uint8Array(length);
  while (length--) {
      uintArr[length] = str.charCodeAt(length);
  }
  return new Blob([uintArr], { type: mime });
};

export const resize = async (image, width) => {

  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    // Read the file
    reader.readAsDataURL(image);

    // Manage the `load` event
    reader.addEventListener('load', function (e) {
      // Create new image element
      const ele = new Image();
      ele.addEventListener('load', function () {
        // Create new canvas
        const canvas = document.createElement('canvas');

        // Draw the image that is scaled to `ratio`
        const context = canvas.getContext('2d');
        const w = width;
        const h = width * ele.height/ele.width;
        canvas.width = w;
        canvas.height = h;
        context.drawImage(ele, 0, 0, w, h);

        // Get the data of resized image
        'toBlob' in canvas
          ? canvas.toBlob(function (blob) {
            resolve(blob);
          }, "image/webp")
          : resolve(dataUrlToBlob(canvas.toDataURL()));
      });

      // Set the source
      ele.src = e.target.result;
    });

    reader.addEventListener('error', function (e) {
      reject();
    });
  });

}
