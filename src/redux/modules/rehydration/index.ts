import { REHYDRATE } from 'redux-persist/constants'
import RootAction from '../../actions'

export interface IRehydrationState {
  readonly rehydrating: boolean
}

export default function (
  state: IRehydrationState = { rehydrating: true },
  action: RootAction
): IRehydrationState {
  switch (action.type) {
    case REHYDRATE:
      return {
        rehydrating: false
      }
    default:
      return state
  }
}
