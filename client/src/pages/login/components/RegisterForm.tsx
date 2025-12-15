import { UseFormReturn } from 'react-hook-form';
import { RegisterFormValues } from '../indexModel';
import { NameField } from './fields/NameField';
import { EmailField } from './fields/EmailField';
import { PasswordField } from './fields/PasswordField';
import { ConfirmPasswordField } from './fields/ConfirmPasswordField';

interface RegisterFormProps {
  form: UseFormReturn<RegisterFormValues>;
  showPassword: boolean;
  onTogglePassword: () => void;
  onSubmit: (data: RegisterFormValues) => void;
}

export const RegisterForm = ({
  form,
  showPassword,
  onTogglePassword,
  onSubmit,
}: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <NameField register={register} error={errors.name} />

      <EmailField register={register} error={errors.email} />

      <PasswordField
        register={register}
        error={errors.password}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
      />

      <ConfirmPasswordField
        register={register}
        error={errors.confirmPassword}
        showPassword={showPassword}
      />

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        Đăng ký
      </button>
    </form>
  );
};

