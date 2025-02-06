import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export const Input = (
  {
    error,
    label,
    validationState,
    validationRules,
    showError = true,
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
        className={`appearance-none rounded-[10px] text-[16px] relative block w-full px-[20px] py-[14.5px] border border-2 transition duration-300 ${
          showError && validationState === 'error'
            ? 'border-rose-400 bg-rose-50 text-rose-400'
            : validationState === 'success'
            ? showError
              ? 'border-green-500 bg-emerald-50 text-emerald-500'
              : 'border-green-500'
            : 'border-transparent focus:border-slate-400'
        } placeholder-slate-400 focus:outline-none`}
        {...props}
      />
      {validationRules ? (
        <div className="mt-1 space-y-1">
          {validationRules.map((rule, index) => (
            <p
              key={index}
              className={`text-sm ${
                rule.state === 'success'
                  ? 'text-emerald-500 border-emerald-500'
                  : rule.state === 'error'
                  ? 'text-rose-400 border-rose-400'
                  : 'text-gray-400 border-gray-300'
              }`}
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
};
