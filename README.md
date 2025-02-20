# Admin Dashboard Project

This project is an admin dashboard application built with React, Material UI, TypeScript, and integrates real-time data from APIs. The app features authentication, data visualization using charts, and provides an interface for sending onboarding offers to users. It is fully responsive and follows a modular, reusable code structure with TypeScript typings.

## Live Preview

[HiuBlue Dashboard](https://hiublu-dashboard.vercel.app/)

## Installation & Setup

#### To set up the project locally, follow these steps:

#### Prerequisites

- Node.js (version 16.x or higher)
- npm (or yarn)

### 1. Clone the Repository

```bash
git clone https://github.com/RittikaDev/hiublue-frontend-recruitment-starter
cd hiublue-frontend-recruitment-starter
```

### 2. Install Dependencies

### 3. Set up API Environment VariablesCompile TypeScript Files: Navigate to the directory containing the TypeScript files and compile them using:

```bash
NEXT_PUBLIC_BASE_API=
```

### 5. Run the Application

```bash
npm start
# or
yarn start
```

Visit http://localhost:3000 in your browser to see the application in action.

## Features

### Authentication

- Login: Users are required to log in to access the dashboard. Unauthorized users can only visit home page, if tried to access dashboard, will be redirected to the login page.
- State Management: Authentication state is managed using Context API and persisted in LocalStorage.
- Protected Routes: Certain routes, including the dashboard and onboarding, are protected and cannot be accessed without authentication.

### Admin Dashboard

- Real-time Data: Fetches data from a provided API and displays it in a table with the following features:
- Pagination for managing large datasets.
- Search and Filter functionality to find specific records.
- Charts: Visualizes key metrics using ApexCharts.

### Sending Onboarding Offer

- User Selection: Admin can search for users from an API and select them using the Mui Autocomplete component.
- Form Validation: Form data is validated using Zod Validation before submission, and used React-Hook-Form.

### Responsive Design

- The application adapts seamlessly to different screen sizes using Material-UI's Grid system and custom breakpoints.

### File StructureResponsive Design

```bash
src/
├── app/
│   ├── (WithCommonLayout)
│   │   ├── layout
│   │   ├── page
│   │
│   ├── (WithDashboardLayout)
│   │   ├── dashboard
|   │   │   ├── page
│   │   ├── onboarding
|   │   │   ├── page
│   │   └── layout
│   ├── login
│   │   ├── page
│   │
│   ├── global
│   ├── layout
│   ├── components
│   ├── providers
│   ├── services
│   ├── contexts
│   ├── sections
│   ├── types
│   ├── middleware
├── env
```

## Acknowledgments

- Material UI for UI components.
- ApexCharts for data visualization.
- React Hook Form for form handling.
- Zod for form validation.Responsive Design
- The application adapts seamlessly to different screen sizes using Material-UI's Grid system and custom breakpoints.
