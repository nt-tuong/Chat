import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";
import { LoginFormValues, RegisterFormValues } from "./indexModel";
import { createLoginSchema, createRegisterSchema } from "./schemas";
import { AuthHeader } from "./components/AuthHeader";
import { ToggleTabs } from "./components/ToggleTabs";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { SocialLoginButtons } from "./components/SocialLoginButtons";
import { TermsText } from "./components/TermsText";
import { Footer } from "./components/Footer";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Recreate schemas when language changes to update validation messages
  // useMemo is lightweight - only recreates when language changes (rare event)
  const loginSchema = useMemo(() => createLoginSchema(), [i18n.language]);
  const registerSchema = useMemo(() => createRegisterSchema(), [i18n.language]);

  // Store form values to preserve them when language changes
  const [loginFormValues, setLoginFormValues] = useState<
    Partial<LoginFormValues>
  >({});
  const [registerFormValues, setRegisterFormValues] = useState<
    Partial<RegisterFormValues>
  >({});

  // Create forms with current schemas
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: loginFormValues as LoginFormValues,
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: registerFormValues as RegisterFormValues,
  });

  // Only save form values and re-validate when language changes
  // This is more efficient than watching all form changes
  useEffect(() => {
    // Get current values and errors
    const currentLoginValues = loginForm.getValues();
    const currentRegisterValues = registerForm.getValues();
    const hasLoginErrors = Object.keys(loginForm.formState.errors).length > 0;
    const hasRegisterErrors =
      Object.keys(registerForm.formState.errors).length > 0;

    // Save values only if they exist
    const hasLoginValues = Object.values(currentLoginValues).some(
      (v) => v !== ""
    );
    const hasRegisterValues = Object.values(currentRegisterValues).some(
      (v) => v !== ""
    );

    if (hasLoginValues) {
      setLoginFormValues(currentLoginValues);
    }
    if (hasRegisterValues) {
      setRegisterFormValues(currentRegisterValues);
    }

    // Re-validate with new schema to update error messages (keeps errors, updates messages)
    if (hasLoginErrors) {
      loginForm.trigger();
    }
    if (hasRegisterErrors) {
      registerForm.trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      // TODO: Call API here
      // For now, simulate API call
      console.log("Login submitted:", data);

      // Simulate API response
      const mockToken = `mock_token_${Date.now()}`;
      const mockUser = {
        email: data.email,
        name: data.email.split("@")[0], // Extract name from email
      };

      // Dispatch login action
      dispatch(
        login({
          token: mockToken,
          user: mockUser,
        })
      );

      // Show success message
      alert(t("loginMessages.loginSuccess"));

      // Navigate to home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      // TODO: Call API here
      // For now, simulate API call
      console.log("Register submitted:", data);

      // Simulate API response
      const mockToken = `mock_token_${Date.now()}`;
      const mockUser = {
        email: data.email,
        name: data.name,
      };

      // Dispatch login action (same as login after registration)
      dispatch(
        login({
          token: mockToken,
          user: mockUser,
        })
      );

      // Show success message
      alert(t("loginMessages.signupSuccess"));

      // Navigate to home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
    alert(t("socialLogin.loginWith", { provider }));
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
      document.title = `${t("login")} | Chat With Me`;
    } else {
      document.title = `${t("loginMessages.signupNow")} | Chat With Me`;
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
              key={`login-${i18n.language}`}
              form={loginForm}
              showPassword={showPassword}
              onTogglePassword={togglePassword}
              onSubmit={onLoginSubmit}
            />
          ) : (
            <RegisterForm
              key={`register-${i18n.language}`}
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
