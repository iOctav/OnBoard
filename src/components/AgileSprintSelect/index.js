import styled from 'styled-components';

import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetSprintsForAgileQuery } from '../../store/youtrackApi';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useNavigate } from 'react-router-dom';
import { agileBoardUri } from '../../services/linkService';
import DatePicker from '@jetbrains/ring-ui/dist/date-picker/date-picker';
import { ControlsHeight, ControlsHeightContext } from '@jetbrains/ring-ui/dist/global/controls-height';

const InlineSprintContainer = styled.div`
  display: inline-block;
  margin-right: calc(var(--ring-unit) * 2);
  min-width: 128px;
`;

// TODO: Support locale for dates
function formatSprintRange(from, to) {
  if (from && to) {
    if (!isSameYear(from, to)) {
      return `${formatDate(from, 'd MMM yyyy')} — ${formatDate(to, 'd MMM yyyy')}`;
    } else if (!isSameMonth(from, to)) {
      return `${formatDate(from, 'd MMM')} — ${formatDate(to, 'd MMM')}`;
    } else  {
      return `${formatDate(from, 'd')} — ${formatDate(to, 'd MMM')}`;
    }
  } else if (from) {
    if (isSameYear(from, new Date())) {
      return `${ formatDate(from, 'd MMM') }`;
    } else {
      return `${ formatDate(from, 'd MMM yyyy') }`;
    }
  } else if (to) {
    if (isSameYear(to, new Date())) {
      return `${ formatDate(to, 'd MMM') }`;
    } else {
      return `${ formatDate(to, 'd MMM yyyy') }`;
    }
  }
}

function AgileSprintSelect({agileId, sprint}) {
  const navigate = useNavigate();
  const switchSprint = ({key}) => navigate(agileBoardUri(agileId, key));
  return (
    <InlineSprintContainer>

      <ControlsHeightContext.Provider value={ControlsHeight.S}>
        <LazySelectBox
          selected={{label: sprint.name, key: sprint.id}}
          makeDataset={(data) => data.map(({id, name, start, finish}) => ({ label: name, key: id, description: formatSprintRange(start, finish) }))}
          lazyDataLoaderHook={useLazyGetSprintsForAgileQuery}
          lazyDataLoaderHookParams={agileId}
          onSelect={switchSprint}
          size={Size.AUTO}
          add={{label: 'New sprint', alwaysVisible: true}}/>
        {(sprint.from || sprint.to) &&
          <DatePicker
           from={sprint.from}
           to={sprint.to}
           height={ControlsHeight.S}
           range
        />}
      </ControlsHeightContext.Provider>
    </InlineSprintContainer>
  );
}

AgileSprintSelect.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprint: PropTypes.object.isRequired,
};

export default AgileSprintSelect;
