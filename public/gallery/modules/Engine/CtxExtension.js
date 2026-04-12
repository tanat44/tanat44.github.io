const DEG_TO_RAD = Math.PI / 180;

export class CtxExtension {
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
  }

  blur(f, pixel = 10) {
    this.ctx.filter = `blur(${pixel}px)`;
    f();
    this.resetFilter();
  }

  calculateAngleAnimation(degPerSec) {
    const time = new Date();
    const angle =
      (time.getMilliseconds() / 1000 + time.getSeconds()) * degPerSec;
    return angle;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawImageFitWidth(image, x, y, rot, drawWidth, center = true) {
    const ratio = image.width / image.height;
    const drawHeight = drawWidth / ratio;

    // shift canvas
    this.ctx.translate(x, y);
    this.ctx.rotate(rot * DEG_TO_RAD);

    if (center) {
      this.ctx.drawImage(
        image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
    } else {
      this.ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
    }

    this.resetTransform();
  }

  drawImageFitHeight(image, x, y, rot, drawHeight, center = true) {
    const ratio = image.width / image.height;
    const drawWidth = drawHeight * ratio;

    // shift canvas
    this.ctx.translate(x, y);
    this.ctx.rotate(rot * DEG_TO_RAD);

    if (center) {
      this.ctx.drawImage(
        image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
    } else {
      this.ctx.drawImage(image, 0, 0, drawHeight, drawHeight);
    }

    this.resetTransform();
  }

  drawRect(x, y, w, h, color, opacity = 1.0) {
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = opacity;
    this.ctx.fillRect(x, y, w, h);
    this.ctx.globalAlpha = 1.0;
  }

  drawText(text, color, x, y, size = 14, align = "center") {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px Courier`;
    this.ctx.textAlign = align;

    const lines = text.split("\n");
    lines.forEach((line, index) => {
      this.ctx.fillText(line, x, y + size * index);
    });
  }

  end() {
    this.ctx.restore();
  }

  applyFilter(filter, f) {
    this.ctx.filter = filter;
    f();
    this.resetFilter();
  }

  get height() {
    return this.ctx.canvas.height;
  }

  resetFilter() {
    this.ctx.filter = "none";
  }
  resetTransform() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  start() {
    this.clear();
    this.ctx.save();
  }

  get width() {
    return this.ctx.canvas.width;
  }
}
