const config = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_APP_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID
    }
  },
  API: {
    REST: {
      notes: {
        endpoint: import.meta.env.VITE_URL,
        region: import.meta.env.VITE_REGION
      }
    }
  },
  Storage: {
    S3: {
      // this bucket is not used
      bucket: import.meta.env.VITE_BUCKET,
      region: import.meta.env.VITE_REGION
    }
  }
  // social: {
  //   GG: '368733083641-ae2t86a7fnhhefljijhj0b93u9j1fb9m.apps.googleusercontent.com'
  // }
}

export default config
