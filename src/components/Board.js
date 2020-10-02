import React, {useState, useEffect} from 'react';

function Menu(props) {

  return (
    <div>
        {console.log(props)}
        <h3>Menu</h3>
        <p>Breakfast: {props.data.breakfast.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}</p>
        <p>Lunch: <span> {props.data.lunch.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)} </span> </p>
        <p>Middle Lunch: <span> {props.data.middleLunch.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </p>
        <p>Dinner: <span>{props.data.dinner.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </p>
        <p>Middle Dinner: <span>{props.data.middleDinner.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </p>
    </div>
  );
}

export default Menu;
