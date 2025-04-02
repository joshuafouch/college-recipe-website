function toggleLightMode() {
    document.documentElement.classList.toggle("light-mode");
}

/* 

window.addEventListener("DOMContentLoaded", () => {
    const chosenTheme = localStorage.getItem("theme"); 

    if (chosenTheme === "light") {
        document.body.classLast.add("light-mode");
        }
    else {
        document.body.classList.remove("light-mode");
    }
});

function toggleLightMode() {
    const isLightMode = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLightMode ? "light" : "dark");
}

*/