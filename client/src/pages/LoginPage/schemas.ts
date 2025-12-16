import { z } from 'zod';
import i18n from '../../i18';

// Function to get validation messages from i18n
const getValidationMessages = () => ({
  nameRequired: i18n.t('validationMessages.nameRequired'),
  emailRequired: i18n.t('validationMessages.emailRequired'),
  emailInvalid: i18n.t('validationMessages.emailInvalid'),
  passwordRequired: i18n.t('validationMessages.passwordRequired'),
  passwordMinLength: i18n.t('validationMessages.passwordMinLength'),
  confirmPasswordMismatch: i18n.t('validationMessages.confirmPasswordMismatch'),
});

// Login Schema - needs to be recreated when language changes
export const createLoginSchema = () => {
  const messages = getValidationMessages();
  return z.object({
    email: z
      .string()
      .min(1, messages.emailRequired)
      .email(messages.emailInvalid),
    password: z
      .string()
      .min(1, messages.passwordRequired)
      .min(6, messages.passwordMinLength),
  });
};

// Register Schema - needs to be recreated when language changes
export const createRegisterSchema = () => {
  const messages = getValidationMessages();
  return z
    .object({
      name: z.string().min(1, messages.nameRequired),
      email: z
        .string()
        .min(1, messages.emailRequired)
        .email(messages.emailInvalid),
      password: z
        .string()
        .min(1, messages.passwordRequired)
        .min(6, messages.passwordMinLength),
      confirmPassword: z.string().min(1, messages.passwordRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: messages.confirmPasswordMismatch,
      path: ['confirmPassword'],
    });
};

// Initial schemas for first render
export const loginSchema = createLoginSchema();
export const registerSchema = createRegisterSchema();
