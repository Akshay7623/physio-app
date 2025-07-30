import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Input, Typography } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Eye from '../assets/images/eye.svg';
import BlindEye from '../assets/images/BlindEye.svg';
import AuthUser from '../Components/AuthUser';
import { GOOGLE_REQUEST_URL, LOGIN_URL } from '../URLS';

const Login = () => {

    const [form, setForm] = useState({ mobile: '', password: '' })
    const [showPassword, setShowPassword] = useState(false);

    const mobileRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const removeError = () => {
        mobileRef.current.classList.add('hidden');
        passwordRef.current.classList.add('hidden');
    }

    const createError = (ele, message) => {
        ele.classList.add('flex');
        ele.classList.remove('hidden');
        ele.innerHTML = message;
    }

    const login = () => {

        if (form.mobile.toString().trim().length !== 10) {
            return createError(mobileRef.current, 'Please enter valid number !');
        }

        if (form.password.toString().trim().length < 8) {
            return createError(passwordRef.current, 'Password length must be atleast 8 character !')
        }

        fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then((res) => res.json()).then((data) => {

            if (data.message === 'INVALID_DATA') {
                toast.error('Please enter valid mobile number or password !');
            }

            if (data.message === 'USER_NOT_FOUND') {
                toast.error('Please signup !');
            }

            if (data.message === 'VERIFIED') {
                localStorage.setItem('user_token', data.token)
                navigate('/appointment');
            }
        });
    }

    const loginWithGoogle = () => {
        fetch(GOOGLE_REQUEST_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        }).then((res) => res.json()).then((data) => {
            if (data.url) {
                location.href = data.url
            }
        });
    }

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message !== "AUTH_FAILED") {
                navigate('/appointment')
            }
        })
    }, [])

    return (
        <>
            <Header />
            <Toaster />
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-8 lg:text-2xl">Login</h2>
                    <div className="mx-auto max-w-lg rounded-lg border border-[#B0BEC5]">
                        <div className="flex flex-col gap-4 p-4 md:p-8">

                            <div className="w-100%">
                                <Input type='number' label="Mobile" className='font-semibold' onChange={(e) => setForm({ ...form, mobile: e.target.value })} value={form.mobile} onFocus={removeError} />
                                <Typography
                                    ref={mobileRef}
                                    variant="small"
                                    color="gray"
                                    className="mt-2 items-center gap-1 text-xs text-[red] hidden font-semibold"
                                >.</Typography>
                            </div>

                            <div className="w-100%">
                                <Input label="Password" className='font-semibold' onChange={(e) => setForm({ ...form, password: e.target.value })} value={form.password} onFocus={removeError} type={showPassword ? 'text' : 'password'} icon={<img onClick={() => togglePasswordVisibility('oldPassword')} className='w-4 h-4 cursor-pointer' src={showPassword ? BlindEye : Eye} alt='eye' />} />
                                <Typography
                                    ref={passwordRef}
                                    variant="small"
                                    color="gray"
                                    className="mt-2 items-center gap-1 text-xs text-[red] hidden font-semibold"
                                >.</Typography>
                            </div>

                            <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base font-semibold" onClick={login}>Log in</button>

                            <div className="relative flex items-center justify-center">
                                <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                                <span className="relative bg-white px-4 text-sm text-gray-400 font-[600]">Log in with social</span>
                            </div>

                            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base" onClick={loginWithGoogle}>
                                <svg className="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4" />
                                    <path d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z" fill="#34A853" />
                                    <path d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z" fill="#FBBC05" />
                                    <path d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                        <div className="flex items-center justify-center bg-gray-100 px-4 py-3 font-[600]">
                            <p className="text-center text-sm text-gray-500">Don&apos;t have an account? <NavLink to='/register' className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</NavLink></p>
                        </div>
                        <div className="flex items-center justify-center bg-gray-100 px-4 pb-3 font-[600]">
                            <p className="text-center text-sm text-gray-500">Forgot password? <NavLink to='/reset-password' className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Reset Here</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login