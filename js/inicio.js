document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var openModalBtn = document.getElementById("boton");
    var closeBtn = document.getElementsByClassName("close")[0];
    var main1 = document.getElementById("conte");

    openModalBtn.addEventListener('click', function() {
        main1.style.display = "none";
        modal.style.display = "flex";
    });
    

    closeBtn.onclick = function () {
        modal.style.display = "none";
        main1.style.display = "block";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    document.getElementById('favorite').addEventListener('click', function() {
        alert('Se ha añadido a Favoritos');
    });
    
});




