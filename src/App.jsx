import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
   return (
      <Router>
         <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
               path='/admin'
               element={
                  <PrivateRoute>
                     <AdminPage />
                  </PrivateRoute>
               }
            />
            <Route path='*' element={<ErrorPage />} />
         </Routes>
      </Router>
   );
}

export default App;
