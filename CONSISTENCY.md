# TypeScript Style Guide and Consistency Standards

This document outlines our team's coding standards and best practices for TypeScript projects. Following these guidelines will ensure code consistency, readability, and maintainability across our codebase.

## 1. Naming Conventions

### Variables and Functions
- Use **camelCase** for variable and function names
  - ✅ `userProfile`, `calculateTotal`, `isAuthenticated`
  - ❌ `UserProfile`, `Calculate_Total`, `is_authenticated`

### Classes, Interfaces, and Types
- Use **PascalCase** for class, interface, type, and enum names
  - ✅ `UserProfile`, `AuthenticationService`, `RequestOptions`
  - ❌ `userProfile`, `authenticationService`, `requestOptions`
- Prefix interfaces with `I` only when there is both a class and interface with the same name
  - ✅ `interface UserOptions`, `interface IRepository` (if `Repository` class exists)

### Constants
- Use **UPPER_SNAKE_CASE** for global constants and enum values
  - ✅ `const MAX_RETRY_COUNT = 3`, `enum Color { RED, GREEN, BLUE }`
  - ❌ `const maxRetryCount = 3`, `enum Color { Red, Green, Blue }`

### File Names
- Use **camelCase** for file names or **PascalCase** for managers.
  - ✅ `userProfile.ts`, `authentication-service.ts`
  - ❌ `user-profile.ts`, `AuthenticationService.ts`

## 2. Code Formatting

### Indentation
- Use 2 spaces for indentation, not tabs
- Configure your editor to convert tabs to spaces

### Line Length
- Maximum line length: 100 characters
- Break long lines logically for readability

### Parameter Formatting
- For methods with multiple parameters, place each parameter on a new line and align them:
```typescript
function calculateTotal(
  items: CartItem[],
  discountCode?: string,
  taxRate: number = 0.1
): number {
  // Implementation
}
```

### Object and Array Formatting
- For objects and arrays with multiple items, place each item on a new line:
```typescript
const config: Record<string, string | number> = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retryCount: 3
};

const colors: string[] = [
  'red',
  'green',
  'blue'
];
```

### Braces
- Opening braces go on the same line as the statement
- Use braces even for single-line blocks for consistency and future-proofing
```typescript
if (condition) {
  doSomething();
}
```

### Spacing
- Add a space after keywords (`if`, `for`, `while`, etc.)
- Add a space before opening braces
- Add spaces around operators (`+`, `-`, `=`, etc.)
- No space between function name and parentheses
```typescript
if (x === y) {
  console.log('Equal');
}

function calculate(x: number): number {
  return x + 5;
}
```

## 3. TypeScript Specifics

### Type Annotations
- Use explicit type annotations for function parameters and return types
- Type inference can be used for local variables when the type is obvious
```typescript
function getUser(id: string): User {
  const user = userRepository.findById(id); // Type inference is fine here
  return user;
}
```

### Interfaces vs Types
- Prefer `interface` for public API definitions and object shapes
- Use `type` for unions, intersections, and when you need to create type aliases
```typescript
// Prefer interface for objects
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Use type for unions, intersections, etc.
type UserRole = 'admin' | 'editor' | 'viewer';
```

### Null, Undefined and Any
- **Never use `any`, your code must pass the ESLint testing.**
- Use `undefined` for unintentional absence of value
- Use `null` for intentional absence of value
- Use non-null assertion (`!`) sparingly; prefer null checks or the nullish coalescing operator

### Optional Parameters
- Use optional parameter syntax (`?`) rather than unions with undefined
```typescript
// Preferred
function createUser(name: string, email?: string): User {
  // Implementation
}

// Avoid
function createUser(name: string, email: string | undefined): User {
  // Implementation
}
```

## 4. Function and Method Formatting

### Method Length
- Keep methods focused and concise (aim for less than 30 lines)
- Extract complex logic into separate functions

### Parameter Count
- Limit function parameters to 3-4 when possible
- For functions with many parameters, use an options object
```typescript
// Instead of this:
function createReport(
  title: string,
  date: Date,
  author: string,
  sections: ReportSection[],
  includeAppendix: boolean,
  format: ReportFormat
): Report {
  // Implementation
}

// Prefer this:
function createReport(options: ReportOptions): Report {
  // Implementation
}

interface ReportOptions {
  title: string;
  date: Date;
  author: string;
  sections: ReportSection[];
  includeAppendix?: boolean;
  format: ReportFormat;
}
```

### Method Chaining
- For method chaining, place each method on a new line and align them:
```typescript
return data
  .filter(item => item.active)
  .map(item => item.value)
  .reduce((sum, value) => sum + value, 0);
```

## 5. Comments and Documentation

### JSDoc Comments
- Use JSDoc comments for public APIs and complex functions
- Include parameter descriptions, return value, and examples if needed
```typescript
/**
 * Calculates the total price of items in the cart
 * 
 * @param {CartItem[]} items - Array of cart items
 * @param {string} [discountCode] - Optional discount code
 * @param {number} [taxRate=0.1] - Tax rate as a decimal (default: 0.1)
 * @returns {number} Total price including tax and discounts
 * 
 * @example
 * const total = calculateTotal([{ id: '123', price: 10 }], 'SAVE10', 0.07);
 */
function calculateTotal(
  items: CartItem[],
  discountCode?: string,
  taxRate: number = 0.1
): number {
  // Implementation
}
```

### Inline Comments
- Use inline comments sparingly, only for complex logic that isn't self-explanatory
- Comment **why** something is done, not **what** is being done

### TODO Comments
- Mark incomplete code with `// TODO: description` comments
- Include your name and ticket number if applicable
```typescript
// TODO(jane): Implement caching for API requests (TICKET-123)
```

## 6. Error Handling

### Error Messages
- Make error messages clear, specific, and actionable
- Include relevant context and avoid generic messages

### Try/Catch Blocks
- Keep try blocks small to minimize the scope of error handling
- Log errors with appropriate detail and context
```typescript
try {
  const userData = await fetchUserData(userId);
  return processUserData(userData);
} catch (error) {
  Logger.error(`Failed to fetch user data for ID ${userId}`, error);
  throw new UserDataError(`Could not retrieve data for user ${userId}`);
}
```

## 7. Imports and Exports

### Import Order
- Group imports in the following order with a blank line between groups:
  1. Node.js built-in modules
  2. External packages/libraries
  3. Local modules (relative imports)
```typescript
// 1. Node.js built-ins
import fs from 'fs/promises';
import path from 'path';

// 2. External packages
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

// 3. Local modules
import { Logger } from './logger';
import { User } from '../models/user';
```

### Named vs Default Exports
- Prefer named exports for better discoverability and refactoring support
- Use default exports sparingly, mainly for components or main module functionality

## 8. Classes and Object-Oriented Design

### Class Structure
- Order class members as follows:
  1. Static properties and methods
  2. Instance properties
  3. Constructor
  4. Public methods
  5. Protected methods
  6. Private methods

### Access Modifiers
- Use TypeScript access modifiers (`public`, `private`, `protected`) explicitly
- Use `private` for class members that should not be accessed from outside
- Consider using `#` private fields for runtime privacy (ECMAScript private fields)

```typescript
class UserService {
  // Static properties
  public static readonly MAX_USERS = 100;
  
  // Instance properties
  private apiClient: ApiClient;
  #secretKey: string; // ECMAScript private field
  
  // Constructor
  constructor(apiClient: ApiClient, secretKey: string) {
    this.apiClient = apiClient;
    this.#secretKey = secretKey;
  }
  
  // Public methods
  public async getUser(id: string): Promise<User> {
    return this.fetchUserData(id);
  }
  
  // Private methods
  private async fetchUserData(id: string): Promise<User> {
    // Implementation
  }
}
```

## 9. Code Quality

### Avoid Magic Numbers
- Extract magic numbers and strings into named constants
```typescript
// Avoid
if (status === 2) {
  // Process completed
}

// Prefer
const STATUS_COMPLETED = 2;
if (status === STATUS_COMPLETED) {
  // Process completed
}
```

### Avoid Deeply Nested Code
- Limit nesting to 2-3 levels
- Use early returns and guard clauses to reduce nesting
```typescript
// Avoid
function processUser(user: User) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission('admin')) {
        // Do something
      }
    }
  }
}

// Prefer
function processUser(user: User) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission('admin')) return;
  
  // Do something
}
```

## 10. Async Code

### Promise Handling
- Use `async/await` for asynchronous code for better readability
- Always handle promise rejections with try/catch or `.catch()`

### Avoid Callback Hell
- Prefer promises or async/await over nested callbacks
- Use promise chaining when appropriate

### Avoid Mixing Styles
- Be consistent in how asynchronous code is written
- Don't mix promise chaining and async/await in the same function

```typescript
// Good - consistent use of async/await
async function fetchUserData(userId: string): Promise<UserData> {
  try {
    const user = await userRepository.findById(userId);
    const preferences = await preferencesService.getForUser(userId);
    return { user, preferences };
  } catch (error) {
    Logger.error(`Failed to fetch user data for ${userId}`, error);
    throw error;
  }
}
```

## 11. Testing

### Test File Organization
- Place test files adjacent to the files they test with a `.spec.ts` or `.test.ts` suffix
- Mirror the structure of the source code in the test directory

### Test Naming
- Use descriptive test names that explain the expected behavior
```typescript
// Preferred
test('should return 400 when email is invalid', () => {
  // Test implementation
});

// Avoid
test('invalid email test', () => {
  // Test implementation
});
```

## Conclusion

Following these guidelines will help maintain code quality and consistency across our projects. While these rules are important, remember that readability and maintainability are the ultimate goals.

If you encounter a situation where the guidelines don't quite fit, prioritize code readability and document your decision.