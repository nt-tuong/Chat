import { useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { LoginFormValues, RegisterFormValues } from './indexModel';
import { createLoginSchema, createRegisterSchema } from './schemas';
import { AuthHeader } from './components/AuthHeader';
import { ToggleTabs } from './components/ToggleTabs';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { SocialLoginButtons } from './components/SocialLoginButtons';
import { TermsText } from './components/TermsText';
import { Footer } from './components/Footer';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Recreate schemas when language changes to update validation messages
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loginSchema = useMemo(() => createLoginSchema(), [i18n.language]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registerSchema = useMemo(() => createRegisterSchema(), [i18n.language]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  // Update resolver when language changes
  useEffect(() => {
    loginForm.clearErrors();
    registerForm.clearErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const onLoginSubmit = (data: LoginFormValues) => {
    // TODO: Call API here
    console.log('Login submitted:', data);
    alert(t('loginMessages.loginSuccess'));
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // TODO: Call API here
    console.log('Register submitted:', data);
    alert(t('loginMessages.signupSuccess'));
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
    alert(t('socialLogin.loginWith', { provider }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    registerForm.reset();
  };

  const handleToggleLogin = () => {
    setIsLogin(true);
    loginForm.reset();
    registerForm.reset();
  };

  const handleToggleRegister = () => {
    setIsLogin(false);
    loginForm.reset();
    registerForm.reset();
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  useEffect(() => {
    if (isLogin) {
      document.title = `${t('login')} | Chat With Me`;
    } else {
      document.title = `${t('loginMessages.signupNow')} | Chat With Me`;
    }
  }, [isLogin, t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative">
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md">
        <AuthHeader isLogin={isLogin} />

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ToggleTabs
            isLogin={isLogin}
            onToggleLogin={handleToggleLogin}
            onToggleRegister={handleToggleRegister}
          />

          {/* Form */}
          {isLogin ? (
            <LoginForm
              form={loginForm}
              showPassword={showPassword}
              onTogglePassword={togglePassword}
              onSubmit={onLoginSubmit}
            />
          ) : (
            <RegisterForm
              form={registerForm}
              showPassword={showPassword}
              onTogglePassword={togglePassword}
              onSubmit={onRegisterSubmit}
            />
          )}

          <SocialLoginButtons onSocialLogin={handleSocialLogin} />

          {/* Terms (only for signup) */}
          {!isLogin && <TermsText />}
        </div>

        <Footer isLogin={isLogin} onToggle={toggleMode} />
      </div>
    </div>
  );
};

export default LoginPage;
