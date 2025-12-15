import { LOGIN_MESSAGES } from '../../../constants/messages';

export const TermsText = () => {
  return (
    <p className="text-xs text-gray-500 text-center mt-6">
      {LOGIN_MESSAGES.TERMS_TEXT}{' '}
      <button
        type="button"
        className="text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
      >
        {LOGIN_MESSAGES.TERMS_OF_SERVICE}
      </button>{' '}
      {LOGIN_MESSAGES.AND}{' '}
      <button
        type="button"
        className="text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
      >
        {LOGIN_MESSAGES.PRIVACY_POLICY}
      </button>
    </p>
  );
};

