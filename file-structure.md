## AlinmaPay Mobile File Structure Guide

This guide outlines a followed file structure for AlinmaPay Mobil project, promoting organization, maintainability, and clarity.

**Project Root**

* **.env**: Stores environment variables specific to development stages (`.env.dev`, `.env.sit`, `.env.uat`, `.env.prod`).
* **.eslintignore**: Excludes specific files from ESLint linting.
* **.eslintrc.js**: Configures ESLint for code style enforcement.
* **.gitignore**: Specifies files and folders to be ignored by Git version control.
* **.prettierrc.js**: Configures Prettier for automatic code formatting.
* **.watchmanconfig**: Configures Watchman for development server file tracking.
* **android** (Platform-specific code): Contains code specific to the Android platform.
* **app.json**: Holds app configuration details like name, icon, and splash screen.
* **App.tsx**: The main entry point of your React Native app, written in TypeScript.
* **babel.config.js**: Configures Babel, a JavaScript compiler for modern features compatibility.
* **commitlint.config.js**: Configures Commitizen for improved commit messages.
* **ios** (Platform-specific code): Contains code specific to the iOS platform.
* **jest.config.js**: Configures Jest, the JavaScript testing framework for unit tests.
* **metro.config.js**: Configures Metro, the bundler that processes JavaScript code for device execution.
* **node_modules**: Stores all third-party libraries your project depends on.
* **package.json**: Lists project dependencies and scripts for project tasks.
* **package-lock.json**: Ensures everyone working on the project uses the exact same versions of dependencies.
* **react-native.config.js**: Provides optional configurations for React Native.
* **README.md**: Provides information about your project, including installation instructions.
* **tsconfig.json**: Configures TypeScript, a superset of JavaScript with optional static typing.

**src Folder (Project Source Code)**

* **animations** Stores animation-related code for smooth transitions and effects.
* **assets** (Static resources):
    * **images** (App images): Stores all app-specific images like icons and logos.
    * **fonts** (Custom fonts): Stores any custom fonts used throughout the application.
* **components**: Implement the Atomic Design Methodology for a consistent UI component hierarchy ([https://atomicdesign.bradfrost.com/](https://atomicdesign.bradfrost.com/)).
    * **atoms**: Basic building blocks like buttons, icons, inputs.
    * **molecules**: Combinations of atoms forming more complex components (e.g., dropdown).
    * **organisms**: Groups of molecules forming cohesive UI sections (e.g., navigation bar).
    * **templates**: Reusable page layouts with content areas (e.g., detail screen).
* **icons**: Utilize tools like SVGs for scalable and responsive icons. Consider a dedicated icon library for consistency.
* **localization**:
    * **hooks**: Create hooks for easy access to translated strings within components.
    * **i18n.ts**: Configure the internationalization library for language detection and formatting.
    * **translations**: 
        * Use language codes (e.g., `en`, `ar`) for clear identification.
* **navigation**: 
    * **hooks**: Create custom hooks for navigation logic (e.g., navigation state management).
    * **stacks**: Organize navigation stacks by user types (e.g., authenticated, guest).
        * **authenticated**: Navigation for logged-in users.
        * **guest**: Navigation for non-logged-in users.
    * **app.navigator.tsx**: The main navigation container responsible for routing throughout the app.
* **network**:
    * **constants**: Store API base URL, versioning information, and other network-related constants.
    * **interceptors**: Utilize interceptors for centralized request and response handling (e.g., authentication, logging).
    * **services**: Create services encapsulating API calls and data fetching logic for specific functionalities.
    * **utilities**: House helper functions for common network operations (e.g., error handling).
* **screens**: Organize screens by feature areas for easier navigation (e.g., accounts, dashboard).
* **store**:
    * **constants**: Store application-wide constants for easier reference throughout the codebase.
    * **reducers**: Implement Redux reducers for managing application state in a predictable manner.
    * **store.ts**: The central store managing the overall application state.
* **styles**:
    * **constants**: Define global constants for colors, fonts, and spacing for consistent theming.
    * **hooks**: Create custom hooks for managing and applying styles conditionally.
    * **theming**: Consider using a library for theming capabilities.
* **utilities** 

**Additional Tips**

* Use descriptive names for folders and files to enhance clarity.
* Group related files together for better organization (e.g., login components in a subfolder).

Following this structure will create a well-organized and maintainable React Native project, making development and collaboration a breeze.