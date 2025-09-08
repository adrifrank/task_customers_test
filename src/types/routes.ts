import { IconName } from './ui';

// Main application routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CUSTOMER_DETAILS: (id: string) => `/dashboard/${id}`,
} as const;

// Create strict type for static routes
export type StaticRoute = typeof ROUTES.HOME | typeof ROUTES.DASHBOARD;

// Type for dynamic routes (functions)
export type DynamicRouteFunction = typeof ROUTES.CUSTOMER_DETAILS;

// General type for all possible routes
export type AppRoute = StaticRoute | ReturnType<DynamicRouteFunction>;

// Types for components
export interface RouteProps {
  href: AppRoute;
  children: React.ReactNode;
  className?: string;
}

// Updated NavigationRoute interface with strict types
export interface NavigationRoute {
  href: StaticRoute; // Now only static routes for navigation
  label: string;
  icon?: IconName;
}
