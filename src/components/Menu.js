import React, {useState, useEffect} from 'react';
import db from '../firebaseConfig';
import Board from "./Board";

function Menu() {

    const [menu, setMenu] = useState([]);

    const fetchData = async ()=>{
        const menuResult = await db.collection('menu').get();
        const menusData = menuResult.docs.map(m => m.data())
        setMenu(menusData[0].menu);
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
