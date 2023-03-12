import styled from 'styled-components';

import PropTypes from 'prop-types';
import { useState } from 'react';
import caretDown10px from '@jetbrains/icons/caret-down-10px';
import caretRight10px from '@jetbrains/icons/caret-right-10px';
import drag from '@jetbrains/icons/drag';
import Button from '@jetbrains/ring-ui/dist/button/button';
import Icon from '@jetbrains/ring-ui/dist/icon/icon';
import { useTranslation } from 'react-i18next';

const DraggableIcon = styled(Icon)`
    cursor: move;
`;

const FloatLeftDiv = styled.div`
    float: left;
`;

const FloatRightDiv = styled.div`
    float: right;
`;

const CardsCounterSpan = styled.span`
    font-size: 12px;
    color: var(--ring-secondary-color);
`;

function Swimlane({title, isOrphan, cardsNumber, columnsNumber, }) {
    const [rollUp, setRollUp] = useState(true);
    const { t } = useTranslation();
    return (
        <tr>
            <td>
              {!!title && (
                <FloatLeftDiv>
                    { !isOrphan && <DraggableIcon glyph={drag} /> }
                    <Button icon={rollUp ? caretDown10px : caretRight10px} onClick={() => setRollUp(prevState => !prevState)}>{title}</Button>
                </FloatLeftDiv>
              )}
            </td>
            {/*TODO: Could crash if column less than 3*/}
            {[...Array(columnsNumber - 2).keys()].map(i => <td key={'fake-cell-' + i}/>)}
            <td>
                <FloatRightDiv>
                    { !!cardsNumber && (<CardsCounterSpan>{cardsNumber} {t(cardsNumber > 1 ? 'cards' : 'card')}</CardsCounterSpan>)}
                </FloatRightDiv>
            </td>
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
