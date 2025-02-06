import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({
  isLoading,
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-full transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-opacity-100',
        {
          'text-white bg-gradient-to-r from-[#70C3FF] to-[#4B65FF] hover:scale-105 transition duration-300':
            variant === 'primary',
          'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500':
            variant === 'secondary',
          'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-indigo-500':
            variant === 'outline',
        },
        'active:scale-[0.98]',
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
