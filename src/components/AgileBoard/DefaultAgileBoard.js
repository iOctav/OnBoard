import { useGetAgileUserProfileQuery } from '../../app/services/youtrackApi';
import { Navigate } from 'react-router-dom';
import LoaderScreen from '@jetbrains/ring-ui/dist/loader-screen/loader-screen';
import { agileBoardUri } from '../../services/linkService';

function DefaultAgileBoard() {
  const { data: agileUserProfile,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAgileUserProfileQuery();

  let content;

  if (isLoading) {
    content = <LoaderScreen/>
  } else if (isSuccess) {
    const agileId = agileUserProfile?.defaultAgile?.id;
    const sprintId = agileUserProfile?.defaultAgile?.currentSprint?.id || 'current';
    content = (<Navigate to={agileBoardUri(agileId, sprintId)}/>);
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  return content;
}
export default DefaultAgileBoard
