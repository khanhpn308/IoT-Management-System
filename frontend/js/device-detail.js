// Device Detail JavaScript

// Get device ID from URL
function getDeviceIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch device details from backend
async function fetchDeviceDetails(deviceId) {
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch(`/api/devices/${deviceId}`);
        // const data = await response.json();
        
        // Placeholder data - replace with actual API call
        const deviceData = {
            id: deviceId,
            name: 'Temperature Sensor 1',
            type: 'Temperature Sensor',
            status: 'online',
            lastSeen: '2 minutes ago',
            currentReadings: {
                temperature: 22.5,
                humidity: 48
            },
            history: {
                temperature: {
                    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                    values: [20, 21, 22, 24, 25, 23, 22.5]
                },
                humidity: {
                    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                    values: [45, 46, 47, 50, 52, 49, 48]
                }
            }
        };
        
        return deviceData;
    } catch (error) {
        console.error('Error fetching device details:', error);
        return null;
    }
}

// Update device info
function updateDeviceInfo(device) {
    document.getElementById('deviceTitle').textContent = device.name;
    document.getElementById('deviceId').textContent = device.id;
    document.getElementById('deviceType').textContent = device.type;
    document.getElementById('lastSeen').textContent = device.lastSeen;
    
    // Update status with badge
    const statusHtml = `<span class="badge ${device.status === 'online' ? 'badge-success' : 'badge-danger'}" style="font-size: 1rem; padding: 0.5rem 1rem;">
        ${device.status.toUpperCase()}
    </span>`;
    document.getElementById('deviceStatus').innerHTML = statusHtml;
    
    // Update current readings
    document.getElementById('currentTemp').textContent = `${device.currentReadings.temperature}°C`;
    document.getElementById('currentHumidity').textContent = `${device.currentReadings.humidity}%`;
}

// Create Temperature History Chart
function createTempChart(data) {
    const ctx = document.getElementById('deviceTempChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: data.values,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#f8fafc'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e293b',
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    borderColor: '#334155',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function(value) {
                            return value + '°C';
                        }
                    }
                },
                x: {
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Create Humidity History Chart
function createHumidityChart(data) {
    const ctx = document.getElementById('deviceHumidityChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Humidity (%)',
                data: data.values,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#f8fafc'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1e293b',
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    borderColor: '#334155',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Logout function
function logout() {
    alert('Logging out...');
    window.location.href = 'login.html';
}

// Initialize page
let tempChart = null;
let humidityChart = null;

async function initDeviceDetail() {
    const deviceId = getDeviceIdFromUrl();
    
    if (!deviceId) {
        alert('No device ID provided');
        window.location.href = 'devices.html';
        return;
    }
    
    const device = await fetchDeviceDetails(deviceId);
    
    if (device) {
        updateDeviceInfo(device);
        
        // Create charts
        if (tempChart) tempChart.destroy();
        if (humidityChart) humidityChart.destroy();
        
        tempChart = createTempChart(device.history.temperature);
        humidityChart = createHumidityChart(device.history.humidity);
    } else {
        alert('Device not found');
        window.location.href = 'devices.html';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initDeviceDetail);
