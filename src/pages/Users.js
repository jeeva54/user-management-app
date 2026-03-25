import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch users from API + LocalStorage
  useEffect(() => {
    getUsers()
      .then((res) => {
        const apiUsers = res.data;
        const localUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers([...apiUsers, ...localUsers]);
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ Delete User
  const deleteUser = (id) => {
    // Remove from UI
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    // Remove from localStorage
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newLocalUsers = localUsers.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(newLocalUsers));
  };

  return (
    <div>
      <h2>User List</h2>

      {/* ✅ Add User Button */}
      <button onClick={() => navigate("/add-user")}>
        Add User
      </button>

      {/* ✅ User List */}
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>

          {/* ✅ Edit Button */}
          <button
            onClick={() =>
              navigate(`/edit-user/${user.id}`, { state: user })
            }
          >
            Edit
          </button>

          {/* ✅ Delete Button */}
          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;