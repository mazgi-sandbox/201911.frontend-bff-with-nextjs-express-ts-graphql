import { GrapQLResponseError } from './GrapQLResponseError'
import { Query } from './Query'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { gqlToString } from './gqlToString'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.IS_DEVELOPMENT

async function fetchGraphQLData(
  graphqlQuery: string | Query,
  key: string
): Promise<{}> {
  const endpoint = publicRuntimeConfig.ENDPOINT_URL_BFF_GRAPHQL
  isDev && console.log(`endpoint: `, endpoint)
  const query = gqlToString(graphqlQuery)
  const fetchOpts: RequestInit = {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ query })
  }
  const parsedResponse = fetch(endpoint, fetchOpts)
    .then(response => {
      console.log(`response: `, response)
      return response.json()
    })
    .then(body => {
      const errors = body.errors
      if (errors) {
        console.log(`errors: `, errors)
        throw new GrapQLResponseError(
          `Found ${errors.length} error(s) in the GraphQL response.`,
          query,
          errors
        )
      }
      console.log(`body: `, body)
      return body.data
    })
    .then(data => {
      const result = data[key]
      if (!result) {
        console.log(`data: `, data)
        throw new GrapQLResponseError(
          `Key ${key} is not found in the response data.`,
          query,
          []
        )
      }
      return result
    })

  return parsedResponse
}

export default fetchGraphQLData
