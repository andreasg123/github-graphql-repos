import React from 'react';
import { render, wait } from '@testing-library/react';
import Repositories, {GET_VIEWER_REPOSITORIES} from '../Repositories';
import { MockedProvider } from '@apollo/client/testing';

const mocks = [{
    request: {
      query: GET_VIEWER_REPOSITORIES,
      variables: {}
    },
    result: {
      "data":{
        "viewer":{
          "login":"andreasg123",
          "repositories":{
            "nodes":[
              {
                "name":"stock-gain-tax-import",
                "refs":{
                  "nodes":[
                    {
                      "name":"main",
                      "target":{
                        "author":{
                          "user":{
                            "login":"andreasg123",
                            "__typename":"User"
                          },
                          "__typename":"GitActor"
                        },
                        "authoredDate":"2020-07-13T04:04:26Z",
                        "__typename":"Commit"
                      },
                      "__typename":"Ref"
                    }
                  ],
                  "__typename":"RefConnection"
                },
                "__typename":"Repository"
              },
              {
                "name":"portfolio-tracker",
                "refs":{
                  "nodes":[
                    {
                      "name":"main",
                      "target":{
                        "author":{
                          "user":{
                            "login":"andreasg123",
                            "__typename":"User"
                          },
                          "__typename":"GitActor"
                        },
                        "authoredDate":"2020-07-29T03:40:33Z",
                        "__typename":"Commit"
                      },
                      "__typename":"Ref"
                    }
                  ],
                  "__typename":"RefConnection"
                },
                "__typename":"Repository"
              }
            ],
            "__typename":"RepositoryConnection"
          },
          "__typename":"User"
        }
      }
    }
  }
];



test('should render repository data', async () => {
  const { getByText } = render(
    <MockedProvider addTypename={false} mocks={mocks}>
      <div className="App">
        <Repositories/>
      </div>
    </MockedProvider>);
  const loading = getByText(/Loading.../i);
  expect(loading).toBeInTheDocument();
  await wait(() => {
    const authoredDate = getByText(/2020-07-29T03:40:33Z/i);
    expect(authoredDate).toBeInTheDocument();
  });
});
