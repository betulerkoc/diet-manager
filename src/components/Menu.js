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
    const [commitment, setCommitment] = useState(100);
    const [day, setDay] = useState("");
    const [person, setPerson] = useState("");
    const [calories, setCalories] = useState(0);
    const [cardType, setCardType] = useState("List");
    const [sortOption, setSortOption] = useState("asc");


    var myMenu = {
      breakfast: [{mealName: breakfast.breakfast1, calories: ""}, {mealName: breakfast.breakfast2, calories: ""}, {mealName: breakfast.breakfast3, calories: ""}],
      lunch:  [{mealName: lunch.lunch1, calories: ""}, {mealName: lunch.lunch2, calories: ""}, {mealName: lunch.lunch3, calories: ""}],
      dinner:  [{mealName: dinner.dinner1, calories: ""}, {mealName: dinner.dinner2, calories: ""}, {mealName: dinner.dinner3, calories: ""}],
      commitment: commitment,
      calories: calories,
      day: day,
      person: person
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

  const sortBoards = () => {
    if(menu) {
      if(sortOption === 'desc') {
         menu.sort((a, b) => (a.myMenu.calories - b.myMenu.calories) )
      }
      if(sortOption === 'asc') {
         menu.sort((a, b) => (b.myMenu.calories - a.myMenu.calories))
      }
      setMenu(menu);
  }
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    console.log(e.target.value)
    console.log(sortOption)
    sortBoards();
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
    setCommitment(e.target.value);
  }

  const handleCardType = () => {
    cardType === "Board" ? setCardType("List") : setCardType("Board");
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
    },[])

  return (
    <div className="container">
      <div class="form-group col-md-3">
        <span>Sort By Calories</span>
        <select className="form-control" name="sort" onChange={(e) => handleSortChange(e)}>
              <option value="desc">Select</option>
              <option value="desc">desc</option>
              <option value= "asc">asc</option>
        </select>
      </div>

  <button onClick={handleCardType} className="btn btn-warning">{cardType}</button>

      <Form handleInputChange={handleInputChange} submit={addNewMenu} totalCalories={calories}/>
      {console.log(menu)}
        {menu.map(m => {
          return (
           cardType === "List" ? <Board data={m} key={m.id} handleCommitmentChange={handleCommitmentChange} /> : <List data={m}/>)}
          )}
        {/* {menu.map(m => console.log(m))} */}
    </div>
  );
}

export default Menu;
