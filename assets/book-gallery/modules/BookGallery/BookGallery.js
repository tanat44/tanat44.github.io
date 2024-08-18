import { Book } from "./Book.js";

export class BookGallery {
  books;
  engine;
  selectedBookIndex;

  constructor(engine) {
    this.books = [];
    this.engine = engine;
    this.engine.animationCallback = () => this.animate();
    this.engine.mouseMoveCallback = (e) => this.mouseMove(e);
    this.selectedBookIndex = 0;
  }

  animate() {
    this.drawTitle();

    const y = this.engine.ctx.height / 2 + 10;
    const pad = 100;
    const bookHeight = 150;

    const stepSize = (this.engine.ctx.width - pad * 2) / this.books.length;

    // left
    for (let i = 0; i < this.selectedBookIndex; ++i) {
      this.drawBook(this.books[i], pad + i * stepSize, y, bookHeight);
    }

    //right
    for (let i = this.books.length - 1; i > this.selectedBookIndex; --i) {
      this.drawBook(this.books[i], pad + i * stepSize, y, bookHeight);
    }

    // mid
    this.drawSelectedBook(
      this.selectedBookIndex,
      pad + stepSize * this.selectedBookIndex,
      y - 30,
      bookHeight * 1.5
    );
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

  drawBook(book, x, y, height) {
    this.engine.ctx.applyFilter("blur(1px) sepia(0.5)", () => {
      this.engine.ctx.drawImageFitHeight(book.image, x, y, 0, height);
    });
  }

  drawSelectedBook(index, x, y, height) {
    const book = this.books[index];
    if (!book) return;
    this.engine.ctx.blur(() => {
      this.engine.ctx.drawImageFitHeight(book.image, x, y, 0, height);
    });
    this.engine.ctx.drawImageFitHeight(book.image, x, y, 0, height);
    this.engine.ctx.drawText(
      `${index + 1}/${this.books.length + 1}\n${
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
  }

  mouseMove(e) {
    if (this.books.length === 0) return;
    const windowSize = this.engine.ctx.width / this.books.length;
    const newIndex = Math.floor(e.x / windowSize);

    if (newIndex !== undefined && newIndex < this.books.length && newIndex >= 0)
      this.selectedBookIndex = newIndex;
  }
}
