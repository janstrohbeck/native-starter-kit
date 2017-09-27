import { NavigationState } from 'react-navigation'
import { combineReducers } from 'redux'
import { FormState, reducer as formReducer } from 'redux-form'
import { default as auth, IAuthState } from './modules/auth'
import { default as list, IListState } from './modules/list'
import nav from './modules/nav'
import {
  default as rehydration,
  IRehydrationState
} from './modules/rehydration'

export interface IRootState {
  readonly form: FormState
  readonly list: IListState
  readonly auth: IAuthState
  readonly nav: NavigationState
  readonly rehydration: IRehydrationState
}

const Reducers = combineReducers<IRootState>({
  form: formReducer,
  list,
  auth,
  nav,
  rehydration
})

export default Reducers
