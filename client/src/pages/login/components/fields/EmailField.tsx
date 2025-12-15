import { UseFormRegister, FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';

interface EmailFieldProps {
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const EmailField = ({ register, error }: EmailFieldProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('formLabels.email')}
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="email"
          {...register('email')}
          placeholder={t('formPlaceholders.email')}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};
