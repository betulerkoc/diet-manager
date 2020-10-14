import React from 'react';
function Board(props) {
  if (!props.data.myMenu) {
    return null;
  }
  return (
    <div className="card" style={{ width: '18rem' }}>
        {/* {console.log(props.data.myMenu)} */}
        <h1>Menu</h1>
        <div><h3>Breakfast:</h3> {props.data.myMenu.breakfast.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}</div>
        <div><h3>Lunch</h3> <span> {props.data.myMenu.lunch.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)} </span> </div>
        {/* <div><h3>Middle Lunch:</h3> <span> {props.data.myMenu.middleLunch.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </div> */}
        <div><h3>Dinner: </h3> <span>{props.data.myMenu.dinner.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </div>
        <div><button>Delete</button></div> <div><button>Edit</button></div>
        {/* <div><h3>Middle Dinner:</h3> <span>{props.data.myMenu.middleDinner.map(b =>  <span><br/> {b.mealName}, {b.calories} <br/></span>)}  </span> </div> */}
    </div>
  );
}
export default Board;
