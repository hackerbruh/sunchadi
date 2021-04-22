import cuid from "cuid";

import { SERACH_WORKERS, FETCH_WORKERS } from "./workerConstants";
import {
  asyncActionStart,
  asyncActionEnd,
  asyncActionError
} from "../Async/asyncActions";

import firestore, { firebase } from "../../app/config/firebaseConfig";

export const searchWorkerAction = newWorkers => ({
  type: SERACH_WORKERS,
  payload: {
    newWorkers
  }
});

export const fetchWorkersAction = workers => ({
  type: FETCH_WORKERS,
  payload: {
    workers
  }
});

export const fetchWorkers = () => {
  return dispatch => {
    dispatch(asyncActionStart());
    firestore.collection("workers").onSnapshot(
      c => {
        let workers = [];
        c.forEach(worker => {
          workers = [
            ...workers,
            {
              id: worker.id,
              ...worker.data()
            }
          ];
        });
        dispatch(fetchWorkersAction(workers));
        dispatch(asyncActionEnd());
      },
      error => {
        dispatch(asyncActionError());
      }
    );
  };
};

export const searchWorker = term => {
  return (dispatch, getState) => {
    const {
      workers: { workers }
    } = getState();
    const newWorkers = workers.filter(worker =>
      worker.name.toLowerCase().includes(term.toLowerCase())
    );
    dispatch(searchWorkerAction(newWorkers));
  };
};

export const addWorker = (image, workerInfo, history) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      if (image) {
        const storage = firebase.storage().ref(cuid());
        const snapshot = await storage.put(image);
        const url = await snapshot.ref.getDownloadURL();
        workerInfo.photoURI = url;
      }
      await firestore.collection("workers").add({
        ...workerInfo,
        history: []
      });
      history.push("/workers");
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const deleteWorker = (id, history) => {
  return async dispatch => {
    dispatch(asyncActionStart());
    try {
      await firestore
        .collection("workers")
        .doc(id)
        .delete();
      history.push("/workers");
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const updateWorker = (worker, history) => {
  return async dispatch => {
    console.log(worker)
    dispatch(asyncActionStart());
    try {
      await firestore
        .collection("workers")
        .doc(worker.id)
        .update(worker);
      history.push("/workers");
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionEnd());
    }
  };
};
