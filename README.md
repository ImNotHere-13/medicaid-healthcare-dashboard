# 🏥 MEDICAID v3.3 - Healthcare Dashboard

A modern, production-ready healthcare management system with separate dashboards for **Patients**, **Doctors**, and **Pharmaceutical Administrators**. Built with Vue 3, fully accessible, responsive, and feature-complete.

![Version](https://img.shields.io/badge/version-3.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/vue-3.3+-green.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dashboards Overview](#dashboards-overview)
- [Accessibility](#accessibility)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)

---

## ✨ Features

### 🏥 Multi-Role System
- **Patient Dashboard** - Health tracking, appointments, medications, surgeries
- **Doctor Dashboard** - Patient management, surgery scheduling, prescriptions
- **Pharmacy Dashboard** - Inventory management, formulary, compliance & pricing
- **Role Switching** - Seamless switching between roles in sidebar

### 🔧 Core Features
- ✅ Real-time notifications & alerts
- ✅ Advanced search & filtering across all views
- ✅ Interactive charts & health metrics
- ✅ Dark mode toggle
- ✅ Responsive mobile design
- ✅ Voice input for chat (patient)
- ✅ Medication refill requests
- ✅ Surgery pre-op checklists
- ✅ Inventory management with low-stock alerts
- ✅ Compliance tracking & temperature monitoring
- ✅ Pricing & insurance cost analysis

### ♿ Accessibility
- Full ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Color-blind friendly status indicators
- High contrast dark mode
- Semantic HTML throughout

### 🎨 Modern UI/UX
- Built with Tailwind CSS
- Smooth animations & transitions
- Intuitive card-based layout
- Status-color coding (confirmed/pending/warning)
- Beautiful gradient headers
- Hover effects on interactive elements

---

## 🏗️ Architecture

```
src/
├── main.js                 # Entry point
├── App.vue                 # Root component
├── store/
│   └── index.js           # Centralized state management
├── router/
│   └── index.js           # Route configuration
├── views/
│   ├── patient/
│   │   ├── Dashboard.vue
│   │   ├── Appointments.vue
│   │   ├── Surgeries.vue
│   │   ├── Medications.vue
│   │   └── Chat.vue
│   ├── doctor/
│   │   ├── Patients.vue
│   │   ├── Schedule.vue
│   │   └── Prescriptions.vue
│   └── pharmacy/
│       ├── Inventory.vue
│       ├── Formulary.vue
│       └── Compliance.vue
├── components/
│   ├── Sidebar.vue
│   ├── NavItem.vue
│   ├── Card.vue
│   ├── DataTable.vue
│   ├── StatsGrid.vue
│   ├── SearchBar.vue
│   ├── FilterTags.vue
│   └── NotificationContainer.vue
└── styles/
    └── main.css           # Tailwind & custom styles
```

**State Management:**
- Global store with auth, patient, doctor, and pharmacy modules
- Reactive state with computed properties
- Notification system for user feedback

**Routing:**
- Patient routes: `/patient/*`
- Doctor routes: `/doctor/*`
- Pharmacy routes: `/pharmacy/*`

---

## 🚀 Installation

### Prerequisites
- Node.js 16+ (LTS recommended)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/ImNotHere-13/medicaid-healthcare-dashboard.git
cd medicaid-healthcare-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

---

## 💻 Usage

### Quick Start

1. **Open the application** - App loads with Patient dashboard by default
2. **Switch Roles** - Use sidebar buttons to switch between Patient → Doctor → Pharmacy
3. **Navigate** - Click sidebar items to explore different views
4. **Search & Filter** - Use search bars and filter tags to find data
5. **Dark Mode** - Toggle theme in header

### Patient Features

**Dashboard**
- Health score & vitals
- Upcoming appointments & surgeries
- Medication refills needed
- Blood pressure trend chart
- Health activity log

**Appointments**
- View all appointments
- Search by doctor/specialty
- Status filtering (Confirmed, Pending)
- Edit & reschedule options

**Surgeries**
- Upcoming procedures with risk assessment
- Pre-op information download
- Past surgery history
- Recovery time estimates

**Medications**
- Current active medications
- Dosage & frequency info
- Refill status tracking
- Request new refills
- Common side effects listed

**AI Assistant Chat**
- Voice input support
- Smart health questions
- Quick question templates
- Full record context awareness

### Doctor Features

**My Patients**
- Patient list with status
- Allergies & conditions
- Next appointment tracking
- View patient notes
- Quick prescription access

**Surgery Schedule**
- Upcoming surgeries calendar
- Operating room assignments
- Pre-op checklist management
- Surgery duration & risk info
- Add/edit surgeries

**Prescriptions**
- Active prescriptions table
- Patient & medication search
- Refill tracking
- Prescription editing
- Dosage & frequency management

### Pharmacy Features

**Drug Inventory**
- Real-time stock levels
- Critical stock alerts
- Reorder management
- Stock updates
- Supplier information
- Cost tracking

**Hospital Formulary**
- Approved medications
- Usage categories
- Prior authorization requirements
- Restrictions & contraindications
- Formulary editing

**Compliance & Pricing**
- FDA approval tracking
- Storage compliance monitoring
- Temperature control verification
- Insurance cost analysis
- Patient copay information
- Pricing adjustments

---

## 🎯 Project Structure

### Components

**Sidebar.vue**
- Navigation for all roles
- Role switcher
- User profile display

**Card.vue**
- Reusable status-aware card
- Border color coding by status
- Hover effects

**StatsGrid.vue**
- 4-column responsive grid
- Key metrics display
- Change indicators

**SearchBar.vue**
- Accessible search input
- Real-time filtering
- Icon included

**FilterTags.vue**
- Multi/single select
- Toggle functionality
- Keyboard accessible

**NotificationContainer.vue**
- Toast notifications
- Auto-dismiss after 5s
- Type-based styling

### Views

All views follow the pattern:
```vue
<template>
  <NotificationContainer>
    <!-- Content with search, filters, data display -->
  </NotificationContainer>
</template>
```

---

## ♿ Accessibility Features

✅ **ARIA Attributes**
- `aria-label` on all buttons & interactive elements
- `aria-current="page"` on active nav items
- `role="alert"` on notifications

✅ **Keyboard Navigation**
- Tab through all elements
- Enter to activate buttons
- Arrow keys for tag selection

✅ **Screen Reader Support**
- Semantic HTML (buttons, links, tables)
- Descriptive labels
- Status announcements

✅ **Visual Accessibility**
- High contrast text
- Status not indicated by color alone
- Readable font sizes
- Sufficient touch targets (min 44px)

✅ **Color Blind Friendly**
- Status uses text labels + colors
- Icons accompany all actions
- Not relying on red/green alone

---

## 🛠️ Development

### Tech Stack
- **Framework:** Vue 3 (Composition API)
- **Styling:** Tailwind CSS 3.3+
- **Routing:** Vue Router 4
- **Charts:** Chart.js 4
- **Date Handling:** date-fns
- **Build Tool:** Vite 5

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Code Style

```bash
# Lint & fix
npm run lint
```

### Adding a New Feature

1. Create view file in `src/views/{role}/`
2. Add route to `src/router/index.js`
3. Add navigation item to `Sidebar.vue`
4. Create reusable components in `src/components/`
5. Add state/methods to `src/store/index.js`

---

## 📦 Deployment

### Production Build

```bash
# Build optimized bundle
npm run build

# Output in dist/ folder
ls dist/
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

---

## 🔒 Security

### Current Implementation
- ⚠️ Mock authentication (for demo purposes)
- ⚠️ No real data encryption
- ⚠️ No API authentication

### Production Recommendations

```javascript
// 1. Implement JWT authentication
// 2. Use HTTPS only
// 3. Add CSRF protection
// 4. Implement role-based access control (RBAC)
// 5. Sanitize all user inputs
// 6. Use secure cookies
// 7. Add rate limiting
// 8. Encrypt sensitive data at rest
// 9. Implement audit logging
// 10. Regular security audits
```

### Data Protection
- All medical data should be encrypted (HIPAA compliance)
- Implement audit trails for all data access
- Use environment variables for sensitive config
- Never commit secrets to repository

---

## 📊 Features by Role

### 👤 Patient
- Health score tracking
- Appointment management
- Surgery information & recovery
- Medication refills
- Lab results
- Health log entries
- AI chat assistant

### 👨‍⚕️ Doctor
- Patient roster management
- Surgery scheduling
- Prescription management
- Patient notes
- Pre-op checklist
- Medical history access

### 💊 Pharmacist
- Medication inventory tracking
- Stock level monitoring
- Hospital formulary management
- Compliance auditing
- Temperature monitoring
- Pricing & insurance analysis
- Reorder management

---

## 🚀 Performance

- Lazy loading for views
- Optimized re-renders with Vue 3
- Debounced search inputs
- Cached computed properties
- Production build < 100KB (gzipped)

---

## 📝 License

MIT License - See LICENSE file for details

---

## 👥 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Open a GitHub issue
- Email: support@medicaid.local
- Documentation: [Full Docs](./docs)

---

## 🎓 Learning Resources

- [Vue 3 Docs](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue Router](https://router.vuejs.org/)
- [Healthcare Standards (HIPAA)](https://www.hhs.gov/hipaa/)

---

**Built with ❤️ for better healthcare management**
