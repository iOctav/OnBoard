import styled from 'styled-components';

import Button from '@jetbrains/ring-ui/dist/button/button';
import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';
import Header from '@jetbrains/ring-ui/dist/header/header';
import Icon from '@jetbrains/ring-ui/dist/icon';
import Link from '@jetbrains/ring-ui/dist/link/link';
import Theme from '@jetbrains/ring-ui/dist/global/theme';
import careDown10pxIcon from '@jetbrains/icons/caret-down-10px';
import bellIcon from '@jetbrains/icons/bell';
import helpIcon from '@jetbrains/icons/help-20px';
import settingsIcon from '@jetbrains/icons/settings-20px';
import { trimLastSlash } from '../../utils/uriUtils';
import Tray from '@jetbrains/ring-ui/dist/header/tray';
import TrayIcon from '@jetbrains/ring-ui/dist/header/tray-icon';
import Select from '@jetbrains/ring-ui/dist/select/select';
import SmartProfile from '../SmartProfile';

function AgilePageHeader() {
  const baseServiceUrl = trimLastSlash(process.env.REACT_APP_YOUTRACK_BASE_URL);
  // TODO: Why crashed when translation is used
  // const { t } = useTranslation();
  const dropdownMenuData = [
    { label: 'Card...' },
    { label: 'Board...', href: (baseServiceUrl + '/agiles/create') },
  ];
  const dropdownAnchor = (<Button primary>Create <Icon glyph={careDown10pxIcon}></Icon></Button>);
  const issuesDataset = [];


  return (
    <Header theme={Theme.LIGHT} className={'compactHeader'}>
      <a title="YT" href={baseServiceUrl}>YT Logo</a>
      <span>
        <Link href={baseServiceUrl + '/issues'}>Issues</Link>
        <Select type="INLINE" filter={true} data={issuesDataset} label={''}>
        </Select>
      </span>
      <Link href={baseServiceUrl + '/dashboard'}>Dashboards</Link>
      <Link active href={baseServiceUrl + '/agiles'}>Agile Boards</Link>
      <Link href={baseServiceUrl + '/reports'}>Reports</Link>
      <Link href={baseServiceUrl + '/projects'}>Projects</Link>
      <Link href={baseServiceUrl + '/articles'}>Knowledge Base</Link>
      <Link href={baseServiceUrl + '/timesheets'}>Timesheets</Link>
      <Link href={baseServiceUrl + '/gantt-charts'}>Gantt Charts</Link>
      <DropdownMenu data={dropdownMenuData} anchor={dropdownAnchor}></DropdownMenu>
      <Tray>
        <TrayIcon title="Notifications" icon={bellIcon}/>
        <TrayIcon title="Help" icon={helpIcon}/>
        <TrayIcon title="Administration" icon={settingsIcon}/>
        <SmartProfile/>
      </Tray>
    </Header>
  )
}
export default AgilePageHeader
