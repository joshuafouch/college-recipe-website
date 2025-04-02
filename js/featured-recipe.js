function displayFeaturedRecipes(recipes) {
    const container = document.querySelector('.widget-container');
    if (!container || !recipes || !recipes.length) {
        console.error('container or recipes not found');
        return;
    }

    // get 3 random recipes from the recipe array
    const featured = recipes.sort(() => 0.5 - Math.random()).slice(0, 3);

    container.innerHTML = featured.map(recipe => `
        <div class="recipe-widget">
                <img src="./recipe-assets/${recipe.images[0]}" alt="${recipe.name}">
                <a href="recipe.html?id=${recipe.id}" class="overlay">
                    <h1>${recipe.name}</h1>
                </a>
            </div>
    `).join('');
}