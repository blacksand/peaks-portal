import 'server-only'

// import { cache } from 'react'
//
// import { RestApiClient } from '@peaks/data-access'
//
// import { getAppConfig } from './get-app-config'
// import { getSession } from './get-session'
//
// async function makeRestClient() {
//   const { token } = await getSession()
//   const { endpoints: { api } } = await getAppConfig()
//   return new RestApiClient({
//     apiBase: api,
//     fetchParams: {
//       credentials: 'omit',
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     },
//   })
// }
//
// export const getRestClient = cache(makeRestClient)
