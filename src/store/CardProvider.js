import React , {useReducer}from 'react'
import CardContext from './card-context'

const defaultCardState = {
  items : [],
  totalAmount:0
}

const cardReducer = (state, action) => {
    if(action.type === "ADD"){
      const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if(action.type === 'CLEAR'){
    return defaultCardState;
  }

  return defaultCardState;
}
const CardProvider = (props) => {
  const [cardState, dispatchCardAction] = useReducer( cardReducer,defaultCardState)
  const addItemHandler = (item) => {
    dispatchCardAction({
      type:"ADD",
      item: item
    })
  }
  const removeItemHandler = (id) => {
    dispatchCardAction({
      type:"REMOVE",
      id:id
    })
  }

  const clearCardHandler = () => {
      dispatchCardAction({type: 'CLEAR'})
  }


  const cardContext= {
    items: cardState.items,
    totalAmount: cardState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCard: clearCardHandler
  }
  return (
    <CardContext.Provider  value={cardContext} >
        {props.children}
    </CardContext.Provider>
  )
}

export default CardProvider