import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';

function AppearanceMenu() {
  const dropdownMenuData = [
    {rgItemType: DropdownMenu.ListProps.Type.TITLE, label: 'THEME'},
    {rgItemType: DropdownMenu.ListProps.Type.TITLE, label: 'INTERFACE'},
    {rgItemType: DropdownMenu.ListProps.Type.LINK, label: 'More settings...', href: '/users/me?tab=workspace'},
  ];
  return (
    <DropdownMenu data={dropdownMenuData} anchor='Appearance' menuProps={ {onmouseover: () => console.log('123')}}  />
  )
}
export default AppearanceMenu
