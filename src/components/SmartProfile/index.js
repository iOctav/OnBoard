import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';
import Avatar from '@jetbrains/ring-ui/dist/avatar/avatar';
import { trimLastSlash } from '../../utils/uriUtils';
import { Size } from '@jetbrains/ring-ui/dist/avatar/avatar';
import { useAuth } from '../../hooks/useAuth';

function SmartProfile() {
  const auth = useAuth();
  const baseServiceUrl = trimLastSlash(process.env.REACT_APP_YOUTRACK_BASE_URL);

  const profileAnchor = (<div><Avatar size={Size.Size32} username={auth.user.login}/></div>);

  const dropdownMenuData = [
    { label: 'Profile', href: (baseServiceUrl + '/users/me') },
    { label: 'Appearance', href: '#' },
    { label: 'Switch user', href: '#' },
    { label: 'Log out', href: '#' },
  ];
  return (
    <DropdownMenu data={dropdownMenuData} anchor={profileAnchor}/>
  )
}
export default SmartProfile
