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

async function loadStories() {
    try {
        const response = await fetch('./recipe-assets/All_recipe_stories.json');
        const stories = await response.json();
        return stories;
    } catch (error) {
        console.error('Error loading stories: ', error);
        return[];
    }
}

async function displayRecipe() {
    try {
        // get the given recipe id from the url (given from displayListingRecipes())

        // Joshua made a regex to get the id in the form of: recipe.html?id=xx
        const pattern = /\?id=([0-9]+)/;
        const match = window.location.search.match(pattern);

        if (!match) {
            console.error('No recipe ID found');
            return;
        }

        const recipe_id = parseInt(match[1]);   // id is stored in match 1

        // load the recipes and stories into json arrays
        const [recipes, stories] = await Promise.all([
            loadAllRecipes(),
            loadStories()
        ]);

        // finds the recipe amongts the array of recipes and stories
        const recipe = recipes.find(r => r.id === recipe_id);
        const story = stories.find(s => s.id === recipe_id);

        document.title = `${recipe.name} - CollegeLife Recipes`;

        // load title and metadata
        document.getElementById('rtitle').textContent = recipe.name;
        document.getElementById('auth').textContent = `${recipe.prep_time} | ${recipe.difficulty}`;

        // Update recipe background image
        const recipeBg = document.querySelector('.recipe-bg');
        if (recipeBg) {
            recipeBg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('recipe-assets/${recipe.images[0]}')`;
            recipeBg.style.backgroundPosition = 'center';
            recipeBg.style.backgroundRepeat = 'no-repeat';
            recipeBg.style.backgroundSize = 'cover';
        }

        // load recipe images
        const img1 = document.getElementById('imageREC');
        const img2 = document.getElementById('imageREC2');
        const img3 = document.getElementById('imageREC3');
        const img4 = document.getElementById('imageREC4');

        if (img1) {
            img1.src = `recipe-assets/${recipe.images[0]}`;
            img1.alt = recipe.name;
            img1.onerror = () => img1.src = `assets/images/error2.webp`;
        }

        if (img2) {
            img2.src = `recipe-assets/${recipe.images[1]}`;
            img2.alt = recipe.name;
            img2.onerror = () => img2.src = `assets/images/error2.webp`;
        }

        if (img3) {
            img3.src = `recipe-assets/${recipe.images[2]}`;
            img3.alt = recipe.name;
            img3.onerror = () => img3.src = `assets/images/error2.webp`;
        }

        if (img4) {
            img4.src = `recipe-assets/${recipe.images[3]}`;
            img4.alt = recipe.name;
            img4.onerror = () => img4.src = `assets/images/error2.webp`;
        }

       // load ingredients
       const outIngr = document.getElementById("outIngr");
       recipe.ingredients.forEach((item, index) => {
            const dummyVar = document.createElement("div");
            dummyVar.innerHTML = `&#9679 ${item}`;
            dummyVar.style.fontFamily = "'LibreBaskerville', 'Times New Roman', Times, serif";
            dummyVar.id = `item${index}`;
            outIngr.appendChild(dummyVar);
       });
       outIngr.style.marginTop = "15px"; // a css modification for ingredients

       // load method/steps
       const outM = document.getElementById("outM");
       recipe.steps.forEach((item, index) => {
            const dummyVar = document.createElement("div");
            dummyVar.innerHTML = `Step ${index + 1}: ${item}`;
            dummyVar.style.fontFamily ="'LibreBaskerville', 'Times New Roman', Times, serif ";
            dummyVar.id = `item${index}`;
            outM.appendChild(dummyVar);
       });
       outM.style.marginTop = "15px"; // a css modification for ingredients

       // load story
       const out_story = document.getElementById('recipeStory');
       if (story && out_story) {
            out_story.innerHTML = story.story;
       }



    } catch (error) {
        console.error('Error loading recipe: ', error);
        alert.error('Error loading recipe: ', error);
    }
}