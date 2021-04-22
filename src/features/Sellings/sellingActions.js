import { FETCH_SELLINGS } from "./sellingConstants";
import {
  asyncActionStart,
  asyncActionEnd,
  asyncActionError
} from "../Async/asyncActions";

import firestore from "../../app/config/firebaseConfig";

const fetchSellingsAction = sellings => {
  return { type: FETCH_SELLINGS, payload: { sellings } };
};

export const fetchSellings = () => {
  return async dispatch => {
    dispatch(asyncActionStart());
    firestore.collection("sellings").onSnapshot(
      s => {
        let sellings = [];
        s.forEach(selling => {
          sellings = [
            ...sellings,
            {
              id: selling.id,
              ...selling.data()
            }
          ];
        });
        dispatch(fetchSellingsAction(sellings));
        dispatch(asyncActionEnd());
      },
      error => {
        dispatch(asyncActionError());
      }
    );
  };
};

export const addSelling = (sellingInfo, history) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await firestore.collection("sellings").add(sellingInfo);
      history.push("/sellings");
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};

export const updateSelling = (sellingInfo, history) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await firestore
        .collection("sellings")
        .doc(sellingInfo.id)
        .update(sellingInfo);
      history.push("/sellings");
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};

export const deleteSelling = (id, history) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await firestore
        .collection("sellings")
        .doc(id)
        .delete();
      history.push("/sellings");
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};
