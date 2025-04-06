function filterByCategory() {
    const selected = document.getElementById("categorySelect").value;

    if (selected === "all") {
        displayListingRecipes(allRecipes);
        return;
    }

    const filtered =allRecipes.filter(recipe => 
        recipe.category === selected || recipe.season === selected() 
    );
    displayListingRecipes(filtered);
}