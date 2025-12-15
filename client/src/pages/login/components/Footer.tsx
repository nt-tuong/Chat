import { LOGIN_MESSAGES } from '../../../constants/messages';

interface FooterProps {
  isLogin: boolean;
  onToggle: () => void;
}

export const Footer = ({ isLogin, onToggle }: FooterProps) => {
  return (
    <p className="text-center text-gray-600 mt-6">
      {isLogin ? LOGIN_MESSAGES.NO_ACCOUNT : LOGIN_MESSAGES.HAS_ACCOUNT}
      <button
        onClick={onToggle}
        className="text-blue-600 hover:text-blue-700 font-semibold"
      >
        {isLogin ? LOGIN_MESSAGES.SIGNUP_NOW : LOGIN_MESSAGES.LOGIN}
      </button>
    </p>
  );
};

