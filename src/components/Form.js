import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';
import Button from 'react-bootstrap/Button';

function Form() {

    const [breakfastOption, setBreakfastOption] = useState([]);
    const [lunchAndDinnerOptions, setLunchAndDinnerOptions] = useState([]);
    const [middleOptions, setMiddleOptions] = useState([]);

    const [allMenu, setAllMenu] = React.useState({
        breakfast: [{mealName: "", calories: ""}],
        lunch: [{mealName: "", calories: ""}],
        dinner: [{mealName: "", calories: ""}],
        percentage: 100,
        totalCalory: 0
      })

    const fetchBreakfastData = async ()=>{
        const breakfastOptionResult = await db.collection('breakfastOptions').get();
        console.log(breakfastOptionResult)
        const breakfastOptionData = breakfastOptionResult.docs.map(b => b.data())
        setBreakfastOption(breakfastOptionData);
        // console.log(breakfastOptionData)
      }

    const fetchLunchAndDinnerOptionsData = async ()=>{
        const luncAndDinnetOptionResult = await db.collection('lunchAndDinnerOptions').get();
        console.log(luncAndDinnetOptionResult)
        const luncAndDinnetOptionData = luncAndDinnetOptionResult.docs.map(b => b.data())
        setLunchAndDinnerOptions(luncAndDinnetOptionData);
        // console.log(luncAndDinnetOptionData)
      }
    
    const fetchMiddleOptionsData = async ()=>{
        const middleOptionsResult = await db.collection('middleOptions').get();
        console.log(middleOptionsResult)
        const middleOptionsData = middleOptionsResult.docs.map(b => b.data())
        setMiddleOptions(middleOptionsData);
        // console.log(middleOptionsData)
    }

    useEffect(()=>{
        fetchBreakfastData();
        fetchLunchAndDinnerOptionsData();
        fetchMiddleOptionsData();
    },[])

    const addNewMenu = e => {
        e.preventDefault()
        db.collection('users').add({
    })
    }

    const handleInputChange = (e, key) => {
        setAllMenu({ ...allMenu, [key]: e.target.value });
        console.log(allMenu)
    };

  return (
    <form onSubmit={addNewMenu}>
       <div class="form-group col-md-3">
       <p>Breakfast:</p> 
       <select className="form-control" onChange={(e) => handleInputChange(e, "breakfast1")}>
              {breakfastOption.map(m => <option value= {m.mealName}>{m.mealName } - {m.calories}</option>)}
        </select>
        <select className="form-control" onChange={(e) => handleInputChange(e, "breakfast2")}>
              {breakfastOption.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" onChange={(e) => handleInputChange(e, "breakfast3")}>
              {breakfastOption.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
       <div>
       <p>Lunch:</p> 
        <select className="form-control" onChange={(e) => handleInputChange(e, "lunch1")}>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" onChange={(e) => handleInputChange(e, "lunch2")}>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" onChange={(e) => handleInputChange(e, "lunch3")}>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
       </div>
       <div>
       <p>Snacks: </p>   
       <select className="form-control" onChange={(e) => handleInputChange(e, "snacksLunch")}>
            {middleOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
       </div>
       <div>
       <p>Dinner:</p>  
       <select className="form-control" onChange={(e) => handleInputChange(e, "dinner1")}>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" onChange={(e) => handleInputChange(e, "dinner2")}>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
        <select className="form-control" onChange={(e) => handleInputChange(e, "dinner3")}>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
       </div>
        <div>
        <p>Snacks: </p> 
        <select className="form-control" onChange={(e) => handleInputChange(e, "snacksDinner")}>
            {middleOptions.map(m => <option value= {m.mealName}>{m.mealName} - {m.calories}</option>)}
        </select>
        </div>    
        <Button type="submit">Add</Button>
        </div>
    </form>
  );
}

export default Form;
