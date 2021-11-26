//configStore.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import mydc from './modules/mydc'
import thunk from 'redux-thunk'

// root 리듀서를 만들어줍니다.
// 나중에 리듀서를 여러개 만들게 되면 여기에 하나씩 추가해주는 거예요!
const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  // whitelist: ['state'],
  // blacklist -> 그것만 제외합니다
}

const middleWares = [thunk]
const rootReducer = combineReducers({ mydc })
const enhancer = applyMiddleware(...middleWares)
// 스토어를 만듭니다.
const store = createStore(rootReducer, enhancer)
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default store
// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
