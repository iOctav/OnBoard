import styled from 'styled-components';

import DatePicker from '@jetbrains/ring-ui/dist/date-picker/date-picker';
import PropTypes from 'prop-types';
import { Size } from '@jetbrains/ring-ui/dist/input/input';
import { useState } from 'react';

export const LeftMarginDatePicker = styled(DatePicker)`
  margin-left: calc(var(--ring-unit));
`;

function FieldDatePicker({customField, value, withTime}) {
  const [date, setDate] = useState(value);
  const emptyFieldText = customField?.emptyFieldText ?? '?';
  return <LeftMarginDatePicker inline
    datePlaceholder={emptyFieldText}
    dateTimePlaceholder={emptyFieldText}
    date={date}
    size={Size.AUTO}
    onChange={setDate}
    withTime={withTime} />
}

FieldDatePicker.propTypes = {
  customField: PropTypes.object,
  value: PropTypes.number,
  withTime: PropTypes.bool,
};

export default FieldDatePicker;
