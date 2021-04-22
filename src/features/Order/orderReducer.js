import { FETCH_ORDERS } from "./orderConstants";
import { createReducer } from "../../app/common/util/createReducer";

const initState = {
  orders: []
};

const fetchOrders = (state = initState, payload) => {
  return {
    ...state,
    orders: payload.orders
  };
};

export default createReducer(initState, {
  [FETCH_ORDERS]: fetchOrders
});
