import { BookGallery } from "./modules/BookGallery/BookGallery.js";
import { Engine } from "./modules/Engine/Engine.js";

window.onload = (e) => {
  init();
};

const init = async () => {
  const engine = new Engine("gallery");
  const bookGallery = new BookGallery(engine);
  await bookGallery.loadAsset("/assets/gallery/assets/book-gallery/books.json");
};
