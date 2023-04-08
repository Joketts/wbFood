

const searchInput = document.getElementById('search-button-id');
const meals = document.getElementById('mealOutputs-id');
const recipeShow = document.querySelector('.recipe');
const recipeOutput = document.querySelector('.recipe-content');
const recipeClose = document.getElementById('close-recipe-id');

searchInput.addEventListener('click' , getMealOutputs)
searchInput.addEventListener('click' , closeRecipe)
meals.addEventListener('click' , getRecipeOutputs)
recipeClose.addEventListener('click', closeRecipe)
function closeRecipe() {
    recipeShow.style.display = 'none';
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
        fetch(`https://api.spoonacular.com/recipes/${recipeID.dataset.id}/information?apiKey=4c1484d4cb4e49608b18d5676198f507`)
        .then(response => response.json())
        .then(data => recipeModal(data))


    }
}

function recipeModal(data){

    console.log(data.title);

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
        <a href = "${data.sourceUrl}"> Source of Recipe</a>
        </div>
    `;

recipeOutput.innerHTML = html;
recipeShow.style.display = 'flex';


}
