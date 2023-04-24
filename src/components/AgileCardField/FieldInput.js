import DropdownCardField from './DropdownCardField';
import Input from '@jetbrains/ring-ui/dist/input/input';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorValidationMessage } from './styled-components';

const isValid = (val, pattern) => {
  return !val || !pattern || pattern.test(val);
};

function FieldInput({customField, value, pattern, placeholder, errorText}) {
  const [inputValue, setInputValue] = useState(value);
  const [valid, setValid] = useState(isValid(value, pattern));

  return (<DropdownCardField customField={customField} anchorText={inputValue} disabledAppleButton={!valid}>
      <Input value={inputValue?.toString()} placeholder={placeholder}
        onChange={(event) => {
          setInputValue(event.target.value);
          setValid(isValid(event.target.value, pattern));
        }}/>
    {errorText && !valid && <ErrorValidationMessage>{errorText}</ErrorValidationMessage>}
  </DropdownCardField>);
}

FieldInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pattern: PropTypes.instanceOf(RegExp),
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
};

export default FieldInput;
