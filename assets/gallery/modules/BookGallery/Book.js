const monthNames = [
  "Unknown", // actual month starts from 1, so 0 is unknown
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const HEIGHT = 150;
const SELECTED_HEIGHT = 220;
const ANIMATE_DURATION = 0.3;

export class Book {
  title;
  imagePath;
  readMonth;
  readYear;

  // addition
  image;
  selected;
  animationTime;
  x;
  y;

  static fromJson(data, basePath) {
    const book = new Book();

    book.title = data.title;
    book.imagePath = data.imagePath;
    book.readMonth = data.readMonth ? monthNames[data.readMonth] : undefined;
    book.readYear = data.readYear;

    // addition
    book.image = new Image();
    book.image.src = basePath + "/" + book.imagePath;
    book.selected = false;

    return book;
  }

  readDate() {
    if (!this.readMonth) return this.readYear;
    return this.readMonth + ", " + this.readYear;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  draw(ctx, deltaTime) {
    const animateHeight =
      HEIGHT +
      ((SELECTED_HEIGHT - HEIGHT) * this.animationTime) / ANIMATE_DURATION;

    if (!this.selected) {
      this.animationTime -= deltaTime;

      // no animation, no selection
      if (!this.animationTime || this.animationTime < 0) {
        this.animationTime = 0;
        ctx.applyFilter("blur(1px) sepia(0.5)", () => {
          ctx.drawImageFitHeight(this.image, this.x, this.y, 0, HEIGHT);
        });
      } else {
        // out animation
        this.drawBookSoftEdge(ctx, animateHeight);
      }
    } else {
      this.animationTime += deltaTime;
      // in animation
      if (this.animationTime < ANIMATE_DURATION) {
        this.drawBookSoftEdge(ctx, animateHeight);
      } else {
        // no animation, selecting
        this.animationTime = ANIMATE_DURATION;
        this.drawBookSoftEdge(ctx, SELECTED_HEIGHT);
      }
    }
  }

  drawBookSoftEdge(ctx, height) {
    const y = this.y - 30;

    ctx.blur(() => {
      ctx.drawImageFitHeight(this.image, this.x, y, 0, height);
    });
    ctx.drawImageFitHeight(this.image, this.x, y, 0, height);
  }
}
