import styled from 'styled-components';

import addIcon from '@jetbrains/icons/add';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import { Size } from '@jetbrains/ring-ui/dist/icon';

const ButtonLinkText = styled.span`
  position: relative;
  top: 1px;
  display: none;
  font-size: var(--ring-font-size-smaller);
  font-family: var(--ring-font-family);
`

function NewCardButton() {
  const { t } = useTranslation();
  return (
    <Button icon={addIcon} iconSize={Size.Size14} iconSuppressSizeWarning={true}>
      <ButtonLinkText className="new-card-button-action-text">{t('New card')}...</ButtonLinkText>
    </Button>
  );
}

export default NewCardButton
