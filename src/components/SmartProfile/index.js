import styled from 'styled-components';

import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';
import Avatar, { Size } from '@jetbrains/ring-ui/dist/avatar/avatar';
import { myProfilePageUri } from '../../services/linkService';
import { useGetCurrentUserInfoQuery } from '../../features/auth/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const CenteredAvatar = styled(Avatar)`
  font-size: 0;
  vertical-align: middle;
`;

function SmartProfile() {
  const { t } = useTranslation();
  const { authInfo } = useAuth();
  const { data, error, isLoading } = useGetCurrentUserInfoQuery(undefined, { skip: !authInfo.authorized });

  if (error)  return (<div><CenteredAvatar size={Size.Size32}/></div>);
  if (isLoading) return (<div><CenteredAvatar size={Size.Size32}/></div>);


  const profileAnchor = (<div><CenteredAvatar size={Size.Size32} username={data?.name ?? 'guest'} /></div>);

  const dropdownMenuData = [
    { label: t('Profile'), href: myProfilePageUri(), target: '_blank' },
    { label: t('Appearance'), href: '#' },
    { label: t('Switch user'), href: '#' },
    { label: t('Log out'), href: '#' },
  ];
  return (
    <DropdownMenu data={dropdownMenuData} anchor={profileAnchor}/>
  )
}

export default SmartProfile;
