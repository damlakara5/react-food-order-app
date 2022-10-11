import React, {useContext, useEffect, useState  } from 'react'
import CardIcon from '../Card/CardIcon'
import CardContext from '../../store/card-context'
import classes from "./HeaderCardButton.module.css"
const HeaderCardButton = (props) => {
  const cardCtx= useContext(CardContext);
  const [btnIsHighlighted, setBtnIsHighligted] = useState(false)
  const {items}= cardCtx

  const numberOfCardItems =items.reduce((curNum, item) =>{
    return curNum + item.amount
  },0)

  

  const buttonClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`

  useEffect(() => {
    if(cardCtx.items.length  === 0){
      return
    }
    setBtnIsHighligted(true)

    const timer = setTimeout(() => {
      setBtnIsHighligted(false)
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  },[items ])

  return (
    <button className={buttonClasses} onClick={props.onClick} >
        <span className={classes.icon} >
            <CardIcon />
        </span>
        <span>Your Card</span>
        <span className={classes.badge} > {numberOfCardItems} </span>
    </button>
  )
}

export default HeaderCardButton