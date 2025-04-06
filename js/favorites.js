function addToFav() {
    const gamer = document.getElementById('heart');
    const pattern = /\?id=([0-9]+)/;
    const match = window.location.search.match(pattern);
    const recipeId = parseInt(match[1]);

    toggleFavorite(recipeId, gamer);
}

function getFavorites() {//returns the favorites from local storage as an array
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function toggleFavorite(id, heartV) {// on/off heart, add/remove from array
    let favorites = getFavorites();

    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id); // remove
      heartV.src = 'assets/images/empty-heart.svg';
    } else {
      favorites.push(id); // add
      heartV.src = 'assets/images/filled-heart.svg';   
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));//put favs back in storage
}

async function loadFavorites() {
    const favIDs = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (favIDs.length === 0) {
        return []; // No favorites to load
    }

    const allRecipes = await loadAllRecipes();
    const favoriteRecipes = allRecipes.filter(recipe => favIDs.includes(recipe.id));

    return favoriteRecipes;
}

function isFavorite(id){//checks if favorited. this is for the heart to load upon opening the recipe
    let favArray = JSON.parse(localStorage.getItem("favorites")) || [];
    return favArray.includes(id);
}

