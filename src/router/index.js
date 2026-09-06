import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

// Auth views
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'

// Patient Views
import PatientDashboard from '../views/patient/Dashboard.vue'
import PatientAppointments from '../views/patient/Appointments.vue'
import PatientSurgeries from '../views/patient/Surgeries.vue'
import PatientMedications from '../views/patient/Medications.vue'
import PatientChat from '../views/patient/Chat.vue'

// Doctor Views
import DoctorPatients from '../views/doctor/Patients.vue'
import DoctorSchedule from '../views/doctor/Schedule.vue'
import DoctorPrescriptions from '../views/doctor/Prescriptions.vue'

// Pharmacy Views
import PharmaInventory from '../views/pharmacy/Inventory.vue'
import PharmaFormulary from '../views/pharmacy/Formulary.vue'
import PharmaCompliance from '../views/pharmacy/Compliance.vue'

const routes = [
  // Auth routes (public)
  { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },
  { path: '/register', name: 'register', component: Register, meta: { requiresAuth: false } },
  
  // Patient Routes (protected)
  { path: '/patient/dashboard', name: 'patient-dashboard', component: PatientDashboard, meta: { requiresAuth: true, role: 'patient' } },
  { path: '/patient/appointments', name: 'patient-appointments', component: PatientAppointments, meta: { requiresAuth: true, role: 'patient' } },
  { path: '/patient/surgeries', name: 'patient-surgeries', component: PatientSurgeries, meta: { requiresAuth: true, role: 'patient' } },
  { path: '/patient/medications', name: 'patient-medications', component: PatientMedications, meta: { requiresAuth: true, role: 'patient' } },
  { path: '/patient/chat', name: 'patient-chat', component: PatientChat, meta: { requiresAuth: true, role: 'patient' } },
  
  // Doctor Routes (protected)
  { path: '/doctor/patients', name: 'doctor-patients', component: DoctorPatients, meta: { requiresAuth: true, role: 'doctor' } },
  { path: '/doctor/schedule', name: 'doctor-schedule', component: DoctorSchedule, meta: { requiresAuth: true, role: 'doctor' } },
  { path: '/doctor/prescriptions', name: 'doctor-prescriptions', component: DoctorPrescriptions, meta: { requiresAuth: true, role: 'doctor' } },
  
  // Pharmacy Routes (protected)
  { path: '/pharmacy/inventory', name: 'pharma-inventory', component: PharmaInventory, meta: { requiresAuth: true, role: 'pharma' } },
  { path: '/pharmacy/formulary', name: 'pharma-formulary', component: PharmaFormulary, meta: { requiresAuth: true, role: 'pharma' } },
  { path: '/pharmacy/compliance', name: 'pharma-compliance', component: PharmaCompliance, meta: { requiresAuth: true, role: 'pharma' } },
  
  // Default redirect
  { path: '/', redirect: '/login' },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard for authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role
  
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      // Not logged in, redirect to login
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }
    
    // Check role-based access
    if (to.meta.role && to.meta.role !== userRole) {
      // User doesn't have required role
      return next({ name: `${userRole}-dashboard` })
    }
  } else {
    // Public routes
    if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
      // Already logged in, redirect to dashboard
      const dashboardRoutes = {
        patient: 'patient-dashboard',
        doctor: 'doctor-patients',
        pharma: 'pharma-inventory'
      }
      return next({ name: dashboardRoutes[userRole] })
    }
  }
  
  next()
})

export default router
