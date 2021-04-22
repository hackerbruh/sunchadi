import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  ASYNC_ACTION_ERROR
} from "./asyncConstants";

export const asyncActionStart = () => ({
  type: ASYNC_ACTION_START
});

export const asyncActionEnd = () => ({
  type: ASYNC_ACTION_END
});

export const asyncActionError = () => ({
  type: ASYNC_ACTION_ERROR
});
