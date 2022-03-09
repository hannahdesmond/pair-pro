import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PairProsPage from "./components/PairProsPage";
import MePage from "./components/MePage";
import ChatPage from "./components/ChatPage";
import Footer from "./components/Footer";
import "./index.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { state } = useContext(AuthContext);

  return (
    <>
      <Router data-testid="container" className="container">
        <div className="height-min90vh">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pairpros" element={<PairProsPage />} />
            <Route
              path="/login"
              element={
                state.isLoggedIn ? <Navigate to="/pairpros" /> : <LoginPage />
              }
            ></Route>
            <Route
              path="/register"
              element={
                state.isLoggedIn ? <Navigate to="/pairpros" /> : <RegisterPage />
              }
            ></Route>
            <Route path="/me" element={<MePage />}></Route>
            <Route
              path="/chat"
              element={state.isLoggedIn ? <ChatPage /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/chat/:conversationId"
              element={state.isLoggedIn ? <ChatPage /> : <Navigate to="/login" />}
            ></Route>
          </Routes>
        </div>
      </Router>
      <Footer />
      <ToastContainer />
    </>
    
  );
};

export default App;
