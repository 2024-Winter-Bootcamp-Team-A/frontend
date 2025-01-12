import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { t } from '@extension/i18n';

const NewTab = () => {
  return <h1 className="bg-white text-black text-3xl">가나다라마바사</h1>;
};

export default withErrorBoundary(withSuspense(NewTab, <div>{t('loading')}</div>), <div> Error Occur </div>);
