import styled from 'styled-components';

import addIcon from '@jetbrains/icons/add';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import { Size } from '@jetbrains/ring-ui/dist/icon';
import { newIssueUri } from '../../services/linkService';
import PropTypes from 'prop-types';

const ButtonLinkText = styled.span`
  position: relative;
  top: 1px;
  display: none;
  font-size: var(--ring-font-size-smaller);
  font-family: var(--ring-font-family);
`

function NewCardButton({projectName}) {
  const { t } = useTranslation();
  return (
    <Button icon={addIcon} iconSize={Size.Size14} iconSuppressSizeWarning={true} href={newIssueUri(projectName)} target="_blank">
      <ButtonLinkText className="new-card-button-action-text" >{t('New card')}...</ButtonLinkText>
    </Button>
  );
}

NewCardButton.propTypes = {
  projectName: PropTypes.string,
};

export default NewCardButton
