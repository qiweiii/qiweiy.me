import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// vite config docs: https://vitejs.dev/config/#root
export default defineConfig({
  build: {
    // Relative to the root
    outDir: './build'
  },
  plugins: [
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}'
    })
  ],
  publicDir: './public',
  resolve: {
    alias: {
      // fix aws-amplify node problem:
      // https://github.com/aws-amplify/amplify-js/issues/9639#issuecomment-1049158526
      // or
      // https://github.com/aws-amplify/amplify-js/issues/9639#issuecomment-1079965178
      './runtimeConfig': './runtimeConfig.browser',
      src: path.resolve(__dirname, './src')
    }
  }
})
