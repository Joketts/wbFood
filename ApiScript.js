

const searchInput = document.getElementById('search-button-id');
const meals = document.getElementById('mealOutputs-id');
const recipeOutput = document.querySelector('.recipe');
const recipeClose = document.getElementById('close-recipe-id');

searchInput.addEventListener('click' , getMealOutputs)
meals.addEventListener('click' , getRecipeOutputs)
recipeClose.addEventListener('click', closeRecipe)
function closeRecipe() {
    recipeOutput.parentElement.classList.remove('showRecipe');
}

function getMealOutputs() {

    const searchInputTxt = document.getElementById('input-box-id').value.trim();

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=4c1484d4cb4e49608b18d5676198f507&ingredients=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data) {
            data.forEach(recipe => {
                html += `
                    <main class = "mealOption" >
                      <div class = "mealOption-item" data-id="${recipe.id}">
                      
                            <div class ="mealImg">
                                <img class ="foodimg open-recipe" src="${recipe.image}">
                            </div>
        
                            <div class ="mealname">
                                <h5> ${recipe.title} </h5>
                            </div>
                       </div>
                    </main> 
                `;
            });
            meals.innerHTML = html;
        } else {
            meals.innerHTML ="<p>No results found.</p>"
        }

    });

}
function getRecipeOutputs(e){
    e.preventDefault();
    if(e.target.classList.contains('open-recipe')){
        let recipeID = e.target.parentElement.parentElement;
        fetch(`https://api.spoonacular.com/recipes/${recipeID.dataset.id}/information`)
            .then(response => response.json())
            .then(data => RecipeOutputModel(data));
    }
}
function RecipeOutputModel(){




}