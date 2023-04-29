import styled from 'styled-components';

import PropTypes from 'prop-types';
import LazySelectBox from '../LazySelectBox';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import { useLazyGetSubtasksIssuesQuery } from '../../features/sprint/sprintSlice';
import { ReactComponent as Subtasks } from './subtasks.svg';
import List from '@jetbrains/ring-ui/dist/list/list';

const Subtasks12px = styled(Subtasks)`
  width: 12px;
  height: 12px;
`;

function AgileCardSubtask({issueId, subtasks}) {
  const { t } = useTranslation();
  const mapDataset = data => data.map(item => ({
    template: <span className="label" style={{
      textDecoration: item.resolved ? 'line-through' : 'initial',
    }}>{`${item.idReadable}: ${item.summary}`}</span>,
    rgItemType: List.ListProps.Type.CUSTOM,
  }));

  return (
    <span className="agile-card-subtask">
      {subtasks && subtasks.issuesSize > 0 && <LazySelectBox className="agile-card-enumeration-item"
                     lazyDataLoaderHook={useLazyGetSubtasksIssuesQuery}
                     lazyDataLoaderHookParams={{issueId, linkId: subtasks.id}}
                     makeDataset={mapDataset}
                     type="CUSTOM"
                     customAnchor={({wrapperProps, buttonProps, popup}) => (
                       <span {...wrapperProps}>
                         <Button icon={Subtasks12px} title={t('Subtasks')} {...buttonProps}>{`${subtasks.issuesSize - subtasks.unresolvedIssuesSize}/${subtasks.issuesSize}`}</Button>
                         {popup}
                       </span>)}>
      </LazySelectBox>}
    </span>
  );
}

AgileCardSubtask.propTypes = {
  issueId: PropTypes.string.isRequired,
  subtasks: PropTypes.object,
}

export default AgileCardSubtask;
