import bcrypt from 'bcryptjs'

// Mock users database with hashed passwords
// Password: demo123 (hashed)
const passwordHash = await bcrypt.hash('demo123', 10)

export const users = [
  {
    id: 'p1',
    email: 'john@example.com',
    passwordHash,
    fullName: 'John Doe',
    role: 'patient',
    initials: 'JD',
    avatar: '👤',
    createdAt: new Date('2025-01-01').toISOString()
  },
  {
    id: 'd1',
    email: 'sarah@hospital.com',
    passwordHash,
    fullName: 'Dr. Sarah Smith',
    role: 'doctor',
    initials: 'SS',
    avatar: '👨‍⚕️',
    createdAt: new Date('2025-01-01').toISOString()
  },
  {
    id: 'ph1',
    email: 'emily@pharmacy.com',
    passwordHash,
    fullName: 'Emily Chen',
    role: 'pharma',
    initials: 'EC',
    avatar: '💊',
    createdAt: new Date('2025-01-01').toISOString()
  }
]
