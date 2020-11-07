import React from 'react';

function List(props) {

  return (
    <div>
        {/* {console.log(props.data.myMenu)} */}
        {console.log(props)}
        <div class="list-group list-group-flush">
            <h3> {props.data.myMenu.person && props.data.myMenu.person+`'s`} Menu</h3>
            <a href="/list" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Breakfast</h5>
                    <small>{props.data.myMenu.breakfast.map(b =>  <span>{b.mealName}  {b.calories}</span>)}</small>
                </div>
            </a>
            <a href="/list" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Lunch</h5>
                    <small>{props.data.myMenu.lunch.map(b =>  <span>{b.mealName}  {b.calories}</span>)}</small>
                </div>
            </a>
            <a href="/list" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Dinner</h5>
                    <small>{props.data.myMenu.dinner.map(b =>  <span>{b.mealName}  {b.calories}</span>)}</small>
                </div>
            </a>
            <div class="d-flex w-100 justify-content-between">
                <h5>Total Calory: {props.data.myMenu.calories}</h5>
                <h5>Day: {props.data.myMenu.day}</h5>
            </div>
            </div><br/><br/>
    </div>



  );
}

export default List;
