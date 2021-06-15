import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newst = counterReducer(undefined, action)
    expect(newst).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }

    deepFreeze(initialState)
    const newst = counterReducer(initialState, action)
    expect(newst).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }

    deepFreeze(initialState)
    const newst = counterReducer(initialState, action)
    expect(newst).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }

    deepFreeze(initialState)
    const newst = counterReducer(initialState, action)
    expect(newst).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('reset to zero', () => {
    const action = {
      type: 'ZERO'
    }

    deepFreeze(initialState)
    const newst = counterReducer(initialState, action)
    expect(newst).toEqual(initialState)
  })
})
