import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useState } from 'react';
import caretDown10px from '@jetbrains/icons/caret-down-10px';
import caretRight10px from '@jetbrains/icons/caret-right-10px';
import drag from '@jetbrains/icons/drag';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Icon from '@jetbrains/ring-ui/dist/icon/icon';

const DraggableIcon = styled(Icon)`
    cursor: move;
`;

function Swimlane({title, isOrphan, cardsNumber, columnsNumber, }) {
    const [rollUp, setRollUp] = useState(true);
    return (
        <tr>
            <td>
                <div>
                    { !isOrphan && <DraggableIcon glyph={drag} /> }
                    <Button icon={rollUp ? caretDown10px : caretRight10px} onClick={() => setRollUp(prevState => !prevState)}>{title}</Button>
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
    isOrphan: PropTypes.bool,
    cardsNumber: PropTypes.number,
    columnsNumber: PropTypes.number,
}

export default Swimlane
