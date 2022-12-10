import PropTypes from 'prop-types';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';

function AgileBoardRow({cards, columnField, columnStates}) {
    return (
        <table>
          <tbody>
            <Swimlane title={'Issue Tracking'} columnNumber={columnStates.length}/>
            <tr>
                {
                  columnStates.map(state =>
                    <td key={'cell-' + state}>
                        {
                            cards.filter(c => c.customFields.find(field => field.name === columnField.name).value.name === state)
                            .map((c) => <AgileCard idReadable={c.idReadable} summary={c.summary} key={'agile-card-' + c.idReadable}/> )
                        }
                    </td>)
                }
            </tr>
          </tbody>
        </table>
    );
}

AgileBoardRow.propTypes = {
    issues: PropTypes.arrayOf(PropTypes.object),
    columnField: PropTypes.object,
    columnStates: PropTypes.arrayOf(PropTypes.string)
}

export default AgileBoardRow
