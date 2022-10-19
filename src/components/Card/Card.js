import React,{useContext, useState} from 'react'
import Modal from '../UI/Modal'
import classes from "./Card.module.css"
import CardContext from "../../store/card-context"
import CartItem from "./CardItem"
import Checkout from './Checkout'
const Card = (props) => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setISSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cardCtx = useContext(CardContext)

    const totalAmount = `$${cardCtx.totalAmount.toFixed(2)}`
    const hasItems =  cardCtx.items.length >0

    const cardItemRemoveHandler = id => {
        cardCtx.removeItem(id);
    }
    const cardItemAddHandler = item => {
        cardCtx.addItem({...item, amount:1 })
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async (userData) => {
        setISSubmitting(true)
            await fetch('https://react-http-da75e-default-rtdb.firebaseio.com/orders.json' , {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cardCtx.items
                })
            })
            setISSubmitting(false)
            setDidSubmit(true)
            cardCtx.clearCard()

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


    const cardModalContent = <React.Fragment>
         {cardItems}
        <div className={classes.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout  onCancel={props.onClose}  onConfirm={submitOrderHandler} /> }
        {!isCheckout && 
            <div className={classes.actions} >
                <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
                {hasItems &&  <button className={classes.button}  onClick={orderHandler} >Order</button>}
            </div>}
    </React.Fragment>


    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmittingModalContent = <React.Fragment>
        <p>Successfully send the order.</p>
        <div className={classes.actions} >
                <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
                
        </div>
        </React.Fragment> 
  return (
    <Modal onClose={props.onClose} >
       
        {!isSubmitting &&  !didSubmit &&  cardModalContent}
        {isSubmitting &&  isSubmittingModalContent}
        {didSubmit && didSubmit && didSubmittingModalContent }
    </Modal>
  )
}

export default Card