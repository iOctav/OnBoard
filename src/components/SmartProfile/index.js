import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';
import Avatar from '@jetbrains/ring-ui/dist/avatar/avatar';
import { Size } from '@jetbrains/ring-ui/dist/avatar/avatar';
import { myProfilePageUri } from '../../services/linkService';
import { useGetCurrentUserInfoQuery } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';

function SmartProfile() {
  const { authInfo } = useAuth();
  const { data, error, isLoading } = useGetCurrentUserInfoQuery(undefined, { skip: !authInfo.authorized });

  if (error)  return (<div><Avatar size={Size.Size32}/></div>);
  if (isLoading) return (<div><Avatar size={Size.Size32}/></div>);

  const profileAnchor = (<div><Avatar size={Size.Size32} username={data?.name ?? 'guest'} /></div>);

  const dropdownMenuData = [
    { label: 'Profile', href: myProfilePageUri() },
    { label: 'Appearance', href: '#' },
    { label: 'Switch user', href: '#' },
    { label: 'Log out', href: '#' },
  ];
  return (
    <DropdownMenu data={dropdownMenuData} anchor={profileAnchor}/>
  )
}
export default SmartProfile
