import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
});

export default App;
