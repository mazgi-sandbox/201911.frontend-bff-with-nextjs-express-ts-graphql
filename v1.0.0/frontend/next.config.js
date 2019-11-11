/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants')
const path = require('path')

const publicRuntimeConfigForDevelopment = isDev => {
  if (!isDev) {
    return {}
  }
  const config = {
    //
  }
  return config
}

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = phase => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const nextConfig = {
    publicRuntimeConfig: {
      // Will be available on both server and client
      IS_DEVELOPMENT: isDev,
      ENDPOINT_URL_BFF_GRAPHQL: process.env.FRONTEND_ENDPOINT_URL_BFF_GRAPHQL,
      ...publicRuntimeConfigForDevelopment(isDev)
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
    },
    webpack: webpackConfig => {
      webpackConfig.resolve.alias['components'] = path.resolve(
        __dirname,
        'components'
      )
      webpackConfig.resolve.alias['lib'] = path.resolve(__dirname, 'lib')
      return webpackConfig
    }
  }
  if (isDev) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
    console.log(`nextConfig`, nextConfig)
  }

  // next.config.js object
  return nextConfig
}
