import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';
import Avatar from '@jetbrains/ring-ui/dist/avatar/avatar';
import { Size } from '@jetbrains/ring-ui/dist/avatar/avatar';
import { profilePageUri } from '../../services/linkService';
import { useGetCurrentUserInfoQuery } from '../../app/services/youtrackApi';

function SmartProfile() {
  const { data, error, isLoading } = useGetCurrentUserInfoQuery();

  if (error)  return (<div><Avatar size={Size.Size32}/></div>);
  if (isLoading) return (<div><Avatar size={Size.Size32}/></div>);

  const profileAnchor = (<div><Avatar size={Size.Size32} username={data.name} /></div>);

  const dropdownMenuData = [
    { label: 'Profile', href: profilePageUri() },
    { label: 'Appearance', href: '#' },
    { label: 'Switch user', href: '#' },
    { label: 'Log out', href: '#' },
  ];
  return (
    <DropdownMenu data={dropdownMenuData} anchor={profileAnchor}/>
  )
}
export default SmartProfile
