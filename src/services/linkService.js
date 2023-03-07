import { trimLastSlash } from '../utils/uriUtils';

const baseServiceUrl = trimLastSlash(process.env.REACT_APP_YOUTRACK_BASE_URL);

export const homePageUri = () => baseServiceUrl;
export const issuesPageUri = () => baseServiceUrl + '/issues';
export const dashboardsPageUri = () => baseServiceUrl + '/dashboard';
export const agilesPageUri = () => baseServiceUrl + '/agiles';
export const reportsPageUri = () => baseServiceUrl + '/reports';
export const projectsPageUri = () => baseServiceUrl + '/projects';
export const knowledgeBasePageUri = () => baseServiceUrl + '/articles';
export const timesheetsPageUri = () => baseServiceUrl + '/timesheets';
export const ganttChartsPageUri = () => baseServiceUrl + '/gantt-charts';
export const createAgileBoardPageUri = () => baseServiceUrl + '/agiles/create';
export const profilePageUri = () => baseServiceUrl + '/users/me';
