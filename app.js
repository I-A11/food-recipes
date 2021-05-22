const searchForm = document.querySelector(".form");
const searchResult = document.querySelector(".search-result");
const container = document.querySelector("flex-container");

let searchQuery = "";
const APP_ID = "e463ff2b";
const APP_Key = "d6f9444b805f1e92f44628bbba0179b3";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();

  e.target.querySelector("input").value = "";
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}a&app_id=${APP_ID}&app_key=${APP_Key}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  // console.log(data);
}
const generateHTML = (results) => {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        <div class="item">
            <img src="${result.recipe.image}" alt="image" />
            <div class="flex-container">
              <h1 class="title">${result.recipe.label}</h1>
              <a class="view-recipe" href=${
                result.recipe.url
              } target="_blank">View Recipe</a>
            </div>
             <p class="item-data">Cuisine: ${result.recipe.cuisineType}</p>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(
              2
            )}</p>
          </div>
        `;
  });
  searchResult.innerHTML = generatedHTML;
};
