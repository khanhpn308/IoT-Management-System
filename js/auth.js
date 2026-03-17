// Authentication JavaScript

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(loginData)
        // });
        // const data = await response.json();
        
        // Store token (example)
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('user', JSON.stringify(data.user));
        
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
    }
}

// Handle register form submission
async function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const registerData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: password
    };
    
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/auth/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(registerData)
        // });
        
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
}

// Handle password recovery form submission
async function handleRecover(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const recoverData = {
        email: formData.get('email')
    };
    
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/auth/recover', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(recoverData)
        // });
        
        alert('Password reset instructions have been sent to your email.');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Recovery error:', error);
        alert('Failed to send recovery email. Please try again.');
    }
}
