import { Artwork } from "./Artwork.js";

const SHOW_TIME = 5; // second

export class ArtGallery {
  items;
  engine;
  currentItemIndex;
  time;

  // draw parameters
  stepSize;

  constructor(engine) {
    this.items = [];
    this.engine = engine;
    this.engine.animationCallback = (deltaTime) => this.animate(deltaTime);
    this.engine.mouseClickCallback = (e) => this.mouseClick(e);
    this.currentItemIndex = 0;
    this.time = 0;
  }

  animate(deltaTime) {
    this.time += deltaTime;

    if (this.time < SHOW_TIME) {
      this.drawSelectedItem();
      this.drawSelectedItemText();
    } else {
      this.time = 0;
      if (this.currentItemIndex === this.items.length - 1) {
        this.currentItemIndex = 0;
      } else {
        this.currentItemIndex++;
      }
    }
  }

  drawSelectedItem() {
    const item = this.items[this.currentItemIndex];
    if (!item) return;

    const w = this.engine.width;
    const h = this.engine.height;

    this.engine.ctx.blur(() => {
      this.engine.ctx.drawImageFitWidth(item.image, w / 2, h / 2, 0, w);
    });

    this.engine.ctx.drawImageFitHeight(item.image, w / 2, h / 2, 0, h);
  }

  drawSelectedItemText() {
    const item = this.items[this.currentItemIndex];
    if (!item) return;

    this.engine.ctx.drawText(
      `${this.currentItemIndex + 1}/${this.items.length}\nTitle: ${
        item.title
      }\nYear: ${item.year}\nLocation: ${item.location}\nMethod: ${
        item.method
      }`,
      "black",
      30,
      this.engine.height - 120,
      25,
      "left"
    );
  }

  initEvent() {
    this.engine.addEventListener("mousemove", (e) => this.onMouseMove(e));
  }

  async loadAsset(path) {
    const res = await fetch(path);
    const json = await res.json();

    const basePath = path.substring(0, path.lastIndexOf("/"));
    this.items = json.artworks.map((x) => Artwork.fromJson(x, basePath));
  }

  mouseClick(e) {
    const next = e.x > this.engine.width / 2;
    if (next) {
      if (this.currentItemIndex === this.items.length - 1)
        this.currentItemIndex = 0;
      else this.currentItemIndex++;
    } else {
      if (this.currentItemIndex === 0)
        this.currentItemIndex = this.items.length - 1;
      else this.currentItemIndex--;
    }
    this.time = 0;
  }
}
