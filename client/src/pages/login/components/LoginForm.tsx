import { UseFormReturn } from 'react-hook-form';
import { LoginFormValues } from '../indexModel';
import { EmailField } from './fields/EmailField';
import { PasswordField } from './fields/PasswordField';
import { LOGIN_MESSAGES } from '../../../constants/messages';

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (data: LoginFormValues) => void;
}

export const LoginForm = ({
  form,
  showPassword,
  onTogglePassword,
  onSubmit,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <EmailField register={register} error={errors.email} />

      <PasswordField
        register={register}
        error={errors.password}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
      />

      {/* Remember me & Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">{LOGIN_MESSAGES.REMEMBER_ME}</span>
        </label>
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {LOGIN_MESSAGES.FORGOT_PASSWORD}
        </button>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        {LOGIN_MESSAGES.LOGIN}
      </button>
    </form>
  );
};

