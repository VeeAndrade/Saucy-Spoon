class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToFavorites(id) {
    this.favoriteRecipes.push(id)
  }

  removeFromFavorites(id) {
    this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(id), 1)
  }

  addToReady(id) {
    this.recipesToCook.push(id)
  }

  removeFromReady(id) {
    this.recipesToCook.splice(this.recipesToCook.indexOf(id), 1)
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
