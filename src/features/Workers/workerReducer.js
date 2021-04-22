import { SERACH_WORKERS, FETCH_WORKERS } from "./workerConstants";
import { createReducer } from "../../app/common/util/createReducer";

const initState = {
  workers: [],
  searchedWorkers: []
};

const fetchWorker = (state = initState, { workers }) => {
  return {
    ...state,
    workers
  };
};

const searchWorker = (state = initState, { newWorkers }) => ({
  ...state,
  searchedWorkers: newWorkers
});

export default createReducer(initState, {
  [FETCH_WORKERS]: fetchWorker,
  [SERACH_WORKERS]: searchWorker
});
