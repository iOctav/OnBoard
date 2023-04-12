import styled from 'styled-components';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import closeIcon from '@jetbrains/icons/close-12px';
import addIcon from '@jetbrains/icons/add';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import Select from '@jetbrains/ring-ui/dist/select/select';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import PropTypes from 'prop-types';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetCustomFilterFieldsQuery } from '../../app/services/youtrackApi';
import { Size } from '@jetbrains/ring-ui/dist/input/input';

const GreyInlineButton = styled(Button)`
  color: var(--ring-secondary-color);
`;

const FloatRightGreyInlineButton = styled(GreyInlineButton)`
  float: right;
`;

const CustomFieldsTableContainer = styled.div`
  max-width: 500px;
`;


function CustomFieldsTable({disabled, fields, projects}) {
  const { t } = useTranslation();
  const [customFields] = useState(fields);
  const displayDataSet = [{key: 'FULL_NAME', label: t('Value')}, {key: 'LETTER', label: t('First latter')}];
  const projectDict = Object.fromEntries(projects.map(x => [x.id, x.name]));
  const projectShortNames = projects.map(x => x.shortName);
  const tableColumns = [
    { key: 'name', id: 'name', title: t('Name'), getValue: (item, column) => (<span>{item.field.name}</span>)},
    { key: 'projects', id: 'projects', title: t('Projects'), getValue: (item, column) => (<div>
        <span>{item.field.instances.map(instance => projectDict[instance.project.id]).filter(item => item).join(', ')}</span>
      </div>) },
    { key: 'display', id: 'display', title: t('Display'), getValue: (item, column) =>
        (<Select hideSelected disabled={disabled} type="INLINE" selected={displayDataSet.find(data => data.key === item.presentation.id)} data={displayDataSet}/>)},
    { key: 'remove', id: 'remove', getValue: (item, column) => (<Button disabled={disabled} icon={closeIcon} title={t('Remove')}/>)},
  ]
  const data = customFields ? [...customFields].map(col => ({...col, key: col.id})) : [];
  const selection = new Selection({data: customFields});
  return (
    <CustomFieldsTableContainer>
      <Table draggable={!disabled} alwaysShowDragHandle dragHandleTitle={t('Drag to change the order')}
             data={data}
             selectable={false}
             selection={selection} onSelect={() => {}}
             columns={tableColumns}/>
      <div>
        <LazySelectBox disabled={disabled}
                       type="CUSTOM"
                       customAnchor={({wrapperProps, buttonProps, popup}) =>
                         (<span {...wrapperProps}><GreyInlineButton text icon={addIcon} {...buttonProps}>{t('Add field')}</GreyInlineButton>{popup}</span>)}
                       size={Size.S}
                       lazyDataLoaderHook={useLazyGetCustomFilterFieldsQuery}
                       lazyDataLoaderHookParams={projectShortNames}
                       makeDataset={data => data
                         .filter(item => customFields.findIndex(field => field.field.id === item.customField?.id) < 0)
                         .map(item => ({ key: item.id, label: item.presentation, description: item.customField?.fieldType?.presentation}))}/>
        <FloatRightGreyInlineButton text disabled={disabled}>{t('Restore default')}</FloatRightGreyInlineButton>
      </div>
    </CustomFieldsTableContainer>
  );

}

CustomFieldsTable.propTypes = {
  disabled: PropTypes.bool,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
}

export default CustomFieldsTable;
