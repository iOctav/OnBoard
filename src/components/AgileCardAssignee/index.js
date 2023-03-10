import styled from 'styled-components';

import Button from '@jetbrains/ring-ui/dist/button/button';
import { ReactComponent as AddPerson } from './add-person.svg';

const AddPerson14px = styled(AddPerson)`
  width: 14px;
  height: 14px;
`;

function AgileCardAssignee() {
    return (
        <span className="agile-card-assignee">
          <Button icon={AddPerson14px} ></Button>
        </span>
    );
}

export default AgileCardAssignee
