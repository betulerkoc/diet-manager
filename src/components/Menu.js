import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';
import Board from "./Board";
import List from "./List";
import Form from "./Form";

function Menu() {

    const [menu, setMenu] = useState([]);

    const [breakfast, setBreakfast] = useState([]);
    const [lunch, setLunch] = useState([]);
    const [dinner, setDinner] = useState([]);
    const [commitment, setCommitment] = useState(100)
    const [calories, setCalories] = useState(0)

    var myMenu = {
      breakfast: [{mealName: breakfast.breakfast1, calories: ""}, {mealName: breakfast.breakfast2, calories: ""}, {mealName: breakfast.breakfast3, calories: ""}],
      lunch:  [{mealName: lunch.lunch1, calories: ""}, {mealName: lunch.lunch2, calories: ""}, {mealName: lunch.lunch3, calories: ""}],
      dinner:  [{mealName: dinner.dinner1, calories: ""}, {mealName: dinner.dinner2, calories: ""}, {mealName: dinner.dinner3, calories: ""}],
      commitment: commitment,
      calories: calories
  };

    const firebaseUpdate = () => {
      db.collection("menus").onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            console.log("Hello adding");
            console.log(change.doc.data())
            setMenu([...menu, change.doc.data()])
        }else {
          console.log("sorry")
        }
        });
    });
  }

    const handleInputChange = (e) => {
      // console.log(e.target.value);
     // setMenu({ ...menu, [e.target.name]: e.target.value });
      //console.log(e.target.value.mealName.split("-"));
      console.log(e.target.value.split("-")[1]);

      //console.log(...e.target.value.calories)
      if(e.target.name.includes("breakfast")) {
        setBreakfast({...breakfast, [e.target.name]: e.target.value})
        setCalories(calories + Number(e.target.value.split("-")[1]));
      }
      if(e.target.name.includes("lunch")) {
        setLunch({...lunch, [e.target.name]: e.target.value})
        setCalories(calories + Number(e.target.value.split("-")[1]));
      }
      if(e.target.name.includes("dinner")) {
        setDinner({...dinner, [e.target.name]: e.target.value})
        setCalories(calories + Number(e.target.value.split("-")[1]));
      }
      console.log(breakfast);
      console.log(lunch);
      console.log(dinner);
      console.log(calories);
  };

  const handleCommitmentChange = (e) => {
    // console.log(e.target.value)
    setCommitment(e.target.value);
  }

  const addNewMenu = e => {
      e.preventDefault();
      console.log("submit")
      db.collection('menus').add({
        myMenu
  })
    firebaseUpdate();
    setCalories(0)
  }

    const fetchData = async ()=>{
        const menuResult = await db.collection('menus').get();
        const menusData = menuResult.docs.map(menu => menu.data())
        setMenu(menusData);
        //  console.log(menusData)
      }

      useEffect(()=>{
        fetchData();
        // console.log(myMenu)
      },[])

  return (
    <div className="container">

      <Form handleInputChange={handleInputChange} submit={addNewMenu} totalCalories={calories}/>
      {console.log(menu)}
        {menu.map(m => <Board data={m} handleCommitmentChange={handleCommitmentChange} />)}
        {/* {menu.map(m => console.log(m))} */}
    </div>
  );
}

export default Menu;
