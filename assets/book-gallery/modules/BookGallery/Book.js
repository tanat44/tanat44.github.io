const monthNames = [
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

export class Book {
  title;
  imagePath;
  readMonth;
  readYear;

  // addition
  image;

  static fromJson(data, basePath) {
    const book = new Book();

    book.title = data.title;
    book.imagePath = data.imagePath;
    book.readMonth = data.readMonth ? monthNames[data.readMonth] : undefined;
    book.readYear = data.readYear;

    book.image = new Image();
    book.image.src = basePath + "/" + book.imagePath;

    return book;
  }

  readDate() {
    if (!this.readMonth) return this.readYear;

    return this.readMonth + ", " + this.readYear;
  }
}
