addEventListener("load", main);
async function main()
{
    let ass_button = document.getElementById("butt");
    let ingre_button = document.getElementById("ADD");
    let ingredient_add = document.getElementById("ingredient");
    let in_list = document.getElementById("in_list");
    let food_list = document.getElementById("food_list");

    const API_KEY = "5836949c88mshfb3612660abbd8bp1702eajsndb58267dc313";
    const spoon_key = "6e7aadedec1d40b4a175a41a4e056802";

    let INGREDIENT_LIST = [];

    ingre_button.addEventListener("click", () => {
        INGREDIENT_LIST.push(ingredient_add.value);
        in_list.innerHTML += `<li>${ingredient_add.value}</li>`;
    });  





    ass_button.addEventListener("click", async add => {



        let requestString = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/find` +
        "ByIngredients?number=5&ranking=1&ingredients=";
        const ingredientsString = INGREDIENT_LIST.map(ingredient => ingredient + '%2C');
        requestString = requestString + ingredientsString;
        const response = await fetch(requestString, {
            headers: {
                "X-RapidAPI-Key": API_KEY
            }
        });
        const data = await response.json();
        let data_size = Object.keys(data).length;
        let recipe_ids = [];
        for (let i = 0; i < data_size; i++)
        {
            recipe_ids.push(data[i].id);
        }


        for (let k = 0; k < data_size; k ++)
        {
            let id = recipe_ids[k]; 
            let recipeRequestString = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + spoon_key + "&includeNutrition=false";
            const recipe_response = await fetch(recipeRequestString );
            const recipe = await recipe_response.json();
            console.log(recipe);
            food_list.innerHTML += `<li>${recipe.title} <a href="${recipe.sourceUrl}">Recipe Link</a></li>`;
        }

    });
    
   
}