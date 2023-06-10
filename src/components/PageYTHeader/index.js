import styled from 'styled-components';

import Button from '@jetbrains/ring-ui/dist/button/button';
import DropdownMenu from '@jetbrains/ring-ui/dist/dropdown-menu/dropdown-menu';
import Header from '@jetbrains/ring-ui/dist/header/header';
import Icon, { Size } from '@jetbrains/ring-ui/dist/icon';
import Link from '@jetbrains/ring-ui/dist/link/link';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@jetbrains/ring-ui/dist/global/theme';
import careDown10pxIcon from '@jetbrains/icons/caret-down-10px';
import bellIcon from '@jetbrains/icons/bell';
import helpIcon from '@jetbrains/icons/help-20px';
import settingsIcon from '@jetbrains/icons/settings-20px';
import { ReactComponent as navigationSettings } from './navigation-settings.svg';
import Tray from '@jetbrains/ring-ui/dist/header/tray';
import TrayIcon from '@jetbrains/ring-ui/dist/header/tray-icon';
import Select from '@jetbrains/ring-ui/dist/select/select';
import SmartProfile from '../SmartProfile';
import {
  createAgileBoardPageUri,
  homePageUri, newIssueUri,
  YT_PAGES
} from '../../services/linkService';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import HeaderLogo from './HeaderLogo';
import { useEffect, useState } from 'react';

const StyledObHeader = styled(Header)`
  font-size: 13px;
  font-family: "Inter", system-ui, Arial, sans-serif;
`;

const NavigationSettings20px = styled(navigationSettings)`
  padding-top: 20px;
  width: 24px;
  height: 24px;
  color: var(--ring-secondary-color);
`;

function PageYTHeader({isCompact}) {
  const { t } = useTranslation();
  const theme = useTheme();

  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize

    return () => window.removeEventListener("resize", resizeW);
  });

  const dropdownMenuData = [
    { label: t('Card...'), href: newIssueUri(), target: '_blank' },
    { label: t('Board...'), href: createAgileBoardPageUri(), target: '_blank' },
  ];
  let menuLinks;
  const isCompactMode = isCompact || deviceSize < 1024;
  if (deviceSize > 1024) {
    menuLinks = (
      <>
        <Link target="_blank" href={YT_PAGES.dashboard}>{t('Dashboards')}</Link>
        <Link target="_blank" href={YT_PAGES.agiles}>{t('Agile Boards')}</Link>
        <Link target="_blank" href={YT_PAGES.reports}>{t('Reports')}</Link>
        <Link target="_blank" href={YT_PAGES.projects}>{t('Projects')}</Link>
        <Link target="_blank" href={YT_PAGES.knowledgeBase}>{t('Knowledge Base')}</Link>
        <Link target="_blank" href={YT_PAGES.timesheets}>{t('Timesheets')}</Link>
        <Link target="_blank" href={YT_PAGES.ganttCharts}>{t('Gantt Charts')}</Link>
      </>
    );
  } else {
    const linksData = [
      { label: t('Dashboards'), href: YT_PAGES.dashboard, target: '_blank' },
      { label: t('Agile Boards'), href: YT_PAGES.agiles, target: '_blank' },
      { label: t('Reports'), href: YT_PAGES.reports, target: '_blank' },
      { label: t('Projects'), href: YT_PAGES.projects, target: '_blank' },
      { label: t('Knowledge Base'), href: YT_PAGES.knowledgeBase, target: '_blank' },
      { label: t('Timesheets'), href: YT_PAGES.timesheets, target: '_blank' },
      { label: t('Gantt Charts'), href: YT_PAGES.ganttCharts, target: '_blank' },
    ];
    menuLinks = (
      <DropdownMenu data={linksData} anchor={() => <Icon glyph={NavigationSettings20px}/>}/>
    );
  }

  const dropdownAnchor = (<Button primary>{t('Create.Hub Operations')}<Icon glyph={careDown10pxIcon}></Icon></Button>);
  const issuesDataset = [];
  return (
    <StyledObHeader theme={theme} className={'compactHeader'}>
      <RouterLink rel="noreferrer" to={homePageUri()} >
        <HeaderLogo isCompact={isCompactMode}/>
      </RouterLink>
      <span>
        <Link target="_blank" href={YT_PAGES.issues}>{t('Issues.$$noContext')}</Link>
        <Select type="INLINE" filter={true} data={issuesDataset} label={''} />
      </span>
      {menuLinks}
      <DropdownMenu data={dropdownMenuData} anchor={dropdownAnchor}></DropdownMenu>
      <Tray>
        <TrayIcon title="Notifications" icon={bellIcon} iconSize={Size.Size20}/>
        <TrayIcon title="Help" icon={helpIcon} iconSize={Size.Size20}/>
        <TrayIcon title="Administration" icon={settingsIcon} iconSize={Size.Size20}/>
        <SmartProfile/>
      </Tray>
    </StyledObHeader>
  )
}

PageYTHeader.propTypes = {
  isCompact: PropTypes.bool.isRequired,
}

export default PageYTHeader
