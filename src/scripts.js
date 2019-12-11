const mainSection = document.querySelector('.main');
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
const favoritesContainer = document.querySelector('.favorites-container')
const favoritesBtn = document.querySelector('.favorites-btn')
const readyToCookContainer = document.querySelector('.ready-to-cook-container')
const readyToCookBtn = document.querySelector('.ready-to-cook-btn')

populateCards();
namesDropdown();
ingredientsDropdown();
tagsDropdown();
populatePantry();

hamburgerBtn.addEventListener('click', toggleMenu);
pantryContainer.addEventListener('click', addQuantity);
pantryContainer.addEventListener('click', subtractQuantity);
recipeContainer.addEventListener('click', favoriteRecipe);
recipeContainer.addEventListener('click', addToCook);
recipeContainer.addEventListener('click', showRecipe);
navDropDown.addEventListener('click', controlPages);

function toggleMenu() {
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

function addToCook(event) {
  if (event.target.classList.contains('cook-btn')) {
    event.target.classList.toggle('cook-btn-active')
  }
}

function controlPages(event) {
  let active = document.querySelector(".active-page");
  let clicked;

  if (event.target === homeBtn) {
    clicked = recipeContainer
  }
  if (event.target === favoritesBtn) {
    clicked = favoritesContainer
  }
  if (event.target === pantryBtn) {
    clicked = pantryContainer
  }
  loadPage(active, clicked)
}

function loadPage(activePage, clickedPage) {
  activePage.classList.toggle("hide-section");
  activePage.classList.toggle("active-page");
  clickedPage.classList.toggle("hide-section")
  clickedPage.classList.toggle("active-page")

  toggleMenu();
}

function showRecipe(event) {
  if (event.target.classList.contains('recipe-img')) {
    mainSection.insertAdjacentHTML('afterbegin', `
      <div class="shown-container">
            <article class="recipe-shown">
              <header class="recipe-header-container">
                <h2 class="recipe-title"></h2>
                <button class="close-btn" type="button" name="button">X</button>
              </header>
              <aside class="ingredient-items">
                  <img class="recipe-pic" src="https://savorysweetlife.com/wp-content/uploads/2009/10/CHOCOLATE-CHIP-COOKIES-3-1024x1024.jpg">
                  <div class="ingredient-list">
                    ingredients
                  </div>
              </aside>
              <div class="recipe-instructions">
                <h3>Instructions</h3>
                <p> "number": 1,
                  "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.</p>
                <p>"number": 1,
                  "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.</p>
              </div>
            </article>
          </div>`)
    let xBtn = document.querySelector('.close-btn');
    xBtn.addEventListener('click', closeRecipe);

  }
}

function closeRecipe(event) {
  event.target.parentElement.parentElement.remove();
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
