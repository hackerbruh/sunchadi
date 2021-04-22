import { SERACH_CUSTOMERS, FETCH_CUSTOMERS } from "./customerConstants";
import { createReducer } from "../../app/common/util/createReducer";

const initState = {
  customers: [],
  searchedCustomers: []
};

const fetchCustomers = (state = initState, { customers }) => {
  return {
    ...state,
    customers
  };
};

const searchCustomer = (state = initState, { newCustomers }) => ({
  ...state,
  searchedCustomers: newCustomers
});

export default createReducer(initState, {
  [FETCH_CUSTOMERS]: fetchCustomers,
  [SERACH_CUSTOMERS]: searchCustomer
});
