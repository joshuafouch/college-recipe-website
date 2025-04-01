async function loadAllRecipes() {
    try {
        const response = await Promise.all([
            fetch('./recipe-assets/appetizer_recipes.json'),
            fetch('./recipe-assets/autumn_recipes.json'),
            fetch('./recipe-assets/beverages_recipes.json'),
            fetch('./recipe-assets/breakfast_recipes_part1.json'),
            fetch('./recipe-assets/breakfast_recipes_part2.json'),
            fetch('./recipe-assets/breakfast_recipes_part3.json'),
            fetch('./recipe-assets/lunch_recipes_part1.json'),
            fetch('./recipe-assets/lunch_recipes_part2.json'),
            fetch('./recipe-assets/dinner_recipes_part1.json'),
            fetch('./recipe-assets/dinner_recipes_part2.json'),
            fetch('./recipe-assets/winter_recipes.json'),
            fetch('./recipe-assets/summer_recipes.json'),
            fetch('./recipe-assets/spring_recipes.json'),
            fetch('./recipe-assets/snacks_recipes.json')
        ]);

        const recipeData = await Promise.all(response.map(r => r.json()));
        return recipeData.flat();
    } catch (error) {
        console.error('Error loading recipes:', error);
        return[];
    }
}