import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { StatsProvider } from './context/StatsContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashboardLayout from './components/Layout/DashboardLayout';
import Home from './pages/Dashboard/Home';
import CreateSnippet from './pages/Snippet/CreateSnippet';
import SnippetDetails from './pages/Snippet/SnippetDetails';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <StatsProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Home />} />
                <Route path="create" element={<CreateSnippet />} />
                <Route path="snippet/:id" element={<SnippetDetails />} />
              </Route>
            </Routes>
          </Router>
        </StatsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
