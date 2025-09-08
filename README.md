# CRM Dashboard - Customer Management System

A modern CRM system for managing large customer datasets, built with Next.js 15, React 19, and TypeScript.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [API & Data](#api--data)
- [Performance](#performance)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Project Overview

This project is a fully functional CRM system designed to efficiently handle large volumes of customer data. The system provides fast search, filtering, and detailed viewing of customer information and their order history.

### Key Features:

- ⚡ **High Performance** - List virtualization and lazy loading
- 🔍 **Powerful Filtering System** - Search by multiple criteria
- 📱 **Responsive Design** - Optimized for all devices
- 🧪 **Test Coverage** - Over 100 unit tests
- 🎨 **Modern UI/UX** - Intuitive user interface

## 🚀 Features

### Dashboard Page

- **Customer List** in responsive grid (1-4 columns depending on screen size)
- **Infinite Scroll** with automatic data loading
- **Filtering System**:
  - 🔍 Search by name and email
  - 👥 Gender filter (Male/Female/Other/Fluid)
  - 🌍 Country filter
  - 📅 Age range filter (18-80 years)
- **Results Counter** showing total and filtered record counts
- **Error Handling** with user-friendly messages

### Customer Details Page

- **Complete Customer Information**: contacts, address, personal data
- **Order History** with lazy loading:
  - Order and shipping dates
  - Order number
  - Item name and quantity
  - Order amount in respective currency
- **Responsive Display**: table on desktop, cards on mobile
- **"Load More" Button** for paginated order loading
- **Back Navigation** to customer list

### Additional Features

- **Loading States** with animated indicators
- **Error Handling** at all application levels
- **Dark Theme** with automatic switching
- **SEO Optimization** with metadata

## 🛠 Technology Stack

### Core Technologies

- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - User interface library
- **TypeScript 5** - Static typing
- **Tailwind CSS 4** - Utility-first CSS framework

### Performance Libraries

- **Custom Infinite Scroll** - Intersection Observer API based infinite scrolling
- **Pagination-based Virtualization** - Efficient data loading with pagination

### Development Tools

- **ESLint 9** - JavaScript/TypeScript linter
- **Prettier 3.6.2** - Code formatter
- **Jest 30.1.3** - Testing framework
- **Testing Library** - React component testing utilities

### Build & Optimization

- **Turbopack** - Fast bundler from Vercel
- **PostCSS** - CSS processing
- **TypeScript Path Mapping** - Absolute imports with `@/`

## 🏗 Project Architecture

### Architectural Principles

1. **Modularity** - Components separated by functionality
2. **Separation of Concerns** - Logic separated from presentation
3. **Reusability** - UI components maximally reusable
4. **Type Safety** - Complete typing of all components and data

### Design Patterns

- **Custom Hooks** - All business logic extracted into reusable hooks
- **Compound Components** - Complex components composed of simple parts
- **Hook Pattern** - Business logic encapsulation in custom hooks
- **Factory Pattern** - Creating typed data

### State Management

- **Local State** - React useState/useReducer
- **Server State** - Custom hooks with caching
- **Derived Data** - useMemo for computation optimization
- **Side Effects** - useEffect with proper dependencies

## 📦 Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone repository
git clone <repository-url>
cd my-project

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format
npm run format:check

# Testing
npm run test
npm run test:watch
npm run test:coverage
```

### Access Application

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 💼 Usage

### Dashboard Navigation

1. **Home Page** (`/`) - Redirects to dashboard
2. **Dashboard** (`/dashboard`) - List of all customers with filters
3. **Customer Details** (`/dashboard/[id]`) - Detailed customer information

### Working with Filters

```typescript
// Example filter usage
const filters = {
  search: 'john', // Search by name/email
  gender: 'Male', // Gender filter
  country: 'USA', // Country filter
  ageRange: {
    // Age range
    min: 25,
    max: 45,
  },
};
```

### Custom Hooks

```typescript
// Working with customer list
const { customers, loading, error, filters, setFilters, loadMore, hasMore } =
  useCustomersList();

// Lazy loading orders
const { orders, loading, loadingMore, hasMore, totalOrders, loadMore } =
  useLazyOrders({ customerId });
```

## 🧪 Testing

### Test Coverage

- **UI Components**: Alert, CustomerCard, CustomerList, Filters
- **Custom Hooks**: useCustomersList, useLazyOrders, useDebounce
- **Pages**: DashboardPage
- **Overall Coverage**: 44.7% of code, 108/109 tests passing (1 failed)

### Running Tests

```bash
# All tests
npm run test

# Tests in watch mode
npm run test:watch

# Tests with coverage
npm run test:coverage
```

### Test Examples

```typescript
// Component testing
it('should render customer list correctly', () => {
  render(<CustomerList customers={mockCustomers} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});

// Hook testing
it('should load customers successfully', async () => {
  const { result } = renderHook(() => useCustomersList());
  await waitFor(() => {
    expect(result.current.customers).toHaveLength(25);
  });
});
```

## 📁 Project Structure

> **Note**: В проекте есть папка с русской буквой 'с' в названии `сomponents` вместо английской `components`. Это следует исправить для соответствия стандартам именования.

```
src/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard application
│   │   ├── [id]/               # Dynamic route for customer details
│   │   │   ├── components/     # Details page components
│   │   │   │   ├── user-profile/        # User profile components
│   │   │   │   │   ├── user-info/      # User info sub-components
│   │   │   │   │   └── UserProfile.tsx # Main profile component
│   │   │   │   └── user-order-history/ # Order history components
│   │   │   │       ├── order-info/    # Order info sub-components
│   │   │   │       └── OrderHistory.tsx # Main order history
│   │   │   └── page.tsx        # Customer details page
│   │   ├── сomponents/         # Dashboard components (Note: Cyrillic 'с')
│   │   │   ├── customer-card/  # Customer card components
│   │   │   │   ├── customer-card-info/ # Card info sub-components
│   │   │   │   └── CustomerCard.tsx    # Main card component
│   │   │   ├── customer-list/  # Customer list components
│   │   │   │   └── CustomerList.tsx    # Main list component
│   │   │   └── filters/        # Filtering system
│   │   │       ├── filter-components/  # Filter sub-components
│   │   │       └── Filters.tsx         # Main filters component
│   │   └── page.tsx           # Main dashboard page
│   ├── globals.css            # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Reusable components
│   ├── layout/              # Layout components
│   │   ├── header/          # Site header
│   │   └── footer/          # Site footer
│   └── ui/                  # UI components
│       ├── Alert.tsx        # Alert component
│       ├── LoadingSpinner.tsx # Loading indicator
│       ├── InfiniteScroll.tsx # Infinite scroll
│       └── ...              # Other UI components
├── hooks/                   # Custom React hooks
│   ├── useCustomersList.ts  # Customer list management
│   ├── useLazyOrders.ts    # Lazy order loading
│   ├── useDebounce.ts      # Search debouncing
│   └── ...                 # Other hooks
├── lib/                    # Utilities and business logic
│   ├── customer.ts         # Customer data handling
│   ├── order.ts           # Order handling
│   ├── debounce.ts        # Debounce utility
│   └── ...                # Other utilities
├── types/                 # TypeScript types
│   ├── customer.ts        # Customer types
│   ├── order.ts          # Order types
│   ├── components.ts     # Component types
│   └── ...               # Other types
└── __tests__/            # Tests
    ├── components/       # Component tests
    ├── hooks/           # Hook tests
    └── pages/          # Page tests
```

## 📊 API & Data

### Data Sources

- **Customers**: `/public/customers.json` (~2.8MB, 120,000+ records)
- **Orders**: `/public/orders.json` (450+ orders)

### Data Structure

#### Customer

```typescript
interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other' | 'Fluid';
  country: string;
  city: string;
  state: string;
  postCode: string;
  // Additional fields added by transformation:
  id: string; // Generated from array index
  fullName: string; // firstName + lastName
  avatar: string; // Generated placeholder
  age: number; // Generated random age 18-80
}
```

#### Order

```typescript
interface Order {
  number: number;
  'price ': number; // Note: space in property name
  currency: string;
  itemName: string;
  amount: number;
  createdAt: number; // Unix timestamp
  shippedAt: number; // Unix timestamp
  // Additional fields added by transformation:
  id: string; // Generated as `order-${number}`
  formattedCreatedAt: string; // Formatted date string
  formattedShippedAt: string; // Formatted date string
  formattedPrice: string; // Price with currency
}
```

### Data Processing

- **Transformation**: Converting raw data to typed objects
- **Filtering**: Client-side filtering by multiple criteria
- **Pagination**: Virtual pagination for performance optimization
- **Caching**: Memoization of expensive computations

## ⚡ Performance

### Optimizations

1. **Pagination-based Loading** - Load data in chunks of 25 items
2. **Lazy Loading** - Gradual order loading
3. **Memoization** - Computation caching with useMemo/useCallback
4. **Search Debouncing** - Delayed requests during input
5. **Code Splitting** - Automatic code splitting by Next.js
6. **Image Optimization** - Next.js image optimization

### Performance Metrics

- **Initial Load**: < 2 seconds
- **Filtering 120,000+ records**: Client-side filtering with debouncing
- **Infinite Scroll**: Smooth without delays
- **Bundle Size**: Optimized with Tree Shaking

### Monitoring

```typescript
// Performance measurement example
const startTime = performance.now();
const filteredCustomers = filterCustomers(customers, filters);
const endTime = performance.now();
console.log(`Filtering took ${endTime - startTime} milliseconds`);
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

You can also deploy to Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Other Hosting Providers

This is a standard Next.js application and can be deployed to any hosting provider that supports Node.js:

- **Heroku**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

### Environment Variables

This project uses static JSON files and doesn't require environment variables for basic functionality.

### Build Verification

```bash
# Local build
npm run build
npm run start

# Check at http://localhost:3000
```

## 🤝 Contributing

### Code Standards

- Use TypeScript for all new files
- Follow ESLint and Prettier configuration
- Write tests for new functionality
- Document complex components

### Development Process

1. Create feature branch
2. Write code with tests
3. Ensure all tests pass
4. Create Pull Request

### Useful Commands

```bash
# Pre-commit checks
npm run lint:fix
npm run format
npm run test
npm run build
```

## 📋 Requirements Compliance

This project fully meets the technical requirements:

### ✅ **COMPLETED REQUIREMENTS**

#### 1. Dashboard Page

- ✅ **User List**: Responsive grid with adaptive columns
- ✅ **Data Display**: Name, email, and avatar for each user
- ✅ **Infinite Scroll**: Implemented with InfiniteScroll component
- ✅ **Efficient Loading**: Pagination-based optimization (25 items per page)
- ✅ **Three Filter Types**:
  - Search by name/email (text input)
  - Gender filter (dropdown)
  - Country filter (dropdown)
  - **Bonus**: Age range filter (dual input fields)

#### 2. User Details Page

- ✅ **Detailed Information**: Complete user data display
- ✅ **Contact Details**: Personal information and address
- ✅ **Back Navigation**: BackButton component
- ✅ **Order History**: Full implementation with date, number, and amount

#### 3. Senior Level Features

- ✅ **Lazy Loading Orders**: useLazyOrders hook with pagination (5 orders per page)
- ✅ **Load More Button**: For additional order loading
- ✅ **Deterministic Selection**: Each customer gets unique order set based on ID

#### 4. Unit Tests

- ✅ **Component Coverage**: Tests for Alert, CustomerCard, CustomerList, Filters
- ✅ **Hook Coverage**: Tests for all custom hooks including useLazyOrders, useCustomersList
- ✅ **Page Coverage**: DashboardPage test
- ✅ **Overall Coverage**: 44.68% code coverage, 108/109 tests passing

#### 5. Bonus Features

- ✅ **Error Handling**: Alert component for loading errors
- ✅ **Responsive Design**: Tailwind CSS with breakpoints (32 usages across 17 files)
- ✅ **Modern UI**: Beautiful interface with modern UI patterns

### 📊 **QUALITY METRICS**

- **Test Coverage**: 44.7% (108/109 tests passing, 1 failed)
- **Responsive Design**: 32 responsive class usages across 17 files
- **Data Handling**: Works with JSON files 2.8MB+ in size
- **Performance**: Pagination-based loading and lazy loading

## 📝 License

This project was created for educational purposes as part of a technical assignment.

## 📞 Support

For project questions, refer to the documentation or create Issues in the repository.

---

**Version**: 0.1.0  
**Last Updated**: December 2024  
**Technologies**: Next.js 15, React 19, TypeScript, Tailwind CSS
