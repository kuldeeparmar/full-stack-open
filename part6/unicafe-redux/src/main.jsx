import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer.js'

const store = createStore(counterReducer)
const root = createRoot(document.getElementById('root'))

const App = () => {
  return (
    <div>
      <button onClick={(e) => store.dispatch({ type:'GOOD' })}>good</button> 
      <button onClick={(e) => store.dispatch({ type:'OK' })} >ok</button> 
      <button onClick={(e) => store.dispatch({ type:'BAD' })} >bad</button>
      <button onClick={(e) => store.dispatch({ type:'ZERO' })} >reset stats</button>

      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)


