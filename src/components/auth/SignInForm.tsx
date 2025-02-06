'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormData, VALIDATION_RULES } from '@/types/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
  } = useForm<FormData>();

  const email = watch('email', '');
  const password = watch('password', '');

  const passwordRules = [
    {
      message: '8 characters or more (no spaces)',
      isValid: password.length >= 8 && !password.includes(' '),
    },
    {
      message: 'Uppercase and lowercase letters',
      isValid: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    {
      message: 'At least one digit ',
      isValid: /\d/.test(password),
    },
  ];

  const getPasswordValidationRules = () => {
    if (!password) {
      return passwordRules.map((rule) => ({
        message: rule.message,
        state: 'initial' as const,
      }));
    }
    return passwordRules.map((rule) => ({
      message: rule.message,
      state: rule.isValid ? ('success' as const) : ('error' as const),
    }));
  };

  const isPasswordValid = password
    ? passwordRules.every((rule) => rule.isValid)
    : undefined;

  const isEmailValid = (email: string) => {
    return VALIDATION_RULES.email.pattern.test(email);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate api call
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm space-y-4 transition-all duration-300">
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: VALIDATION_RULES.email.pattern,
              message: 'Invalid email address',
            },
          })}
          id="email"
          type="email"
          placeholder="Email"
          label="Email address"
          showError={isSubmitted}
          error={errors.email}
          validationState={
            dirtyFields.email
              ? isEmailValid(email)
                ? 'success'
                : 'error'
              : undefined
          }
        />

        <Input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: VALIDATION_RULES.password.minLength,
              message: `Password must be at least ${VALIDATION_RULES.password.minLength} characters`,
            },
            maxLength: {
              value: VALIDATION_RULES.password.maxLength,
              message: `Password must be less than ${VALIDATION_RULES.password.maxLength} characters`,
            },
            pattern: {
              value: VALIDATION_RULES.password.pattern,
              message:
                'Password must contain at least 1 uppercase letter, 1 number, and no spaces',
            },
          })}
          id="password"
          type="password"
          placeholder="Create your password"
          label="Password"
          showError={isSubmitted}
          validationState={
            dirtyFields.password
              ? isPasswordValid
                ? 'success'
                : 'error'
              : undefined
          }
          validationRules={getPasswordValidationRules()}
        />
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        onClick={() => setIsSubmitted(true)}
      >
        Sign up
      </Button>
    </form>
  );
}
