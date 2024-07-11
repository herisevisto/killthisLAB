// passwordReset.js

document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const createNewPasswordForm = document.getElementById('createNewPasswordForm');

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            requestPasswordReset(email);
        });
    }

    if (createNewPasswordForm) {
        createNewPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const resetToken = document.getElementById('resetToken').value;
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            resetPassword(resetToken, newPassword);
        });

        // Get reset token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const resetToken = urlParams.get('token');
        if (resetToken) {
            document.getElementById('resetToken').value = resetToken;
        }
    }
});

async function requestPasswordReset(email) {
    try {
        const response = await fetch('/api/auth/request-password-reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Password reset link has been sent to your email.');
            // Redirect to login or show a success message
        } else {
            alert(data.message || 'An error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

async function resetPassword(token, newPassword) {
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Your password has been reset successfully.');
            window.location.href = '/login'; // Redirect to login page
        } else {
            alert(data.message || 'An error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}