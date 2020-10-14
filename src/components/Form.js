import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';
import Button from 'react-bootstrap/Button';

function Form({handleInputChange, submit, totalCalories}) {

    const [breakfastOption, setBreakfastOption] = useState([]);
    const [lunchAndDinnerOptions, setLunchAndDinnerOptions] = useState([]);
    const [middleOptions, setMiddleOptions] = useState([]);

    const fetchBreakfastData = async ()=>{
        const breakfastOptionResult = await db.collection('breakfastOptions').get();
       // console.log(breakfastOptionResult)
        const breakfastOptionData = breakfastOptionResult.docs.map(b => b.data())
        setBreakfastOption(breakfastOptionData);
        // console.log(breakfastOptionData)
      }

    const fetchLunchAndDinnerOptionsData = async ()=>{
        const luncAndDinnetOptionResult = await db.collection('lunchAndDinnerOptions').get();
        //console.log(luncAndDinnetOptionResult)
        const luncAndDinnetOptionData = luncAndDinnetOptionResult.docs.map(b => b.data())
        setLunchAndDinnerOptions(luncAndDinnetOptionData);
        // console.log(luncAndDinnetOptionData)
      }
    
    const fetchMiddleOptionsData = async ()=>{
        const middleOptionsResult = await db.collection('middleOptions').get();
        //console.log(middleOptionsResult)
        const middleOptionsData = middleOptionsResult.docs.map(b => b.data())
        setMiddleOptions(middleOptionsData);
        // console.log(middleOptionsData)
    }

    useEffect(()=>{
        fetchBreakfastData();
        fetchLunchAndDinnerOptionsData();
        fetchMiddleOptionsData();
    },[])


  return (
    <form onSubmit={submit}>
      <h3>Total Calory: {totalCalories}</h3>
       <div class="form-group col-md-3">
       <p>Breakfast:</p> 
       <select className="form-control" name="breakfast1" onChange={(e) => handleInputChange(e)}>
              {breakfastOption.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName } - {m.calories}</option>)}
        </select>
        <select className="form-control" name="breakfast2" onChange={(e) => handleInputChange(e)}>
              {breakfastOption.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" name="breakfast3" onChange={(e) => handleInputChange(e)}>
              {breakfastOption.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
       <div>
       <p>Lunch:</p> 
        <select className="form-control" name="lunch1" onChange={(e) => handleInputChange(e)}>
              {lunchAndDinnerOptions.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" name="lunch2" onChange={(e) => handleInputChange(e)}>
              {lunchAndDinnerOptions.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" name="lunch3" onChange={(e) => handleInputChange(e)}>
              {lunchAndDinnerOptions.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
       </div>
       <div>
       <p>Snacks: </p>   
       <select className="form-control" name="snack1" onChange={(e) => handleInputChange(e)}>
            {middleOptions.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
       </div>
       <div>
       <p>Dinner:</p>  
       <select className="form-control" name="dinner1" onChange={(e) => handleInputChange(e)}>
              {lunchAndDinnerOptions.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" name="dinner2" onChange={(e) => handleInputChange(e)}>
              {lunchAndDinnerOptions.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" name="dinner3" onChange={(e) => handleInputChange(e)}>
              {lunchAndDinnerOptions.map(m => <option value= {`${m.mealName}-${m.calories}`}>{m.mealName} - {m.calories}</option>)}
        </select>
       </div>
        <div>
        <p>Snacks: </p> 
        <select className="form-control" name="snack2" onChange={(e) => handleInputChange(e)}>
            {middleOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
        </div>    
        <Button type="submit">Add</Button>
        </div>
    </form>
  );
}

export default Form;
