class Recipe {
  constructor(name, id, image, ingredients, instructions, tags) {
    this.name = name;
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.tags = tags;
  }

  retrieveRecipe(id) {
    return recipeData.find(recipe => {
      if (recipe.id === id) {
        return recipe.ingredients.map(ingredient => {
          return ingredient
        })
      }
    })
  }

  calculateTotalCost(id) {
    let recipeObj = this.retrieveRecipe(id)
    let recipeI = recipeObj.ingredients
    let recipeIdAndAmount = recipeI.map(i => {
      return { id:i.id, amount:i.quantity.amount}
    })
    let sum = ingredientData.reduce((acc, r) => {
      recipeIdAndAmount.map((i) => {
        if(r.id === i.id) {
          acc += r.estimatedCostInCents * i.amount
        }
      })
      return acc;
    }, 0)
    return (sum * .01).toFixed(2);
  }

}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
