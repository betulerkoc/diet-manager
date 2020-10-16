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
            setMenu((prevMenu) => [...prevMenu, {...change.doc.data(), id:change.doc.id}])
        }else if(change.type === "removed"){
          console.log("we detleted menu with id",change.doc.id)
          setMenu((menuState) => {
            let newState = [...menuState];
            newState = newState.filter(m => m.id !== change.doc.id)
           // newState = newState.filter(m => console.log(m))
           // console.log(newState)
            return newState;
          })
        }
        });
    });
  }

  const calculateTheCalories = ()=> {
    setCalories(() => {
      let sum = 0;
      for(const key in breakfast)
      {
        sum += Number(breakfast[key].split('-')[1])
      }

      for(const key in lunch)
      {
        sum += Number(lunch[key].split('-')[1])
      }

      for(const key in dinner)
      {
        sum += Number(dinner[key].split('-')[1])
      }
      return sum
    })
  }

  useEffect(()=> {
    calculateTheCalories()
  },[breakfast,lunch,dinner])
    const handleInputChange = (e) => {
      if(e.target.name.includes("breakfast")) {
        setBreakfast({...breakfast, [e.target.name]: e.target.value})
      }
      if(e.target.name.includes("lunch")) {
        setLunch({...lunch, [e.target.name]: e.target.value})
      }
      if(e.target.name.includes("dinner")) {
        setDinner({...dinner, [e.target.name]: e.target.value})
      }
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
  
    setCalories(0)
  }

    useEffect(()=>{
      firebaseUpdate();
      // console.log(myMenu)
    },[])

  return (
    <div className="container">

      <Form handleInputChange={handleInputChange} submit={addNewMenu} totalCalories={calories}/>
      {console.log(menu)}
        {menu.map(m => <Board data={m} key={m.id} handleCommitmentChange={handleCommitmentChange} />)}
        {/* {menu.map(m => console.log(m))} */}
    </div>
  );
}

export default Menu;
