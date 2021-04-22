import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  ASYNC_ACTION_ERROR
} from "./asyncConstants";
import { createReducer } from "../../app/common/util/createReducer";

const initState = {
  loading: false,
  error: false
};

const asyncActionStart = (state = initState) => ({
  ...state,
  loading: true
});

const asyncActionEnd = (state = initState) => ({
  ...state,
  loading: false
});

const asyncActionError = (state = initState) => ({
  ...state,
  loading: false,
  error: false
});

export default createReducer(initState, {
  [ASYNC_ACTION_START]: asyncActionStart,
  [ASYNC_ACTION_END]: asyncActionEnd,
  [ASYNC_ACTION_ERROR]: asyncActionError
});
