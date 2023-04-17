import styled from 'styled-components';

import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import LazySelectBox from '../LazySelectBox';
import { useLazyGetSprintsForAgileQuery } from '../../app/services/youtrackApi';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useNavigate } from 'react-router-dom';
import { agileBoardUri } from '../../services/linkService';
import DatePicker from '@jetbrains/ring-ui/dist/date-picker/date-picker';
import { ControlsHeight, ControlsHeightContext } from '@jetbrains/ring-ui/dist/global/controls-height';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import enLocale from 'date-fns/locale/en-US';

const InlineSprintContainer = styled.div`
  display: inline-block;
  margin-right: calc(var(--ring-unit) * 2);
  min-width: 128px;
`;

// TODO: Support locale for dates
function formatSprintRange(from, to, locale) {
  if (from && to) {
    if (!isSameYear(from, to)) {
      return `${formatDate(from, 'd MMM yyyy',{locale: locale})} — ${formatDate(to, 'd MMM yyyy',{locale: locale})}`;
    } else if (!isSameMonth(from, to)) {
      return `${formatDate(from, 'd MMM',{locale: locale})} — ${formatDate(to, 'd MMM',{locale: locale})}`;
    } else  {
      return `${formatDate(from, 'd',{locale: locale})} — ${formatDate(to, 'd MMM',{locale: locale})}`;
    }
  } else if (from) {
    if (isSameYear(from, new Date())) {
      return `${ formatDate(from, 'd MMM',{locale: locale}) }`;
    } else {
      return `${ formatDate(from, 'd MMM yyyy',{locale: locale}) }`;
    }
  } else if (to) {
    if (isSameYear(to, new Date())) {
      return `${ formatDate(to, 'd MMM',{locale: locale}) }`;
    } else {
      return `${ formatDate(to, 'd MMM yyyy',{locale: locale}) }`;
    }
  }
}

function AgileSprintSelect({agileId, sprint}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [locale, setLocale] = useState(enLocale);

  useEffect(() => {
    const importLocaleFile = async () => {
      const localeToSet = await import(
        /* webpackMode: "lazy", webpackChunkName: "df-[index]", webpackExclude: /_lib/ */
        `date-fns/locale/${i18n.language}/index.js`
        );
      setLocale(localeToSet.default);
    };

    // If the locale has not yet been loaded.
    if (locale.code !== i18n.language) {
      importLocaleFile();
    }
  }, [locale.code, i18n.language]);

  const switchSprint = ({key}) => navigate(agileBoardUri(agileId, key));
  const formatSprintRangeWithLocale = (start, finish) => {
    return formatSprintRange(sprint.from, sprint.to, locale);
  }
  return (
    <InlineSprintContainer>

      <ControlsHeightContext.Provider value={ControlsHeight.S}>
        <LazySelectBox
          selected={{label: sprint.name, key: sprint.id}}
          makeDataset={(data) => data.map(({id, name, start, finish}) => ({ label: name, key: id, description: formatSprintRangeWithLocale(start, finish) }))}
          lazyDataLoaderHook={useLazyGetSprintsForAgileQuery}
          lazyDataLoaderHookParams={agileId}
          onSelect={switchSprint}
          size={Size.AUTO}
          add={{label: t('New sprint'), alwaysVisible: true}}/>
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
