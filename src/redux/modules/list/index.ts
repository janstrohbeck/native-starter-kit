import { ActionCreator } from 'react-redux-typescript'
import RootAction from '../../actions'

export const ActionCreators = {
  setIndex: new ActionCreator<'SET_INDEX', number>('SET_INDEX')
}

export type Action = typeof ActionCreators[keyof typeof ActionCreators]

const initialState: IListState = {
  list: [
    'React Native Starter Kit',
    'React Navigation',
    'NativeBase Easy Grid',
    'NativeBase',
    'CodePush',
    'Redux'
  ],
  selectedIndex: undefined
}

export interface IListState {
  readonly list: string[]
  readonly selectedIndex?: number
}

export default function (
  state: IListState = initialState,
  action: RootAction
): IListState {
  switch (action.type) {
    case ActionCreators.setIndex.type:
      return {
        ...state,
        selectedIndex: action.payload
      }
    default:
      return state
  }
}
