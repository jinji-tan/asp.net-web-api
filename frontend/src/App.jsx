import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register";
import ProtectedRoute from "./helpers/ProtectedRoute";

const App = () => {
  return (
    <div className="bg-slate-900 h-screen w-full text-white flex justify-center items-center content-center">
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  )
}

export default App;