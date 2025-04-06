function navToggle() {
    var items = document.getElementById("navItems");
    if (!items.classList.contains("responsive")) {
        items.classList.add("responsive");
    }
    else {
        items.classList.remove("responsive");
    }
}