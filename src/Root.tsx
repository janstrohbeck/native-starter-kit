import * as React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import { StyleProvider } from 'native-base'
import App from './App'
import configureStore from './redux/configureStore'
const getTheme = require('../native-base-theme/components').default
const platform = require('../native-base-theme/variables/platform').default

interface IState {
  isLoading: boolean
  store: Store<any>
}

class Root extends React.Component<any, IState> {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false }))
    }
  }

  render () {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Provider store={this.state.store}>
          <App />
        </Provider>
      </StyleProvider>
    )
  }
}

export default Root
