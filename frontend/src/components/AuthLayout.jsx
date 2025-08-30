import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const status = useSelector(state => state.auth.status);
  return status ? children : <Navigate to="/login" />;
}
