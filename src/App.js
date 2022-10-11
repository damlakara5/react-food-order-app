import { useState } from "react";
import Card from "./components/Card/Card";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CardProvider from "./store/CardProvider";

function App() {
  const [cardIsShown, setCardIsShown] = useState(false)

  const showCardHandler = () =>{
    setCardIsShown(true)
  }
  const hideCardHandler = () =>{
    setCardIsShown(false)
  }

  return (
    <CardProvider>
      {cardIsShown && <Card onClose={hideCardHandler} />}
      <Header  onShowCard={showCardHandler}   />
      <main>
        <Meals />
      </main>
    </CardProvider>
  );
}

export default App;
