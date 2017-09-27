import * as React from 'react'
import { BackHandler } from 'react-native'
import {
  addNavigationHelpers,
  NavigationActions,
  NavigationState,
  StackNavigator
} from 'react-navigation'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Login from '../routes/Login'
import PopupPage from '../routes/PopupPage'
import HomeDrawerNavigator from './HomeDrawerNavigator'

export const AppNavigation = StackNavigator(
  {
    Login: { screen: Login },
    Home: { screen: HomeDrawerNavigator },
    PopupPage: { screen: PopupPage }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

interface IStateProps {
  nav: NavigationState
}

interface IDispatchProps {
  dispatch: Dispatch<any>
}

class ReduxNavigation extends React.Component<
  IStateProps & IDispatchProps,
  any
  > {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render () {
    const { dispatch, nav } = this.props
    const navigation = addNavigationHelpers({
      dispatch: dispatch as any,
      state: nav
    })

    return <AppNavigation navigation={navigation} />
  }
}

export default connect(state => ({
  nav: state.nav
}))(ReduxNavigation)
