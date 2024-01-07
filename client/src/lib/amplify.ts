import * as API from 'aws-amplify/api'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

export const authedApi = async (
  method: 'get' | 'post' | 'put' | 'del',
  {
    apiName,
    path,
    options
  }: {
    apiName: string
    path: string
    options: { [key: string]: any }
  }
) => {
  const { session, identityId } = await getAuthenticatedUser()

  return API[method]({
    apiName,
    path,
    options: {
      headers: {
        Authorization: `Bearer ${session?.idToken?.toString()}`,
        identityId: identityId || '',
        ...options?.headers
      },
      body: {
        ...options?.body
      },
      queryParams: {
        ...options?.queryParams
      }
    }
  }).response
}

// see <https://docs.amplify.aws/javascript/build-a-backend/auth/auth-migration-guide/#authcurrentauthenticateduser-deprecated>
export const getAuthenticatedUser = async () => {
  const { username } = await getCurrentUser()

  const { tokens: session, identityId } = await fetchAuthSession()

  // Note that session will no longer contain refreshToken and clockDrift
  return {
    username,
    session,
    identityId
  }
}
