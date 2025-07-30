import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import AuthAdmin from '../../Components/Admin/AuthAdmin';
import { useNavigate } from 'react-router-dom';
import { ADMIN_LOGIN } from '../../URLS'

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = () => {
        console.log('login admin ')
        const loginPromise = new Promise((res, rej) => {
            fetch(ADMIN_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
            }).then((res) => res.json()).then((data) => {
                
                if(data.message === 'INVALID_DATA' ||   data.message === 'INVALID_CREDENTIAL'){
                    rej();
                }

                if (data.message === 'success') {
                    localStorage.setItem('admin_token', data.token)
                    navigate('/admin/home');
                }
            })
        })

        toast.promise(loginPromise, {
            loading: 'Logging...',
            error: 'Unbale to login',
            success: 'Success'
        })
    }

    
    useEffect(() => {
        AuthAdmin().then((data) => {
            if (data.message !== 'AUTH_FAILED') {
                navigate('/admin/home')
            }
        })
    }, [])

    return (
        <>

            <Toaster />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Admin
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <button onClick={login} type="submit" className="w-full text-white bg-[blue] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default AdminLogin