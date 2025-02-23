export default function RoomList({ users }) {
    return (
        <div>
            <h3>Connected Users:</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    );
}
