// Dashboard JavaScript with Chart.js for data visualization

// Function to fetch dashboard data from backend
async function fetchDashboardData() {
    try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        
        // Placeholder data - replace with actual API call
        const data = {
            stats: {
                totalDevices: 24,
                onlineDevices: 21,
                offlineDevices: 3,
                alerts: 2
            },
            temperature: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                values: [18, 19, 21, 24, 26, 23, 20]
            },
            humidity: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                values: [45, 48, 52, 55, 50, 48, 46]
            },
            activities: [
                {
                    type: 'success',
                    message: 'Device DEV-001 came online',
                    time: '2 minutes ago'
                },
                {
                    type: 'warning',
                    message: 'Temperature alert: DEV-005 exceeded threshold',
                    time: '15 minutes ago'
                },
                {
                    type: 'danger',
                    message: 'Device DEV-012 went offline',
                    time: '1 hour ago'
                },
                {
                    type: 'info',
                    message: 'New user registered: user@example.com',
                    time: '3 hours ago'
                }
            ]
        };
        
        return data;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return null;
    }
}

// Update dashboard statistics
function updateStats(stats) {
    document.getElementById('totalDevices').textContent = stats.totalDevices;
    document.getElementById('onlineDevices').textContent = stats.onlineDevices;
    document.getElementById('offlineDevices').textContent = stats.offlineDevices;
    document.getElementById('alertsCount').textContent = stats.alerts;
}

// Create Temperature Chart
function createTemperatureChart(data) {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    
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

// Create Humidity Chart
function createHumidityChart(data) {
    const ctx = document.getElementById('humidityChart').getContext('2d');
    
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

// Update activity list
function updateActivityList(activities) {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-content">
                <span class="activity-dot ${activity.type}"></span>
                <span>${activity.message}</span>
            </div>
            <span class="activity-time">${activity.time}</span>
        `;
        activityList.appendChild(activityItem);
    });
}

// Logout function
function logout() {
    // TODO: Implement actual logout logic
    // Clear session/token
    // localStorage.removeItem('token');
    
    alert('Logging out...');
    window.location.href = 'login.html';
}

// Initialize dashboard
let temperatureChart = null;
let humidityChart = null;

async function initDashboard() {
    const data = await fetchDashboardData();
    
    if (data) {
        // Update stats
        updateStats(data.stats);
        
        // Create charts
        if (temperatureChart) temperatureChart.destroy();
        if (humidityChart) humidityChart.destroy();
        
        temperatureChart = createTemperatureChart(data.temperature);
        humidityChart = createHumidityChart(data.humidity);
        
        // Update activity list
        updateActivityList(data.activities);
    }
}

// Refresh dashboard data every 30 seconds
function startAutoRefresh() {
    setInterval(async () => {
        const data = await fetchDashboardData();
        if (data) {
            updateStats(data.stats);
            
            // Update chart data
            temperatureChart.data.datasets[0].data = data.temperature.values;
            temperatureChart.update();
            
            humidityChart.data.datasets[0].data = data.humidity.values;
            humidityChart.update();
            
            updateActivityList(data.activities);
        }
    }, 30000); // 30 seconds
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    startAutoRefresh();
});
