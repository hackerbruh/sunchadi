import { FETCH_ORDERS } from "./orderConstants";

import firestore from "../../app/config/firebaseConfig";
import {
  asyncActionStart,
  asyncActionEnd,
  asyncActionError
} from "../Async/asyncActions";

const fetchOrdersAction = orders => {
  return {
    type: FETCH_ORDERS,
    payload: {
      orders
    }
  };
};

export const fetchOrders = () => {
  return async dispatch => {
    dispatch(asyncActionStart());
    firestore.collection("orders").onSnapshot(
      o => {
        let orders = [];
        o.forEach(order => {
          orders = [
            ...orders,
            {
              id: order.id,
              ...order.data()
            }
          ];
        });
        orders = [
          ...orders.filter(order => order.completed === false),
          ...orders.filter(order => order.completed === true)
        ];
        dispatch(fetchOrdersAction(orders));
        dispatch(asyncActionEnd());
      },
      error => {
        dispatch(asyncActionError());
      }
    );
  };
};

export const placeOrder = (orderInfo, history) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await firestore.collection("orders").add(orderInfo);
      history.push("/orders");
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};

export const updateOrder = (orderInfo, history) => {
  return async (dispatch, getState) => {
    console.log('reaching!')
    try {
      dispatch(asyncActionStart());
      const workers = getState().workers.workers
      const worker = workers.find(w => w.id === orderInfo.workerId)
      const history = worker.history || []
      if (!history.includes(orderInfo.id)) {
        worker.history.push(orderInfo.id)
      }
      
      await firestore.collection('workers').doc(orderInfo.workerId).update(worker)
      await firestore
        .collection("workers")
        .doc(orderInfo.workerId)
        .update({ total: worker.total + orderInfo.wages });
      await firestore
        .collection("orders")
        .doc(orderInfo.id)
        .update(orderInfo);
      console.log('reaching!')
      history.push("/orders");
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log(error)
      dispatch(asyncActionError());
    }
  };
};

export const deleteOrder = (id, history) => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await firestore
        .collection("orders")
        .doc(id)
        .delete();
      history.push("/orders");
      dispatch(asyncActionEnd());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};
