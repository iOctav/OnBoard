import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';
import { trimLastSlash } from '../../utils/uriUtils';

function AppearanceMenu() {
  const baseServiceUrl = trimLastSlash(process.env.REACT_APP_YOUTRACK_BASE_URL);
  const dropdownMenuData = [
    {rgItemType: DropdownMenu.ListProps.Type.TITLE, label: 'THEME'},
    {rgItemType: DropdownMenu.ListProps.Type.TITLE, label: 'INTERFACE'},
    {rgItemType: DropdownMenu.ListProps.Type.LINK, label: 'More settings...', href: (baseServiceUrl + '/users/me?tab=workspace')},
  ];
  return (
    <DropdownMenu data={dropdownMenuData} anchor='Appearance' menuProps={ {onmouseover: () => console.log('123')}}  />
  )
}
export default AppearanceMenu
