import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const status = Cookies.get('isLoggedIn');
        if (!status) {
            return navigate('/login');
        }
    }, [navigate]);

    return children;
};

export default ProtectedRoute;
