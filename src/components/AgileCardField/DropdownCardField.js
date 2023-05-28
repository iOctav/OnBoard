import styled from 'styled-components';

import PropTypes from 'prop-types';
import Panel from '@jetbrains/ring-ui/dist/panel/panel';
import Popup from '@jetbrains/ring-ui/dist/popup/popup';
import Dropdown from '@jetbrains/ring-ui/dist/dropdown/dropdown';
import { CardFieldAnchor, DropdownContent, DropdownPanel, LeftMarginSpan } from './styled-components';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';

const StyledPanel = styled(Panel)`
  padding: 0 !important;
`;

function DropdownCardField({customField, anchorText, disabledAppleButton, onApply, onCancel, children}) {
  const { t } = useTranslation();
  const emptyFieldText = customField?.emptyFieldText ?? '?';
  const anchor = (<LeftMarginSpan>
    <CardFieldAnchor title={customField?.name}>{anchorText ?? emptyFieldText}</CardFieldAnchor>
  </LeftMarginSpan>);
  return (<Dropdown anchor={anchor}>
    <Popup trapFocus autoFocusFirst>
      <DropdownContent>
        {children}
        <StyledPanel>
          <DropdownPanel>
            <Button primary onClick={onApply} disabled={disabledAppleButton}>{t('Apply changes')}</Button>
            <Button onClick={onCancel}>{t('Cancel.$$noContext')}</Button>
          </DropdownPanel>
        </StyledPanel>
      </DropdownContent>
    </Popup>
  </Dropdown>);
}

DropdownCardField.propTypes = {
  field: PropTypes.object,
  anchorText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabledAppleButton: PropTypes.bool,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DropdownCardField;
