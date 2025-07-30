import { AUTH_USER_URL } from '../URLS';

const AuthUser = async () => {
    const token = localStorage.getItem('user_token');
    if (token) {
        const res = await fetch(AUTH_USER_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data;
    } else {
        return { message: "AUTH_FAILED" };
    }
}

export default AuthUser