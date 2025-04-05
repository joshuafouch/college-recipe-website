function displayListingRecipes(recipes) {
  const container = document.querySelector('.widget-container');

  // get 3 random recipes from the recipe array
  const featured = recipes.sort(() => 0.5 - Math.random()).slice(0, 100);

  container.innerHTML = featured.map(recipe => `
        <div class="recipe-widget">
            <a href="recipe.html?id=${recipe.id}" style="text-decoration: none; color: inherit;">
                <div class="recipe-widget-img">
                    <img src="./recipe-assets/${recipe.images[0]}" alt="${recipe.name}">
                </div>
                <div class="recipe-widget-info">
                    <h2>${recipe.name}</h2>
                    <p>Prep Time: ${recipe.prep_time}</p>
                    <p>Difficulty: ${recipe.difficulty}</p>
                </div>
            </a>
        </div>
    `).join('');
}
