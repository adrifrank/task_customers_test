import Icon from './Icon';
import { AlertProps } from '@/types/ui';

const Alert = ({
  variant = 'info',
  title,
  message,
  children,
  className = '',
  icon,
  iconSize = 'sm',
  centered = false,
}: AlertProps) => {
  const variantStyles = {
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-400',
      title: 'text-red-800',
      content: 'text-red-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-400',
      title: 'text-yellow-800',
      content: 'text-yellow-700',
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-400',
      title: 'text-green-800',
      content: 'text-green-700',
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-400',
      title: 'text-blue-800',
      content: 'text-blue-700',
    },
  };

  const styles = variantStyles[variant];

  const getIcon = () => {
    if (icon) {
      return icon;
    }

    const sizeClasses = {
      sm: 'h-5 w-5',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
    };

    return <Icon name={variant} className={sizeClasses[iconSize]} />;
  };

  if (centered) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div
          className={`mx-auto ${iconSize === 'lg' ? 'h-12 w-12' : iconSize === 'md' ? 'h-8 w-8' : 'h-5 w-5'} ${styles.icon}`}
        >
          {getIcon()}
        </div>
        {title && (
          <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
        )}
        {(message || children) && (
          <div className="mt-1 text-sm text-gray-500">
            {message && <p>{message}</p>}
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-6 ${styles.container} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <div className={styles.icon}>{getIcon()}</div>
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          )}
          {(message || children) && (
            <div className={`${title ? 'mt-2' : ''} text-sm ${styles.content}`}>
              {message && <p>{message}</p>}
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
