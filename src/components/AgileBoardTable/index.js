import styled from 'styled-components';

import PropTypes from 'prop-types';
import AgileBoardHeader from '../AgileBoardHeader';
import AgileBoardData from '../AgileBoardData';
import AgileBoardColGroup from './AgileBoardColGroup';
import { selectIssuesQuery, useGetSpecificSprintForSpecificAgileQuery } from '../../features/sprint/sprintSlice';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { useStateParams } from '../../hooks/useStateParams';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelection } from '../../features/card/cardSlice';
import ErrorPage from '../ErrorPage';
import alertService from '@jetbrains/ring-ui/dist/alert-service/alert-service';

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
  const query = useSelector(selectIssuesQuery);
  const dispatch = useDispatch();
  const { data: sprint,
    isLoading,
    isError,
    isSuccess,
    error
  } = useGetSpecificSprintForSpecificAgileQuery({agileId, sprintId: sprintId || 'current', issuesQuery: query}, {
    pollingInterval: 20000,
  });

  const [swimlanes] = useStateParams({}, 'nested-swimlanes', (s) => JSON.stringify(s), (s) => JSON.parse(s));
  const swimlanesDepth = Object.keys(swimlanes).length;
  const onTableClickHandler = (event) => {
    event.stopPropagation();
    dispatch(resetSelection());
  };

  if (isError) {
    alertService.error(error.errorMessage, 5000);
    if (!sprint) {
      return <ErrorPage message={ error.errorTitle } description={ error.errorDescription }/>
    }
  }

  if (isLoading || !sprint) {
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
