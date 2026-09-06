import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('authToken'))
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Login
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Login failed')
      }
      
      const data = await response.json()
      token.value = data.token
      user.value = data.user
      
      localStorage.setItem('authToken', data.token)
      
      return { success: true, user: data.user }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Register
  const register = async (fullName, email, password, confirmPassword, role) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fullName, email, password, confirmPassword, role })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Registration failed')
      }
      
      const data = await response.json()
      token.value = data.token
      user.value = data.user
      
      localStorage.setItem('authToken', data.token)
      
      return { success: true, user: data.user }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Logout
  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('authToken')
    }
  }

  // Verify token on app load
  const verifyToken = async () => {
    if (!token.value) return false
    
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token.value}` },
        credentials: 'include'
      })
      
      if (!response.ok) throw new Error('Token invalid')
      
      const data = await response.json()
      user.value = data.user
      return true
    } catch (err) {
      token.value = null
      localStorage.removeItem('authToken')
      return false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    verifyToken
  }
})
