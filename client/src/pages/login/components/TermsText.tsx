import { useTranslation } from 'react-i18next';

export const TermsText = () => {
  const { t } = useTranslation();

  return (
    <p className="text-xs text-gray-500 text-center mt-6">
      {t('loginMessages.termsText')}{' '}
      <button
        type="button"
        className="text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
      >
        {t('loginMessages.termsOfService')}
      </button>{' '}
      {t('loginMessages.and')}{' '}
      <button
        type="button"
        className="text-blue-600 hover:underline bg-transparent border-0 p-0 cursor-pointer"
      >
        {t('loginMessages.privacyPolicy')}
      </button>
    </p>
  );
};
