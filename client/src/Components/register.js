import React, { useState } from "react";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

export default function Register(props) {
    const [uname, setUname] = useState("");
    const [branch, setBranch] = useState("Choose Branch")
    const [pword, setPword] = useState("");
    const [confirmPword, setConfirmPword] = useState("");
    const [error, setError] = useState(false);
    const [errInfo, setErrInfo] = useState("");
    const navigate=useNavigate();
    const unameChange = (event) => {
        setUname(event.target.value);
    }
    const pwrodChange = (event) => {
        setPword(event.target.value);
    }
    const cpwordChange = (event) => {
        setConfirmPword(event.target.value);
    }
    const register = (event) => {
        event.preventDefault();
        if (uname === '' || pword === '' || confirmPword === '' || branch === "Choose Branch") {
            setError(true);
            setErrInfo("Please enter all the fields")
        }
        else if (pword !== confirmPword) {
            setError(true);
            setErrInfo("Passwords do not match");
        }
        else {
            setError(false);
            let user = {
                name: uname,
                branch: branch,
                password: pword
            }
            axios.post('http://localhost:4000/userRegister', user).then(res => {
                alert(res.data.message)
                setPword("");
                setUname("");
                setBranch("Choose Branch")
                setConfirmPword("");
                navigate("/login")
            });
        }
    }
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
            <form action="/">
                <div className="box">
                    <div className="login">
                        Sign Up
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
                        <input className="pword" value={pword} onChange={pwrodChange} type="password" placeholder="password" required />
                    </div>
                    <div className="password">
                        <input className="pword" value={confirmPword} onChange={cpwordChange} type="password" placeholder="confirm password" required />
                    </div>
                    <div className="or1">
                        already a member?<Link className="orsign" to="/login" > signin </Link><br></br>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={register}>SIGN UP</button>
                    </div>
                </div>
            </form>
        </>
    );
}