import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: FieldError;
  label: string;
  validationState?: 'error' | 'success';
  validationRules?: Array<{
    message: string;
    state: 'initial' | 'error' | 'success';
  }>;
  showError?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      label,
      validationState,
      validationRules,
      showError = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={props.id} className="sr-only">
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            'appearance-none rounded-[10px] text-[16px] relative block w-full px-[20px] py-[14.5px]',
            'border-2 transition duration-300',
            'placeholder-slate-400 focus:outline-none',
            {
              'border-rose-400 bg-rose-50 text-rose-400':
                showError && validationState === 'error',
              'border-green-500 bg-emerald-50 text-emerald-500':
                showError && validationState === 'success',
              'border-green-500': !showError && validationState === 'success',
              'border-transparent focus:border-slate-400':
                !validationState ||
                (!showError && validationState !== 'success'),
            },
            className
          )}
          {...props}
        />
        {validationRules ? (
          <div className="mt-1 space-y-1">
            {validationRules.map((rule, index) => (
              <p
                key={index}
                className={cn('text-sm', {
                  'text-emerald-500 border-emerald-500':
                    rule.state === 'success',
                  'text-rose-400 border-rose-400':
                    rule.state === 'error' && showError,
                  'text-gray-400 border-gray-300':
                    rule.state === 'initial' ||
                    (rule.state === 'error' && !showError),
                })}
              >
                {rule.message}
              </p>
            ))}
          </div>
        ) : (
          error && <p className="mt-1 text-sm text-rose-400">{error.message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
