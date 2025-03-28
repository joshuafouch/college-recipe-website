async function loadAllRecipes() {
    try {
        const response = await Promise.all([
            fetch('./recipe-assets/beverages_recipes.json')
        ]);

        const jsonData = await Promise.all(response.map(r => r.json()));
        return jsonData.flat();
    } catch (error) {
        console.error('Error loading recipes:', error);
        return[];
    }
}

function displayFeaturedRecipes(recipes) {
    const container = document.querySelector('.widget-container');
    if (!container || !recipes || !recipes.length) {
        console.error('container or recipes not found');
        return;
    }

    const featured = recipes.sort(() => 0.5 - Math.random()).slice(0, 3);

    container.innerHTML = featured.map(recipe => `
        <div class="recipe-widget">
            <img src="./recipe-assets/${recipe.images[0]}" alt="${recipe.name}"
            onerror="this.src='./assets/images/error2.png'>
            <a href="recipe.html?id=${recipe.id}" class="overlay">
                <h1>${recipe.name}</h1>
                <p>Prep time: ${recipe.prep_time}</p>
            </a>
        </div>
    `).join('');
}

