# Contributing to winput

Thank you for your interest in contributing to winput! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/wuw-shz/winput.git
   cd winput
   ```
3. **Install dependencies**:
   ```bash
   bun install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🏗️ Development Setup

### Prerequisites
- Windows OS (required for FFI calls to User32.dll)
- Bun runtime >= 1.0.0
- Git

### Project Structure
```
winput/
├── src/              # Source code
│   ├── index.ts      # Main entry point
│   ├── mouse.ts      # Mouse functions
│   ├── keyboard.ts   # Keyboard functions
│   ├── utils.ts      # Utilities
│   └── ...
├── test/             # Test files
├── dist/             # Built files (generated)
└── package.json
```

### Available Scripts

```bash
# Run tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage

# Build the project
bun run build

# Build type definitions
bun run build:types
```

## 🧪 Testing

- Write tests for all new features and bug fixes
- Ensure all tests pass before submitting a PR
- Tests are located in the `test/` directory
- Use descriptive test names

Example test:
```typescript
test('moveTo() moves cursor to absolute position', () => {
  moveTo(100, 100, false)
  const [x, y] = position()
  expect(x).toBe(100)
  expect(y).toBe(100)
})
```

## 📝 Code Style

- Use TypeScript with strict mode enabled
- Follow existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and single-purpose

Example:
```typescript
/**
 * Move mouse cursor to absolute screen coordinates
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param _pause - Whether to pause after movement
 * @param relative - Use relative positioning
 */
export function moveTo(
   x?: number,
   y?: number,
   _pause = true,
   relative = false
): void {
   // Implementation
}
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Minimal code to reproduce the bug
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Environment**:
   - OS version (e.g., Windows 11)
   - Bun version
   - winput version

## ✨ Feature Requests

When requesting features:

1. **Use case**: Explain why this feature is needed
2. **Proposed solution**: How you think it should work
3. **Alternatives**: Other solutions you've considered
4. **Examples**: Code examples of how it would be used

## 🔄 Pull Request Process

1. **Update tests**: Add or update tests for your changes
2. **Update documentation**: Update README.md if needed
3. **Run tests**: Ensure `bun test` passes
4. **Build check**: Ensure `bun run build` succeeds
5. **Commit messages**: Use clear, descriptive commit messages
6. **Create PR**: Submit a pull request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots/GIFs if applicable

### Commit Message Format
```
type: brief description

Longer explanation if needed

Fixes #123
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`

Examples:
- `feat: add support for mouse wheel scrolling`
- `fix: handle edge case in keyboard input`
- `docs: update installation instructions`

## 📋 Checklist Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests added/updated and passing
- [ ] Documentation updated if needed
- [ ] No unnecessary dependencies added
- [ ] Build succeeds without errors
- [ ] Commit messages are clear
- [ ] PR description is complete

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

## 📞 Questions?

If you have questions:
- Open an issue with the `question` label
- Check existing issues and discussions
- Read the documentation thoroughly

## 🎉 Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes for significant contributions
- README acknowledgments section

Thank you for contributing to winput! 🚀