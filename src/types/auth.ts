export type FormData = {
  email: string;
  password: string;
};

export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    maxLength: 64,
    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{8,64}$/,
  },
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
} as const;
