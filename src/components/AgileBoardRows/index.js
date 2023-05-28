import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BoardRow from './BoardRow';

function AgileBoardRows({agileId, sprintId, orphanRow, trimmedSwimlanes, hideOrphansSwimlane, orphansAtTheTop,
                          level, colorField, system, visibleCardFields, swimlaneFieldName, currentSwimlanes, issuesDict}) {
  let content;
  const { t } = useTranslation();

  const swimlanesAgileRow = trimmedSwimlanes?.map(row => {
    return (<BoardRow key={ `${ row.id }-${ level }` } agileId={ agileId } sprintId={ sprintId } level={ level } row={ row }
               issuesDict={ issuesDict } visibleCardFields={ visibleCardFields }
               currentSwimlanes={[...currentSwimlanes, {swimlaneFieldlId: swimlaneFieldName, swimlaneValue: row.name}]}
               swimlaneTitle={ row.value?.presentation || row.issue?.summary } colorField={ colorField }
               system={ system }/>);
  });
  if (hideOrphansSwimlane) {
    content = swimlanesAgileRow
  } else {
    const swimlaneWithOrphanValue = swimlaneFieldName
      ? [...currentSwimlanes, {swimlaneFieldlId: swimlaneFieldName, swimlaneValue: undefined}]
      : [...currentSwimlanes];
    const orphanAgileRow =
      (<BoardRow isOrphan key={`${orphanRow?.id}-${level}`} agileId={agileId} sprintId={sprintId} row={orphanRow}
                 issuesDict={issuesDict} level={level} visibleCardFields={visibleCardFields}
                 currentSwimlanes={swimlaneWithOrphanValue}
                 swimlaneTitle={trimmedSwimlanes?.length > 0 ? t('Uncategorized Cards') : undefined} colorField={colorField} system={system}/>);
    if (orphansAtTheTop) {
      content = [orphanAgileRow, ...swimlanesAgileRow];
    } else {
      content = [...swimlanesAgileRow, orphanAgileRow];
    }
  }
  return content;
}

AgileBoardRows.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  orphanRow: PropTypes.object,
  trimmedSwimlanes: PropTypes.arrayOf(PropTypes.object).isRequired,
  hideOrphansSwimlane: PropTypes.bool,
  orphansAtTheTop: PropTypes.bool,
  level: PropTypes.number,
  colorField: PropTypes.string,
  system: PropTypes.bool,
  visibleCardFields: PropTypes.arrayOf(PropTypes.string),
  swimlaneFieldName: PropTypes.string,
  currentSwimlanes: PropTypes.arrayOf(PropTypes.shape({
    swimlaneFieldlId: PropTypes.string,
    swimlaneName: PropTypes.string,
  })).isRequired,
  issuesDict: PropTypes.object,
}

export default AgileBoardRows
