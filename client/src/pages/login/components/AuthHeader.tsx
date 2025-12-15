import { Mail } from 'lucide-react';
import { LOGIN_MESSAGES } from '../../../constants/messages';

interface AuthHeaderProps {
  isLogin: boolean;
}

export const AuthHeader = ({ isLogin }: AuthHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4">
        <Mail className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Chat With Me</h1>
      <p className="text-gray-600 mt-2">
        {isLogin ? LOGIN_MESSAGES.WELCOME_BACK : LOGIN_MESSAGES.CREATE_ACCOUNT}
      </p>
    </div>
  );
};

