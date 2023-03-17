import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/item-types';
import { useUpdateIssueFieldMutation } from '../../store/youtrackApi';

const AgileBoardCellContainer = styled.div`
  height: 100%;
  padding: 0 calc(var(--ring-unit)/2);
  padding-bottom: 7px;
  box-sizing: border-box;
`;

function AgileBoardCell({columnFieldId, swimlaneFieldlId, columnName, swimlaneName, children}) {
  const [updateIssueField, result] = useUpdateIssueFieldMutation();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.AgileCard,
    drop: (item) => {
      updateIssueField({
        issueId: item.id,
        fieldId: columnFieldId,
        value: {
          name: columnName
        }});
      updateIssueField({
        issueId: item.id,
        fieldId: swimlaneFieldlId,
        value: {
          name: swimlaneName
        }});
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
  columnFieldId: PropTypes.string,
  swimlaneFieldlId: PropTypes.string,
  columnName: PropTypes.string,
  swimlaneName: PropTypes.string,
}

export default AgileBoardCell;
