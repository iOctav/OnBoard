import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SettingsControl from '../SettingsControl';
import Input from '@jetbrains/ring-ui/dist/input/input';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useState } from 'react';
import { ControlsHeight } from '@jetbrains/ring-ui/dist/global/controls-height';

function GeneralSettings({agileName}) {
  const { t } = useTranslation();
  const [ name, setName ] = useState(agileName);
  return (<div>
    <SettingsControl label={t('Name')}>
      <Input height={ControlsHeight.S} size={Size.M} value={name} onChange={(event) => setName(event.target.value)}/>
    </SettingsControl>
  </div>);
}

GeneralSettings.propTypes = {
  agileName: PropTypes.string.isRequired,
};

export default GeneralSettings;
