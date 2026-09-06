import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken || req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.id
    req.userRole = decoded.role
    req.userEmail = decoded.email
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    next()
  }
}
