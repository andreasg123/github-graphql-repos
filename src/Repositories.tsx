import React from 'react';
import {useQuery, gql} from '@apollo/client';
import './Repositories.css';

export const GET_VIEWER_REPOSITORIES = gql`
  query GetViewerRepositories {
    viewer {
      login
      repositories(affiliations: [OWNER], last: 20) {
        nodes {
          name
          refs(refPrefix: "refs/heads/", last: 30) {
            nodes {
              name,
              target {
                ... on Commit {
                  author {
                    user {
                      login
                    }
                  }
                  authoredDate
                }
              }
            }
          }
        }
      }
    }
  }
`;

type RefNode = {
  name: string,
  target: {
    author: {
      user: {
        login: string
      }
    },
    authoredDate: string
  }
};
type RepoNode = {
  name: string,
  refs: {
    nodes: [RefNode]
  }
};
type FlatRepoNode = {
  name: string;
  owner?: string;
  refs: [RefNode]
}

function Branch(branch: RefNode): JSX.Element {
  return (
    <div className="Repositories-Branch">
      {branch.name}: {branch.target.author.user.login}, {branch.target.authoredDate}
    </div>
  );
}

function Repository(repo: FlatRepoNode): JSX.Element {
  const href = `https://github.com/${repo.owner}/${repo.name}`;
  const children = [
    <div key="repo-name">
      <a className="Repositories-Name" href={href}>{repo.name}</a>
    </div>,
    ...repo.refs.map(r => <Branch name={r.name} key={r.name} target={r.target}/>)
  ];
  return <div className="Repositories-Repository" children={children}/>;
}

function Repositories(): JSX.Element {
  const {data, loading, error} = useQuery(GET_VIEWER_REPOSITORIES);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error {JSON.stringify(error)}</p>;
  }
  const {viewer: {login, repositories: {nodes}}}: {viewer: {login: string, repositories: {nodes: [RepoNode]}}} = data;
  console.log('nodes', JSON.stringify(nodes));
  const repositories = nodes
    .map(n => ({
      ...n,
      owner: login,
      refs: n.refs.nodes.sort((a, b) => b.target.authoredDate.localeCompare(a.target.authoredDate))
    }) as FlatRepoNode)
    .sort((a, b) => b.refs[0].target.authoredDate.localeCompare(a.refs[0].target.authoredDate));
  const children = repositories.map(r => <Repository name={r.name} key={r.name} owner={r.owner} refs={r.refs}/>);
  return <div className="Repositories" children={children}/>;
}

export default Repositories;
