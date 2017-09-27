import { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux'
import RootAction from './actions'
import { IRootState } from './reducers'

export { default as RootAction } from './actions'
export { IRootState } from './reducers'

export type Store = ReduxStore<IRootState>
export type Dispatch = ReduxDispatch<RootAction>
export type getState = () => IRootState
