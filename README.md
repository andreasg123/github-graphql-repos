GitHub GraphQL Repos
====================

This is a sample app that demonstrates the use of the GitHub GraphQL API with React, Typescript, and Apollo Client.  The initial plan was to show the data from `Insights / Traffic` in a repo.  Unfortunately, the current GraphQL API does not provide that data.  Instead, a simple page shows all repos owned by the viewer sorted by most recent commit with all branches for each repo.


Create React App
----------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Thus, the normal commands `npm start`, `npm test`, and `npm run build` are available.  Testing is facilitated by [`MockedProvider`](https://www.apollographql.com/docs/react/api/react/testing/).

While the React app was created as a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), that code was removed for simplification.


Access to the GitHub GraphQL API
--------------------------------

The [GitHub GraphQL API](https://docs.github.com/en/graphql) provides access to information about repositories.  A [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) is required for access.  In this app, the token is expected in the environment variable `REACT_APP_GITHUB_TOKEN`.  This token can be stored in `.env.local` that is ignored by Git.  The file (`.env.local.example`)[./.env.local.example] shows how the token should be stored.
