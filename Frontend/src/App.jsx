import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route Redirects to Signup */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Home Route */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
