import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';
import Board from "./Board";

function Menu() {

    const [menu, setMenu] = useState([]);

    const fetchData = async ()=>{
        const menuResult = await db.collection('menus').get();
        const menusData = menuResult.docs.map(menu => menu.data())
        setMenu(menusData);
         console.log(menusData)
      }

      useEffect(()=>{
        fetchData();
      },[])

  return (
    <div>
        {menu.map(m => <Board data={m}/>)}
    </div>
  );
}

export default Menu;
