import { Effect } from 'redux-saga'
import { spawn } from 'redux-saga/effects'

import { authSaga } from './modules/auth'

export default function * mainSaga (): IterableIterator<Effect> {
  yield spawn(authSaga)
}
