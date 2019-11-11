import { Query } from './Query'

// https://github.com/apollographql/graphql-tag/blob/50a850e484a60d95ddb99801c39785031e55b7a2/index.d.ts#L1
// https://github.com/apollographql/graphql-tag/issues/206#issuecomment-489168909
export function gqlToString(graphqlQuery: string | Query): string {
  let query
  if (!graphqlQuery) {
    query = null
  } else if (typeof graphqlQuery === 'string') {
    query = graphqlQuery
  } else {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    query = <Query>(<unknown>graphqlQuery.loc.source.body)
  }
  return query
}
