'use client';

import React from 'react';
import { cn } from './utils';

interface StatusContextValue {
  status: 'online' | 'offline' | 'maintenance' | 'degraded';
}

const StatusContext = React.createContext<StatusContextValue | undefined>(undefined);

const useStatus = () => {
  const context = React.useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a Status component');
  }
  return context;
};

interface StatusProps {
  status: 'online' | 'offline' | 'maintenance' | 'degraded';
  children: React.ReactNode;
  className?: string;
}

const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ status, children, className, ...props }, ref) => {
    return (
      <StatusContext.Provider value={{ status }}>
        <div
          ref={ref}
          className={cn('inline-flex items-center gap-2', className)}
          {...props}
        >
          {children}
        </div>
      </StatusContext.Provider>
    );
  }
);
Status.displayName = 'Status';

const StatusIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { status } = useStatus();
    
    const statusStyles = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      maintenance: 'bg-yellow-500',
      degraded: 'bg-orange-500',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'h-2 w-2 rounded-full',
          statusStyles[status],
          className
        )}
        {...props}
      />
    );
  }
);
StatusIndicator.displayName = 'StatusIndicator';

const StatusLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => {
    const { status } = useStatus();
    
    const statusLabels = {
      online: 'Live',
      offline: 'Offline',
      maintenance: 'Maintenance',
      degraded: 'Degraded',
    };

    const displayText = children || statusLabels[status];

    return (
      <span
        ref={ref}
        className={cn('text-sm font-medium', className)}
        {...props}
      >
        {displayText}
      </span>
    );
  }
);
StatusLabel.displayName = 'StatusLabel';

export { Status, StatusIndicator, StatusLabel };