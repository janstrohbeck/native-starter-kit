import { NavigationAction } from 'react-navigation'
import { REHYDRATE } from 'redux-persist/constants'
import { Action as ListActions } from './modules/list'
import { IRootState } from './types'

type RootAction =
  | NavigationAction
  | ListActions
  | { type: typeof REHYDRATE; payload: IRootState; error: any }

export default RootAction
