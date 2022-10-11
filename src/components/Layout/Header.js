import React from 'react'
import mealsImage from "../../assets/meals.jpg"
import classes from "./Header.module.css"
import HeaderCardButton from './HeaderCardButton'
const Header = (props) => {
  return (
    <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCardButton   onClick={props.onShowCard} />
        </header>
        <div className={classes['main-image']} >
            <img src={mealsImage} alt="A teble full of food"/>
        </div>
    </>
  )
}

export default Header