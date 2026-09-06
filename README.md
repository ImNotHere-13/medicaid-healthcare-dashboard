# MEDICAID v3.4.0 - Secure Healthcare Dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/ImNotHere-13/medicaid-healthcare-dashboard.git
cd medicaid-healthcare-dashboard

# Install dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### Environment Setup

**Frontend (.env.local)**
```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

**Backend (backend/.env)**
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-key-change-in-production
FRONTEND_URL=http://localhost:5173
```

### Running the Application

**Option 1: Separate Terminal Windows**

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Runs on http://localhost:3000

# Terminal 2 - Frontend
npm run dev
# Opens on http://localhost:5173
```

**Option 2: Concurrent (requires concurrently package)**

```bash
npm run dev:full
```

---

## 🔐 Authentication & Security

### Login Flow

1. User enters email/password on login page
2. Frontend sends credentials to `/api/auth/login`
3. Backend verifies credentials against hashed passwords
4. JWT token generated and returned
5. Token stored in httpOnly cookie + localStorage
6. Frontend stores user info in Pinia store
7. All subsequent API calls include token
8. Route guards prevent unauthorized access

### Password Security

```javascript
// Passwords are hashed with bcryptjs
const passwordHash = await bcrypt.hash(password, 10)

// Never stored in plaintext
// Never sent back to frontend
// Verified using: await bcrypt.compare(inputPassword, storedHash)
```

### Demo Credentials

```
Email:    john@example.com
Password: demo123
Role:     Patient
---
Email:    sarah@hospital.com
Password: demo123
Role:     Doctor
---
Email:    emily@pharmacy.com
Password: demo123
Role:     Pharmacy
```

### Security Features

✅ **JWT Authentication**
- 24-hour token expiration
- Secure token storage in httpOnly cookies
- Token verification on app load

✅ **Password Hashing**
- bcryptjs with salt rounds: 10
- Passwords never logged or transmitted
- Secure comparison prevents timing attacks

✅ **Rate Limiting**
- 5 login attempts per 15 minutes per IP
- 100 general requests per 15 minutes
- Prevents brute force attacks

✅ **CORS Protection**
- Only frontend domain allowed
- Credentials required for cross-origin requests
- httpOnly cookies prevent XSS access

✅ **Input Validation**
- Zod schema validation
- Email format validation
- Password strength requirements
- Server-side validation (not just client)

✅ **Session Management**
- Automatic logout after 24 hours
- Token verification on app boot
- Logout clears all auth data
- Refresh functionality planned for v3.5

---

## 📊 Project Structure

```
medicaid-healthcare-dashboard/
├── frontend/
│   ├── src/
│   │   ├── main.js                 # App entry point
│   │   ├── App.vue                 # Root component
│   │   ├── views/
│   │   │   ├── auth/
│   │   │   │   ├── Login.vue       # Login/Register page
│   │   │   │   └── Register.vue
│   │   │   ├── patient/
│   │   │   ├── doctor/
│   │   │   └── pharmacy/
│   │   ├── components/             # Reusable UI components
│   │   ├── stores/
│   │   │   └── auth.js             # Pinia auth store
│   │   ├── router/
│   │   │   └── index.js            # Vue Router with guards
│   │   └── styles/
│   │       └── main.css            # Tailwind & custom styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js                   # Express server entry
│   ├── routes/
│   │   ├── auth.js                 # Login/Register/Logout endpoints
│   │   └── users.js                # Protected user endpoints
│   ├── middleware/
│   │   └── auth.js                 # JWT verification middleware
│   ├── data/
│   │   └── mock-users.js           # Mock database with hashed passwords
│   ├── package.json
│   └── .env
│
├── README.md
├── DEVELOPMENT.md
├── CONTRIBUTING.md
└── CHANGELOG.md
```

---

## 🎯 Role-Based Features

### 👤 Patient
- Health score & vitals tracking
- Appointment management
- Surgery information
- Medication refills
- Lab results
- AI chat assistant
- Health journal

### 🏥 Doctor
- Patient roster
- Surgery scheduling
- Prescription management
- Patient notes
- Pre-op checklists
- Medical history

### 💊 Pharmacy
- Drug inventory tracking
- Stock level monitoring
- Hospital formulary
- Compliance audits
- Temperature monitoring
- Pricing analysis

---

## 🛡️ Security Checklist

- [x] Secure password hashing (bcryptjs)
- [x] JWT token authentication
- [x] Rate limiting on login
- [x] CORS protection
- [x] Input validation (Zod)
- [x] Route guards for protected pages
- [x] httpOnly secure cookies
- [x] Environment variable management
- [x] Token expiration (24 hours)
- [x] Session persistence
- [x] Logout functionality
- [ ] OAuth2 integration (planned v3.5)
- [ ] Two-factor authentication (planned v3.5)
- [ ] Database encryption (planned v3.5)
- [ ] HIPAA compliance audit (planned v3.5)

---

## 📦 Production Deployment

### Build Frontend

```bash
npm run build
# Creates dist/ folder
```

### Environment Variables (Production)

```env
# .env (Backend)
NODE_ENV=production
PORT=3000
JWT_SECRET=use-strong-random-key-here
FRONTEND_URL=https://your-domain.com
```

### Deploy to Vercel (Frontend)

```bash
npm i -g vercel
vercel
```

### Deploy to Heroku (Backend)

```bash
heroku create medicaid-api
git push heroku main
```

---

## 🧪 Testing the Auth Flow

1. **Start the application**
   ```bash
   npm run dev:full
   ```

2. **Visit login page**
   ```
   http://localhost:5173/login
   ```

3. **Test Login**
   - Email: john@example.com
   - Password: demo123
   - Click Login
   - Should redirect to Patient Dashboard

4. **Test Logout**
   - Click Logout button in sidebar
   - Should redirect to login page
   - Tokens should be cleared

5. **Test Protected Routes**
   - Try accessing `/patient/dashboard` directly
   - Without login, should redirect to `/login`

6. **Test Role-Based Access**
   - Login as patient
   - Try accessing `/doctor/patients`
   - Should redirect to patient dashboard

7. **Test Registration**
   - Click Register tab
   - Fill in details
   - Create new account
   - Should be logged in automatically

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000
# Kill the process
kill -9 <PID>
```

### CORS errors
- Check `FRONTEND_URL` in backend/.env
- Ensure it matches your frontend URL
- Restart backend server

### Login not working
- Check backend is running on port 3000
- Check console for error messages
- Verify email exists in mock-users.js
- Try password: demo123

### Logout not working
- Clear browser cookies
- Clear localStorage
- Hard refresh (Ctrl+Shift+R)

---

## 📚 API Endpoints

### Authentication

```
POST /api/auth/login
  Body: { email, password }
  Returns: { token, user }

POST /api/auth/register
  Body: { fullName, email, password, confirmPassword, role }
  Returns: { token, user }

GET /api/auth/verify
  Headers: { Authorization: Bearer <token> }
  Returns: { user }

POST /api/auth/logout
  Returns: { message }
```

### Users (Protected)

```
GET /api/users/profile
  Headers: { Authorization: Bearer <token> }
  Returns: { user }

GET /api/users
  Headers: { Authorization: Bearer <token> }
  Returns: { users }
```

---

## 📄 License

MIT License - See LICENSE file

---

## 🤝 Support

For issues or questions:
- Open GitHub issue
- Email: support@medicaid.local
- Check DEVELOPMENT.md for detailed guides

---

**Built with security & healthcare best practices** 🏥
