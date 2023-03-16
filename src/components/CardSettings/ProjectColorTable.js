import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import pencilIcon from '@jetbrains/icons/pencil';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { Table } from '@jetbrains/ring-ui/dist/table/table';
import Selection from '@jetbrains/ring-ui/dist/table/selection';
import ColorPicker from '../ColorPicker';
import PropTypes from 'prop-types';

function ProjectColorTable({projectColors}) {
  const { t } = useTranslation();
  const [selectedProjectColors, setSelectedProjectColors] = useState(projectColors);
  const tableColumns = [
    {key: 'name', id: 'name', getValue: (item, column) => (<div>
        <span>{item.project.name}</span>
        <Button icon={pencilIcon} title={t('Edit')}/>
      </div>) },
    {key: 'color', id: 'color', getValue: (item, column) =>
        (<ColorPicker selected={item.color.id}
                      label={item.project?.name && item.project.name[0]}
                      onSave={(colorId) => setSelectedProjectColors(
                        selectedProjectColors.find(project => project.id === item.id).color.id = colorId)}/>
        )},
  ]
  const data = [...selectedProjectColors].map(col => ({...col, key: col.id}));
  const selection = new Selection({data: data});
  return (
    <Table data={data}
           selectable={false}
           selection={selection} onSelect={() => {}}
           columns={tableColumns}/>
  );

}

ProjectColorTable.propTypes = {
  projectColors: PropTypes.arrayOf(PropTypes.object),
}

export default ProjectColorTable;
