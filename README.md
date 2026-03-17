# IoT Management System

A pure HTML, CSS, and JavaScript IoT device management system with real-time monitoring and user management capabilities.

## Features

### 🏠 Home Page
- Hero section with system overview
- Feature highlights
- Quick statistics
- Modern industrial IoT design

### 📊 Dashboard
- Real-time device status summary
- Interactive temperature and humidity charts (Chart.js)
- Recent activity feed
- Auto-refresh every 30 seconds

### 🔧 Device Management
- List all IoT devices
- View device details with historical data
- Add new devices
- Delete devices
- Real-time status indicators

### 👥 User Management (Admin)
- View all registered users
- Add new users
- Change user passwords
- Delete users
- Role-based access (Admin/User)

### 🔐 Authentication
- Login page
- Registration page
- Password recovery
- Secure session management

## Project Structure

```
iot-management-system/
├── index.html              # Home page
├── dashboard.html          # Dashboard with charts
├── devices.html            # Device list
├── device-detail.html      # Individual device details
├── users.html              # User management
├── login.html              # Login page
├── register.html           # Registration page
├── recover-password.html   # Password recovery
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── main.js             # Common utilities
│   ├── auth.js             # Authentication logic
│   ├── dashboard.js        # Dashboard functionality
│   ├── devices.js          # Device management
│   ├── device-detail.js    # Device details
│   └── users.js            # User management
└── README.md               # This file
```

## Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Functionality and interactivity
- **Chart.js** - Data visualization (via CDN)

## Getting Started

### 1. Clone or Download
Simply download all files and maintain the folder structure.

### 2. Open in Browser
Open `index.html` in your web browser to start.

### 3. No Build Process Required
This is a pure HTML/CSS/JS project with no dependencies to install.

## Backend Integration

All API calls are currently using placeholder data. To connect to your backend:

### Dashboard Data
In `js/dashboard.js`, replace the placeholder in `fetchDashboardData()`:

```javascript
async function fetchDashboardData() {
    const response = await fetch('YOUR_API_URL/dashboard');
    const data = await response.json();
    return data;
}
```

Expected API response format:
```json
{
    "stats": {
        "totalDevices": 24,
        "onlineDevices": 21,
        "offlineDevices": 3,
        "alerts": 2
    },
    "temperature": {
        "labels": ["00:00", "04:00", "08:00", ...],
        "values": [18, 19, 21, ...]
    },
    "humidity": {
        "labels": ["00:00", "04:00", "08:00", ...],
        "values": [45, 48, 52, ...]
    },
    "activities": [
        {
            "type": "success",
            "message": "Device came online",
            "time": "2 minutes ago"
        }
    ]
}
```

### Device Management
In `js/devices.js`, update these endpoints:

```javascript
// Get all devices
GET /api/devices

// Get single device
GET /api/devices/:id

// Add device
POST /api/devices

// Delete device
DELETE /api/devices/:id
```

### User Management
In `js/users.js`, update these endpoints:

```javascript
// Get all users
GET /api/users

// Add user
POST /api/users

// Change password
PUT /api/users/:id/password

// Delete user
DELETE /api/users/:id
```

### Authentication
In `js/auth.js`, update these endpoints:

```javascript
// Login
POST /api/auth/login

// Register
POST /api/auth/register

// Password recovery
POST /api/auth/recover
```

## Customization

### Colors
Edit CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #3b82f6;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --bg-dark: #0f172a;
    /* ... */
}
```

### Charts
Chart configuration in `js/dashboard.js` and `js/device-detail.js`. Modify colors, labels, and options in the Chart.js configuration objects.

### Auto-refresh Interval
Change the dashboard refresh rate in `js/dashboard.js`:

```javascript
setInterval(async () => {
    // Update logic
}, 30000); // Change 30000 to your desired milliseconds
```

## Features to Add

To enhance the system, consider implementing:

1. **Real-time WebSocket connection** for live updates
2. **Data export** (CSV, PDF)
3. **Advanced filtering** and search
4. **Alert notifications** system
5. **Device grouping** and tagging
6. **Historical data** export
7. **User activity logs**
8. **2FA authentication**
9. **Mobile responsive** improvements
10. **Dark/Light theme** toggle

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available for any use.

## Support

For issues or questions, please refer to your backend API documentation or contact your system administrator.
