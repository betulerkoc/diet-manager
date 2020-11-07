import React, {useState} from 'react';
// import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
const Calculator = () => {
const [age , setAge] = useState("")
const [height , setHeight] = useState("")
const [weight , setWeight] = useState("")
const [calories, setCalories] = useState("")


console.log(calories)

const handleChange = (e)=>{
   console.log(e.target.name)
   console.log(e.target.value)
  if (e.target.name === "age") {
    setAge(e.target.value)
  } else if (e.target.name === "height") {
    setHeight(e.target.value)
  }
  else if (e.target.name === "weight") {
    setWeight(e.target.value)
  }
}


const submit = (e) => {
  e.preventDefault();
  setCalories(655.09 + (9.56 * weight) + (1.84 * height) - (4.67 * age))
  console.log(calories)
}

return (
    <div className="card" style={{ width: '30rem' }}>
    <h3>Calorie calculator</h3>
     <form onSubmit={submit}>
      <div className="form-group">
        <div className="col-5">
             <label for="age">Age: </label>
            <input onChange={handleChange } value ={age} type="number" name="age" id="age"/>
        </div>
        <div className="col-5">
            <label for="height">Height: </label>
            <input onChange={handleChange } value ={height} type="number" name="height" id="height" />
        </div>
        <div className="col-5">
            <label for="weight">Weight: </label>
            <input onChange={handleChange } value ={weight} type="number" name="weight" id="weight"  />
        </div><br/>
        <div className="col">
          <button type="submit" className="btn btn-success">Calculate</button>
        </div>
      </div>
      </form>

      <h6>{calories && `Estimated daily calories:` + calories }</h6>
    </div>
  );
};
export default Calculator;
