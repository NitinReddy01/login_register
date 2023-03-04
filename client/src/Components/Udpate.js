import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function Update() {
    const [uname, setUname] = useState("");
    const [branch, setBranch] = useState("Choose Branch")
    const [pword, setPword] = useState("");
    const [error, setError] = useState(false);
    const [errInfo, setErrInfo] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    // to get the data of the user we are updating as soon the component is rendered
    useEffect(() => {
        getUser(id);
    }, [id])
    //  to get user details
    const getUser = (id) => {
        axios.get(`http://localhost:4000/getUser/${id}`).then(res => {
            setUname(res.data.name);
            setBranch(res.data.branch);
            setPword(res.data.password);
        })
    }
    const unameChange = (event) => {
        setUname(event.target.value);
    }
    const pwrodChange = (event) => {
        setPword(event.target.value);
    }
    //updating the user details
    const update = (event) => {
        event.preventDefault();
        if (uname === '' || pword === '' || branch === "Choose Branch") {
            setError(true);
            setErrInfo("Please enter all the fields")
        }
        else {
            setError(false);
            let user = {
                name: uname,
                branch: branch,
                password: pword
            }
            axios.post(`http://localhost:4000/updateUser/${id}`, user).then(res => {
                alert(res.data.message)
                setPword("");
                setUname("");
                setBranch("Choose Branch")
                navigate("/allUsers")
            });
        }
    }
    // to display error msg if any fields are empty
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h2>{errInfo}</h2>
            </div>
        );
    };
    return (
        <>
            <Navbar/>
            <form action="/">
                <div className="box">
                    <div className="login">
                        Update User
                    </div>
                    <div className="message">
                        {errorMessage()}
                    </div>
                    <div className="username">
                        <input className="uname" value={uname} onChange={unameChange} type="text" placeholder="username" required />
                    </div>
                    <div className="branch">
                        <select className="dropdown" value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value="none">{branch}</option>
                            <option >CSE</option>
                            <option >IT</option>
                            <option >CSD</option>
                            <option >CSM</option>
                        </select>
                    </div>
                    <div className="password">
                        <input className="pword" value={pword} onChange={pwrodChange} type="text" placeholder="password" required />
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={update}>Update User</button>
                    </div>
                </div>
            </form>
        </>
    );
}