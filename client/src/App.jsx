import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/Login';
import HistoryPage from './pages/History';
import NotFound from './pages/NotFound';
import HomePage from './pages/Home';
import AnalyzePage from './pages/Analyze';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';

import PrivateRoute from './utils/privateRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem('dev-helper-token'));

  useEffect(() => {
    if (token) localStorage.setItem('dev-helper-token', token);
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={setToken} />} />

        <Route
          path="/analyze"
          element={
            <PrivateRoute token={token}>
              <AnalyzePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <AboutPage />
          }
        />

        <Route
          path="/contact"
          element={
            <ContactPage />
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute token={token}>
              <HistoryPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;

