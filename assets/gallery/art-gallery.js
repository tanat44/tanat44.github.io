import { ArtGallery } from "./modules/ArtGallery/ArtGallery.js";
import { Engine } from "./modules/Engine/Engine.js";

window.onload = (e) => {
  init();
};

const init = async () => {
  const engine = new Engine("gallery", true);
  const gallery = new ArtGallery(engine);
  await gallery.loadAsset("/assets/gallery/assets/art-gallery/artworks.json");
};
