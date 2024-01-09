import { del, get, post, put } from 'aws-amplify/api'
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

/**
 * Custom API calls for authed resources
 */
export const authedApi = async (
  method: 'get' | 'post' | 'put',
  {
    apiName,
    path,
    options
  }: {
    apiName: string
    path: string
    options?: { [key: string]: any }
  }
) => {
  const { session, identityId } = await getAuthenticatedUser()
  let send = null

  switch (method) {
    case 'get':
      send = get
      break
    case 'post':
      send = post
      break
    case 'put':
      send = put
      break
    default:
      throw new Error('Invalid method')
  }

  return send({
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

/**
 * Authed DELETE API call
 */
export const authedDel = async ({
  apiName,
  path,
  options
}: {
  apiName: string
  path: string
  options?: { [key: string]: any }
}) => {
  const { session, identityId } = await getAuthenticatedUser()

  return del({
    apiName,
    path,
    options: {
      headers: {
        Authorization: `Bearer ${session?.idToken?.toString()}`,
        identityId: identityId || '',
        ...options?.headers
      },
      queryParams: {
        ...options?.queryParams
      }
    }
  }).response
}

/**
 * Get current user's info.
 * See <https://docs.amplify.aws/javascript/build-a-backend/auth/auth-migration-guide/#authcurrentauthenticateduser-deprecated>
 */
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
