class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addToFavorites(recipe) {
    this.favoriteRecipes.push(recipe)
  }

  removeFromFavorites(recipe) {
    let i = this.favoriteRecipes.forEach((r, i) => recipe.id === r.id ? i : r)
    this.favoriteRecipes = this.favoriteRecipes.splice(i, 0)
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
