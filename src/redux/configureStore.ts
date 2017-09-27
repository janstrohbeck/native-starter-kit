import { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { routinePromiseWatcherSaga } from 'redux-saga-routines'
import { composeWithDevTools } from 'remote-redux-devtools'
import { default as reducer, IRootState } from './reducers'
import mainSaga from './sagas'

export default function configureStore (onCompletion: () => void): any {
  const composeEnhancers = composeWithDevTools({
    realtime: true
  })
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
    autoRehydrate()
  )

  const store = createStore<IRootState>(reducer, enhancer)
  persistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: ['rehydration', 'nav', 'form', 'list']
    },
    onCompletion
  )

  sagaMiddleware.run(routinePromiseWatcherSaga)
  sagaMiddleware.run(mainSaga)

  return store
}
