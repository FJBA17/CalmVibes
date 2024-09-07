function validateLogin() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Limpiar mensaje de error
  errorMessage.style.display = 'none';

  // Obtener las credenciales guardadas en localStorage
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  // Validar credenciales
  if (username === storedUsername && password === storedPassword) {
      alert('Inicio Exitoso');
      // Redirigir a la página de inicio
      window.location.href = '../html/inicio.html';
      return false; // Previene el envío del formulario, ya que manejamos la redirección manualmente
  } else {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Usuario o Contraseña Invalido';
      return false; // Previene el envío del formulario
  }
}

function goBack() {
  window.history.back();
}