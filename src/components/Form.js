import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';
import Button from 'react-bootstrap/Button';

function Form({handleInputChange, handlePersonChange, handleDayChange, submit, totalCalories}) {

    const [breakfastOption, setBreakfastOption] = useState([]);
    const [lunchAndDinnerOptions, setLunchAndDinnerOptions] = useState([]);
    const [days, setDays] = useState([]);
    const [people, setPeopleData] = useState([]);

    const fetchBreakfastData = async () =>{
        const breakfastOptionResult = await db.collection('breakfastOptions').get();
        const breakfastOptionData = breakfastOptionResult.docs.map(b => b.data())
        setBreakfastOption(breakfastOptionData);
        // console.log(breakfastOptionData)
      }

    const fetchLunchAndDinnerOptionsData = async () =>{
        const luncAndDinnetOptionResult = await db.collection('lunchAndDinnerOptions').get();
        const luncAndDinnetOptionData = luncAndDinnetOptionResult.docs.map(b => b.data())
        setLunchAndDinnerOptions(luncAndDinnetOptionData);
        // console.log(luncAndDinnetOptionData)
      }
    
    const fetchDays = async () => {
      const dayResults = await db.collection('days').get();
      const days = dayResults.docs.map(d => d.data())
      setDays(days);
     // console.log(days)
    }

    const fetchPeople = async () => {
      const peopleResult = await db.collection('people').get();
      const people = peopleResult.docs.map(d => d.data())
      setPeopleData(people);
      // console.log(people)
    }

    useEffect(()=>{
        fetchBreakfastData();
        fetchLunchAndDinnerOptionsData();
        fetchDays();
        fetchPeople();
    },[])


  return (
    <form onSubmit={submit}>
      <h3>Total Calory: {totalCalories}</h3>
       <div class="form-group col-md-6">
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
        <p>Day: </p> 
        <select className="form-control" name="day" onChange={(e) => handleDayChange(e)}>
            {days.map(m => <option value= {m.day}>{m.day}</option>)}
        </select>
        </div> 
        <div>
       <p>Assing to: </p>   
       <select className="form-control" name="people" onChange={(e) => handlePersonChange(e)}>
            {people.map(m => <option value= {m.name}>{m.name}</option>)}
        </select>
       </div>   
        <Button type="submit">Add</Button>
        </div>
    </form>
  );
}

export default Form;
