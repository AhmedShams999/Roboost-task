Frontend Angular E-commerce Application
This repository contains a simple e-commerce application built with Angular, designed to showcase modern Angular development practices, including state management with Signals, asynchronous operations with Observables, data transformation with Pipes, and route protection with Guards, alongside robust multilingual support.
The application adheres to the provided Figma designs and integrates with the DummyJSON API for product, authentication, cart, and user data.
Table of Contents

Features
Technical Stack
Key Angular Concepts Implemented
Multilingual Support
API Integration
Authentication & Data Management
Setup Instructions
Running the Application
Building for Production
Assumptions Made
Unit Tests
Development Progress

Features
The application implements the following core e-commerce functionalities:
User Management

Login Page: User authentication with email/password, form validation, "Remember me" option, error handling, and redirection.
Registration Page: User signup with username, email, password, and confirmation, including validation and redirection.

Product Browsing

Home Page: Header navigation, featured products, categories, and footer links. Displays user authentication status.
Product List Page: Grid display of products with filtering (category, price, rating), pagination/infinite scroll, search, and sorting options.
Product Details Page: Comprehensive product information, image gallery, description, price, availability, "Add to Cart" functionality, and related products.

Shopping Cart

Cart Page: Lists added products, allows quantity adjustments, product removal, total price calculation, and links for checkout/continue shopping.

Multilingual Support

Seamless switching between Arabic (AR) and English (EN) languages with proper RTL layout handling for Arabic.

Technical Stack

Framework: Angular (latest stable version)
Language: TypeScript
Reactive Programming: RxJS
State Management: Angular Signals
Forms: Angular Reactive Forms
Styling: CSS
API: DummyJSON (Products, Auth, Carts, Users)

Key Angular Concepts Implemented
This project demonstrates the application of several key Angular concepts:

Signals: Utilized for efficient and reactive state management within components and services. Derived signals are used for computed values, ensuring optimal performance.
Observables (RxJS): Extensively used for handling asynchronous operations, primarily for HTTP requests to the DummyJSON API. Proper subscription management is implemented to prevent memory leaks. Key RxJS operators like map, filter, and switchMap are used for data transformation and flow control.
Pipes: At least one custom pipe (e.g., for currency formatting or product filtering logic) has been created, alongside the use of built-in Angular pipes.
Guards: An AuthGuard is implemented to protect routes, ensuring only authenticated users can access certain parts of the application (e.g., Cart Page). CanActivate and CanDeactivate interfaces are used where appropriate.
Services: Reusable services are created for data fetching (HttpClient integration), authentication, and cart management, promoting a modular and maintainable architecture.
Reactive Forms: All forms (Login, Registration) are built using Angular's FormGroup, FormControl, and Validators for robust and scalable form management, including custom validation logic.
Component Architecture: A clear component hierarchy and communication strategy (Input/Output, Services) are employed to ensure proper separation of concerns and reusability.

Multilingual Support
The application fully supports both Arabic (ar) and English (en-US) languages, leveraging Angular's built-in i18n capabilities.

Locale-specific Builds: The application is built with separate bundles for each language, served from locale-prefixed URLs (e.g., /ar/home, /en-US/products).
Language Switcher: A component (LocaleSwitcherComponent or similar) is implemented to allow users to toggle between ar and en-US. This triggers a full page reload to load the correct localized application version.
RTL Layout: All UI elements and content automatically adjust to Right-to-Left (RTL) layout when the Arabic language is selected, ensuring a native experience.
Translation Management: All UI text and content are properly translated using Angular's i18n tools (.xlf files).
User Preference: The user's language preference is stored (e.g., in localStorage) and applied on subsequent visits.

API Integration
The application integrates with the DummyJSON API using Angular's HttpClient for all data operations.
Endpoints Used

Products API: https://dummyjson.com/docs/products
Auth API: https://dummyjson.com/docs/auth
Carts API: https://dummyjson.com/docs/carts
Users API: https://dummyjson.com/docs/users

Additional Details

Error Handling: Robust error handling mechanisms are implemented for all API requests to provide a graceful user experience.
Caching: Caching strategies are implemented for relevant data (e.g., product lists) to reduce API calls and improve performance.
TypeScript Interfaces: Proper TypeScript interfaces are defined for all API responses, ensuring strong typing and better code maintainability.

Authentication & Data Management

Authentication Service: A dedicated authentication service handles user login, registration, and logout.
Route Protection: Route Guards (AuthGuard) are used to protect routes, ensuring only authenticated users can access sensitive pages like the Cart or Checkout.
Authentication State: The authentication state (e.g., user logged in/out, user data) is managed using Angular Signals for reactive updates across the application.
Token Expiration: Token expiration is simulated with a timeout mechanism.
Persistent Data: localStorage (or sessionStorage) is utilized for persistent data storage, such as the shopping cart contents and user authentication tokens.
State Management: Product data and cart management are handled via dedicated services, employing a combination of Signals and Observables for efficient data flow.

Setup Instructions
To get this project up and running on your local machine, follow these steps:
Prerequisites
Before you begin, ensure you have the following installed:

** AuraDB Free instance**: https://neo4j.com/cloud/platform/aura-graph-database/
Node.js: (LTS version recommended)Download Node.js
npm (Node Package Manager) or Yarn: (Comes with Node.js)
Angular CLI:  npm install -g @angular/cli



Cloning the Repository
First, clone this repository to your local machine:
git clone <your-repository-url> # Replace with your actual GitHub repo URL
cd Roboost-Task # Navigate into the project directory

Installing Dependencies
Once in the project directory, install all necessary node modules:
npm install
# Or if you use Yarn:
# yarn install

Running the Application
For development, you can serve the application with live-reloading. Since this project uses Angular i18n, you can serve specific locales:
Development Mode (with Live-Reloading)
To serve the application for a specific locale (e.g., Arabic or English) in development mode:
To run the English (en-US) version:
ng serve --configuration=development --localize=en-US

This will usually open the application at http://localhost:4200/en-US/.
To run the Arabic (ar) version:
ng serve --configuration=development --localize=ar

This will usually open the application at http://localhost:4200/ar/.
The Angular development server will automatically recompile and reload your browser whenever you make changes to the source code.
Building for Production
To create optimized, production-ready build artifacts, use the ng build command. Since i18n is enabled, ng build will generate separate output directories for each locale.
ng build --configuration=production --localize

This command will:

Compile your application in production mode ( minced, tree-shaken, optimized).
Create separate build outputs for each configured locale (en-US and ar).
You will find the build artifacts in the dist/roboost-task/browser/ directory, with subfolders like en-US/ and ar/ inside it (e.g., dist/roboost-task/browser/en-US/ and dist/roboost-task/browser/ar/).

Serving the Production Build
To test the production build locally, you can use a simple static file server like http-server. If you don't have it installed:
npm install -g http-server

Then, serve the root browser directory where your locale folders reside:
http-server dist/roboost-task/browser/ --cache -1

The --cache -1 flag disables caching, which is useful during local testing to ensure you're always seeing the latest changes.
After running this command, http-server will usually tell you the address it's serving from (e.g., http://localhost:8080). You can then access your application by appending the locale path:

For English (en-US): http://localhost:8080/en-US/
For Arabic (ar): http://localhost:8080/ar/

Assumptions Made

The DummyJSON API endpoints are accessible and functional.
The Figma design assets (icons, specific images not covered by DummyJSON) are either provided or a placeholder strategy is acceptable.
Basic browser compatibility for modern web browsers is assumed.

Unit Tests
Unit tests have been included for at least one component and one service, demonstrating adherence to testing best practices. To run the tests:
ng test

Development Progress
Regular commits have been made throughout the development process, providing a detailed history of the project's evolution and implementation progress.
