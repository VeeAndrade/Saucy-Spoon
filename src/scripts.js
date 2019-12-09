const contentSection = document.querySelector('.content-section');
const recipeContainer = document.querySelector('.recipe-container');
const nameDropdown = document.querySelector('.name-options');
const tagDropdown = document.querySelector('.tag-options');
const ingredientDropdown = document.querySelector('.ingredient-options');
const hamburgerBtn = document.querySelector('.nav-bar-btn');
const navDropDown = document.querySelector('.nav-bar-dropdown');
const pantryContainer = document.querySelector('.pantry-container')
const pantryBtn = document.querySelector('.pantry-btn')
const homeBtn = document.querySelector('.home-btn')

populateCards();
namesDropdown();
ingredientsDropdown();
tagsDropdown();

homeBtn.addEventListener('click', returnHome)
hamburgerBtn.addEventListener('click', openMenu)
pantryBtn.addEventListener('click', loadPantry)
pantryContainer.addEventListener('click', addQuantity)
pantryContainer.addEventListener('click', subtractQuantity)
recipeContainer.addEventListener('click', favoriteRecipe)

function openMenu() {
  hamburgerBtn.classList.toggle("change")
  navDropDown.classList.toggle("dropdown-open")
}

function populateCards() {
  return recipeData.forEach(element => {
    let recipe = new Recipe(element.name, element.id, element.image, element.ingredients, element.instructions, element.tags)
    recipeContainer.innerHTML += `
      <div class="recipe-card">
        <img class="recipe-img" src=${recipe.image}>
        <div class="recipe-card-bar">
          <p class="recipe-card-name">${recipe.name}</p>
          <div class='btns-container'>
            <button class="heart-btn"></button>
            <button class="cook-btn"></button>
          </div>
        </div>
      </div>`
  })
}

function namesDropdown() {
  let recipeNames = recipeData.map(recipe => recipe.name)
  let sortedRecipes = recipeNames.sort()
  return sortedRecipes.map(element => {
    let recipe = new Recipe(element)
    nameDropdown.innerHTML += `
      <option class="test" value="test">${recipe.name}</option>
      `
  })
}

function tagsDropdown() {
  let tagNames = recipeData.reduce((acc, recipe) => {
    let getTag = recipe.tags.forEach(tag => {
      if (!acc.includes(tag)) {
      acc.push(tag)
    }
    })
    return acc
  }, [])
  return tagNames.forEach(tag => {
    tagDropdown.innerHTML += `
    <option class="test" value="test">${tag}</option>`
  })
}

function ingredientsDropdown() {
  let ingredientNames = ingredientData.map(element => element.name)
  let sortedIngredients = ingredientNames.sort()
  return sortedIngredients.map(element => {
    ingredientDropdown.innerHTML += `
      <option class="test" value="test">${element}</option>
      `
  })
}

function favoriteRecipe(event) {
  if(event.target.classList.contains('heart-btn')) {
    event.target.classList.toggle('heart-btn-active')
  }
}

function returnHome() {
  if (recipeContainer.classList.contains("hide-section")) {
    recipeContainer.classList.toggle('hide-section')
    pantryContainer.classList.toggle('hide-section')
  }
  openMenu();
}

function loadPantry() {
  if (!recipeContainer.classList.contains("hide-section")) {
  recipeContainer.classList.toggle("hide-section")
  }
  openMenu();
  populatePantry();
}

function populatePantry() {
  users[0].pantry.forEach(pantryItem => {
      let ingredient = ingredientData.find(ingredient => {
      return pantryItem.ingredient === ingredient.id;
    })
    if (ingredient) {
    pantryContainer.innerHTML += `
    <div class="pantry-item">
      <p class="pantry-item-name">${ingredient.name}</p>
      <button class="subtract-quantity">-</button>
      <p class="pantry-item-quantity">${pantryItem.amount}</p>
      <button class="add-quantity">+</button>
    </div>`    
  }})
}

function addQuantity() {
  if (event.target.classList.contains('add-quantity')) {

  console.log("add")
  }
}

function subtractQuantity() {
  if (event.target.classList.contains('subtract-quantity')) {

  console.log("subtract")
  }
}
