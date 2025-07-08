# Contributing to ForgeCLI

Thank you for your interest in contributing to ForgeCLI! We appreciate your time
and effort in helping us improve this project. Please take a moment to review
this guide to ensure a smooth contribution process.

## Prerequisites

- **Node.js**: Latest LTS version
- **pnpm**: Latest version (required)
  ```bash
  npm install -g pnpm@latest
  ```
- Git

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/tryforge/CLI.git
   cd CLI
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Development Workflow

### Branch Naming

Use the following prefixes for your branches:

- `feat/` for new features
- `fix/` for bug fixes
- `docs/` for documentation changes
- `refactor/` for code refactoring
- `test/` for adding or updating tests
- `chore/` for maintenance tasks

Example: `feat/add-new-command` or `fix/login-validation`

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) for
commit messages. The format should be:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fixes a bug nor adds a feature
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

Example:

```
feat(auth): add password reset functionality

Add password reset flow with email verification

Closes #123
```

## Submitting Pull Requests

1. Ensure your code passes all tests:
   ```bash
   pnpm test
   ```
2. Ensure your code is properly formatted:
   ```bash
   pnpm format
   ```
3. Create a pull request from your fork to the main repository's `main` branch
4. Reference any related issues in your PR description
5. Ensure all CI checks pass before requesting review

## Code Style

We use **ESLint** and **Prettier** to maintain code consistency. Before
submitting a PR, please ensure:

- Your code passes all linting checks: `pnpm lint`
- Your code is properly formatted: `pnpm format`
- All tests pass: `pnpm test`

## Reporting Issues

When reporting bugs, please include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs. actual behavior
- Environment information (OS, Node.js version, pnpm version)
- Any relevant error messages or logs

## Code of Conduct

By participating in this project, you agree to abide by our
[Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and considerate of
others in all interactions.

## Need Help?

If you have any questions or need assistance, feel free to open an issue or
reach out to the maintainers.
