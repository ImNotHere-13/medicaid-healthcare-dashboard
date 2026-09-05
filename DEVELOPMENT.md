# MEDICAID Development Guide

## Local Development Setup

### 1. Environment Variables

Create `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_MOCK_API=true
VITE_LOG_LEVEL=debug
```

### 2. Mock Data

All demo data is in `src/store/index.js`. To use real data:

```javascript
// Replace store with API calls
const state = reactive({
  // API calls instead of hardcoded data
})
```

### 3. Running Development Server

```bash
npm run dev
# Opens at http://localhost:5173
```

## API Integration

### Current State
Using Pinia-like store with mock data.

### Integration Pattern

```javascript
// Create api/client.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
})

export default apiClient
```

### Example API Call

```javascript
// In store
import apiClient from '../api/client'

const methods = {
  async loadPatients() {
    try {
      const res = await apiClient.get('/patients')
      state.doctor.patients = res.data
    } catch (error) {
      console.error('Failed to load patients', error)
    }
  }
}
```

## Component Development

### Creating a New Component

```vue
<template>
  <div class="component">
    <!-- Template -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: String,
  items: Array
})

const emit = defineEmits(['action'])

const localState = ref('')
</script>

<style scoped>
/* Component styles */
</style>
```

### Best Practices
- Use Composition API
- Define props and emits explicitly
- Add ARIA labels
- Use Tailwind classes
- Scoped styles only

## Adding a New View

1. Create in `src/views/{role}/NewView.vue`
2. Add route to `src/router/index.js`
3. Add sidebar navigation in `Sidebar.vue`
4. Import store and use state
5. Add accessibility labels

### Example Route

```javascript
// router/index.js
{ 
  path: '/doctor/notes', 
  name: 'doctor-notes', 
  component: () => import('../views/doctor/Notes.vue')
}
```

## State Management

### Store Structure

```javascript
state = {
  auth: { /* auth state */ },
  patient: { /* patient data */ },
  doctor: { /* doctor data */ },
  pharmacy: { /* pharmacy data */ },
  notifications: [],
  chatHistory: []
}
```

### Using Store

```javascript
import { useStore } from '../store'

const store = useStore()
const patients = computed(() => store.state.doctor.patients)
store.addNotification('Success!', 'success')
```

## Testing

### Unit Test Example

```javascript
// tests/store.test.js
import { describe, it, expect } from 'vitest'
import { useStore } from '../src/store'

describe('Store', () => {
  it('should add notification', () => {
    const store = useStore()
    store.addNotification('Test', 'info')
    expect(store.state.notifications.length).toBe(1)
  })
})
```

## Debugging

### Vue Devtools

```bash
# Install browser extension
# Chrome: Vue.js devtools
# Firefox: Vue.js devtools
```

### Console Logging

```javascript
console.log('Debug:', state.value)
console.table(computedResults.value)
```

## Performance Optimization

### Lazy Load Routes

```javascript
component: () => import('../views/patient/Dashboard.vue')
```

### Computed Properties

```javascript
const filteredItems = computed(() => {
  return items.value.filter(/* ... */)
})
```

### Image Optimization

```vue
<img :src="avatar" alt="User avatar" loading="lazy" />
```

## Common Issues

### 1. Reactivity Not Working

```javascript
// ❌ Wrong - direct assignment
state.data = newData

// ✅ Correct - use Object.assign or spread
state.data = { ...state.data, ...newData }
```

### 2. Stale Data in Computed

```javascript
// ❌ Dependencies missing
const result = computed(() => {
  return items.value.filter(/* depends on search */) // search not included!
})

// ✅ Include all dependencies
const result = computed(() => {
  return items.value.filter(item => 
    item.name.includes(searchQuery.value)
  )
})
```

### 3. Props Not Reactive

```javascript
// Use toRef or toRefs
import { toRefs } from 'vue'

const props = defineProps({ title: String })
const { title } = toRefs(props)
```

## Building for Production

```bash
# Create optimized build
npm run build

# Analyze bundle size
npm run build -- --analyze

# Preview production build locally
npm run preview
```

## Deployment Checklist

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Lighthouse score > 90
- [ ] Accessibility audit passed
- [ ] Environment variables configured
- [ ] API endpoints configured
- [ ] SSL certificate installed
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Documentation updated

---

For more help, see README.md or create an issue.
