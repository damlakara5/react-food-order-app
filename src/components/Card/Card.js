import React,{useContext} from 'react'
import Modal from '../UI/Modal'
import classes from "./Card.module.css"
import CardContext from "../../store/card-context"
import CartItem from "./CardItem"
const Card = (props) => {
    const cardCtx = useContext(CardContext)

    const totalAmount = `$${cardCtx.totalAmount.toFixed(2)}`
    const hasItems =  cardCtx.items.length >0

    const cardItemRemoveHandler = id => {
        cardCtx.removeItem(id);
    }
    const cardItemAddHandler = item => {
        cardCtx.addItem({...item, amount:1 })
    }

    const cardItems = <ul className={classes['cart-items']} >
         {cardCtx.items.map(item => 
            <CartItem  
                key={item.id} 
                name={item.name} 
                price={item.price}  
                amount={item.amount} 
                onRemove={cardItemRemoveHandler.bind(null, item.id)} 
                onAdd={cardItemAddHandler.bind(null, item)} />
            )}
        </ul>
  return (
    <Modal onClose={props.onClose} >
        {cardItems}
        <div className={classes.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions} >
            <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
            {hasItems &&  <button className={classes.button} >Order</button>}
        </div>
    </Modal>
  )
}

export default Card