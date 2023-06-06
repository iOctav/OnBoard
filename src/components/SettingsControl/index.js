import styled from 'styled-components';

import PropTypes from 'prop-types';

const SettingsLabel = styled.span`
  position: relative;
  top: 0;
  display: inline-block;
  float: left;
  max-width: 144px;
  padding-top: 4px;
  vertical-align: top;
  line-height: 16px;
`;

const LabelledControl = styled.div`
  position: relative;
  margin: 16px 0;
`;

const ControlContainer = styled.div`
  margin-bottom: calc(var(--ring-unit));
  position: relative;
  width: auto;
  min-height: 24px;
  margin-left: 160px;
  vertical-align: top;
  line-height: 24px;
`;

function SettingsControl({label, children}) {
  return (
    <LabelledControl data-testid="labelled-control">
      <SettingsLabel data-testid="settings-label">{label}</SettingsLabel>
      <ControlContainer data-testid="control-container">
        {children}
      </ControlContainer>
    </LabelledControl>
  )
}

SettingsControl.propTypes = {
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SettingsControl;
