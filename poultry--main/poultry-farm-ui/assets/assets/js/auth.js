document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Sample valid credentials (in a real app, this would be server-side)
    const validCredentials = {
        username: 'admin',
        password: 'poultry123'
    };
    
    // Check if user is already logged in (from sessionStorage)
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        clearErrors();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Simple validation
        if (!username) {
            showError(usernameInput, 'Username is required');
            return;
        }
        
        if (!password) {
            showError(passwordInput, 'Password is required');
            return;
        }
        
        // Check credentials (in a real app, this would be an API call)
        if (username === validCredentials.username && password === validCredentials.password) {
            // Store login state in sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError(loginForm, 'Invalid username or password');
        }
    });
    
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (input === loginForm) {
            loginForm.insertBefore(errorDiv, loginForm.firstChild);
        } else {
            input.parentNode.appendChild(errorDiv);
            input.style.borderColor = 'var(--error-color)';
        }
    }
    
    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        
        usernameInput.style.borderColor = '#ddd';
        passwordInput.style.borderColor = '#ddd';
    }
});