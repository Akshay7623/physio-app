import { AUTH_ADMIN_URL } from '../../URLS';

const AuthAdmin = async() => {
  const token = localStorage.getItem('admin_token');

  if (token) {
    const res = await fetch(AUTH_ADMIN_URL, {
        method: 'get',
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

export default AuthAdmin