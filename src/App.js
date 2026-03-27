import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Default Route */}
        <Route path="/" element={<Navigate to="/users" />} />

        {/* ✅ Pages */}
        <Route path="/users" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
