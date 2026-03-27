import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditUser() {
  const { state } = useLocation();
  const [form, setForm] = useState(state);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map((u) =>
      u.id === form.id ? form : u
    );

    localStorage.setItem("users", JSON.stringify(users));

    navigate("/users");
  };

  return (
    <div>
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <br />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
