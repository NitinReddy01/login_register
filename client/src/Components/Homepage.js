import Navbar from "./Navbar";
export default function Homepage(props) {
    return (
        <>
            <Navbar setLoginUser={props.setLoginUser} />
            <div className="homeBox">
                <><h1>Homepage</h1></>
            </div>
        </>
    );
}