import Button from '@jetbrains/ring-ui/dist/button/button';
import userIcon from '@jetbrains/icons/user';

function AgileCardAssignee() {
    return (
        <span className="agile-card-assignee">
          <Button icon={userIcon}></Button>
        </span>
    );
}

export default AgileCardAssignee
