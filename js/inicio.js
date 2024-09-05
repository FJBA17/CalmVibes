document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('open-player').addEventListener('click', function() {
        document.querySelector('.music-player').style.display = 'flex';
    });
});

document.addEventListener('click', function(event) {
    var musicPlayer = document.getElementById('music-player');
    var isClickInside = musicPlayer.contains(event.target) || document.getElementById('open-player').contains(event.target);
    
    if (!isClickInside) {
        musicPlayer.style.display = 'none';
    }
});

document.getElementById('favorite').addEventListener('click', function() {
    var image = document.getElementById('buttonImage');
    
    // Verificamos la imagen actual y cambiamos la ruta
    if (image.src.includes('../assets/images/favorite.svg')) {
        image.src = '../assets/images/play.svg'; // Cambia a la imagen roja
    } else {
        image.src = '/assets/icon/button-icon-blue.svg'; // Vuelve a la imagen azul
    }
});
