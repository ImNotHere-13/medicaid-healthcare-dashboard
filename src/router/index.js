import { createRouter, createWebHistory } from 'vue-router'

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
  // Patient Routes
  { path: '/patient/dashboard', name: 'patient-dashboard', component: PatientDashboard },
  { path: '/patient/appointments', name: 'patient-appointments', component: PatientAppointments },
  { path: '/patient/surgeries', name: 'patient-surgeries', component: PatientSurgeries },
  { path: '/patient/medications', name: 'patient-medications', component: PatientMedications },
  { path: '/patient/chat', name: 'patient-chat', component: PatientChat },
  
  // Doctor Routes
  { path: '/doctor/patients', name: 'doctor-patients', component: DoctorPatients },
  { path: '/doctor/schedule', name: 'doctor-schedule', component: DoctorSchedule },
  { path: '/doctor/prescriptions', name: 'doctor-prescriptions', component: DoctorPrescriptions },
  
  // Pharmacy Routes
  { path: '/pharmacy/inventory', name: 'pharma-inventory', component: PharmaInventory },
  { path: '/pharmacy/formulary', name: 'pharma-formulary', component: PharmaFormulary },
  { path: '/pharmacy/compliance', name: 'pharma-compliance', component: PharmaCompliance },
  
  // Default redirect
  { path: '/', redirect: '/patient/dashboard' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
