export default function UserInfo(props){
    return (
        <div className="table container py-0" style={{
            display: props.userDisplay ? '' : 'none',
        }}>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Branch</th>
                        <th >Password</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(user => (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.branch}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}