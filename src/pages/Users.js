import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { useNavigate } from "react-router-dom";

function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch users
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
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newLocalUsers = localUsers.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(newLocalUsers));
  };

  // ✅ Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>User List</h2>

      {/* ✅ Search Input */}
      <input
        className="search-input"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ Add Button */}
      <button
        className="add-btn"
        onClick={() => navigate("/add-user")}
      >
        Add User
      </button>

      {/* ✅ User List */}
      {filteredUsers.map((user) => (
        <div key={user.id} className="card">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>

          <button
            className="edit-btn"
            onClick={() =>
              navigate(`/edit-user/${user.id}`, { state: user })
            }
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;
