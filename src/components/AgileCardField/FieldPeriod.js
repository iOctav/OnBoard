import PropTypes from 'prop-types';
import DropdownCardField from './DropdownCardField';
import { useState } from 'react';
import Input from '@jetbrains/ring-ui/dist/input/input';
import { ErrorValidationMessage } from './styled-components';

const calculatePeriod = (valInMinutes) => {
  if (!valInMinutes) return null;
  let result = '';
  const weeks = Math.floor(valInMinutes / 2400);
  weeks > 0 && (result += `${weeks}w`);
  const days = Math.floor((valInMinutes - weeks * 2400) / 480);
  days > 0 && (result += ` ${days}d`);
  const hours = Math.floor((valInMinutes - weeks * 2400 - days * 480) / 60);
  hours > 0 && (result += ` ${hours}h`);
  const minutes = valInMinutes - weeks * 2400 - days * 480 - hours * 60;
  minutes > 0 && (result += ` ${minutes}m`);
  return result.trim();
};

const isValidPeriod = (val) => {
  const regex = /^((\d+w\s*)?(\s*)?(\d+d\s*)?(\s*)?(\d+h\s*)?(\s*)?(\d+m\s*)?|\d+)$/;
  return !val || regex.test(val);
};

function FieldPeriod({customField, value}) {
  const initPeriod = calculatePeriod(value);
  const [period, setPeriod] = useState(initPeriod);
  const [validPeriod, setValidPeriod] = useState(isValidPeriod(initPeriod));

  return (<DropdownCardField
    customField={customField}
    anchorText={initPeriod}
    disabledAppleButton={!validPeriod}>
    <Input value={period} onChange={(event) => {
      setPeriod(event.target.value);
      setValidPeriod(isValidPeriod(event.target.value));
    }}/>
    <div>1 week = 5 days, 1 day = 8 hours</div>
    {!validPeriod && <ErrorValidationMessage>Doesn't match the pattern</ErrorValidationMessage>}
  </DropdownCardField>);

}

FieldPeriod.propTypes = {
  customField: PropTypes.object,
  value: PropTypes.number,
};

export default FieldPeriod;
