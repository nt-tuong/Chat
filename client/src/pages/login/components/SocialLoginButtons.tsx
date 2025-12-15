import { Facebook, Chrome } from 'lucide-react';
import { LOGIN_MESSAGES, SOCIAL_LOGIN_MESSAGES } from '../../../constants/messages';

interface SocialLoginButtonsProps {
  onSocialLogin: (provider: string) => void;
}

export const SocialLoginButtons = ({ onSocialLogin }: SocialLoginButtonsProps) => {
  return (
    <>
      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">{LOGIN_MESSAGES.OR}</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onSocialLogin('Google')}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg transition-colors duration-200"
        >
          <Chrome className="w-5 h-5 text-red-500" />
          <span className="font-medium text-gray-700">{LOGIN_MESSAGES.CONTINUE_WITH_GOOGLE}</span>
        </button>
        <button
          type="button"
          onClick={() => onSocialLogin('Facebook')}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-lg transition-colors duration-200"
        >
          <Facebook className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-700">
            {LOGIN_MESSAGES.CONTINUE_WITH_FACEBOOK}
          </span>
        </button>
      </div>
    </>
  );
};

