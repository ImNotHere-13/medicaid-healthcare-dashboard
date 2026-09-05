# Contributing to MEDICAID

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/medicaid-healthcare-dashboard.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit with clear messages: `git commit -m "Add: descriptive message"`
6. Push to your fork
7. Create a Pull Request

## PR Guidelines

### Title Format
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance

### Example
```
feat: add appointment rescheduling
fix: resolve notifications not dismissing
docs: update API integration guide
```

### PR Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] Accessibility tested
- [ ] Dark mode compatible
- [ ] Mobile responsive
- [ ] All linting rules pass

## Code Style

### Vue Components
```vue
<template>
  <!-- Template goes here -->
</template>

<script setup>
import { ref, computed } from 'vue'

// Props first
const props = defineProps({
  title: String
})

// Emits second
const emit = defineEmits(['action'])

// State
const state = ref({})

// Computed
const derived = computed(() => state.value)

// Methods
const handleAction = () => {}
</script>

<style scoped>
/* Scoped styles only */
</style>
```

### JavaScript
- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions
- Add JSDoc comments for functions

```javascript
/**
 * Validates user email
 * @param {string} email - User email
 * @returns {boolean} True if valid
 */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

## Testing Requirements

- Unit tests for all utilities
- Component tests for complex components
- E2E tests for critical user flows
- Minimum 80% code coverage

## Accessibility Standards

All contributions must include:
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation support
- [ ] Color contrast ratio > 4.5:1
- [ ] Alt text for images
- [ ] Semantic HTML

## Documentation

- Add JSDoc comments to functions
- Update README if adding features
- Add inline comments for complex logic
- Update DEVELOPMENT.md for architectural changes

## Questions?

- Check existing issues first
- Read DEVELOPMENT.md
- Open a discussion
- Email: support@medicaid.local

Thank you for contributing! 🙏
