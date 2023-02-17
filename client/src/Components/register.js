import React, { useState } from "react";
import axios from 'axios';

export default function Register(props) {
    const [uname, setUname] = useState("");
    const [branch, setBranch] = useState("Choose Branch")
    const [pword, setPword] = useState("");
    const [confirmPword, setConfirmPword] = useState("");
    const [error, setError] = useState(false);
    const [errInfo, setErrInfo] = useState("");
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
        if (uname === '' || pword === '' || confirmPword === '' || branch==='Choose Branch') {
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
                branch:branch,
                password: pword
            }
            axios.post('http://localhost:4000/userRegister', user).then(res => alert(res.data.message));
            setPword("");
            setUname("");
            setBranch("Branch")
            setConfirmPword("");
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
                            <option value="none">Branch</option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="CSD">CSD</option>
                            <option value="CSM">CSM</option>
                        </select>
                    </div>
                    <div className="password">
                        <input className="pword" value={pword} onChange={pwrodChange} type="password" placeholder="password" required />
                    </div>
                    <div className="password">
                        <input className="pword" value={confirmPword} onChange={cpwordChange} type="password" placeholder="confirm password" required />
                    </div>
                    <div className="or1">
                        already a member?<a className="orsign" href="/" onClick={props.changeToggle}> signin </a><br></br>
                        <a className="orsign" href="/" onClick={props.getUser}> getusers </a>
                    </div>
                    <div className="or1">
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={register}>SIGN UP</button>
                    </div>
                </div>
            </form>
        </>
    );
}