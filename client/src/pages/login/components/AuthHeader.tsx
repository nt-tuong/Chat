import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';

interface AuthHeaderProps {
  isLogin: boolean;
}

export const AuthHeader = ({ isLogin }: AuthHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8">
      <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4">
        <Mail className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Chat With Me</h1>
      <p className="text-gray-600 mt-2">
        {isLogin ? t('loginMessages.welcomeBack') : t('loginMessages.createAccount')}
      </p>
    </div>
  );
};
