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
const favCardSection = document.querySelector(".favorite-cards")
const favoritesBtn = document.querySelector('.favorites-btn')
const readyToCookContainer = document.querySelector('.ready-to-cook-container')
const readyToCookBtn = document.querySelector('.ready-to-cook-btn')
const randomNum = Math.floor(Math.random() * 49 + 1);
let cardID = [];
const user = getUser();

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
recipeContainer.addEventListener('click', addRecipeToFavs);
recipeContainer.addEventListener('click', addRecipeToReadyArr);
recipeContainer.addEventListener('click', showRecipe);
navDropDown.addEventListener('click', controlPages);
favoritesBtn.addEventListener('click', populateFavorites);

function toggleMenu() {
  hamburgerBtn.classList.toggle("change")
  navDropDown.classList.toggle("dropdown-open")
}

function populateCards() {
  return recipeData.forEach(element => {
    let recipe = new Recipe(element.name, element.id, element.image, element.ingredients, element.instructions, element.tags)
    recipeContainer.innerHTML += `
    <div class="recipe-card" id="${recipe.id}">
      <img class="recipe-img" src=${recipe.image}>
    <div class="recipe-card-bar">
      <div class="recipe-card-name">
        <p>${recipe.name}</p>
      </div>
      <div class='btns-container' id="${recipe.id}">
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

function getUser() {
  let grabUser = users.find((user, i) => {
    if(i === randomNum) {
      return user;
    }
  })
  return new User(grabUser.id, grabUser.name, grabUser.pantry)
}

function addRecipeToFavs(event) {
  let id = event.target.parentNode.id
  if(event.target.classList.contains('heart-btn-active')){
    if(!user.favoriteRecipes.includes(id)){
      return user.addToFavorites(id)
    }
  } else {
    user.removeFromFavorites(id)
  }
}

function addRecipeToReadyArr(event) {
  let id = event.target.parentNode.id
  if (event.target.classList.contains('cook-btn-active')) {
    if (!user.recipesToCook.includes(id)) {
      return user.addToReady(id)
    }
  } else {
    user.removeFromReady(id)
  }
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
  if (event.target === readyToCookBtn) {
    clicked = readyToCookContainer
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
    cardID.push(event.target.parentNode.id);
    recipeData.forEach(recipe => {
      if (recipe.id === Number(cardID[0])) {
        let selectedRecipe = new Recipe(recipe.name, recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.tags)
        mainSection.insertAdjacentHTML('afterbegin', `
          <div class="shown-container">
                <article class="recipe-shown">
                  <header class="recipe-header-container">
                    <h2 class="recipe-title">${selectedRecipe.name}</h2>
                    <button class="close-btn" type="button" name="button">X</button>
                  </header>
                  <aside class="ingredient-items">
                      <img class="recipe-pic" src=${selectedRecipe.image}>
                      <div class="ingredient-list">
                      </div>
                  </aside>
                  <div class="recipe-instructions">
                    <h3>Instructions</h3>
                    <div class="instructions-container"></div>
                  </div>
                </article>
              </div>`)
              let xBtn = document.querySelector('.close-btn');
              xBtn.addEventListener('click', closeRecipe);
              loadIngredients();
              loadInstructions();
      }
    })
  }
}

function closeRecipe(event) {
  event.target.parentElement.parentElement.remove();
  cardID.shift();
}

function loadIngredients() {
let ingredientList = document.querySelector('.ingredient-list');
  recipeData.forEach(recipe => {
    if (recipe.id === Number(cardID[0])) {
      recipe.ingredients.forEach(ingredient => {
        ingredientList.insertAdjacentHTML('beforebegin', `
        <p>${ingredient.name} - ${ingredient.quantity.amount} ${ingredient.quantity.unit}</p>`
      )
      })
    }
  })
}

function loadInstructions() {
let instructionList = document.querySelector('.instructions-container');
  recipeData.forEach(recipe => {
    if (recipe.id === Number(cardID[0])) {
      recipe.instructions.forEach(instruction => {
        instructionList.insertAdjacentHTML('beforebegin', `
        <p>Step ${instruction.number}</p>
        <p>${instruction.instruction}</p>`
      )
      })
    }
  })
}

function populatePantry() {
    user.pantry.forEach(pantryItem => {
      let ingredient = ingredientData.find(ingredient => {
      return pantryItem.ingredient === ingredient.id;
    })
    if (ingredient) {
    pantryContainer.innerHTML += `
    <div class="pantry-item" id="${ingredient.id}">
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

function populateFavorites() {
  favCardSection.innerHTML = ``;
  return user.favoriteRecipes.map(id => {
    let item = recipeData.find(recipe => recipe.id === Number(id))
    favCardSection.insertAdjacentHTML('beforeend', `
        <div class="favorited-recipe">
          <section class="favorite-recipe-name">
            <h4>${item.name}</h4>
          </section>
            <img class="favorite-recipe-img" src="${item.image}">
              <section class="favorites-action-bar">
                <button class="get-directions-btn action-btn">Directions</button>
                <button class="remove-from-favorites action-btn">Remove</button>
              </section>
            </div>
    `)
  })
}

function populateReadyToCook() {

}
