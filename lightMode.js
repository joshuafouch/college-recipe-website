window.addEventListener("DOMContentLoaded", () => {
    const coolButton = document.querySelector(".coolButton");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.documentElement.classList.add("light-mode");
        coolButton.textContent = "Dark Mode";
    } else {
        document.documentElement.classList.remove("light-mode");
        coolButton.textContent = "Light Mode";
    }

    coolButton.addEventListener("click", () => {
        document.documentElement.classList.toggle("light-mode");

        const isLight = document.documentElement.classList.contains("light-mode");
        coolButton.textContent = isLight ? "Dark Mode" : "Light Mode";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
});

/*
function toggleLightMode() {
    document.documentElement.classList.toggle("light-mode");
  
    const isLight = document.documentElement.classList.contains("light-mode");
    coolButton.textContent = isLight ? "Dark Mode" : "Light Mode";
  
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }
*/