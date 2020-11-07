import React from 'react';
import db from '../firebaseConfig';
function Board(props) {

  console.log(props)
  if (!props.data.myMenu) {
    return null;
  }

  const handleDeletedItems = () => {
    db.collection('menus').doc(props.data.id).delete()
  }
  
  return (
    <div className="card border-danger" style={{ width: '18rem', marginBottom: '15px' }}>
        <div className="card-body">
          <h1> {props.data.myMenu.person && props.data.myMenu.person+`'s`} Menu</h1>
          <h5>Total Calory: {props.data.myMenu.calories}</h5>
          <div>
          <h5>Breakfast</h5> {props.data.myMenu.breakfast.map(b =>  <span>{b.mealName}  {b.calories}</span>)}
          <h5>Lunch</h5> {props.data.myMenu.lunch.map(b =>  <span>{b.mealName}  {b.calories}</span>)} 
            <h5>Dinner</h5> {props.data.myMenu.dinner.map(b =>  <span> {b.mealName}  {b.calories}</span>)}  <br/>
            <h6>Commitment: {props.data.commitment && props.data.commitment.commitment}</h6>
              <select className="form-control" name="commitment" onChange={props.handleCommitmentChange}>
                    {[...Array(100)].map((e,i)=> <option value={i}>{i} %</option>)}
              </select><br/>
              <p></p>
              {/* <button className="btn btn-success">Update</button> */}
              <button className="btn btn-danger" onClick={handleDeletedItems}>Delete Menu</button><br/><br/>
            </div>
          </div>
    </div>
  );
}
export default Board;
