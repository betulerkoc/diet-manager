import React, {useState, useEffect} from 'react';
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
    <>
     <form onSubmit={submit}>
      <div className="form-flex">
        <div className="col-5">
            <input onChange={handleChange } value ={age} type="number" name="age" id="age"/>
        </div>
        <div className="col-5">
            <input onChange={handleChange } value ={height} type="number" name="height" id="height" />
        </div>
        <div className="col-5">
            <input onChange={handleChange } value ={weight} type="number" name="weight" id="weight"  />
        </div>
        <div  className="col">
          <div  className="form-check">
            <input onChange={handleChange } className="form-check-input"  name="male" type="radio" value="male" checked={null}/>
            <label className="form-check-label">
              Male
            </label>
          </div>
          <div className="form-check">
            <input onChange={handleChange } className="form-check-input"  name="male" type="radio" value = "female" checked={null} />
            <label className="form-check-label">
              Female
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};
export default Calculator;