import { Book } from "./Book.js";

const SIZE_PAD = 100;

export class BookGallery {
  books;
  engine;
  selectedBookIndex;

  // draw parameters
  stepSize;

  constructor(engine) {
    this.books = [];
    this.engine = engine;
    this.engine.animationCallback = (deltaTime) => this.animate(deltaTime);
    this.engine.mouseMoveCallback = (e) => this.mouseMove(e);
    this.selectedBookIndex = 0;
  }

  animate(deltaTime) {
    this.drawTitle();
    this.drawSelectedBookText();

    // all unselected book
    for (let i = 0; i < this.books.length; ++i) {
      if (i === this.selectedBookIndex) continue;
      this.books[i].draw(this.engine.ctx, deltaTime);
    }

    // draw selected book on top
    this.books[this.selectedBookIndex]?.draw(this.engine.ctx, deltaTime);
  }

  drawTitle() {
    this.engine.ctx.drawText(
      `Books that I read`,
      "black",
      this.engine.ctx.width / 2,
      45,
      20
    );
  }

  drawSelectedBookText() {
    const book = this.books[this.selectedBookIndex];
    if (!book) return;

    this.engine.ctx.drawText(
      `${this.selectedBookIndex + 1}/${this.books.length}\n${
        book.title
      }\nRead in: ${book.readDate()}`,
      "black",
      this.engine.ctx.width / 2,
      this.engine.ctx.height - 40
    );
  }

  initEvent() {
    this.engine.addEventListener("mousemove", (e) => this.onMouseMove(e));
  }

  async loadAsset(path) {
    const res = await fetch(path);
    const json = await res.json();

    const basePath = path.substring(0, path.lastIndexOf("/"));
    this.books = json.books.map((x) => Book.fromJson(x, basePath));
    this.stepSize = (this.engine.ctx.width - SIZE_PAD * 2) / this.books.length;

    // set book position
    const y = this.engine.ctx.height / 2 + 10;
    for (let i = 0; i < this.books.length; ++i) {
      const x = SIZE_PAD + i * this.stepSize;
      this.books[i].setPosition(x, y);
    }
  }

  mouseMove(e) {
    if (this.books.length === 0) return;
    const windowSize = this.engine.ctx.width / this.books.length;
    const newIndex = Math.floor(e.x / windowSize);

    if (
      newIndex !== undefined &&
      newIndex < this.books.length &&
      newIndex >= 0 &&
      newIndex !== this.selectedBookIndex
    ) {
      // deselect current selection
      this.books[this.selectedBookIndex].deselect();

      // select new index
      this.selectedBookIndex = newIndex;
      this.books[newIndex].select();
    }
  }
}
