import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const AgileCardUserAdd = styled.span`
    margin-right: ${props => props.theme.unit};
`;

function AgileCardAssignee() {
    return (
        <span className="agile-card-assignee">
            <AgileCardUserAdd>
                <FontAwesomeIcon icon={faUserPlus} />
            </AgileCardUserAdd>
        </span>
    );
}

export default AgileCardAssignee
