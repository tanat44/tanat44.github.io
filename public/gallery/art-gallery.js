import { ArtGallery } from "./modules/ArtGallery/ArtGallery.js";
import { Engine } from "./modules/Engine/Engine.js";

const init = async () => {
  const engine = new Engine("art-gallery");
  const gallery = new ArtGallery(engine);
  await gallery.loadAsset("/assets/gallery/assets/art-gallery/artworks.json");
};

init();
