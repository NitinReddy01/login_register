import Login from "./Components/login";
import "./App.css";
import Register from "./Components/register";
import { useState } from "react";
import axios from "axios";
import UserInfo from "./Components/users";


function App() {
  const [toggle,setToggle]=useState("login");
  const [users, setUsers] = useState([]);
  const [userDisplay, setUserDisplay] = useState(false);
  const changeToggle=(e)=>{
    e.preventDefault();
    setToggle(toggle ==="login"?"register":"login");
  }
  const getUser = (event) => {
    event.preventDefault();
    axios.get('http://localhost:4000/getUsers').then((res) => {
        setUsers(res.data);
        setUserDisplay(true);
    });
}
  if(toggle==="login"){
    return (
      <>
      <Login changeToggle={changeToggle} getUser={getUser}/>
      <UserInfo users={users} userDisplay={userDisplay}/>
      </>
    );
  }
  else{
    return (
      <>
      <Register changeToggle={changeToggle} getUser={getUser}/>
      <UserInfo users={users} userDisplay={userDisplay}/>
      </>
    );
  }
}

export default App;
