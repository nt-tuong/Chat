import { z } from 'zod';
import { VALIDATION_MESSAGES } from '../../constants/messages';

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
    .min(6, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
});

// Register Schema
export const registerSchema = z
  .object({
    name: z.string().min(1, VALIDATION_MESSAGES.NAME_REQUIRED),
    email: z
      .string()
      .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
      .email(VALIDATION_MESSAGES.EMAIL_INVALID),
    password: z
      .string()
      .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
      .min(6, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH),
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION_MESSAGES.CONFIRM_PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

