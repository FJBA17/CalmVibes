document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
  
    togglePasswordBtn.addEventListener('click', function() {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordBtn.classList.remove('fa-eye');
        togglePasswordBtn.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        togglePasswordBtn.classList.remove('fa-eye-slash');
        togglePasswordBtn.classList.add('fa-eye');
      }
    });
  
    // Form submission
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // Add your login logic here
      console.log('Username:', loginForm.username.value);
      console.log('Password:', loginForm.password.value);
      // You can perform authentication and redirect the user to the desired page
    });
  });