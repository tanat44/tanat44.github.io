import { BookGallery } from "./modules/BookGallery/BookGallery.js";
import { Engine } from "./modules/Engine/Engine.js";

const init = async () => {
  const engine = new Engine("book-gallery");
  const bookGallery = new BookGallery(engine);
  await bookGallery.loadAsset("/assets/gallery/assets/book-gallery/books.json");
};

init();
