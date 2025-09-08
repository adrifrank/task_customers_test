import { ROUTES, StaticRoute, AppRoute, NavigationRoute } from '@/types/routes';

// Re-export ROUTES for backward compatibility
export { ROUTES };

// Utility function for creating typed links
export const createTypedLink = (route: AppRoute) => ({
  href: route,
  isStatic: isStaticRoute(route),
  label: getRouteLabel(route),
});

export const navigationRoutes: NavigationRoute[] = [
  { href: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'users' },
];

// Can also add other types of routes
export const footerRoutes = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

// Utility functions for working with routes
export const getRouteByPath = (path: AppRoute): NavigationRoute | undefined => {
  return navigationRoutes.find(route => route.href === path);
};

export const isActiveRoute = (
  currentPath: string,
  routePath: StaticRoute
): boolean => {
  if (routePath === ROUTES.DASHBOARD) {
    return (
      currentPath === ROUTES.HOME ||
      currentPath === ROUTES.DASHBOARD ||
      currentPath.startsWith(ROUTES.DASHBOARD)
    );
  }
  if (routePath === ROUTES.HOME) {
    return currentPath === ROUTES.HOME || currentPath === ROUTES.DASHBOARD;
  }
  return currentPath.startsWith(routePath);
};

// Utility functions for generating routes with typing
export const generateRoute = {
  customerDetails: (customerId: string): AppRoute =>
    ROUTES.CUSTOMER_DETAILS(customerId),
  dashboard: (): StaticRoute => ROUTES.DASHBOARD,
  home: (): StaticRoute => ROUTES.HOME,
} as const;

// Route validation with typing
export const isValidRoute = (path: string): path is AppRoute => {
  const staticRoutes: StaticRoute[] = [ROUTES.HOME, ROUTES.DASHBOARD];
  return (
    staticRoutes.includes(path as StaticRoute) ||
    Boolean(path.match(/^\/dashboard\/customer-\d+$/))
  );
};

// Getting route name for breadcrumbs with typing
export const getRouteLabel = (path: AppRoute): string => {
  if (path === ROUTES.HOME || path === ROUTES.DASHBOARD) return 'Dashboard';
  if (typeof path === 'string' && path.startsWith('/dashboard/customer-'))
    return 'Customer Details';
  return 'Unknown Page';
};

// Type guard to check if route is static
export const isStaticRoute = (route: AppRoute): route is StaticRoute => {
  return route === ROUTES.HOME || route === ROUTES.DASHBOARD;
};
