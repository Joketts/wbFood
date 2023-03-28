

const searchInput = document.getElementById('search-button-id');
const meals = document.getElementById('mealOption');
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

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=1250cb8549094af7b2c64c3a4ec56f13&ingredients=apples`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}
            //let html ="";


            //if(data.id) {
                //data.id.forEach(id => {
                    //html += `
                            //<div class = "mealOption-item" data-id="${meal.id}">

                                //<div class ="mealImg">
                                    //<img class ="foodimg" src="${meal.image}>
                                //</div>

                                //<div class ="mealname">
                                    //<h5> ${meal.title} </h5>
                                //</div>
                            //</div>
                            //`;
                //})
               // meals.innerHTML = html;
            //}
        //})




function getRecipeOutputs(){




}