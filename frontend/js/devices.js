// Devices page JavaScript

// Fetch devices from backend
async function fetchDevices() {
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/devices');
        // const data = await response.json();
        
        // Placeholder data - replace with actual API call
        const devices = [
            {
                id: 'DEV-001',
                name: 'Temperature Sensor 1',
                type: 'Temperature Sensor',
                status: 'online',
                lastSeen: '2 minutes ago'
            },
            {
                id: 'DEV-002',
                name: 'Humidity Sensor 1',
                type: 'Humidity Sensor',
                status: 'online',
                lastSeen: '5 minutes ago'
            },
            {
                id: 'DEV-003',
                name: 'Motion Detector 1',
                type: 'Motion Sensor',
                status: 'offline',
                lastSeen: '2 hours ago'
            },
            {
                id: 'DEV-004',
                name: 'Temperature Sensor 2',
                type: 'Temperature Sensor',
                status: 'online',
                lastSeen: '1 minute ago'
            },
            {
                id: 'DEV-005',
                name: 'Pressure Sensor 1',
                type: 'Pressure Sensor',
                status: 'online',
                lastSeen: '3 minutes ago'
            },
            {
                id: 'DEV-006',
                name: 'Light Sensor 1',
                type: 'Light Sensor',
                status: 'offline',
                lastSeen: '1 day ago'
            }
        ];
        
        return devices;
    } catch (error) {
        console.error('Error fetching devices:', error);
        return [];
    }
}

// Render devices table
function renderDevicesTable(devices) {
    const tbody = document.getElementById('devicesTableBody');
    tbody.innerHTML = '';
    
    devices.forEach(device => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${device.id}</strong></td>
            <td>${device.name}</td>
            <td>${device.type}</td>
            <td>
                <span class="badge ${device.status === 'online' ? 'badge-success' : 'badge-danger'}">
                    ${device.status.toUpperCase()}
                </span>
            </td>
            <td style="color: var(--text-secondary);">${device.lastSeen}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewDevice('${device.id}')">View</button>
                <button class="btn btn-danger btn-sm" onclick="deleteDevice('${device.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// View device details
function viewDevice(deviceId) {
    window.location.href = `device-detail.html?id=${deviceId}`;
}

// Delete device
async function deleteDevice(deviceId) {
    if (confirm(`Are you sure you want to delete device ${deviceId}?`)) {
        try {
            // TODO: Replace with your actual API endpoint
            // const response = await fetch(`/api/devices/${deviceId}`, {
            //     method: 'DELETE'
            // });
            
            alert(`Device ${deviceId} deleted successfully`);
            loadDevices();
        } catch (error) {
            console.error('Error deleting device:', error);
            alert('Failed to delete device');
        }
    }
}

// Modal functions
function openAddDeviceModal() {
    document.getElementById('addDeviceModal').classList.add('active');
}

function closeAddDeviceModal() {
    document.getElementById('addDeviceModal').classList.remove('active');
    document.getElementById('addDeviceForm').reset();
}

// Handle add device form submission
async function handleAddDevice(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const deviceData = {
        deviceId: formData.get('deviceId'),
        deviceName: formData.get('deviceName'),
        deviceType: formData.get('deviceType'),
        location: formData.get('location')
    };
    
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/devices', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(deviceData)
        // });
        
        alert('Device added successfully');
        closeAddDeviceModal();
        loadDevices();
    } catch (error) {
        console.error('Error adding device:', error);
        alert('Failed to add device');
    }
}

// Logout function
function logout() {
    alert('Logging out...');
    window.location.href = 'login.html';
}

// Load devices
async function loadDevices() {
    const devices = await fetchDevices();
    renderDevicesTable(devices);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addDeviceModal');
    if (event.target === modal) {
        closeAddDeviceModal();
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', loadDevices);
