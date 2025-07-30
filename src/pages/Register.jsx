import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { Input, Button, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Eye from '../assets/images/eye.svg';
import BlindEye from '../assets/images/BlindEye.svg';
import AuthUser from '../Components/AuthUser';
import Done from '../assets/images/check-mark-icon.png';
import { GOOGLE_REQUEST_URL, SEND_OTP, SUBMIT_OTP } from '../URLS';

const Register = () => {

    const [form, setForm] = useState({ token: '', name: '', mobile: '', password: '' });
    const [size, setSize] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [timer, setTimer] = useState(90);

    const nameRef = useRef();
    const passwordRef = useRef();
    const mobileRef = useRef();

    const dig1Ref = useRef();
    const dig2Ref = useRef();
    const dig3Ref = useRef();
    const dig4Ref = useRef();

    const otpErrorRef = useRef();

    const navigate = useNavigate();

    const handleOtpChange = (currentRef, nextRef, e) => {
        const { value } = e.target;
        if (value && nextRef) {
            nextRef.current.focus();
        }

        if (!nextRef) {
            currentRef.current.blur();
        }
    }

    const handleKeyDown = (currentRef, prevRef, e) => {
        if (e.key === 'Backspace' && prevRef) {
            prevRef.current.focus();
            currentRef.current.value = '';
        }
    }

    const handleOpen = (value) => setSize(value);

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const removeError = () => {
        nameRef.current.classList.add('hidden');
        mobileRef.current.classList.add('hidden');
        passwordRef.current.classList.add('hidden');
    }

    const createError = (ele, message) => {
        ele.classList.add('flex');
        ele.classList.remove('hidden');
        ele.innerHTML = message;
    }

    const resendOTP = () => {

        fetch(SEND_OTP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobile: form.mobile, name: form.name, password: form.password }),
        }).then((res) => res.json()).then((data) => {
            if (data.message === 'success') {
                setTimer(90);
            }

            if (data.message === 'UNABLE_TO_VERIFY' || data.message === 'FAILED_TO_SEND_OTP' || data.message === 'INVALID_DATA') {
                return toast.error('Some server error!')
            }
        })

    }

    const signUp = () => {

        if (form.name.toString().trim().length < 3) {
            return createError(nameRef.current, 'Please enter valid name !')
        }

        if (form.mobile.toString().trim().length !== 10) {
            return createError(mobileRef.current, 'Please enter valid number !');
        }

        if (form.password.toString().trim().length < 8) {
            return createError(passwordRef.current, 'Password length must be at least 8 characters !')
        }

        const sendOTPPromise = new Promise((res, rej) => {
            fetch(SEND_OTP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mobile: form.mobile, name: form.name, password: form.password }),
            }).then((res) => res.json()).then((data) => {

                if (data.message === 'success') {
                    res();
                    setTimer(90);
                    return handleOpen("xs")

                }

                if (data.message === 'TIME_ERROR') {
                    let time_passed = data.time_passed;
                    res();
                    setTimer(parseInt(90 - time_passed));
                    return handleOpen("xs");
                }

                if (data.message === 'REQUEST_ALREADY_EXISTS') {
                    res();
                    return handleOpen("xs");
                }

                if (data.message === 'USER_EXIST') {
                    rej();
                    return createError(mobileRef.current, 'User already exist please login')
                }

                if (data.message === 'UNABLE_TO_VERIFY' || data.message === 'FAILED_TO_SEND_OTP' || data.message === 'INVALID_DATA') {
                    rej()
                    return toast.error('Some server error!')
                }
            });
        });

        toast.promise(sendOTPPromise, {
            loading: 'Sending OTP',
            success: 'OTP sent',
            error: 'Failed to send OTP'
        });

    }

    const SubmitOTP = () => {

        let OTP = dig1Ref.current.value + dig2Ref.current.value + dig3Ref.current.value + dig4Ref.current.value;
        if (OTP.trim().length !== 4) {
            otpErrorRef.current.classList.add('show-submenu');
        } else {
            fetch(SUBMIT_OTP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: OTP, mobile: form.mobile, password: form.password }),
            }).then((res) => res.json()).then((data) => {

                if (data.message === 'success') {
                    localStorage.setItem('user_token', data.token)
                    navigate('/appointment')
                }

                if (data.message === 'INVALID_OTP' || data.message === 'USER_NOT_FOUND' || data.message === 'ERROR' || data.message === 'INVALID_DATA') {
                    otpErrorRef.current.classList.add('show-submenu')
                }

            });
        }
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

    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [timer])

    return (
        <>
            <Header />
            <Toaster />

            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-8 lg:text-2xl">Signup</h2>
                    <div className="mx-auto max-w-lg rounded-lg border border-[#B0BEC5]">
                        <div className="flex flex-col gap-4 p-4 md:p-8">
                            <div className="w-100%">
                                <Input type="text" className='font-semibold' onFocus={removeError} label="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
                                <Typography ref={nameRef} variant="small" color="gray"
                                    className="mt-2 items-center gap-1 font-normal text-xs text-[red] hidden"
                                >.</Typography>
                            </div>

                            <div className="w-100%">
                                <Input type="number" className='font-semibold' onFocus={removeError} label="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} value={form.mobile} />
                                <Typography ref={mobileRef} variant="small" color="gray"
                                    className="mt-2 items-center gap-1 text-xs text-[red] hidden font-semibold"
                                >.</Typography>
                            </div>

                            <div className="w-100%">
                                <Input label="Password" className='font-semibold' onChange={(e) => setForm({ ...form, password: e.target.value })} onFocus={removeError} type={showPassword ? 'text' : 'password'} icon={<img onClick={() => togglePasswordVisibility('oldPassword')} className='w-4 h-4 cursor-pointer' src={showPassword ? BlindEye : Eye} alt='eye' />} />
                                <Typography ref={passwordRef} variant="small" color="gray"
                                    className="mt-2 items-center gap-1 text-xs text-[red] hidden font-semibold"
                                >.</Typography>
                            </div>

                            <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base" onClick={signUp}>Register</button>

                            <div className="relative flex items-center justify-center">
                                <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                                <span className="relative bg-white px-4 text-sm text-gray-400  font-semibold">Signup with social</span>
                            </div>

                            <button onClick={loginWithGoogle} className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base google_btn">
                                <svg style={{ height: '1.25rem', width: '1.25rem', flexShrink: 0 }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4" />
                                    <path d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z" fill="#34A853" />
                                    <path d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z" fill="#FBBC05" />
                                    <path d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                        <div className="flex items-center justify-center bg-gray-100 px-4 py-3 font-semibold">
                            <p className="text-center text-sm text-gray-500">Already have an account? <NavLink to="/login" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Login</NavLink></p>
                        </div>
                        <div className="flex items-center justify-center bg-gray-100 px-4 pb-3 font-semibold">
                            <p className="text-center text-sm text-gray-500">Forgot password? <NavLink to='/reset-password' className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Reset Here</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={size === "xs"} size="xs" handler={handleOpen} dismiss={{ outsidePress: false }} >

                <img className='w-14 mx-auto mt-4' src={Done} alt='done' />
                <DialogHeader className='text-base md:text-lg pb-0'>Enter OTP</DialogHeader>
                <DialogBody>
                    <div className='flex flex-row gap-4'>
                        <div>
                            <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig1Ref} className='w-[33px] text-sm h-[33px] text-center' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} onChange={(e) => handleOtpChange(dig1Ref, dig2Ref, e)} onKeyDown={(e) => handleKeyDown(dig1Ref, null, e)} />
                        </div>
                        <div>
                            <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig2Ref} className='w-[33px] text-sm h-[33px] text-center' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} onChange={(e) => handleOtpChange(dig2Ref, dig3Ref, e)} onKeyDown={(e) => handleKeyDown(dig2Ref, dig1Ref, e)} />
                        </div>
                        <div>
                            <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig3Ref} className='w-[33px] text-sm h-[33px] text-center' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} onChange={(e) => handleOtpChange(dig3Ref, dig4Ref, e)} onKeyDown={(e) => handleKeyDown(dig3Ref, dig2Ref, e)} />
                        </div>
                        <div>
                            <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig4Ref} className='w-[33px] text-sm h-[33px] text-center' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} max={1} onChange={(e) => handleOtpChange(dig4Ref, null, e)} onKeyDown={(e) => handleKeyDown(dig4Ref, dig3Ref, e)} />
                        </div>
                    </div>
                    <div ref={otpErrorRef} className='mt-4 text-xs hidden text-red-500'>
                        Invalid OTP !
                    </div>

                </DialogBody>
                <DialogFooter className='flex flex-row justify-around'>
                    <div>{timer > 0 ? <div className='text-xs'>Resend {timer} sec</div> : <Button variant="text" size='sm' onClick={resendOTP}>Resend</Button>}</div>
                    <div>
                        <Button variant="gradient" size='sm' color="#212121" onClick={SubmitOTP}>
                            <span>Submit</span>
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog >
            <Footer />
        </>
    )
}

export default Register