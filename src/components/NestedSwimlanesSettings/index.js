import PropTypes from 'prop-types';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import NestedSwimlanesList from './NestedSwimlanesList';

function NestedSwimlanesSettings({agileId, swimlaneSettings, switchToColAndSwimTab, projectShortNames}) {
  const { t } = useTranslation();
  if (!swimlaneSettings.enabled)
    return (<span>{t('Swimlanes are disabled. To turn on then go to tab')}<Button text onClick={switchToColAndSwimTab}>"{t('Columns and Swimlanes')}"</Button></span>);
  return (<NestedSwimlanesList agileId={agileId} projectShortNames={projectShortNames}/>);
}

NestedSwimlanesSettings.propTypes = {
  agileId: PropTypes.string.isRequired,
  swimlaneSettings: PropTypes.object,
  switchToColAndSwimTab: PropTypes.func.isRequired,
  projectShortNames: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default NestedSwimlanesSettings;