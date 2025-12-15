import { UseFormRegister, FieldError } from 'react-hook-form';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { FORM_LABELS, FORM_PLACEHOLDERS } from '../../../../constants/messages';

interface PasswordFieldProps {
  register: UseFormRegister<any>;
  error?: FieldError;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const PasswordField = ({
  register,
  error,
  showPassword,
  onTogglePassword,
}: PasswordFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {FORM_LABELS.PASSWORD}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder={FORM_PLACEHOLDERS.PASSWORD}
          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

