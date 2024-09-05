document.addEventListener('DOMContentLoaded', function() {
    // Cargar las regiones y comunas desde el JSON
    fetch('/json/regiones.json')
        .then(response => response.json())
        .then(data => {
            const regionSelect = document.getElementById('region');
            const comunaSelect = document.getElementById('comuna');

            // Llenar el select de regiones
            data.regiones.forEach(region => {
                const option = document.createElement('option');
                option.value = region.nombre;
                option.textContent = region.nombre;
                regionSelect.appendChild(option);
            });

            // Escuchar cambios en la región seleccionada
            regionSelect.addEventListener('change', function() {
                const selectedRegion = regionSelect.value;
                const regionData = data.regiones.find(region => region.nombre === selectedRegion);

                // Limpiar las comunas anteriores
                comunaSelect.innerHTML = '<option value="" disabled selected>Seleccione su comuna</option>';

                // Llenar el select de comunas con las comunas de la región seleccionada
                regionData.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
            });
        })
        .catch(error => console.error('Error loading regions and communes:', error));
});
function registerUser() {
    let isValid = validateForm(); // Llama a la función de validación que ya teníamos

    if (isValid) {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Guardar los datos en localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        alert('Usuario registrado con éxito');
        return true; // Permite el envío del formulario
    } else {
        return false; // Previene el envío del formulario
    }
}
function validateForm() {
    let isValid = true;

    // Obtener valores de los campos
    const username = document.getElementById('username').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const email = document.getElementById('email').value.trim();
    const region = document.getElementById('region').value.trim();
    const comuna = document.getElementById('comuna').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const terms = document.getElementById('terms').checked;

    // Limpiar mensajes de error
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('rutError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('regionError').style.display = 'none';
    document.getElementById('comunaError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';
    document.getElementById('termsError').style.display = 'none';

    // Validar nombre de usuario
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'El nombre de usuario debe tener al menos 3 caracteres.';
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }

    // Validar RUT (aquí se podría agregar una validación más completa del formato del RUT)
    if (rut === "") {
        document.getElementById('rutError').textContent = 'El RUT es obligatorio.';
        document.getElementById('rutError').style.display = 'block';
        isValid = false;
    }

    // Validar correo electrónico
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Por favor ingresa un correo electrónico válido.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Validar región
    if (region === "") {
        document.getElementById('regionError').textContent = 'La región es obligatoria.';
        document.getElementById('regionError').style.display = 'block';
        isValid = false;
    }

    // Validar comuna
    if (comuna === "") {
        document.getElementById('comunaError').textContent = 'La comuna es obligatoria.';
        document.getElementById('comunaError').style.display = 'block';
        isValid = false;
    }

    // Validar contraseña
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 6 caracteres.';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden.';
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }

    // Validar aceptación de términos y condiciones
    if (!terms) {
        document.getElementById('termsError').textContent = 'Debes aceptar los términos y condiciones.';
        document.getElementById('termsError').style.display = 'block';
        isValid = false;
    }

    return isValid;
}

// Función auxiliar para validar el correo electrónico
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function goBack() {
    window.history.back();
  }
  

