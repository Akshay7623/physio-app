import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const GoogleAuth = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('user_token', token)
            navigate('/appointment');
        }
    })
}

export default GoogleAuth