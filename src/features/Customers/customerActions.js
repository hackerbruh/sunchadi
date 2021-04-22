import cuid from "cuid";

import { SERACH_CUSTOMERS, FETCH_CUSTOMERS } from "./customerConstants";
import {
  asyncActionStart,
  asyncActionEnd,
  asyncActionError
} from "../Async/asyncActions";

import firestore, { firebase } from "../../app/config/firebaseConfig";

export const searchCustomerAction = newCustomers => ({
  type: SERACH_CUSTOMERS,
  payload: {
    newCustomers
  }
});

export const fetchCustomersAction = customers => ({
  type: FETCH_CUSTOMERS,
  payload: {
    customers
  }
});

export const fetchCustomers = () => {
  return dispatch => {
    dispatch(asyncActionStart());
    firestore.collection("customers").onSnapshot(
      c => {
        let customers = [];
        c.forEach(customer => {
          customers = [
            ...customers,
            {
              id: customer.id,
              ...customer.data()
            }
          ];
        });
        dispatch(fetchCustomersAction(customers));
        dispatch(asyncActionEnd());
      },
      error => {
        dispatch(asyncActionError());
      }
    );
  };
};

export const searchCustomer = term => {
  return (dispatch, getState) => {
    const {
      customers: { customers }
    } = getState();
    const newCustomers = customers.filter(customer =>
      customer.name.toLowerCase().includes(term.toLowerCase())
    );
    dispatch(searchCustomerAction(newCustomers));
  };
};

export const addCustomer = (image, customerInfo, history) => {
  return async dispatch => {
    dispatch(asyncActionStart())
    try {
      if (image) {
        const storage = firebase.storage().ref(cuid());
        const snapshot = await storage.put(image);
        const url = await snapshot.ref.getDownloadURL();
        customerInfo.photoURI = url;
      }
      await firestore.collection("customers").add({
        ...customerInfo,
        history: []
      });
      history.push("/customers");
      dispatch(asyncActionEnd());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const deleteCustomer = (id, history) => {
  return async dispatch => {
    dispatch(asyncActionStart())
    try {
      await firestore
        .collection("customers")
        .doc(id)
        .delete();
      history.push("/customers");
      dispatch(asyncActionEnd())
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const updateCustomer = (customer, history) => {
  return async dispatch => {
    dispatch(asyncActionStart())
    try {
      await firestore
        .collection("customers")
        .doc(customer.id)
        .update({
          name: customer.name,
          address: customer.address,
          phone: customer.phone,
          history: customer.history
        });
      history.push("/customers");
      dispatch(asyncActionEnd())
    } catch (error) {
      console.log(error);
      dispatch(asyncActionEnd());
    }
  };
};
