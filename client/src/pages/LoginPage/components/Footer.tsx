import { useTranslation } from 'react-i18next';

interface FooterProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const Footer = ({ isLogin, onToggle }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <p className="text-center text-gray-600 mt-6">
      {isLogin ? t('loginMessages.noAccount') : t('loginMessages.hasAccount')}
      <button
        onClick={onToggle}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        {isLogin ? t('loginMessages.signupNow') : t('login')}
      </button>
    </p>
  );
};
