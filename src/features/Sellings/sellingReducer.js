import { FETCH_SELLINGS } from './sellingConstants'
import { createReducer } from '../../app/common/util/createReducer'

const initState = {
  sellings: []
}

const fetchSellings = (state = initState, payload) => {
  return {
    ...state,
    sellings: payload.sellings
  }
}

export default createReducer(initState, {
  [FETCH_SELLINGS]: fetchSellings
})