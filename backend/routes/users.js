import express from 'express'
import { users } from '../data/mock-users.js'

const router = express.Router()

// Get current user profile
router.get('/profile', (req, res) => {
  const user = users.find(u => u.id === req.userId)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  
  res.json({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      initials: user.initials,
      createdAt: user.createdAt
    }
  })
})

// Get all users (admin only)
router.get('/', (req, res) => {
  const userList = users.map(u => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    role: u.role,
    createdAt: u.createdAt
  }))
  res.json({ users: userList })
})

export default router
