import deepFreeze from "deep-freeze";
import counterReducer from "./counterReducer";

describe('unicafe-redux',() => {

  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('retured the initial state if undefined',() => {
    const state = {}
    const action = {
      type : 'DO_NOTHING'
    }

    const newState = counterReducer(undefined,action)

    expect(newState).toEqual(initialState)
  })

  test('good is incremented',() => {
    const state = initialState
    const action = {
      type : 'GOOD'
    }

    deepFreeze(state)

    const newState = counterReducer(state,action)
    expect(newState).toEqual({
      good:1,
      bad:0,
      ok:0
    })
  })
})