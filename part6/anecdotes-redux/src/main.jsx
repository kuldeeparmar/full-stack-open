import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import anecdotesReducer from './reducers/anectodesReducer.js'
import filterReducer from './reducers/filterReducer.js'

const reducer = combineReducers({
  anecdotes : anecdotesReducer,
  filter : filterReducer
})

const store = createStore(reducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App />
  </Provider>
)
