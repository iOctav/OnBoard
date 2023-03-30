import PropTypes from 'prop-types';
import { YT_PAGES } from '../../services/linkService';
import Link from '@jetbrains/ring-ui/dist/link/link';
import { useTranslation } from 'react-i18next';
import Alert from '@jetbrains/ring-ui/dist/alert/alert';

function YouTrackAgileSettingsLink({agileId, sprintId, title, linkId}) {
  const { t } = useTranslation();
  return (
    <Alert showWithAnimation={false} type={Alert.Type.WARNING} closeable={false}>
      {t('YouTrack settings are disabled to keep consistency. You can change them in the ')}
      <Link target="_blank" href={`${YT_PAGES.agiles}/${agileId}/${sprintId}?tab=${linkId}&settings`}>{t(title)}</Link>
    </Alert>
  )
}

YouTrackAgileSettingsLink.propTypes = {
  agileId: PropTypes.string.isRequired,
  sprintId: PropTypes.string.isRequired,
  title: PropTypes.string,
  linkId: PropTypes.string,
};

export default YouTrackAgileSettingsLink;
