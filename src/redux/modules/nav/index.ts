import { NavigationActions } from 'react-navigation'
import { AppNavigation } from '../../../Routers/MainStackRouter'
import RootAction from '../../actions'

const initialState = AppNavigation.router.getStateForAction(
  AppNavigation.router.getActionForPathAndParams('Login'),
  undefined
)

const NavReducer = (state = initialState, action: RootAction): any => {
  const nextState = AppNavigation.router.getStateForAction(action, state)
  const currentRoute = state.routes[state.index]
  if (action.type === 'Navigation/BACK') {
    if (currentRoute.routeName === 'Home') {
      const drawerRoute = currentRoute.routes[currentRoute.index]
      // if drawer is open on Home page, close the drawer on back press
      if (drawerRoute.routeName === 'DrawerOpen') {
        return NavReducer(
          state,
          NavigationActions.navigate({ routeName: 'DrawerClose' })
        )
      }
      // If we are on Home page, stay there, otherwise go back
      if (drawerRoute.routes[drawerRoute.index].routeName === 'Home') {
        return state
      }
    } else if (currentRoute.routeName === 'Login') {
      return state
    }
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export default NavReducer
