
## Naming Convention Guidelines

### Purpose
The purpose of this document is to establish a standardized naming convention specifically tailored for our project. This convention will ensure consistency and clarity in naming across components, files, variables, functions, and other entities within the project.

### General Principles
1. **Consistency:** Names should be consistent across the React Native project.
2. **Clarity:** Names should be clear and easily understandable by developers working on the project.
3. **Descriptive:** Names should accurately describe the purpose or functionality of the entity.
4. **Conciseness:** Names should be as concise as possible without sacrificing clarity.
5. **Avoid Ambiguity:** Names should be unambiguous to avoid confusion.

### Component Naming
- **Use PascalCase:** Component names should use PascalCase, capitalizing the first letter of each word without spaces or underscores.
- **Be descriptive:** Component names should clearly describe the type or purpose of the component.

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import styles from './user-profile-card.styles';

const UserProfileCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>John Doe</Text>
    </View>
  );
};

export default UserProfileCard;
```

### File and Folder Naming
- **Use lowercase letters:** File and folder names should use lowercase letters only.
- **Use hyphens:** Use hyphens (-) to separate words in file and folder names.
- **Be descriptive:** File and folder names should clearly describe their contents or purpose.
- **Organize by feature:** Group related components and files together under meaningful folders (e.g., `screens`, `components`, `styles`).

```markdown
- Folder: `screens`
  - File: `home.screen.tsx`
  - File: `profile.screen.tsx`
- Folder: `components`
  - File: `button.component.tsx`
  - File: `header.component.tsx`
- Folder: `styles`
  - File: `user-profile-card.styles.ts`
```

### Variable and Function Naming
- **Use descriptive names:** Variable and function names should clearly describe their purpose or functionality.
- **Use camelCase:** Use camelCase for variable and function names, starting with a lowercase letter and capitalizing the first letter of each subsequent word.

```typescript
const isLoggedIn: boolean = true;

const loginUser = (email: string, password: string): void => {
  // Function implementation
};
```

##### Constants Naming
- **Use SNAKE_CASE:** Use capitalized SNAKE_CASE for any constant, capitalizing the letters of each subsequent word and seperating them by underscore (_).

```typescript
const FROM_CURRENCY: string = "SAR";
```

### Style Naming
- **Separate style files:** Define styles in a separate file using TypeScript.

```typescript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // Styles for the container
  },
  userName: {
    // Styles for the user name
  },
});

export default styles;
```

### Conclusion
Adhering to these naming conventions will promote consistency, clarity, and maintainability in our React Native TypeScript projects. Consistent naming practices make code easier to understand, maintain, and collaborate on, leading to more efficient development workflows.
