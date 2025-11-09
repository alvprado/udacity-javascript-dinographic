/**
 * Dino class
 */
export class Dino {
  /**
   * Creates a dino from a json object containing the fields species, weight, height, diet, where, when and fact
   * @param {object} data 
   */
  constructor(data) {
    Object.assign(this, data);
    this.image = this.#getImagePathFromSpecies();
  }

  /**
   * Gets the path to the image from the species name
   * @returns path to dino image
   */
  #getImagePathFromSpecies() {
    const key = this.species.toLowerCase();
    return `images/${key}.png`;
  }
}
