# IoT Management System

A comprehensive, modern IoT device management platform built with Astro, React, and TypeScript. Features a professional Industrial IoT theme with slate gray and electric blue accents.

## Features

### 🏠 Home Page
- Hero section with system overview
- Feature cards showcasing key capabilities
- Quick stats dashboard
- Call-to-action buttons for dashboard and login

### 📊 Dashboard
- Real-time device status summary (Total, Online, Offline, Alerts)
- Interactive line charts for Temperature and Humidity trends
- Recent activity feed with color-coded status indicators
- Responsive grid layout

### 🔌 Device Management
- Grid view of all IoT devices with cards
- Device status indicators (Online/Offline with pulse animation)
- Live status toggles
- Click any device card to open detailed view in new tab
- Floating "Add Device" button (Root Admin only)

### 📱 Device Detail Page
- **Account Tab**: 
  - Display Device ID and masked password
  - Edit icon to change device password
  - Modal form with validation (Old Password, New Password, Confirm)
  
- **History Tab**:
  - Table with 20 sample parameter readings
  - Timestamp tracking
  - Sortable columns

### 👥 User Management (Root Admin)
- Comprehensive user directory table
- Display User ID, Name, Email, Role, and assigned device count
- **Assign Devices**: Modal to map specific devices to users
- **Delete User**: Confirmation-based user removal
- Floating "+" button to add new devices
- Role-based badges (Admin/User)

### 🔐 Authentication
- **Login Page**: Clean form with email/password, remember me, and forgot password link
- **Registration Page**: Multi-field form with terms acceptance and password confirmation
- **Password Recovery**: Email-based reset flow

## Design System

### Color Palette
- **Background**: Slate-900 (`#0f172a`)
- **Cards/Panels**: Slate-800 (`#1e293b`)
- **Primary Accent**: Electric Blue (`#3b82f6`)
- **Success**: Green-400 (`#4ade80`)
- **Warning**: Yellow-400 (`#facc15`)
- **Danger**: Red-400 (`#f87171`)
- **Text Primary**: White
- **Text Secondary**: Slate-400 (`#94a3b8`)

### Typography
- **Headings**: Montserrat (bold)
- **Body**: Arial, 'Helvetica Neue', Helvetica, sans-serif
- **Buttons**: Montserrat

### Icons
- Lucide React icons throughout
- Consistent sizing and styling
- Color-coded for different states

## Tech Stack

- **Framework**: Astro 5.13.5
- **UI Library**: React 19.1.1
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React 0.533.0
- **Deployment**: Cloudflare Workers
- **Type Safety**: TypeScript

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx                 # Global navigation bar
│   ├── ChangePasswordModal.tsx    # Device password change modal
│   ├── AddDeviceModal.tsx         # New device creation modal
│   └── AssignDeviceModal.tsx      # Device assignment modal
├── pages/
│   ├── index.astro                # Home/landing page
│   ├── dashboard.astro            # Main dashboard with charts
│   ├── devices.astro              # Device grid listing
│   ├── users.astro                # User management table
│   ├── login.astro                # Authentication
│   ├── register.astro             # User registration
│   ├── recover-password.astro     # Password reset
│   └── device/
│       └── [id].astro             # Dynamic device detail page
├── layouts/
│   └── main.astro                 # Base layout template
└── styles/
    └── global.css                 # Global styles and theme
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
None required for basic setup. The system uses mock data for demonstration.

## Key Features in Detail

### Responsive Navigation
- Sticky header with logo and main navigation links
- Active state indicators
- User profile section with logout button

### Real-time Monitoring
- Animated pulse indicators for online devices
- Color-coded status badges
- Live data visualization with SVG charts

### Modal System
- Reusable modal components
- Proper focus management
- Smooth animations
- Click-outside to close

### Admin Controls
- Role-based UI elements
- Floating action buttons
- Bulk device assignment
- User management with confirmation dialogs

### Accessibility
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## Customization

### Adding Real Data
Replace mock data in pages with API calls:
- Update device arrays in `devices.astro`
- Connect charts in `dashboard.astro` to real-time data
- Integrate authentication with backend service

### Styling
- Modify color palette in `src/styles/global.css`
- Update Webflow design system in `generated/webflow.css`
- Customize component styles inline or in separate CSS files

### Extending Features
- Add more device types
- Implement real-time WebSocket connections
- Add data export functionality
- Create advanced analytics views
- Implement notification system

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance
- Optimized with Astro's partial hydration
- React components load only when needed
- Efficient client-side routing
- Lazy loading for modals and heavy components

## License
MIT

## Support
For issues and feature requests, please contact the development team.

---

Built with ❤️ using Astro, React, and modern web technologies.
