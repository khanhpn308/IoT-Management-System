// Users management JavaScript

// Fetch users from backend
async function fetchUsers() {
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/users');
        // const data = await response.json();
        
        // Placeholder data - replace with actual API call
        const users = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'Admin',
                status: 'active',
                registered: '2024-01-15'
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                role: 'User',
                status: 'active',
                registered: '2024-02-20'
            },
            {
                id: 3,
                name: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                role: 'User',
                status: 'active',
                registered: '2024-03-10'
            },
            {
                id: 4,
                name: 'Alice Williams',
                email: 'alice.williams@example.com',
                role: 'User',
                status: 'inactive',
                registered: '2024-01-05'
            }
        ];
        
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// Render users table
function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>
                <span class="badge ${user.role === 'Admin' ? 'badge-success' : 'badge-info'}"
                      style="background-color: ${user.role === 'Admin' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)'}; 
                             color: ${user.role === 'Admin' ? '#3b82f6' : '#a855f7'};">
                    ${user.role}
                </span>
            </td>
            <td>
                <span class="badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}">
                    ${user.status.toUpperCase()}
                </span>
            </td>
            <td style="color: var(--text-secondary);">${user.registered}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="openChangePasswordModal(${user.id})">Change Password</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id}, '${user.name}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Delete user
async function deleteUser(userId, userName) {
    if (confirm(`Are you sure you want to delete user "${userName}"?`)) {
        try {
            // TODO: Replace with your actual API endpoint
            // const response = await fetch(`/api/users/${userId}`, {
            //     method: 'DELETE'
            // });
            
            alert(`User "${userName}" deleted successfully`);
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    }
}

// Add User Modal functions
function openAddUserModal() {
    document.getElementById('addUserModal').classList.add('active');
}

function closeAddUserModal() {
    document.getElementById('addUserModal').classList.remove('active');
    document.getElementById('addUserForm').reset();
}

// Handle add user form submission
async function handleAddUser(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        password: formData.get('password')
    };
    
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/users', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(userData)
        // });
        
        alert('User added successfully');
        closeAddUserModal();
        loadUsers();
    } catch (error) {
        console.error('Error adding user:', error);
        alert('Failed to add user');
    }
}

// Change Password Modal functions
function openChangePasswordModal(userId) {
    document.getElementById('changePasswordUserId').value = userId;
    document.getElementById('changePasswordModal').classList.add('active');
}

function closeChangePasswordModal() {
    document.getElementById('changePasswordModal').classList.remove('active');
    document.getElementById('changePasswordForm').reset();
}

// Handle change password form submission
async function handleChangePassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    const userId = formData.get('userId');
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch(`/api/users/${userId}/password`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ password: newPassword })
        // });
        
        alert('Password changed successfully');
        closeChangePasswordModal();
    } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to change password');
    }
}

// Logout function
function logout() {
    alert('Logging out...');
    window.location.href = 'login.html';
}

// Load users
async function loadUsers() {
    const users = await fetchUsers();
    renderUsersTable(users);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const addUserModal = document.getElementById('addUserModal');
    const changePasswordModal = document.getElementById('changePasswordModal');
    
    if (event.target === addUserModal) {
        closeAddUserModal();
    }
    if (event.target === changePasswordModal) {
        closeChangePasswordModal();
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', loadUsers);
