## Alinma Pay Mobile Code Styling Contribution Guide

**Introduction**

This guide outlines the code styling conventions and best practices for the current project. By adhering to these guidelines, you can ensure that your code contributions are consistent with the rest of the codebase and maintain a high level of code quality.

**ESLint Configuration**

The project uses ESLint to enforce code styling rules. The ESLint configuration is defined in the .eslintrc.js file.

**General Guidelines**

* Use 2 spaces for indentation.
* Use single quotes for strings.
* Use semicolons at the end of statements.
* Avoid trailing commas.
* Keep lines under 100 characters in length.
* use common naming conventions [*mentioned here*](/docs/naming-conventions.md)

**React-Native Specific Guidelines**

* Use the react-native preset in your ESLint configuration.
* Follow the React Native style guide: https://github.com/react-native-community/style-guide
* Use the following plugins:
    * react-native/all
    * react-native/split-platform-components
    * react-native/no-inline-styles
    * react-native/no-color-literals
    * react-native/no-raw-text
    * react-native/no-single-element-style-arrays

**Additional Rules**

In addition to the ESLint rules, the following additional rules are recommended:

* Avoid using nested  ternary expressions (`? :`) - they  can often be simplified into a single line if statement.
* Use descriptive variable and function names.
* Avoid using global variables.
* Keep functions short and focused.
* Update mocks when making API changes.
* Follow the established file structure.
* Separate logic from UI components.
* Maintain code consistency with defined standards.
* Use useRoute for navigation instead of props.route.
* Leverage React hooks for performance and organization.
* Minimize the use of third-party libraries.
* Comment functions to explain their logic.
* avoid none descriptive  comments.
* Do not forget to remove consoles and debuggers before commiting your code.
* In case of having to make a local patch on node modules make sure you had full document explaining the issue and the fix.
* Double check for plugin reputation and maintainers and better discuss it with the team before deciding on a new plugin.

**Code Review**

All code contributions will be reviewed before being merged into the main branch. During the review process, the following aspects will be considered:

* Adherence to the code styling guidelines
* Code quality and maintainability
* Functionality and correctness

**Conclusion**

By following these code styling guidelines, you can help maintain a consistent and high-quality codebase. If you have any questions or suggestions regarding the code styling, please feel free to discuss them with the team.