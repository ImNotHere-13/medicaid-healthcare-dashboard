import { reactive } from 'vue'

const state = reactive({
  auth: {
    currentUser: null,
    userRole: 'patient', // 'patient', 'doctor', 'pharma'
    isAuthenticated: false,
    users: {
      patient: {
        id: 'p1',
        name: 'John Doe',
        initials: 'JD',
        email: 'john@example.com',
        role: 'patient',
        age: 42,
        bloodType: 'O+',
        avatar: '🩺'
      },
      doctor: {
        id: 'd1',
        name: 'Dr. Sarah Smith',
        initials: 'SS',
        email: 'sarah@hospital.com',
        role: 'doctor',
        specialty: 'Cardiology',
        license: 'MD-2024-001',
        avatar: '👨‍⚕️'
      },
      pharma: {
        id: 'ph1',
        name: 'Emily Chen',
        initials: 'EC',
        email: 'emily@pharmacy.com',
        role: 'pharma',
        title: 'Pharmacy Director',
        avatar: '💊'
      }
    }
  },
  
  patient: {
    appointments: [
      {
        id: 1,
        date: '2026-05-15',
        time: '10:00 AM',
        doctor: 'Dr. Michael Smith',
        specialty: 'Cardiology',
        description: 'Cardiology follow-up',
        status: 'Confirmed',
        location: 'City General Hospital'
      },
      {
        id: 2,
        date: '2026-06-22',
        time: '02:30 PM',
        doctor: 'Dr. Lisa Johnson',
        specialty: 'Surgery',
        description: 'Pre-op assessment',
        status: 'Pending',
        location: 'City General Hospital'
      }
    ],
    surgeries: [
      {
        id: 1,
        name: 'Left Knee Arthroscopy',
        date: '2026-07-12',
        time: '08:30 AM',
        surgeon: 'Dr. Michael Chen',
        hospital: 'City General Hospital',
        status: 'Confirmed',
        riskLevel: 'Low',
        notes: 'Meniscus repair expected',
        estimatedRecovery: '4-6 weeks'
      },
      {
        id: 2,
        name: 'Cataract Surgery (Right Eye)',
        date: '2026-08-05',
        time: '11:00 AM',
        surgeon: 'Dr. Lisa Patel',
        hospital: 'Vision Center',
        status: 'Scheduled',
        riskLevel: 'Very Low',
        notes: 'Routine outpatient procedure',
        estimatedRecovery: '2-3 weeks'
      }
    ],
    pastSurgeries: [
      { id: 3, name: 'Appendectomy', date: '2023-03-18', surgeon: 'Dr. Sarah Patel', notes: 'Emergency. Full recovery in 3 weeks.' },
      { id: 4, name: 'Wisdom Teeth Extraction', date: '2021-11-05', surgeon: 'Dr. James Wong', notes: 'Routine under local anesthesia.' }
    ],
    medications: [
      {
        id: 1,
        name: 'Atorvastatin',
        dose: '20 mg',
        frequency: 'Daily',
        purpose: 'Cholesterol management',
        prescribedBy: 'Dr. Smith',
        refillsLeft: 2,
        nextRefill: '2026-06-18',
        sideEffects: ['Muscle pain', 'Fatigue']
      },
      {
        id: 2,
        name: 'Lisinopril',
        dose: '10 mg',
        frequency: 'Daily',
        purpose: 'Hypertension control',
        prescribedBy: 'Dr. Smith',
        refillsLeft: 3,
        nextRefill: '2026-07-05',
        sideEffects: ['Dry cough', 'Dizziness']
      },
      {
        id: 3,
        name: 'Omeprazole',
        dose: '20 mg',
        frequency: 'Daily',
        purpose: 'Acid reflux',
        prescribedBy: 'Dr. Johnson',
        refillsLeft: 1,
        nextRefill: '2026-06-22',
        sideEffects: ['Headache']
      }
    ],
    labResults: [
      { id: 1, test: 'Hemoglobin', date: '2026-02-28', result: '14.2 g/dL', normalRange: '13.5-17.5', status: 'Normal' },
      { id: 2, test: 'LDL Cholesterol', date: '2026-01-15', result: '92 mg/dL', normalRange: '<100', status: 'Optimal' },
      { id: 3, test: 'Blood Glucose', date: '2026-04-10', result: '98 mg/dL', normalRange: '70-100', status: 'Normal' },
      { id: 4, test: 'Vitamin D', date: '2026-05-05', result: '42 ng/mL', normalRange: '30-100', status: 'Sufficient' }
    ],
    healthLog: [
      { id: 1, date: '2026-05-30', mood: 'Good', symptoms: 'Mild knee stiffness in morning', energyLevel: 8, bloodPressure: '120/80' },
      { id: 2, date: '2026-05-28', mood: 'Great', symptoms: 'None', energyLevel: 9, bloodPressure: '118/78' }
    ],
    vitals: {
      healthScore: 96,
      adherenceStreak: 11,
      lastUpdated: new Date().toISOString()
    }
  },
  
  doctor: {
    patients: [
      {
        id: 'p1',
        name: 'John Doe',
        age: 42,
        condition: 'Cardiovascular',
        nextAppointment: '2026-05-15',
        status: 'Stable',
        allergies: ['Penicillin']
      },
      {
        id: 'p2',
        name: 'Jane Smith',
        age: 38,
        condition: 'Post-op knee surgery',
        nextAppointment: '2026-05-20',
        status: 'Recovering',
        allergies: []
      }
    ],
    surgerySchedule: [
      {
        id: 1,
        patient: 'John Doe',
        procedure: 'Left Knee Arthroscopy',
        date: '2026-07-12',
        time: '08:30 AM',
        duration: '45 mins',
        room: 'OR-3',
        status: 'Confirmed',
        notes: 'Meniscus repair'
      },
      {
        id: 2,
        patient: 'Jane Smith',
        procedure: 'Follow-up Evaluation',
        date: '2026-05-20',
        time: '02:00 PM',
        duration: '30 mins',
        room: 'Clinic-2',
        status: 'Scheduled',
        notes: 'Post-op assessment'
      }
    ],
    prescriptions: [
      {
        id: 1,
        patient: 'John Doe',
        medication: 'Atorvastatin',
        dose: '20 mg',
        frequency: 'Daily',
        quantity: 90,
        refills: 2,
        status: 'Active',
        createdDate: '2026-01-10'
      },
      {
        id: 2,
        patient: 'Jane Smith',
        medication: 'Ibuprofen',
        dose: '400 mg',
        frequency: 'As needed',
        quantity: 30,
        refills: 1,
        status: 'Active',
        createdDate: '2026-05-01'
      }
    ]
  },
  
  pharmacy: {
    inventory: [
      { id: 1, name: 'Atorvastatin', category: 'Statin', strength: '20mg', stock: 1250, minStock: 500, unit: 'tablets', supplier: 'Pharma Corp', cost: 0.45 },
      { id: 2, name: 'Lisinopril', category: 'ACE Inhibitor', strength: '10mg', stock: 890, minStock: 400, unit: 'tablets', supplier: 'Medical Labs', cost: 0.32 },
      { id: 3, name: 'Omeprazole', category: 'PPI', strength: '20mg', stock: 2100, minStock: 600, unit: 'capsules', supplier: 'Pharma Corp', cost: 0.28 },
      { id: 4, name: 'Ibuprofen', category: 'NSAID', strength: '400mg', stock: 3500, minStock: 1000, unit: 'tablets', supplier: 'Generic Pharm', cost: 0.08 },
      { id: 5, name: 'Amoxicillin', category: 'Antibiotic', strength: '500mg', stock: 650, minStock: 300, unit: 'capsules', supplier: 'Medical Labs', cost: 0.25 }
    ],
    formulary: [
      { id: 1, name: 'Acetaminophen', category: 'Analgesic', description: 'Pain and fever relief', restrictions: 'None', priorAuth: false },
      { id: 2, name: 'Ibuprofen', category: 'NSAID', description: 'Anti-inflammatory pain relief', restrictions: 'Avoid in renal impairment', priorAuth: false },
      { id: 3, name: 'Amoxicillin', category: 'Antibiotic', description: 'Broad-spectrum antibiotic', restrictions: 'Allergy screening required', priorAuth: true },
      { id: 4, name: 'Lisinopril', category: 'ACE Inhibitor', description: 'Hypertension management', restrictions: 'Monitor potassium', priorAuth: false },
      { id: 5, name: 'Atorvastatin', category: 'Statin', description: 'Cholesterol management', restrictions: 'Liver function monitoring', priorAuth: false }
    ],
    pricing: [
      { id: 1, medication: 'Atorvastatin 20mg', insuranceCost: 15.00, patientCopay: 5.00, hospitalCost: 6.75, markup: 1.50 },
      { id: 2, medication: 'Lisinopril 10mg', insuranceCost: 12.00, patientCopay: 3.50, hospitalCost: 4.80, markup: 2.50 },
      { id: 3, medication: 'Omeprazole 20mg', insuranceCost: 18.00, patientCopay: 7.00, hospitalCost: 8.40, markup: 2.14 }
    ],
    compliance: {
      lastAudit: '2026-04-15',
      nextAudit: '2026-10-15',
      fdaApprovalRate: 98.5,
      temperatureCompliance: 100,
      storageCompliance: 100
    }
  },
  
  notifications: [],
  chatHistory: []
})

const methods = {
  login(role) {
    const user = state.auth.users[role]
    state.auth.currentUser = user
    state.auth.userRole = role
    state.auth.isAuthenticated = true
  },
  
  logout() {
    state.auth.currentUser = null
    state.auth.isAuthenticated = false
  },
  
  addNotification(message, type = 'info') {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    }
    state.notifications.push(notification)
    setTimeout(() => {
      state.notifications = state.notifications.filter(n => n.id !== notification.id)
    }, 5000)
  },
  
  requestRefill(medicationId) {
    const med = state.patient.medications.find(m => m.id === medicationId)
    if (med && med.refillsLeft > 0) {
      med.refillsLeft--
      this.addNotification(`Refill requested for ${med.name}`, 'success')
    }
  },
  
  saveDoctorNote(patientId, note) {
    this.addNotification('Note saved successfully', 'success')
  },
  
  updateInventory(medicationId, quantity) {
    const med = state.pharmacy.inventory.find(m => m.id === medicationId)
    if (med) {
      med.stock += quantity
      this.addNotification(`Inventory updated for ${med.name}`, 'success')
    }
  }
}

export function useStore() {
  return { state, ...methods }
}
