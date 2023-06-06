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
  ${props => props.isOver ? `background-color: var(--ring-hover-background-color);` : ''}
`;

function AgileBoardCell({agileId, sprintId, columnFieldId, swimlanes, columnName, issuesDict, children}) {
  const [updateIssueField] = useUpdateIssueFieldMutation();
  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: ItemTypes.AgileCard,
      drop: (item) => {
        const issueData = issuesDict[item.id];
        const columnChanged = issueData.fields.some(field => field.name.toLowerCase() === columnFieldId.toLowerCase()
          && field.value.name.toLowerCase() !== columnName.toLowerCase());
        let propertiesUpdates = [];
        swimlanes.forEach(({ swimlaneFieldlId, swimlaneValue }) => {
          const prevSwimlane = issueData.fields.find(field => field.name.toLowerCase() === swimlaneFieldlId.toLowerCase()).value?.name;
          const swimlaneChanged = prevSwimlane?.toLowerCase() !== swimlaneValue?.toLowerCase() || (prevSwimlane && !swimlaneValue) || (!prevSwimlane && swimlaneValue)
          swimlaneChanged && propertiesUpdates.push({
            fieldId: swimlaneFieldlId,
            type: PropertyUpdateType.Swimlane,
            value: swimlaneValue ? { name: swimlaneValue } : null,
          });
        });

        columnChanged && propertiesUpdates.push({
          fieldId: columnFieldId,
          type: PropertyUpdateType.Column,
          value: {
            name: columnName
          },
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
  }, [columnName, swimlanes, issuesDict])
  return (<AgileBoardCellContainer  data-testid=" cell-container"
    ref={drop} isOver={isOver ? 1 : 0}>
    {children}
  </AgileBoardCellContainer>)
}

AgileBoardCell.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  columnFieldId: PropTypes.string,
  swimlanes: PropTypes.arrayOf(PropTypes.shape({
    swimlaneFieldlId: PropTypes.string,
    swimlaneValue: PropTypes.string,
  })),
  columnName: PropTypes.string,
  columnIndex: PropTypes.number,
  issuesDict: PropTypes.object,
}

export default AgileBoardCell;
