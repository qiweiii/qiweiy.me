import React from 'react'
import ReactDOM from 'react-dom'
// import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Amplify } from 'aws-amplify'
import config from './config'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/material-icons'
import './index.css'

// configure aws amplify, connect to client
Amplify.configure(config)

// set up redux store
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// for React 18 upgrade later on:
// const root = createRoot(document.getElementById('root'))

// root.render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>
// )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
