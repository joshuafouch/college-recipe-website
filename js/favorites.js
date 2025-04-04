function addToFav() {
    const gamer = document.getElementById('heart');
    const myHeart = gamer.getAttribute('src');

    if (myHeart.includes('empty-heart.svg')) {
        gamer.src = 'assets/images/filled-heart.svg';
    } else {
        gamer.src = 'assets/images/empty-heart.svg';
    }

    // Mariano adds favorites localStorage here for localStorage
}