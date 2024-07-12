document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector('.login-box form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get user inputs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Perform basic validation (you can add more complex validation as needed)
        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter both email and password.');
            return;
        }

        // Redirect to home-dashboard.html upon successful "login"
        window.location.href = '../home/home-dashboard.html';
    });
});