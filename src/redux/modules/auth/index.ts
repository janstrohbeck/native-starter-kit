import { NavigationActions } from 'react-navigation'
import { REHYDRATE } from 'redux-persist/constants'
import { delay, Effect } from 'redux-saga'
import { createRoutine } from 'redux-saga-routines'
import { call, put, race, select, take } from 'redux-saga/effects'
import RootAction from '../../actions'
import { IRootState } from '../../types'

export const loginRoutine = createRoutine(
  'LOGIN',
  (token: string | undefined) => ({ token })
)
export const logoutRoutine = createRoutine('LOGOUT')

const getLoggedIn = (state: IRootState) => state.auth.loggedIn

export function * authSaga (): IterableIterator<Effect> {
  yield take(REHYDRATE)
  const loggedIn: boolean = yield select(getLoggedIn)
  if (loggedIn) {
    yield put(NavigationActions.navigate({ routeName: 'Home' }))
  }

  while (true) {
    const { login } = yield race({
      login: take(loginRoutine.TRIGGER),
      logout: take(logoutRoutine.TRIGGER)
    })
    if (login) {
      // tslint:disable-next-line:no-unused-variable
      const action: { payload: { user: string; password: string } } = login

      yield put(logoutRoutine.request())
      try {
        // call api here
        // yield call(api.login, action.payload)
        yield call(delay, 2000)

        // response is simulated here
        yield put(loginRoutine.success('123456'))
        yield put(NavigationActions.navigate({ routeName: 'Home' }))
      } catch (e) {
        yield put(loginRoutine.failure(undefined))
      }
    } else {
      // yield call(api.logout)
      yield put(logoutRoutine.success())
      yield put(NavigationActions.navigate({ routeName: 'Login' }))
    }
  }
}

export interface IAuthState {
  readonly loggedIn: boolean
  readonly token?: string
}

export default function (
  state: IAuthState = { loggedIn: false },
  action: RootAction
): IAuthState {
  switch (action.type) {
    case loginRoutine.SUCCESS:
      return {
        loggedIn: true,
        token: (action as any).payload.token
      }
    case logoutRoutine.TRIGGER:
      return {
        loggedIn: false
      }
    default:
      return state
  }
}
