
//Code for getting data and creating html modals, as I had never used an Api before I used https://www.youtube.com/watch?v=opikz5x_1ak&t=1426s&ab_channel=GeekProbin design for help
//The code I took inspiration from was using a different API, and no code was copied more on this in the report


//gets elements and classes needed for inputs and outputs
const searchInput = document.getElementById('search-button-id');
const meals = document.getElementById('mealOutputs-id');
const recipeShow = document.querySelector('.recipe');
const recipeOutput = document.querySelector('.recipe-content');
const recipeClose = document.getElementById('close-recipe-id');

//Event listeners
searchInput.addEventListener('click' , getMealOutputs)
//Used for closing recipe if user searches for new meals
searchInput.addEventListener('click' , closeRecipe)
meals.addEventListener('click' , getRecipeOutputs)
recipeClose.addEventListener('click', closeRecipe)

//Closes recipe
function closeRecipe() {
    recipeShow.style.display = 'none';
}

//fetches data matching ingredients from search input from spoonacular and outputs meals to html
function getMealOutputs() {

    //gets search input trims whitespace
    const searchInputTxt = document.getElementById('input-box-id').value.trim();

    //fetches data from Spoonacular by ingredient passing in searchInput text
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=4c1484d4cb4e49608b18d5676198f507&ingredients=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data) {
            //for each recipe in data
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
            //Updates html to meals which is mealOuputs-id on recipe.html page
            meals.innerHTML = html;
        } else {
            meals.innerHTML ="<p>No results found.</p>"
        }

    });

}

//retrieves recipe information about clicked meal
function getRecipeOutputs(e) {
    //stops function running if page is reloaded
    e.preventDefault();
    //checks if clicked element has open-recipe inside
    if (e.target.classList.contains('open-recipe')) {
        //gets recipe id from the dataset of the parent element
        let recipeID = e.target.parentElement.parentElement;
        //fetches data from Spoonacular by id passing in recipeID
        fetch(`https://api.spoonacular.com/recipes/${recipeID.dataset.id}/information?apiKey=4c1484d4cb4e49608b18d5676198f507`)
            .then(response => response.json())
            //passed into recipe modal function
            .then(data => recipeModal(data))
    }
}
//generates html content for recipe.html using data retrieved from api
function recipeModal(data){

    let html = `
        <div class ="top-line">

            <div class ="recipe-name">
                <h5> ${data.title} </h5>
            </div>
            
        </div>

        <div class ="recipe-content">
        
            <p>Serves:${data.servings}</p>
            
            <p>Only ${data.readyInMinutes} minutes to make</p>
            <br>
            <p>${data.instructions}</p>
            <br>
                
            <div class = "recipe-link"></div>
                <p>Source of recipe: <a href = "${data.sourceUrl}"> Click Here</a></p>
        </div>
    `;
//updates html to recipeOutput which is recipeOutputs-id on recipe.html page
recipeOutput.innerHTML = html;
//displays recipe
recipeShow.style.display = 'flex';

}
