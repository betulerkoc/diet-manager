import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';
import Board from "./Board";
import List from "./List";
import Form from "./Form";
import { Button, Modal } from 'react-bootstrap';

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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


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
  console.log(menu)

  const calculateTheCalories = ()=> {
    setCalories(() => {
      let sum = 0;
      for(const key in breakfast){
        sum += Number(breakfast[key].split('-')[1])
      }
      for(const key in lunch){
        sum += Number(lunch[key].split('-')[1])
      }
      for(const key in dinner){
        sum += Number(dinner[key].split('-')[1])
      }
      return sum;
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
    sortBoards();
  }

  useEffect(()=> {
    calculateTheCalories()
      // eslint-disable-next-line 
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

  const handleDayChange = (e) => {
    setDay(e.target.value);
  }

  const handlePersonChange = (e) => {
    setPerson(e.target.value);
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

    const makeFilter = (day) => {
      return menu.filter(m => m.myMenu.day === day).map(result => <Board data={result} key={result.id} handleCommitmentChange={handleCommitmentChange}/>)
    }

    const renderBoard = () => {
      return(
      <div class="row" style={{width: '180rem'}}>
       {weekDays.map(m =>   <div style={{ width: '25rem' }}>
           <h2>{m}</h2>
            {makeFilter(m)}
         </div> )} 
        </div>
    )}

    const renderList = () => {
      return(menu.map(m => <List data={m}/>))
    }

  return (
  <div className="container">
    <div className="row">
    <div class="form-group col-md-2">
      <span>Sort By Calories</span>
      <select className="form-control" name="sort" onChange={(e) => handleSortChange(e)}>
            <option value="desc">Select</option>
            <option value="desc">desc</option>
            <option value= "asc">asc</option>
      </select>
    </div>
    <Button onClick={handleCardType} variant="outline-success" className="m-3">{cardType}</Button>
    <Button variant="outline-dark" onClick={handleShow}>
       <h1>+</h1> 
     </Button>
  </div>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Form handleInputChange={handleInputChange} handleDayChange={handleDayChange} handlePersonChange={handlePersonChange} submit={addNewMenu} totalCalories={calories}/>
    <Modal.Footer>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>

  <div class="container">
    {cardType === "List" ? renderBoard() : renderList()}
  </div>

  </div>
  );
}

export default Menu;
