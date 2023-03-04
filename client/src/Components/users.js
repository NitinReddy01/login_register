import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function UserInfo() {
    const [users, setUsers] = useState([]); 
    const [search,setSearch] = useState("");
    const navigate = useNavigate();// to navigate between the routes

    // routes to update component with the user id
    const update = (id) => {
        navigate(`/update/${id}`);
    }
    //to delete a user
    const delUser = (id) => { 
        console.log(id);
        axios.delete(`http://localhost:4000/delUser/${id}`).then(res => {
            alert(res.data.message);
            getUsers();
        });
    }
    const getUsers = () => {
        axios.get('http://localhost:4000/getUsers').then((res) => {
            setUsers(res.data);
        });
    }
    // useEffect is used to get all the users as soon as the componenet is rendered
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <>
            <Navbar />
            <div className="username">
                <input className="uname" type="text" placeholder="Search Username" value={search} onChange={(e)=>setSearch(e.target.value)}  required  />
            </div>
            <div className="table container py-0">
                <table className="table table-bordered">
                    <thead >
                        <tr>
                            <th>Username</th>
                            <th >Branch</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* filter to implement search filter, we can use includes,startswith or any filter */}
                        {/* users- array of objects returned from the backend */}
                        {users.filter((user)=>user.name.includes(search)).map(user => (
                            <tr>
                                <td className="w-25">{user.name}</td>
                                <td className="w-25">{user.branch}</td>
                                <td className="w-25">{user.password}<span className="userBut"><button className="but" onClick={() => { update(user._id) }}>update</button><button className="but" onClick={() => {
                                    delUser(user._id)
                                }} >delete</button></span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}