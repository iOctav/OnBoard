import {
  getDatasetByDatePeriodType,
  getDateFieldType,
  getDateSwimlanePeriod,
  getPredefinedDateValue,
  getSwimlanePeriodLabel
} from '../dateFieldUtils';
import { DatePeriodType } from '../date-period-type';
import formatDate from 'date-fns/format';

describe('getDateFieldType', () => {
  it('should return both DateFieldType for date field', () => {
    expect(getDateFieldType('date')).toEqual(DatePeriodType.Both);
  });

  it('should return both DateFieldType for date and time field', () => {
    expect(getDateFieldType('date and time')).toEqual(DatePeriodType.Both);
  });

  it('should return past DateFieldType for updated field id', () => {
    expect(getDateFieldType(undefined, 'updated')).toEqual(DatePeriodType.Past);
  });

  it('should return past DateFieldType for created field id', () => {
    expect(getDateFieldType(undefined, 'created')).toEqual(DatePeriodType.Past);
  });

  it('should return past DateFieldType for resolved date field id', () => {
    expect(getDateFieldType(undefined, 'resolved date')).toEqual(DatePeriodType.Past);
  });

  it('should return undefined for other field ids', () => {
    expect(getDateFieldType(undefined, 'unresolved')).toBeUndefined();
    expect(getDateFieldType(undefined, '')).toBeUndefined();
    expect(getDateFieldType(undefined, undefined)).toBeUndefined();
    expect(getDateFieldType(undefined, null)).toBeUndefined();
  });
});

describe('getDateSwimlanePeriod', () => {
  it('should return today for today date', () => {
    expect(getDateSwimlanePeriod(Date.now())).toEqual('today');
    expect(getDateSwimlanePeriod(Date.now() - 1000)).toEqual('today');
  });

  it('should return yesterday for yesterday date', () => {
    expect(getDateSwimlanePeriod(Date.now() - 24 * 60 * 60 * 1000)).toEqual('yesterday');
  });

  it('should return tomorrow for tomorrow date', () => {
    expect(getDateSwimlanePeriod(Date.now() + 24 * 60 * 60 * 1000)).toEqual('tomorrow');
  });

  it('should return last week for last week date', () => {
    expect(getDateSwimlanePeriod(Date.now() - 7 * 24 * 60 * 60 * 1000)).toEqual('last-week');
  });

  it('should return next week for next week date', () => {
    expect(getDateSwimlanePeriod(Date.now() + 7 * 24 * 60 * 60 * 1000)).toEqual('next-week');
  });

  it('should return last month for last month date', () => {
    expect(getDateSwimlanePeriod(Date.now() - 30 * 24 * 60 * 60 * 1000)).toEqual('last-month');
  });

  it('should return next month for next month date', () => {
    expect(getDateSwimlanePeriod(Date.now() + 30 * 24 * 60 * 60 * 1000)).toEqual('next-month');
  });

  it('should return month ago for month ago date', () => {
    expect(getDateSwimlanePeriod(Date.now() - 31 * 24 * 60 * 60 * 1000)).toEqual('month-ago');
  });

  it('should return month later for month later date', () => {
    expect(getDateSwimlanePeriod(Date.now() + 31 * 24 * 60 * 60 * 1000)).toEqual('month-later');
  });

  it('should return month ago for last year date', () => {
    expect(getDateSwimlanePeriod(Date.now() - 365 * 24 * 60 * 60 * 1000)).toEqual('month-ago');
  });

  it('should return month later for next year date', () => {
    expect(getDateSwimlanePeriod(Date.now() + 365 * 24 * 60 * 60 * 1000)).toEqual('month-later');
  });
});

describe('getSwimlanePeriodLabel', () => {
  const today = new Date();

  it('should return today for today date', () => {
    expect(getSwimlanePeriodLabel('today', '')).toEqual(' today');
    expect(getSwimlanePeriodLabel('today', 'field')).toEqual('field today');
  });

  it('should return yesterday for yesterday date', () => {
    expect(getSwimlanePeriodLabel('yesterday', '')).toEqual(' yesterday');
    expect(getSwimlanePeriodLabel('yesterday', 'field')).toEqual('field yesterday');
  });

  it('should return tomorrow for tomorrow date', () => {
    expect(getSwimlanePeriodLabel('tomorrow', '')).toEqual(' tomorrow');
    expect(getSwimlanePeriodLabel('tomorrow', 'field')).toEqual('field tomorrow');
  });

  it('should return period for 5 days for last week period', () => {
    const sevenDaysAgo = today - 7 * 24 * 60 * 60 * 1000;
    const twoDaysAgo = today - 2 * 24 * 60 * 60 * 1000;
    expect(getSwimlanePeriodLabel('last-week', ''))
      .toEqual(` between ${formatDate(sevenDaysAgo, 'd MMM yyyy')} and ${formatDate(twoDaysAgo, 'd MMM yyyy')}`);
    expect(getSwimlanePeriodLabel('last-week', 'field'))
      .toEqual(`field between ${formatDate(sevenDaysAgo, 'd MMM yyyy')} and ${formatDate(twoDaysAgo, 'd MMM yyyy')}`);
  });

  it('should return period for 5 days for next week period', () => {
    const twoDaysLater = today.getTime() + (2 * 24 * 60 * 60 * 1000);
    const sevenDaysLater = today.getTime() + (7 * 24 * 60 * 60 * 1000);
    expect(getSwimlanePeriodLabel('next-week', ''))
      .toEqual(` between ${formatDate(twoDaysLater, 'd MMM yyyy')} and ${formatDate(sevenDaysLater, 'd MMM yyyy')}`);
    expect(getSwimlanePeriodLabel('next-week', 'field'))
      .toEqual(`field between ${formatDate(twoDaysLater, 'd MMM yyyy')} and ${formatDate(sevenDaysLater, 'd MMM yyyy')}`);
  });

  it('should return period for 22 days for last month period', () => {
    const thirtyDaysAgo = today - 30 * 24 * 60 * 60 * 1000;
    const eightDaysAgo = today - 8 * 24 * 60 * 60 * 1000;
    expect(getSwimlanePeriodLabel('last-month', ''))
      .toEqual(` between ${formatDate(thirtyDaysAgo, 'd MMM yyyy')} and ${formatDate(eightDaysAgo, 'd MMM yyyy')}`);
    expect(getSwimlanePeriodLabel('last-month', 'field'))
      .toEqual(`field between ${formatDate(thirtyDaysAgo, 'd MMM yyyy')} and ${formatDate(eightDaysAgo, 'd MMM yyyy')}`);
  });

  it('should return period for 22 days for next month period', () => {
    const eightDaysLater = today.getTime() + (8 * 24 * 60 * 60 * 1000);
    const thirtyDaysLater = today.getTime() + (30 * 24 * 60 * 60 * 1000);
    expect(getSwimlanePeriodLabel('next-month', ''))
      .toEqual(` between ${formatDate(eightDaysLater, 'd MMM yyyy')} and ${formatDate(thirtyDaysLater, 'd MMM yyyy')}`);
    expect(getSwimlanePeriodLabel('next-month', 'field'))
      .toEqual(`field between ${formatDate(eightDaysLater, 'd MMM yyyy')} and ${formatDate(thirtyDaysLater, 'd MMM yyyy')}`);
  });

  it('should return period for more than 30 days for month ago period', () => {
    const thirtyOneDaysAgo = today - 31 * 24 * 60 * 60 * 1000;
    expect(getSwimlanePeriodLabel('month-ago', ''))
      .toEqual(` between ${formatDate(thirtyOneDaysAgo, 'd MMM yyyy')} and earlier`);
    expect(getSwimlanePeriodLabel('month-ago', 'field'))
      .toEqual(`field between ${formatDate(thirtyOneDaysAgo, 'd MMM yyyy')} and earlier`);
  });

  it('should return period for more than 30 days for month later period', () => {
    const thirtyOneDaysLater = today.getTime() + (31 * 24 * 60 * 60 * 1000);
    expect(getSwimlanePeriodLabel('month-later', ''))
      .toEqual(` between ${formatDate(thirtyOneDaysLater, 'd MMM yyyy')} and later`);
    expect(getSwimlanePeriodLabel('month-later', 'field'))
      .toEqual(`field between ${formatDate(thirtyOneDaysLater, 'd MMM yyyy')} and later`);
  });

  it('should return return just field if period incorrect or undefined', () => {
    expect(getSwimlanePeriodLabel('incorrect', 'field')).toEqual('field');
    expect(getSwimlanePeriodLabel(undefined, 'field')).toEqual('field');
    expect(getSwimlanePeriodLabel(null, 'field')).toEqual('field');
    expect(getSwimlanePeriodLabel('', 'field')).toEqual('field');
  });
});

describe('getPredefinedDateValue', () => {
  it('should return required fieldName from issue', () => {
    expect(getPredefinedDateValue({ fields: { field: 'value' }, created: 123 }, 'created')).toEqual(123);
  });

  it('should return resolved field value for resolved date name', () => {
    expect(getPredefinedDateValue({ fields: { field: 'value' }, resolved: 654 }, 'resolved date')).toEqual(654);
  });

  it('should return undefined if field name is not presented in issue', () => {
    expect(getPredefinedDateValue({ fields: { field: 'value' }, created: 654 }, 'updated')).toEqual(undefined);
  });
});

describe('getDatasetByDatePeriodType', () => {
  const pastPeriods = [
    { id: 'month-ago', key: 'month-ago', label: 'a month ago'},
    { id: 'last-month', key: 'last-month', label: 'a last month'},
    { id: 'last-week', key: 'last-week', label: 'a last week'},
    { id: 'yesterday', key: 'yesterday', label: 'yesterday'},
    { id: 'today', key: 'today', label: 'today'},
  ]

  const futurePeriods = [
    { id: 'tomorrow', key: 'tomorrow', label: 'tomorrow'},
    { id: 'next-week', key: 'next-week', label: 'a next week'},
    { id: 'next-month', key: 'next-month', label: 'a next month'},
    { id: 'month-later', key: 'month-later', label: 'a month later'},
  ]

  it('should return list of values for past period if dateType is Past', () => {
    expect(getDatasetByDatePeriodType(DatePeriodType.Past)).toEqual(pastPeriods);
  });

  it('should return list of values for future period if dateType is Future', () => {
    expect(getDatasetByDatePeriodType(DatePeriodType.Future)).toEqual(futurePeriods);
  });

  it('should return list of values for past and future period if dateType is Any', () => {
    expect(getDatasetByDatePeriodType(DatePeriodType.Both)).toEqual([...pastPeriods, ...futurePeriods]);
  });

  it('should return list of values for past period if dateType is undefined or unknown period', () => {
    expect(getDatasetByDatePeriodType(undefined)).toEqual(pastPeriods);
    expect(getDatasetByDatePeriodType('new-one')).toEqual(pastPeriods);
  });
});