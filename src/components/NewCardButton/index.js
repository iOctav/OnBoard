import add10pxIcon from '@jetbrains/icons/add-10px';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';

function NewCardButton() {
  const { t } = useTranslation();
  return (
    <Button icon={add10pxIcon}>{t('New card')}...</Button>
  );
}

export default NewCardButton
