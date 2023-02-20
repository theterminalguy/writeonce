# WriteOnce-App

This is the main codebase for the WriteOnce web application built with React and Stimulus.
WriteOnce is a document-templating application that allows you to create templates from letters, invoices, emails, contracts and other written documents and populate the created template with different values and 'pipe' or send them through various means, e.g SMS, GMail emails, Slack messages, and other similar methods.

## Technologies Used

1. [Create React App](https://github.com/facebook/create-react-app)
2. [Redux Toolkit](https://redux-toolkit.js.org/)
3. [Stimulus](https://stimulus.hotwired.dev/)
4. [React Router Dom](https://reactrouter.com/)

## Creating Branches

Branch names should follow this convention - `{contributor-name}/wrt-xx-{issue-name}` as copied from Linear. Branches should always be created from the main branch after pulling recent commits from the origin.

## Making PRs

Go through the pull request template in the .github/ folder and follow it to the letter before creating a pull request.

## Available Scripts

In the root directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn add {package-name}`

This will install/add a new package 'package-name' to the project using yarn package manager.

### `yarn remove {package-name}`

This will uninstall/remove a new package 'package-name' from the project using yarn package manager.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
