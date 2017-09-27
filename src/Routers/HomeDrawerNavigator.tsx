import * as React from 'react'
import { DrawerNavigator } from 'react-navigation'
import Drawer from '../components/Drawer'
import Home from '../routes/Home'
import SecondPage from '../routes/SecondPage'

const DrawNav = DrawerNavigator(
  {
    Home: { screen: Home },
    SecondPage: { screen: SecondPage }
  },
  {
    contentComponent: props => <Drawer {...props} />,
    drawerWidth: 200,
    drawerPosition: 'left'
  }
)

export default DrawNav
