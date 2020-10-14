import React, { useState, useEffect } from "react";
import db from "../firebaseConfig";
import Button from "react-bootstrap/Button";
function Form() {
  const [menuOptions, setMenuOptions] = useState({
    breakfastOption: [],
    lunchAndDinnerOptions: [],
    middleOptions: [],
  });
  const [menu, setMenu] = useState({
    breakfast: [{}],
    lunch: [{}],
    dinner: [{}],
  });
  const fetchBreakfastData = async () => {
    const breakfastOptionResult = await db.collection("breakfastOptions").get();
    //  console.log(breakfastOptionResult)
    const breakfastOptionData = breakfastOptionResult.docs.map((b) => b.data());
    // console.log(breakfastOptionData);
    setMenuOptions(prevOptions => {
      return { ...prevOptions, breakfastOption: breakfastOptionData
    }});
      // setBreakfastOption(breakfastOptionData);
    // console.log(breakfastOptionData)
  };
  // console.log(menuOptions);
  const fetchLunchAndDinnerOptionsData = async () => {
    const luncAndDinnetOptionResult = await db
      .collection("lunchAndDinnerOptions")
      .get();
    //console.log(luncAndDinnetOptionResult)
    const luncAndDinnetOptionData = luncAndDinnetOptionResult.docs.map((b) =>
      b.data()
    );
    setMenuOptions(prevOptions => {
      return { ...prevOptions, lunchAndDinnerOptions: luncAndDinnetOptionData }
    });
    // console.log(luncAndDinnetOptionData)
    // setLunchAndDinnerOptions(luncAndDinnetOptionData);
  };
  const fetchMiddleOptionsData = async () => {
    const middleOptionsResult = await db.collection("middleOptions").get();
    //console.log(middleOptionsResult)
    const middleOptionsData = middleOptionsResult.docs.map((b) => b.data());
    setMenuOptions(prevOptions => {
      return { ...prevOptions, middleOptions: middleOptionsData }
    });
    // console.log(middleOptionsData)
    // setMiddleOptions(middleOptionsData);
  };
  useEffect(() => {
    fetchBreakfastData();
    fetchLunchAndDinnerOptionsData();
    fetchMiddleOptionsData();
  }, []);
  const addNewMenu = (e) => {
    e.preventDefault();
    db.collection("menus").add({
      menu
    });
  };
  // const editButton = db.collection('menus').onSnapshot(snapshot =>{
  //   const changes = snapshot.docChanges();
  //   changes.forEach(change =>{
  //     if (change.type == 'added'){
  //       addNewMenu(change.doc)
  //     }else if (change.type == 'removed'){
  //        const
  //     }
  //   })
  // })
  const handleInputChange = (e) => {
    e.persist()
    if (e.target.name.includes("breakfast")) {
     
      setMenu((menu)=>(  {
        ...menu,
        breakfast:[...menu.breakfast,e.target.value]
        }) )
    }
    if (e.target.name.includes("lunch")) {
      setMenu((menu)=>(  {
        ...menu,
        lunch:[...menu.lunch,e.target.value]
        }) )
    }
    if (e.target.name.includes("dinner")) {
      setMenu((menu)=>(  {
        ...menu,
        dinner:[...menu.dinner,e.target.value]
        }) )
    }
   };
  return (
    <form onSubmit={addNewMenu}>
      <div class="form-group col-md-3">
        <p>Breakfast:</p>
        <select
          className="form-control"
          name="breakfast"
          onChange={(e) => handleInputChange(e)}
        >
          {menuOptions.breakfastOption.map((m) => (
            <option value={m.mealName}>
              {m.mealName} - {m.calories}
            </option>
          ))}
        </select>
        <select
          className="form-control"
          name="breakfast1"
          onChange={(e) => handleInputChange(e)}
        >
          {menuOptions.breakfastOption.map((m) => (
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
          {menuOptions.breakfastOption.map((m) => (
            <option value={m.mealName}>
              {m.mealName} - {m.calories}
            </option>
          ))}
        </select>
        <div>
          <p>Lunch:</p>
          <select
            className="form-control"
            name="lunch"
            onChange={(e) => handleInputChange(e)}
          >
            {menuOptions.lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            name="lunch1"
            onChange={(e) => handleInputChange(e)}
          >
            {menuOptions.lunchAndDinnerOptions.map((m) => (
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
            {menuOptions.lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          <p>Snacks: </p>
          <select
            className="form-control"
            name="snack"
            onChange={(e) => handleInputChange(e)}
          >
            {middleOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div> */}
        <div>
          <p>Dinner:</p>
          <select
            className="form-control"
            name="dinner"
            onChange={(e) => handleInputChange(e)}
          >
            {menuOptions.lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName }- {m.calories}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            name="dinner1"
            onChange={(e) => handleInputChange(e)}
          >
            {menuOptions.lunchAndDinnerOptions.map((m) => (
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
            {menuOptions.lunchAndDinnerOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          <p>Snacks: </p>
          <select
            className="form-control"
            name="snack"
            onChange={(e) => handleInputChange(e)}
          >
            {middleOptions.map((m) => (
              <option value={m.mealName}>
                {m.mealName} - {m.calories}
              </option>
            ))}
          </select>
        </div> */}
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}
export default Form;