import { UseFormRegister, FieldError } from 'react-hook-form';
import { Lock } from 'lucide-react';
import { FORM_LABELS, FORM_PLACEHOLDERS } from '../../../../constants/messages';

interface ConfirmPasswordFieldProps {
  register: UseFormRegister<any>;
  error?: FieldError;
  showPassword: boolean;
}

export const ConfirmPasswordField = ({
  register,
  error,
  showPassword,
}: ConfirmPasswordFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {FORM_LABELS.CONFIRM_PASSWORD}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          placeholder={FORM_PLACEHOLDERS.PASSWORD}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

