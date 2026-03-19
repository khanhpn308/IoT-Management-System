// Authentication JavaScript

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const loginData = {
        username: formData.get('username'),
        password: formData.get('password')
    };
    
    try {const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
        username: data.user.email,
        name: data.user.name,
        role: data.user.role // Rất quan trọng dòng này!
    }))
        alert('Login successful!');
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
    }
}
//hiện nút khi role admin
function renderUsersTable(users) {
    const tableBody = document.getElementById('usersTableBody');
    // Lấy thông tin người đang đăng nhập từ máy ảo (localStorage)
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = currentUser.role === 'Admin';

    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="role-badge">${user.role}</span></td>
            <td><span class="status-badge status-${user.status}">${user.status}</span></td>
            <td>${user.registered}</td>
            <td>
                <div class="action-buttons">
                    ${isAdmin ? `
                        <button class="btn btn-secondary btn-sm" onclick="openChangePasswordModal(${user.id})">Password</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                    ` : '<span style="color:gray; font-size:12px">No Access</span>'}
                </div>
            </td>
        </tr>
    `).join('');

    // Nếu không phải admin, ẩn luôn nút "Add User" to đùng ở trên đầu
    const addUserBtn = document.querySelector('button[onclick="openAddUserModal()"]');
    if (addUserBtn && !isAdmin) {
        addUserBtn.style.display = 'none';
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
        username: formData.get('username'),
        password: password
    };
    
    try {
        const response = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail);
        }
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
        username: formData.get('username')
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
