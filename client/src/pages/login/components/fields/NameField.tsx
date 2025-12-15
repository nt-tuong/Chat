import { UseFormRegister, FieldError } from 'react-hook-form';
import { User } from 'lucide-react';
import { FORM_LABELS, FORM_PLACEHOLDERS } from '../../../../constants/messages';

interface NameFieldProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const NameField = ({ register, error }: NameFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {FORM_LABELS.FULL_NAME}
      </label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          {...register('name')}
          placeholder={FORM_PLACEHOLDERS.FULL_NAME}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

