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
import Tray from '@jetbrains/ring-ui/dist/header/tray';
import TrayIcon from '@jetbrains/ring-ui/dist/header/tray-icon';
import Select from '@jetbrains/ring-ui/dist/select/select';
import SmartProfile from '../SmartProfile';
import {
  agilesPageUri,
  dashboardsPageUri, ganttChartsPageUri, homePageUri,
  issuesPageUri, knowledgeBasePageUri,
  projectsPageUri, createAgileBoardPageUri,
  reportsPageUri, timesheetsPageUri
} from '../../services/linkService';

function AgilePageHeader() {
  // TODO: Why it's crashing when translation is used here
  // const { t } = useTranslation();
  const dropdownMenuData = [
    { label: 'Card...' },
    { label: 'Board...', href: createAgileBoardPageUri() },
  ];
  const dropdownAnchor = (<Button primary>Create <Icon glyph={careDown10pxIcon}></Icon></Button>);
  const issuesDataset = [];
  return (
    <Header theme={Theme.LIGHT} className={'compactHeader'}>
      <a title="YT" href={homePageUri()}>YT Logo</a>
      <span>
        <Link href={issuesPageUri()}>Issues</Link>
        <Select type="INLINE" filter={true} data={issuesDataset} label={''} />
      </span>
      <Link href={dashboardsPageUri()}>Dashboards</Link>
      <Link active href={agilesPageUri()}>Agile Boards</Link>
      <Link href={reportsPageUri()}>Reports</Link>
      <Link href={projectsPageUri()}>Projects</Link>
      <Link href={knowledgeBasePageUri()}>Knowledge Base</Link>
      <Link href={timesheetsPageUri()}>Timesheets</Link>
      <Link href={ganttChartsPageUri()}>Gantt Charts</Link>
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
