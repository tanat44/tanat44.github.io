const ANIMATE_DURATION = 0.3;

export class Artwork {
  title;
  imagePath;
  year;
  location;
  method;

  // addition
  image;

  static fromJson(data, basePath) {
    const artwork = new Artwork();

    artwork.title = data.title;
    artwork.imagePath = data.imagePath;
    artwork.year = data.year;
    artwork.location = data.location;
    artwork.method = data.method;

    // addition
    artwork.image = new Image();
    artwork.image.src = basePath + "/" + artwork.imagePath;
    artwork.selected = false;

    return artwork;
  }
}
