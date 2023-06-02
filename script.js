const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeDeatailsParent = document.querySelector('.recipe-details');


const fetchRecipes = async(query) =>  {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    response.meals.forEach((meal) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span>Dish</p>
        <p>Belong to <span>${meal.strCategory}</span></p>
        `
       
        recipeDiv.style.borderRadius = "20px";
        
        // adding event listener to recipe button
        
        recipeContainer.appendChild(recipeDiv);
         const button = document.createElement('button');
        button.textContent = "view recipe";
       
        recipeDiv.appendChild(button);
        button.addEventListener('click', () => {
            openRecipePopup(meal)
        });
        recipeCloseBtn.addEventListener('click', closeRecipe);
    })
}

const fetchIngredient = (meal) => {
    let ingredientsList = "";
      for (let i = 1; i <= 20; i++){
        const ingredient = meal[`strIngredient${i}`];
        const mesure = meal[`strMeasure${i}`]
        if (ingredient) {
        
          ingredientsList += `<li>${mesure} ${ingredient}</li>`;
      console.log(meal);
        } else {
      console.log(meal);
          break;
      }

      }
      return ingredientsList 
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
     <h2>${meal.strMeal}</h2>
    <h3>Ingredient:</h3>
    <ul><li>${fetchIngredient(meal)}</li></ul>
    <p>${meal.strInstructions}</p>
    `
    recipeDeatailsParent.style.display = "block";
   
}  

const closeRecipe = () => {
   recipeDeatailsParent.style.display = "none"
}
     
    

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    
})