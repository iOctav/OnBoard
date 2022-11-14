import PropTypes from 'prop-types';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';

function AgileBoardRow({cards, states}) {
    return (
        <table>
          <tbody>
            <Swimlane title={'Issue Tracking'} columnNumber={states.length}/>
            <tr>
                {
                    states.map(state =>
                    <td key={'cell-' + state}>
                        {
                            cards.filter(c => c.state === state)
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
    states: PropTypes.arrayOf(PropTypes.string)
}

export default AgileBoardRow
