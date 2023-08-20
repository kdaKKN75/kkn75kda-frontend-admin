import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const status = localStorage.getItem('token');
        if (!status) {
            return navigate('/login');
        }
    }, [navigate]);

    return children;
};

export default ProtectedRoute;
