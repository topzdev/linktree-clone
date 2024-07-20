import * as yup from 'yup';

export const usernameFieldSchema = yup
  .string()
  .required()
  .matches(
    /^[a-zA-Z][a-zA-Z0-9_\.]{2,19}$/,
    'Username must start with a letter and can contain letters, numbers, underscores, and dots.',
  )
  .min(3, 'Username must be at least 3 characters long.')
  .max(20, 'Username cannot be longer than 20 characters.');

export const passwordFieldSchema = yup
  .string()
  .required()
  .min(8, ({ label }) => `${label} must be at least 8 characters long`)
  .matches(/[A-Z]/, ({ label }) => `${label} must contain at least one uppercase letter`)
  .matches(/[a-z]/, ({ label }) => `${label} must contain at least one lowercase letter`)
  .matches(/[0-9]/, ({ label }) => `${label} must contain at least one number`)
  .matches(/[@$!%*?&]/, ({ label }) => `${label} must contain at least one special character`);
