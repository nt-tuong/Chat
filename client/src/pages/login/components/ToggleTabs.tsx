import { LOGIN_MESSAGES } from '../../../constants/messages';

interface ToggleTabsProps {
  isLogin: boolean;
  onToggleLogin: () => void;
  onToggleRegister: () => void;
}

export const ToggleTabs = ({ isLogin, onToggleLogin, onToggleRegister }: ToggleTabsProps) => {
  return (
    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
      <button
        type="button"
        onClick={onToggleLogin}
        className={`flex-1 py-2 rounded-md font-semibold transition-all ${
          isLogin
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        {LOGIN_MESSAGES.LOGIN}
      </button>
      <button
        type="button"
        onClick={onToggleRegister}
        className={`flex-1 py-2 rounded-md font-semibold transition-all ${
          !isLogin
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        Đăng ký
      </button>
    </div>
  );
};

