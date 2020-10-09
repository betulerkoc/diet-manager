import React, { useState, useEffect } from "react";
import db from "../firebaseConfig";
import Button from "react-bootstrap/Button";

function Form() {
  const [breakfastOption, setBreakfastOption] = useState([]);
  const [lunchAndDinnerOptions, setLunchAndDinnerOptions] = useState([]);
  const [middleOptions, setMiddleOptions] = useState([]);

  const [menuOptions, setMenuOptions] = useState({
    breakfastOption: [],
    lunchAndDinnerOptions: [],
    middleOptions: [],
  });

  // const [menu, setMenu] = useState([]);

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

  const [menu, setMenu] = useState({
    breakfast: [{}],
    lunch: [{}],
    dinner: [{}],
  });

  // the way you should use setMenu
  // setMenu(...menu,[...menu.breakfast,{your new object}])

  var myMenu = {
    breakfast: [
      { mealName: breakfast.breakfast1, calories: "" },
      { mealName: breakfast.breakfast2, calories: "" },
      { mealName: breakfast.breakfast3, calories: "" },
    ],
    lunch: [
      { mealName: lunch.lunch1, calories: "" },
      { mealName: lunch.lunch2, calories: "" },
      { mealName: lunch.lunch3, calories: "" },
    ],
    dinner: [
      { mealName: dinner.dinner1, calories: "" },
      { mealName: dinner.dinner2, calories: "" },
      { mealName: dinner.dinner3, calories: "" },
    ],
  };

  const fetchBreakfastData = async () => {
    const breakfastOptionResult = await db.collection("breakfastOptions").get();
    // console.log(breakfastOptionResult)
    const breakfastOptionData = breakfastOptionResult.docs.map((b) => b.data());
    console.log(breakfastOptionData);
    setMenuOptions({ ...menuOptions, breakfastOption: breakfastOptionData });
    setBreakfastOption(breakfastOptionData);
    // console.log(breakfastOptionData)
  };
  console.log(menuOptions);

  const fetchLunchAndDinnerOptionsData = async () => {
    const luncAndDinnetOptionResult = await db
      .collection("lunchAndDinnerOptions")
      .get();
    //console.log(luncAndDinnetOptionResult)
    const luncAndDinnetOptionData = luncAndDinnetOptionResult.docs.map((b) =>
      b.data()
    );
    setLunchAndDinnerOptions(luncAndDinnetOptionData);
    // console.log(luncAndDinnetOptionData)
  };

  const fetchMiddleOptionsData = async () => {
    const middleOptionsResult = await db.collection("middleOptions").get();
    //console.log(middleOptionsResult)
    const middleOptionsData = middleOptionsResult.docs.map((b) => b.data());
    setMiddleOptions(middleOptionsData);
    // console.log(middleOptionsData)
  };

  useEffect(() => {
    fetchBreakfastData();
    fetchLunchAndDinnerOptionsData();
    fetchMiddleOptionsData();
  }, []);

  const addNewMenu = (e) => {
    e.preventDefault();
    db.collection("menus").add({
      myMenu,
    });
  };

  const handleInputChange = (e) => {
    console.log(breakfast);
    setMenu({ ...menu, [e.target.name]: e.target.value });

    if (e.target.name.includes("breakfast")) {
      // the way you should use setMenu
      // setMenu(...menu,[...menu.breakfast,{your new object}])
      setBreakfast({ ...breakfast, [e.target.name]: e.target.value });
    }
    if (e.target.name.includes("lunch")) {
      setLunch({ ...lunch, [e.target.name]: e.target.value });
    }
    if (e.target.name.includes("dinner")) {
      setDinner({ ...dinner, [e.target.name]: e.target.value });
    }

    console.log(breakfast);
    console.log(lunch);
    console.log(dinner);
  };

  return (
    <form onSubmit={addNewMenu}>
      <div class="form-group col-md-3">
        <p>Breakfast:</p>
        <select
          className="form-control"
          name="breakfast1"
          onChange={(e) => handleInputChange(e)}
        >
          {breakfastOption.map((m) => (
            <option value={m.mealName}>
              {m.mealName} - {m.calories}
            </option>
          ))}
        </select>
        <select
          className="form-control"
          name="breakfast2"
          onChange={(e) => handleInputChange(e)}
        >
          {breakfastOption.map((m) => (
            <option value={m.mealName}>
              {m.mealName} - {m.calories}
            </option>
          ))}
        </select>
        <select
          className="form-control"
          name="breakfast3"
          onChange={(e) => handleInputChange(e)}
        >
          {breakfastOption.map((m) => (
            <option value={m.mealName}>
              {m.mealName} - {m.calories}
            </option>
          ))}
        </select>
        <div>
          <p>Lunch:</p>
          <select
            className="form-control"
            name="lunch1"
            onChange={(e) => handleInputChange(e)}
          >
            {lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            name="lunch2"
            onChange={(e) => handleInputChange(e)}
          >
            {lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            name="lunch3"
            onChange={(e) => handleInputChange(e)}
          >
            {lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Snacks: </p>
          <select
            className="form-control"
            name="snack1"
            onChange={(e) => handleInputChange(e)}
          >
            {middleOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Dinner:</p>
          <select
            className="form-control"
            name="dinner1"
            onChange={(e) => handleInputChange(e)}
          >
            {lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            name="dinner2"
            onChange={(e) => handleInputChange(e)}
          >
            {lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            name="dinner3"
            onChange={(e) => handleInputChange(e)}
          >
            {lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Snacks: </p>
          <select
            className="form-control"
            name="snack2"
            onChange={(e) => handleInputChange(e)}
          >
            {middleOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}

export default Form;
