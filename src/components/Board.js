import React from 'react';

function Menu(props) {

  return (
    <div className="card" style={{ width: '18rem' }}>
        {console.log(props)}
        <h1>Menu</h1>
        <div><h3>Breakfast:</h3> {props.data.breakfast.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}</div>
        <div><h3>Lunch</h3> <span> {props.data.lunch.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)} </span> </div>
        <div><h3>Middle Lunch:</h3> <span> {props.data.middleLunch.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </div>
        <div><h3>Dinner: </h3> <span>{props.data.dinner.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </div>
        <div><h3>Middle Dinner:</h3> <span>{props.data.middleDinner.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </div>
    </div>
  );
}

export default Menu;
