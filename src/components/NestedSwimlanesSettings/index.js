import PropTypes from 'prop-types';
import Button from '@jetbrains/ring-ui/dist/button/button';
import { useTranslation } from 'react-i18next';
import NestedSwimlanesList from './NestedSwimlanesList';

function NestedSwimlanesSettings({swimlaneSettings, switchToColAndSwimTab}) {
  const { t } = useTranslation();
  if (!swimlaneSettings.enabled)
    return (<span>{t('Swimlanes are disabled. To turn on then go to tab')}<Button text onClick={switchToColAndSwimTab}>"{t('Columns and Swimlanes')}"</Button></span>);
  return (<NestedSwimlanesList/>);
}

NestedSwimlanesSettings.propTypes = {
  swimlaneSettings: PropTypes.object,
  switchToColAndSwimTab: PropTypes.func.isRequired,
}

export default NestedSwimlanesSettings;