import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';

function Menu() {

    const [breakfastOption, setBreakfastOption] = useState([]);
    const [lunchAndDinnerOptions, setLunchAndDinnerOptions] = useState([]);
    const [middleOptions, setMiddleOptions] = useState([]);

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

  return (
    <div>
       <div>
       <p>Breakfast:</p> 
       <select>
              {breakfastOption.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
        <select>
              {breakfastOption.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
        <select>
              {breakfastOption.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
       </div>
       <div>
       <p>Lunch:</p> 
        <select>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
        <select>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
        <select>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
       </div>
       <div>
       <p>Middle Lunch:</p>   
       <select>
            {middleOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
       </div>
       <div>
       <p>Dinner:</p>  
       <select>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
        <select>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
        <select>
              {lunchAndDinnerOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
       </div>
        <div>
        <p>Middle Dinner:</p> <select>
            {middleOptions.map(m => <option value= {m.mealName}>{m.mealName}</option>)}
        </select>
        </div>    
        <button>Add</button>
    </div>
  );
}

export default Menu;
