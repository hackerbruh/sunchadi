import {
  FETCH_ORDER_ITEMS,
  FETCH_SELLING_ITEMS,
  FETCH_RATES
} from "./settingConstants";
import { createReducer } from "../../app/common/util/createReducer";

const initState = {
  orderItems: [],
  sellingItems: [],
  rates: {
    gold_24: 0,
    gold_22: 0,
    silver: 0
  }
};

const fetchOrderItems = (state = initState, payload) => {
  return {
    ...state,
    orderItems: payload.items
  };
};

const fetchSellingItems = (state = initState, payload) => {
  return {
    ...state,
    sellingItems: payload.items
  };
};

const fetchRates = (state = initState, payload) => {
  return {
    ...state,
    rates: payload.rates
  };
};

export default createReducer(initState, {
  [FETCH_ORDER_ITEMS]: fetchOrderItems,
  [FETCH_SELLING_ITEMS]: fetchSellingItems,
  [FETCH_RATES]: fetchRates
});
