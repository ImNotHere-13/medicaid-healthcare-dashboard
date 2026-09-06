import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { users } from '../data/mock-users.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRE = '24h'

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
})

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['patient', 'doctor', 'pharma']),
  fullName: z.string().min(2, 'Name must be at least 2 characters')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  )
}

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    
    // Find user
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    
    // Generate token
    const token = generateToken(user)
    
    // Set secure cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
    
    // Return user (without password)
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        initials: user.initials,
        avatar: user.avatar
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    res.status(500).json({ error: 'Login failed' })
  }
})

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, role } = registerSchema.parse(req.body)
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)
    
    // Create user
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      passwordHash,
      fullName,
      role,
      initials: fullName.split(' ').map(n => n[0]).join('').toUpperCase(),
      avatar: '👤',
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    
    // Generate token
    const token = generateToken(newUser)
    
    // Set secure cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    })
    
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        initials: newUser.initials
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('authToken')
  res.json({ message: 'Logged out successfully' })
})

// Verify token endpoint
router.get('/verify', (req, res) => {
  const token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find(u => u.id === decoded.id)
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    
    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        initials: user.initials
      }
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
