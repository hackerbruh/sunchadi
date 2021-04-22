import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthBetween
} from "revalidate";

export default {
  registerCustomerValidation: combineValidators({
    name: composeValidators(
      hasLengthBetween(5, 30)({
        message: "Customer Name Should Be 5-30 Characters Long"
      }),
      isRequired({ message: "Customer Name Is Required" })
    )(),
    address: composeValidators(
      hasLengthBetween(5, 50)({
        message: "Customer Address Should Be 5-50 Characters Long"
      }),
      isRequired({ message: "Customer Address Is Required" })
    )(),
    phone: composeValidators(
      hasLengthBetween(7, 12)({
        message: "Customer Phone Should Be 7-12 Characters Long"
      }),
      isRequired({ message: "Customer Phone Is Requred" })
    )()
  }),
  registerWorkerValidation: combineValidators({
    name: composeValidators(
      hasLengthBetween(5, 30)({
        message: "Worker Name Should Be 5-30 Characters Long"
      }),
      isRequired({ message: "Worker Name Is Required" })
    )(),
    address: composeValidators(
      hasLengthBetween(5, 50)({
        message: "Worker Address Should Be 5-50 Characters Long"
      }),
      isRequired({ message: "Worker Address Is Required" })
    )(),
    phone: composeValidators(
      hasLengthBetween(7, 12)({
        message: "Worker Phone Should Be 7-12 Characters Long"
      }),
      isRequired({ message: "Worker Phone Is Requred" })
    )(),
    age: composeValidators(
      hasLengthBetween(1, 2)({
        message: "Worker Age Is Not Suitable For Work"
      }),
      isRequired({ message: "Worker Age Is Required" })
    )()
  }),
  orderValidation: combineValidators({
    name: composeValidators(
      isRequired({ message: "Customer Name Is Required" })
    )(),
    weight: composeValidators(
      hasLengthBetween(1, 5)({
        message: "Weight Is Either Too Much Or Too Less"
      }),
      isRequired({ message: "Weight Is Required" })
    )(),
    description: composeValidators(
      hasLengthBetween(5, 150)({
        message: "Description Is Either Too Long Or Too Short (5-150)"
      })
    )(),
    submitDate: composeValidators(
      isRequired({ message: "Submit Date Is Required" })
    )(),
    item: composeValidators(
      hasLengthBetween(3, 25)({
        message: "Item Should 3-25 Characters Long."
      }),
      isRequired({ message: "Item Name Is Required" })
    )()
  }),
  addOrderItemValidation: combineValidators({
    name: composeValidators(
      hasLengthBetween(3, 25)({
        message: "Item Shoould be 3-25 Characters Long"
      }),
      isRequired({ message: "Item Name Is Required" })
    )(),
    category: composeValidators(
      hasLengthBetween(3, 25)({
        message: "Item Category Should be 3-25 Characters Long"
      }),
      isRequired({ message: "Item Category Is Required" })
    )(),
    price: composeValidators(
      isRequired({ message: "Item Price Is Required" })
    )()
  }),
  addToSellingItem: combineValidators({
    code: isRequired({ message: "Item Code Is Required" }),
    finalWt: isRequired({ message: "Item Weight Is Required" }),
    loss: isRequired({ message: "Item Loss Is Required" }),
    wages: isRequired({ message: "Item Wages Is Required" }),
    name: isRequired({ message: "Item Name Is Required" })
  }),
  sellingForm: combineValidators({
    cust_name: isRequired({ message: 'Customer Name Is Required' }),
    address: isRequired({ message: 'Customer Address Is Required' }),
    contact: isRequired({message: 'Customer Contact Is Required'}),
  })
};
