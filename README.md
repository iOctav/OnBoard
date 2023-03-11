# OnBoard 

The OnBoard project is a web application that allows users to create and manage their own boards. The boards are made up of cards that can be moved around and edited. The application is built using React and Redux.

## Installation

`.env` file is required to run the application. The file should contain the following:\
REACT_APP_YOUTRACK_BASE_URL=**base url of youtrack server**\
REACT_APP_AUTHORIZATION_ENDPOINT=**auth endpoint of youtrack server**\
REACT_APP_REDIRECT_URI=http://localhost:3000/oauth \
REACT_APP_YOUTRACK_CLIENT_ID=**client id of youtrack server**\
REACT_APP_YOUTRACK_SCOPES=**scope of youtrack server**\

## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.