import { SwimlaneType } from '../features/nestedSwimlanes/swimlane-type';

export const calculateSwimlaneType = (enabled, type) => {
  if (enabled) {
    if (type === 'AttributeBasedSwimlaneSettings') {
      return SwimlaneType.Values;
    }
    if (type === 'IssueBasedSwimlaneSettings') {
      return SwimlaneType.Issues;
    }
  }
  return SwimlaneType.None;
}