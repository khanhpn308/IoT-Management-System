// Users management JavaScript

// Fetch users from backend
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8000/api/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}


// Render users table
let allUsers = []; // Biến lưu trữ toàn bộ user để tìm kiếm

// 1. KIỂM TRA QUYỀN VÀ HIỆN NÚT NGAY LẬP TỨC KHI TẢI TRANG (Chống nháy nút)
const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
const isAdmin = currentUser.role === 'Admin';

document.addEventListener('DOMContentLoaded', () => {
    const addUserBtn = document.getElementById('addUserBtn');
    // Chỉ bật nút lên nếu đúng là Admin
    if (addUserBtn && isAdmin) {
        addUserBtn.style.display = 'block'; 
    }
});

// Render users table & Phân quyền
function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        
        // 2. Phân quyền các nút Actions trong bảng
        let actionButtons = '';
        if (isAdmin) {
            actionButtons = `
                <button class="btn btn-primary btn-sm" onclick="openChangePasswordModal(${user.id})">Password</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id}, '${user.name}')">Delete</button>
            `;
        } else {
            actionButtons = `<span style="color: #64748b; font-size: 13px; font-style: italic;">View only</span>`;
        }

        row.innerHTML = `
            <td><strong>${user.name}</strong></td>
            <td>${user.username}</td>
            <td>
                <span class="badge ${user.role === 'Admin' ? 'badge-success' : 'badge-info'}"
                      style="background-color: ${user.role === 'Admin' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)'}; 
                             color: ${user.role === 'Admin' ? '#3b82f6' : '#a855f7'};">
                    ${user.role}
                </span>
            </td>
            <td>
                <span class="badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'}">
                    ${(user.status || '').toUpperCase()}
                </span>
            </td>
            <td style="color: var(--text-secondary);">${user.registered || ''}</td>
            <td>${actionButtons}</td>
        `;
        tbody.appendChild(row);
    });
}

// Hàm thực thi tìm kiếm
function executeSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = allUsers.filter(user => 
        (user.name && user.name.toLowerCase().includes(searchTerm)) || 
        (user.username && user.username.toLowerCase().includes(searchTerm)) // <-- Sửa email thành username ở đây
    );
    renderUsersTable(filteredUsers);
}

// Tìm khi bấm nút Search
document.getElementById('searchBtn').addEventListener('click', executeSearch);

// Tìm khi nhấn Enter trong ô input
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        executeSearch();
    }
});

// Load users
async function loadUsers() {
    allUsers = await fetchUsers(); // Lưu vào biến toàn cục
    renderUsersTable(allUsers);
}

// Xóa User
async function deleteUser(userId, userName) {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản "${userName}" vĩnh viễn không?`)) {
        try {
            const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
                method: 'DELETE' // Phương thức DELETE để gọi đúng API backend
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Có lỗi xảy ra khi xóa');
            }
            
            alert(`Đã xóa tài khoản "${userName}" thành công!`);
            
            // Xóa xong thì gọi lại hàm này để load lại bảng (cập nhật dữ liệu mới nhất)
            loadUsers(); 
            
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(`Xóa thất bại: ${error.message}`);
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


// Xử lý form Thêm User
async function handleAddUser(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
    }
    
    const userData = {
        name: formData.get('name'),
        username: formData.get('username'),
        role: formData.get('role'),
        password: password
    };
    
    try {
        const response = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail);
        }
        
        alert('Đã thêm người dùng thành công!');
        closeAddUserModal();
        loadUsers(); // Tự động load lại bảng để thấy user mới
    } catch (error) {
        console.error('Lỗi khi thêm user:', error);
        alert(`Không thể thêm: ${error.message}`);
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
