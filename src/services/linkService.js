export const YT_PAGES = {
  issues: '/issues',
  issue: '/issue',
  dashboard: '/dashboard',
  agiles: '/agiles',
  reports: '/reports',
  projects: '/projects',
  knowledgeBase: '/articles',
  timesheets: '/timesheets',
  ganttCharts: '/gantt-charts',
  users: '/users',
};

export const homePageUri = () => '/';
export const createAgileBoardPageUri = () => `${YT_PAGES.agiles}/create`;
export const profilePageUri = () => `${YT_PAGES.users}/me`;
export const currentAgileBoardUri = (agileId) => `/${agileId}/current`;
export const agileBoardUri = (agileId, sprintId) => `/${agileId}/${sprintId}`;
export const issueDetails = (id, summary) => `${YT_PAGES.issue}/${id}/${summary}`;
