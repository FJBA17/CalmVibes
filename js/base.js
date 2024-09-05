function loadNavbar() {
    fetch('../html/componentes/base.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Añadir espacio para el navbar fijo
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                document.body.style.paddingTop = navbar.offsetHeight + 'px';
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
}

// Cargar el navbar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadNavbar);

