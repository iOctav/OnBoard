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

function AgileBoardCell({agileId, sprintId, columnFieldId, swimlaneFieldlId, columnName, swimlaneName, children}) {
  const [updateIssueField, result] = useUpdateIssueFieldMutation();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.AgileCard,
    drop: (item) => {
      updateIssueField({
        agileId,
        sprintId,
        issueId: item.id,
        propertiesUpdates: [
          {
            fieldId: columnFieldId,
            type: PropertyUpdateType.Column,
            value: {
              name: columnName
            },
          },
          {
            fieldId: swimlaneFieldlId,
            type: PropertyUpdateType.Swimlane,
            value: {
              name: swimlaneName
            },
          },
        ]
      });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [columnName, swimlaneName])
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
  isOrphan: PropTypes.bool,
}

export default AgileBoardCell;
