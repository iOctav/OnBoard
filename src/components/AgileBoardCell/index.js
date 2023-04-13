import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/item-types';
import { useUpdateIssueFieldMutation } from '../../features/sprint/sprintSlice';
import { PropertyUpdateType } from '../../features/sprint/propertyUpdateType';

const AgileBoardCellContainer = styled.div`
  height: 100%;
  padding: 0 calc(var(--ring-unit)/2);
  padding-bottom: 7px;
  box-sizing: border-box;
`;

function AgileBoardCell({agileId, sprintId, columnFieldId, swimlaneFieldlId, columnName, swimlaneName, issuesDict, children}) {
  const [updateIssueField, result] = useUpdateIssueFieldMutation();
  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: ItemTypes.AgileCard,
      drop: (item) => {
        const issueData = issuesDict[item.id];
        const columnChanged = issueData.fields.some(field => field.name.toLowerCase() === columnFieldId.toLowerCase()
          && field.value.name.toLowerCase() !== columnName.toLowerCase());
        const prevSwimlane = issueData.fields.find(field => field.name.toLowerCase() === swimlaneFieldlId.toLowerCase()).value?.name;
        const swimlaneChanged = prevSwimlane?.toLowerCase() !== swimlaneName?.toLowerCase() || (prevSwimlane && !swimlaneName) || (!prevSwimlane && swimlaneName);
        let propertiesUpdates = [];
        columnChanged && propertiesUpdates.push({
          fieldId: columnFieldId,
          type: PropertyUpdateType.Column,
          value: {
            name: columnName
          },
        });
        swimlaneChanged && propertiesUpdates.push({
          fieldId: swimlaneFieldlId,
          type: PropertyUpdateType.Swimlane,
          value: swimlaneName ? { name: swimlaneName } : null,
        });
        updateIssueField({
          agileId,
          sprintId,
          issueId: item.id,
          propertiesUpdates,
        });
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    };
  }, [columnName, swimlaneName, issuesDict])
  return <AgileBoardCellContainer
    ref={drop}>
    {children}
  </AgileBoardCellContainer>
}

AgileBoardCell.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  columnFieldId: PropTypes.string,
  swimlaneFieldlId: PropTypes.string,
  columnName: PropTypes.string,
  swimlaneName: PropTypes.string,
  columnIndex: PropTypes.number,
  issuesDict: PropTypes.object,
}

export default AgileBoardCell;
