import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileBoardHeader from '../AgileBoardHeader';
import AgileBoardData from '../AgileBoardData';
import AgileBoardColGroup from './AgileBoardColGroup';
import { useGetSpecificSprintForSpecificAgileQuery } from '../../features/sprint/sprintSlice';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { useStateParams } from '../../hooks/useStateParams';
import { useDispatch } from 'react-redux';
import { resetSelection } from '../../features/card/cardSlice';

const TableContainer = styled.table`
  min-width: 720px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  table-layout: fixed;
  clear: right;
  background-color: var(--ring-sidebar-background-color);
  position: relative;
  margin-bottom: 36px;
`;

function AgileBoardTable({agileId, sprintId, agileName, sprintName, columnFieldName, explicitQuery, hideOrphansSwimlane,
                           orphansAtTheTop, colorField, systemSwimlaneExist, visibleCardFields, swimlaneFieldName}) {
  const dispatch = useDispatch();
  const { data: sprint,
    isLoading,
    isSuccess,
    isError
  } = useGetSpecificSprintForSpecificAgileQuery({agileId, sprintId: sprintId || 'current'}, {
    pollingInterval: 20000,
  });

  const [swimlanes] = useStateParams({}, 'nested-swimlanes', (s) => JSON.stringify(s), (s) => JSON.parse(s));
  const swimlanesDepth = Object.keys(swimlanes).length;
  const onTableClickHandler = (event) => {
    event.stopPropagation();
    dispatch(resetSelection());
  };

  if (isLoading) {
    return <LoaderScreen/>;
  } else if (isSuccess) {
    return (<TableContainer onClick={onTableClickHandler}>
      <AgileBoardColGroup swimlanesDepth={swimlanesDepth}/>
      <AgileBoardHeader agileName={agileName}
                        sprintName={sprintName}
                        fieldName={columnFieldName}
                        explicitQuery={explicitQuery}
                        swimlanesDepth={swimlanesDepth}/>
      <AgileBoardData agileId={agileId}
                      sprintId={sprintId || 'current'}
                      sprint={sprint}
                      hideOrphansSwimlane={hideOrphansSwimlane}
                      orphansAtTheTop={orphansAtTheTop}
                      colorField={colorField}
                      systemSwimlaneExist={systemSwimlaneExist}
                      visibleCardFields={visibleCardFields}
                      swimlaneFieldName={swimlaneFieldName}/>
    </TableContainer>);
  } else if (isError) {
    return null;
  }
}

AgileBoardTable.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  agileName: PropTypes.string.isRequired,
  sprintName: PropTypes.string,
  columnFieldName: PropTypes.string.isRequired,
  explicitQuery: PropTypes.string,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
  colorField: PropTypes.string,
  systemSwimlaneExist: PropTypes.bool,
  visibleCardFields: PropTypes.arrayOf(PropTypes.string),
  swimlaneFieldName: PropTypes.string,
}

export default AgileBoardTable;
