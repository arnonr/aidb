const getBase64Image = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
};

export default getBase64Image;
