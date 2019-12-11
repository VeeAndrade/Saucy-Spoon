const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user.js')
const Recipe = require('../src/recipe.js')


describe('User', () => {
  let user
  let recipe
  beforeEach(() => {
      user = new User(1, "Saige O\'Kon", [
        { "ingredient": 11477, "amount": 1},
        { "ingredient": 93820, "amount": 1}
      ]);
      recipe = new Recipe({
        "name": "Dirty Steve's Original Wing Sauce",
        "id": 412309,
        "image": "https://spoonacular.com/recipeImages/412309-556x370.jpeg",
        "ingredients": [
          {"name": "black pepper", "id": 1002030, "quantity": {"amount": 4, "unit": "teaspoons"}},
          { "name": "brown sugar", "id": 19334, "quantity": {"amount": 8,"unit": "tablespoons"}}
        ],
        "instructions": [{"number": 1, "instruction": "Sir mix a lot of dis"}],
        "tags": ["sauce"]})
    });

    it('should be an instance of User', () => {
      expect(user).to.be.an.instanceOf(User)
    });

    it('should have an id property', () => {
      expect(user.id).to.equal(1)
    });

    it('should have a name property', () => {
      expect(user.name).to.equal('Saige O\'Kon')
    });

    it('should have a pantry with ingredients', () => {
      expect(user.pantry).to.eql([
        { "ingredient": 11477, "amount": 1},
        { "ingredient": 93820, "amount": 1}
      ])
    });

    it('should have no favorite recipes by default', () => {
      expect(user.favoriteRecipes).to.eql([])
    });

    it('should have no recipes to cook by default', () => {
      expect(user.favoriteRecipes).to.eql([])
    });

    it('should be able to add a recipe to the favorites property', () => {
      expect(user.favoriteRecipes).to.eql([]);
      user.addToFavorites(412309);
      expect(user.favoriteRecipes).to.eql([412309])
    });

    it('should be able to remove from favorites', () => {
      expect(user.favoriteRecipes).to.eql([]);
      user.addToFavorites(412309);
      expect(user.favoriteRecipes).to.eql([412309])
      user.removeFromFavorites(412309);
      expect(user.favoriteRecipes).to.eql([]);
    });

    it('should be able to add a recipe to the ready to cook property', () => {
      expect(user.recipesToCook).to.eql([]);
      user.addToReady(412309);
      expect(user.recipesToCook).to.eql([412309])
    });

    it('should be able to remove from ready to cook', () => {
      expect(user.recipesToCook).to.eql([]);
      user.addToReady(412309);
      expect(user.recipesToCook).to.eql([412309])
      user.removeFromReady(412309);
      expect(user.recipesToCook).to.eql([]);
    });
})
