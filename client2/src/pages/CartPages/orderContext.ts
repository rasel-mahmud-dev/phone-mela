import React from "react";

const OrderContext = React.createContext<OrderContextType>({actions: {}, state: null})


export type OrderContextType = {
  state: any,
  actions: any
}


export default OrderContext

