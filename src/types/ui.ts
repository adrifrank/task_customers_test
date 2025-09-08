import { ReactNode } from 'react';

export type AlertVariant = 'error' | 'warning' | 'success' | 'info';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message?: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode; // Custom icon
  iconSize?: Size; // Icon size
  centered?: boolean; // Centered layout for empty states
}

// Common Size Type
export type Size = 'sm' | 'md' | 'lg';

// Icon Names Type
export type IconName =
  | 'error'
  | 'warning'
  | 'success'
  | 'info'
  | 'arrowLeft'
  | 'arrowRight'
  | 'plus'
  | 'hamburger'
  | 'search'
  | 'close'
  | 'email'
  | 'help'
  | 'users'
  | 'user'
  | 'location'
  | 'shoppingBag'
  | 'age';

// UI Component Types
export interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export interface LoadingSpinnerProps {
  size?: Size;
  text?: string;
  className?: string;
  centered?: boolean;
}

export interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export interface InfiniteScrollProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  itemCount: number;
  loadingText?: string;
  endMessage?: string;
  className?: string;
}

export interface InfoField {
  label: string;
  value: string | number;
  formatter?: (
    value: string | number,
    formatData?: Record<string, unknown>
  ) => string;
}

export interface InfoSectionProps {
  title: string;
  icon: ReactNode;
  fields: InfoField[];
  iconColor?: string;
  formatData?: Record<string, unknown>; // Data for formatting (e.g., customer)
}

export interface InfoItemProps {
  icon?: IconName;
  iconSize?: string;
  children: ReactNode;
  className?: string;
}

export interface InfoRowProps {
  label: string;
  value: string | number;
  className?: string;
}
