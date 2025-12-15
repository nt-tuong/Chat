import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, RegisterFormValues } from './indexModel';
import { loginSchema, registerSchema } from './schemas';
import { LOGIN_MESSAGES, SOCIAL_LOGIN_MESSAGES } from '../../constants/messages';
import { AuthHeader } from './components/AuthHeader';
import { ToggleTabs } from './components/ToggleTabs';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { SocialLoginButtons } from './components/SocialLoginButtons';
import { TermsText } from './components/TermsText';
import { Footer } from './components/Footer';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    // TODO: Call API here
    console.log('Login submitted:', data);
    alert(LOGIN_MESSAGES.LOGIN_SUCCESS);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // TODO: Call API here
    console.log('Register submitted:', data);
    alert(LOGIN_MESSAGES.SIGNUP_SUCCESS);
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
    alert(SOCIAL_LOGIN_MESSAGES.LOGIN_WITH(provider));
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
      document.title = 'Login | Chat With Me';
    } else {
      document.title = 'Register | Chat With Me';
    }
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
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
