import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ContestsPage from './pages/ContestsPage';
import MatchPage from './pages/MatchPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/contests" element={<ContestsPage />} />
      <Route path="/match/:contestId" element={<MatchPage />} />
    </Routes>
  );
}

export default App;
