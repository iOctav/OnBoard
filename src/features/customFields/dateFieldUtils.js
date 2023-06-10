import { DatePeriodType } from './date-period-type';
import {
  addDays,
  differenceInCalendarDays,
  subDays
} from 'date-fns';
import formatDate from 'date-fns/format';

export const DateSwimlanePastPeriods = [
  { id: 'month-ago', key: 'month-ago', label: 'a month ago'},
  { id: 'last-month', key: 'last-month', label: 'a last month'},
  { id: 'last-week', key: 'last-week', label: 'a last week'},
  { id: 'yesterday', key: 'yesterday', label: 'yesterday'},
  { id: 'today', key: 'today', label: 'today'},
]

export const DateSwimlaneFuturePeriods = [
  { id: 'tomorrow', key: 'tomorrow', label: 'tomorrow'},
  { id: 'next-week', key: 'next-week', label: 'a next week'},
  { id: 'next-month', key: 'next-month', label: 'a next month'},
  { id: 'month-later', key: 'month-later', label: 'a month later'},
]

export const DateSwimlanePeriods = [
  ...DateSwimlanePastPeriods,
  ...DateSwimlaneFuturePeriods
]

export const DateTypes = [
  'date', 'date and time'
]

export const DateFields = [
  'updated', 'created', 'resolved date'
]

export const getDateFieldType = (fieldTypeId, id) => {
  if (DateTypes.includes(fieldTypeId)) {
    return DatePeriodType.Both;
  }
  return DateFields.includes(id) ? DatePeriodType.Past : undefined;
}

export const getDateSwimlanePeriod = (date) => {
  if (date === undefined || date == null) return;

  const formatDate = new Date(date);
  const isDateBefore = formatDate < new Date();
  const differenceInDays = isDateBefore
    ? differenceInCalendarDays(new Date(), formatDate)
    : differenceInCalendarDays(formatDate, new Date());
  if (differenceInDays === 0) {
    return 'today';
  }
  if (differenceInDays === 1) {
    return isDateBefore ? 'yesterday' : 'tomorrow';
  }
  if (differenceInDays <= 7) {
    return isDateBefore ? 'last-week' : 'next-week';
  }
  if (differenceInDays <= 30) {
    return isDateBefore ? 'last-month' : 'next-month';
  }
  return isDateBefore ? 'month-ago' : 'month-later';
}

export const getSwimlanePeriodLabel = (period, fieldPresentation, t, locale) => {
  const today = new Date();
  switch (period) {
    case 'today': return fieldPresentation + ' ' + t('today');
    case 'yesterday': return fieldPresentation + ' ' + t('yesterday');
    case 'tomorrow': return fieldPresentation + ' ' + t('tomorrow');
    case 'last-week': return fieldPresentation + ' ' + t('between period',
      {
        fromDate: formatDate(subDays(today, 7), 'd MMM yyyy',{locale: locale}),
        toDate: formatDate(subDays(today, 2), 'd MMM yyyy',{locale: locale}),
      });
    case 'next-week': return fieldPresentation + ' ' + t('between period',
      {
        fromDate: formatDate(addDays(today, 2), 'd MMM yyyy',{locale: locale}),
        toDate: formatDate(addDays(today, 7), 'd MMM yyyy',{locale: locale}),
      });
    case 'last-month': return fieldPresentation + ' ' + t('between period',
      {
        fromDate: formatDate(subDays(today, 30), 'd MMM yyyy',{locale: locale}),
        toDate: formatDate(subDays(today, 8), 'd MMM yyyy',{locale: locale}),
      });
    case 'next-month': return fieldPresentation + ' ' + t('between period',
      {
        fromDate: formatDate(addDays(today, 8), 'd MMM yyyy',{locale: locale}),
        toDate: formatDate(addDays(today, 30), 'd MMM yyyy',{locale: locale}),
      });
    case 'month-ago': return fieldPresentation + ' ' + t('between from and earlier',
      {
        fromDate: formatDate(subDays(today, 31), 'd MMM yyyy',{locale: locale}),
      });
    case 'month-later': return fieldPresentation + ' ' + t('between from and later',
      {
        fromDate: formatDate(addDays(today, 31), 'd MMM yyyy',{locale: locale}),
      });
    default: return fieldPresentation;
  }
}

export const getPredefinedDateValue = (issue, fieldName) => {
  // hardcode
  let fieldNameLower = fieldName?.toLowerCase();
  if (fieldNameLower === 'resolved date') {
    fieldNameLower = 'resolved';
  }
  const fieldKey = Object.keys(issue).find(key => key.toLowerCase() === fieldNameLower);
  return fieldKey && issue[fieldKey];
}

export const getDatasetByDatePeriodType = (dateType) => {
  switch (dateType) {
    case DatePeriodType.Both: return DateSwimlanePeriods;
    case DatePeriodType.Past: return DateSwimlanePastPeriods;
    case DatePeriodType.Future: return DateSwimlaneFuturePeriods;
    default: return DateSwimlanePastPeriods;
  }
}
