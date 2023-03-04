import PropTypes from 'prop-types';
import { useState } from 'react';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Swimlane({title, cardsNumber, columnsNumber}) {
    const [rollUp, setRollUp] = useState(true);
    return (
        <tr>
            <td>
                <div>
                    <FontAwesomeIcon icon={rollUp ? faCaretDown : faCaretRight} onClick={() => setRollUp(prevState => !prevState)}/>
                    <span>{title}</span>
                </div>
                <div>
                    <span>{cardsNumber}</span>
                </div>
            </td>
            {[...Array(columnsNumber - 1).keys()].map(i => <td key={'fake-cell-' + i}/>)}
        </tr>
    );
}

Swimlane.propTypes = {
    title: PropTypes.string,
    cardsNumber: PropTypes.number,
    columnsNumber: PropTypes.number,
}

export default Swimlane
