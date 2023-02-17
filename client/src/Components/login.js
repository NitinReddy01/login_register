import React, { useState } from "react";

export default function Login(props) {
    const [uname, setuname] = useState("");
    const [pword, setPword] = useState("");
    const [error, setError] = useState(false);
    const login = (event) => {
        event.preventDefault();
        if (uname === '' || pword === '') {
            setError(true);
        }
        else {
            console.log(uname, pword);
            setError(false);
        }
        setPword("");
        setuname("");
    }
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h2>Please enter all the fields</h2>
            </div>
        );
    };
    return (
        <>
            <form >
                <div className="box">
                    <div className="login">
                        Sign In
                    </div>
                    <div className="message">
                        {errorMessage()}
                    </div>
                    <div className="username">
                        <input className="uname" type="text" placeholder="Username" value={uname} required onChange={(e) => setuname(e.target.value)} />
                    </div>
                    <div className="password">
                        <input className="pword" type="password" placeholder="Password" value={pword} required onChange={(e) => { setPword(e.target.value) }} />
                    </div>
                    <div className="or1">
                        not a member?<a className="orsign" href="/" onClick={props.changeToggle}> signup now </a><br></br>
                        <a className="orsign" href="/" onClick={props.getUser}> getUsers </a>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={login} >SIGN IN</button>
                    </div>
                </div>
            </form>
        </>
    )
}
