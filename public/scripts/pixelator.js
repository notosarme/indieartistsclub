// MODIFIED FROM https://github.com/miguelmota/pixelate

function disableSmoothRendering(ctx) {
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

class Pixelate {
  constructor(image, opts = {}) {
    this.image = image;
    this.setAmount(opts.amount);

    const imageLoaded = () => {
      this.imageUrl = image.src;
      this.width = image.clientWidth;
      this.height = image.clientHeight;

      this.canvas = document.createElement('canvas');
      this.canvas.style.display = 'none'; 
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
        'image-rendering: -moz-crisp-edges;' + // FireFox
        'image-rendering: -o-crisp-edges;' +  // Opera
        'image-rendering: -webkit-crisp-edges;' + // Chrome
        'image-rendering: crisp-edges;' + // Chrome
        'image-rendering: -webkit-optimize-contrast;' + // Safari
        'image-rendering: pixelated; ' + // Future browsers
        '-ms-interpolation-mode: nearest-neighbor;'; // IE

      this.ctx = this.canvas.getContext('2d');
      this.ctx = disableSmoothRendering(this.ctx);

      this.image.parentNode.replaceChild(this.canvas, this.image);

      this.pixelImage = new Image();
      this.pixelImage.onload = () => {
        this.ready = true;
        this.render();
      };
      this.pixelImage.src = this.imageUrl;
    };

    if (this.image.complete) {
      imageLoaded();
    }

    this.image.onload = imageLoaded;
  }

  setAmount(amount) {
    this.amount = 1 - (amount || 0);
    return this;
  }

  setWidth(width) {
    const height = (this.height / this.width) * width;
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = disableSmoothRendering(this.ctx);
    return this;
  }

  render() {
    if (!this.ready) return this;
    const w = this.width * (this.amount <= 0 ? 0.01 : this.amount);
    const h = this.height * (this.amount <= 0 ? 0.01 : this.amount);
    // render smaller image
    this.ctx.drawImage(this.pixelImage, 0, 0, w, h);
    // stretch the smaller image
    this.ctx.drawImage(this.canvas, 0, 0, w, h, 0, 0, this.width, this.height);

    this.canvas.style.display = 'block'; // Display the pixelation

    return this;
  }
}


export default Pixelate;
