import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import closeIcon from '@jetbrains/icons/close-12px';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import Select from '@jetbrains/ring-ui/dist/select/select';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import PropTypes from 'prop-types';


function CustomFieldsTable({fields, projects}) {
  const { t } = useTranslation();
  const [customFields, setCustomFields] = useState(fields);
  const displayDataSet = [{key: 'FULL_NAME', label: t('Value')}, {key: 'LETTER', label: t('First latter')}];
  const projectDict = Object.fromEntries(projects.map(x => [x.id, x.name]));
  const tableColumns = [
    { key: 'name', id: 'name', title: t('Name'), getValue: (item, column) => (<span>{item.field.name}</span>)},
    { key: 'projects', id: 'projects', title: t('Projects'), getValue: (item, column) => (<div>
        <span>{item.field.instances.map(instance => projectDict[instance.project.id]).join(', ')}</span>
      </div>) },
    { key: 'display', id: 'display', title: t('Display'), getValue: (item, column) =>
        (<Select type="INLINE" selected={displayDataSet.find(data => data.key === item.presentation.id)} data={displayDataSet}/>)},
    { key: 'remove', id: 'remove', getValue: (item, column) => (<Button icon={closeIcon} title={t('Remove')}/>)},
  ]
  const data = [...customFields].map(col => ({...col, key: col.id}));
  const selection = new Selection({data: customFields});
  return (
    <Table draggable alwaysShowDragHandle dragHandleTitle={t('Drag to change the order')}
           data={data}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns}/>
  );

}

CustomFieldsTable.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  projects: PropTypes.arrayOf(PropTypes.object),
}

export default CustomFieldsTable;
