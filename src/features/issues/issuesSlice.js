import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    issues: [
        { idReadable: "DEMO-20", summary: "Parent Task", state: 'Open', cardFields: [ { value: "Normal" }, { value: "Bug" }, { value: "Project management" } ] },
        { idReadable: "DEMO-21", summary: "Child task", state: 'InProgress', cardFields: [ { value: "Critical" }, { value: "Bug" }, { value: "No Subsystem" } ] },
        { idReadable: "DEMO-22", summary: "Grandparent task", state: 'Open', cardFields: [ { value: "Normal" }, { value: "Bug" }, { value: "Project management" } ] }
    ],
};

const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        addIssue: (state, action) => {
            state.issues.push(action.payload);
        },
        updateIssue: (state, action) => {
            const issue = state.issues.find(issue => issue.idReadable === action.payload.idReadable);
            if (issue) {
                issue.state = action.payload.state;
            }
        },
        deleteIssue: (state, action) => {
            const index = state.issues.findIndex(issue => issue.idReadable === action.payload.idReadable);
            if (index !== -1) {
                state.issues.splice(index, 1);
            }
        }
    },
});

export default issuesSlice.reducer;

export const selectAllIssues = (state) => state.issues.issues;
