import styled from 'styled-components';

import PropTypes from 'prop-types';
import pencilIcon from '@jetbrains/icons/pencil';
import dragIcon from '@jetbrains/icons/drag';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';

const BorderedSpan = styled.span`
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 20px;
  padding: 0 8px;
  cursor: default;
  vertical-align: baseline;
  color: var(--ring-secondary-color);
  border: 1px var(--ring-line-color) solid;
  border-radius: var(--ring-border-radius);
  background-color: var(--ring-content-background-color);
  font-size: var(--ring-font-size-smaller);
  font-weight: normal;
  font-style: normal;
  line-height: 17px;
`;

function NameColumnTemplate({disabled, fieldValues}) {
  const { t } = useTranslation();

  if (fieldValues.length > 1) {
    return (<div>
    {
      fieldValues.map(
        field =>
          (<div key={field.id}>
            <Button disabled={disabled}
              data-movable-handle
              title={t('Drag to reorder')}
              icon={dragIcon}></Button>
            <span>{field.name}</span>
            {field.isResolved && (<BorderedSpan><span>{t('Resolved.$$noContext')}</span></BorderedSpan>)}
            <Button disabled={disabled} icon={pencilIcon} title={t('Edit.$$noContext')}/>
          </div>)
      )
    }
    </div>);
  }
  const field = fieldValues[0];
  return (<div key={field.id}>
    <span>{field.name} </span>
    {field.isResolved && (<BorderedSpan><span>{t('Resolved.$$noContext')}</span></BorderedSpan>)}
    <Button disabled={disabled} icon={pencilIcon} title={t('Edit.$$noContext')}/>
  </div>);
}

NameColumnTemplate.propTypes = {
  disabled: PropTypes.bool,
  fieldValues: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default NameColumnTemplate;
