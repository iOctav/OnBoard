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
  newIssue: '/newIssue',
};

export const homePageUri = () => '/';
export const createAgileBoardPageUri = () => `${YT_PAGES.agiles}/create`;
export const myProfilePageUri = () => `${YT_PAGES.users}/me`;
export const profilePageUri = (login) => `${YT_PAGES.users}/${login}`;
export const currentAgileBoardUri = (agileId) => `/${agileId}/current`;
export const agileBoardUri = (agileId, sprintId) => `/${agileId}/${sprintId}`;
export const issueDetails = (id, summary) => `${YT_PAGES.issue}/${id}/${summary}`;
export const issuesQueryUri = (query) => `${YT_PAGES.issues}?q=${query}`;
export const newIssueUri = (project) => `${YT_PAGES.newIssue}?project=${project ?? ''}`;
