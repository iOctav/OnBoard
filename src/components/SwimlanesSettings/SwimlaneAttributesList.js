import styled from 'styled-components';

import { Table } from '@jetbrains/ring-ui/dist/table/table';
import PropTypes from 'prop-types';
import closeIcon from '@jetbrains/icons/close-12px';
import { useTranslation } from 'react-i18next';
import pencilIcon from '@jetbrains/icons/pencil';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import { useState } from 'react';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetAvailableSwimlaneFieldsQuery } from '../../app/services/youtrackApi';

const FloatRightButton = styled(Button)`
  float: right;
`;

const AttributeListContainer = styled.div`
  max-width: calc(30 * var(--ring-unit));
`;

function SwimlaneAttributesList({disabled, agileId, fieldValues}) {
  const { t } = useTranslation();
  const [selectedAttributes] = useState(fieldValues);
  const tableColumns = [
    {key: 'name', id: 'name', getValue: (item, column) => (<div>
        <span>{item.name}</span>
        <Button disabled={disabled} icon={pencilIcon} title={t('Edit.$$noContext')}/>
      </div>) },
    {key: 'remove', id: 'remove', getValue: (item, column) => (<Button disabled={disabled} icon={closeIcon} title={t('Remove.$$noContext')}/>)},
  ]
  const data = [...selectedAttributes].map(col => ({...col, key: col.id}));
  const selection = new Selection({data: data});
  return (
    <AttributeListContainer>
      <Table data={data}
             selectable={false}
             selection={selection} onSelect={() => {}}
             columns={tableColumns}/>
      <div>
        {/*TODO: Tags have their own api...*/}
        <LazySelectBox
          disabled={disabled}
          type="INLINE"
          label={t('Add value')}
          lazyDataLoaderHook={useLazyGetAvailableSwimlaneFieldsQuery}
          lazyDataLoaderHookParams={agileId}
          makeDataset={(data) => data
            .filter(attr => selectedAttributes.findIndex(sattr => sattr.id === attr.id) > 0)
            .map(attr => ({value: attr.id, label: attr.presentation}))}/>
        {selectedAttributes.length > 0 && <FloatRightButton disabled={disabled} text>{t('Clear values')}</FloatRightButton>}
      </div>
    </AttributeListContainer>
  );
}

SwimlaneAttributesList.propTypes = {
  disabled: PropTypes.bool,
  agileId: PropTypes.string.isRequired,
  fieldValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SwimlaneAttributesList;
