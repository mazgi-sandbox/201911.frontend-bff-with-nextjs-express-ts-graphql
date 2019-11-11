// https://github.com/apollographql/graphql-tag/blob/50a850e484a60d95ddb99801c39785031e55b7a2/index.d.ts#L1
// https://github.com/apollographql/graphql-tag/issues/206#issuecomment-489168909
export interface Query {
  loc: {
    source: {
      body: string
    }
  }
}
