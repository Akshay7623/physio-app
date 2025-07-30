import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Input, Typography } from "@material-tailwind/react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import toast, { Toaster } from 'react-hot-toast';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Eye from '../assets/images/eye.svg';
import BlindEye from '../assets/images/BlindEye.svg';
import AuthUser from '../Components/AuthUser';
import Done from '../assets/images/check-mark-icon.png';
import { RESET_PASSWORD, RESET_PASSWORD_OTP } from '../URLS';

const ResetPass = () => {

    const [form, setForm] = useState({ mobile: '', otp: '', new_password: '', confirm_password: '' });
    const [timer, setTimer] = useState(90);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [size, setSize] = useState(null);

    const mobileRef = useRef();
    const OTPRef = useRef();
    const PasswordRef = useRef();
    const RepeatPasswordRef = useRef();

    const navigate = useNavigate();

    const handleOpen = (value) => setSize(value);

    const removeError = () => {
        mobileRef.current.classList.add('hidden');
        OTPRef.current.classList.add('hidden');
        PasswordRef.current.classList.add('hidden');
        RepeatPasswordRef.current.classList.add('hidden');
    }

    const createError = (ele, message) => {
        ele.classList.add('flex');
        ele.classList.remove('hidden');
        ele.innerHTML = message;
    }

    const OpenModal = () => {
        handleOpen("xs")
    }

    const resendOTP = () => {
        fetch(RESET_PASSWORD_OTP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobile: form.mobile }),
        }).then((res) => res.json()).then((data) => {

            if (data.message === 'success') {
                toast.success('OTP sent !')
                setTimer(90)
            }

            if (data.message === 'TIME_ERROR') {
                toast.success('OTP sent !')
                setTimer(parseInt(90 - data.time_passed))
            }

            if (data.message === 'USER_NOT_EXIST') {
                toast.error('Failed to send OTP !')
            }
        })
    }

    const sendOTP = () => {

        if (form.mobile.toString().trim().length !== 10) {
            return createError(mobileRef.current, 'Please enter valid mobile !');
        }

        const sendOTPPromise = new Promise((res, rej) => {
            fetch(RESET_PASSWORD_OTP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mobile: form.mobile }),
            }).then((res) => res.json()).then((data) => {

                if (data.message === 'success') {
                    res()
                    setTimer(90)
                    OpenModal()
                }

                if (data.message === 'TIME_ERROR') {
                    res()
                    OpenModal();
                    setTimer(parseInt(90 - data.time_passed))
                }

                if (data.message === 'USER_NOT_EXIST') {
                    rej();
                    createError(mobileRef.current, 'User not registered !');
                }
            })
        })

        toast.promise(sendOTPPromise, {
            loading: 'Sending otp',
            success: 'OTP sent successfully',
            error: 'Failed to send OTP !'
        })
    }

    const submitResetPass = () => {

        if (form.otp.toString().trim().length !== 4) {
            return createError(OTPRef.current, 'Please enter valid OTP !');
        }

        if (form.new_password.toString().trim().length < 8) {
            return createError(PasswordRef.current, 'Password length must be at least 8 characters !');
        }

        if (form.confirm_password.toString().trim().length < 8) {
            return createError(RepeatPasswordRef.current, 'Password length must be at least 8 characters !');
        }

        if (form.new_password !== form.confirm_password) {
            return createError(RepeatPasswordRef.current, 'Password does not match !');
        }

        const resetPasswordPromise = new Promise((res, rej) => {
            fetch(RESET_PASSWORD, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mobile: form.mobile, otp: form.otp, new_password: form.new_password }),
            }).then((res) => res.json()).then((data) => {
                if (data.message === 'success') {
                    res();
                    setForm({ mobile: '', otp: '', new_password: '', confirm_password: '' })
                    handleOpen(null)
                }

                if (data.message === 'INVALID_OTP') {
                    rej();
                    return createError(OTPRef.current, 'Invalid OTP !');
                }

                if (data.message === 'ERROR' || data.message === 'USER_NOT_EXIST' || data.message === 'INVALID_DATA') {
                    rej();
                }
            })
        });

        toast.promise(resetPasswordPromise, {
            loading: 'Changing password ...',
            success: 'Password changed successfully !',
            error: 'Failed to change password !'
        })
    }

    const togglePasswordVisibility = (type) => {
        if (type === 'repeat') {
            setShowRepeatPassword(!showRepeatPassword)
        } else {
            setShowPassword(!showPassword)
        }
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
                    <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-8 lg:text-2xl">Reset Password</h2>
                    <div className="mx-auto max-w-lg rounded-lg border border-[#B0BEC5]">
                        <div className="flex flex-col gap-4 p-4 md:p-8">
                            <div className="w-100%">
                                <Input type='number' className='font-semibold' label="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} value={form.mobile} onFocus={removeError} />
                                <Typography ref={mobileRef} variant="small" color="gray" className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden">
                                    .
                                </Typography>
                            </div>
                            <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base" onClick={sendOTP}>Send OTP</button>
                        </div>
                        <div className="flex items-center justify-center bg-gray-100 px-4 py-3 font-semibold">
                            <p className="text-center text-sm text-gray-500">Don&apos;t have an account? <NavLink to='/register' className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</NavLink></p>
                        </div>
                        <div className="flex items-center justify-center bg-gray-100 px-4 pb-3 font-semibold">
                            <p className="text-center text-sm text-gray-500">Already have an account? <NavLink to="/login" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Login</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={size === "xs"} size="xs" handler={handleOpen} dismiss={{ outsidePress: false }} >
                <img className='w-14 mx-auto mt-4' src={Done} alt='done' />
                <DialogHeader className='text-base md:text-lg mb-0 pb-0 ml-3'>Enter OTP</DialogHeader>
                <DialogBody>
                    <div className="w-[100%] flex flex-col p-[12px] text-[10px] leading-[20px] overflow-auto">
                        <div className="w-100%">
                            <Input type='text' label="OTP" maxLength={4} onChange={(e) => setForm({ ...form, otp: e.target.value })} value={form.otp} onFocus={removeError} />
                            <Typography ref={OTPRef} variant="small" color="gray"
                                className="mt-2 items-center gap-1 font-normal text-xs text-[red] hidden"
                            >.</Typography>
                        </div>

                        <div className="w-100% mt-4">
                            <Input type={showPassword ? 'text' : 'password'} label="New Password" onChange={(e) => setForm({ ...form, new_password: e.target.value })} value={form.new_password} onFocus={removeError} icon={<img onClick={() => togglePasswordVisibility('new_password')} className='w-4 h-4 cursor-pointer' src={showPassword ? BlindEye : Eye} alt='eye' />} />
                            <Typography ref={PasswordRef} variant="small" color="gray"
                                className="mt-2 items-center gap-1 font-normal text-xs text-[red] hidden"
                            >.</Typography>
                        </div>

                        <div className="w-100% mt-4">
                            <Input type={showRepeatPassword ? 'text' : 'password'} label="Confirm Password" onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} value={form.confirm_password} onFocus={removeError} icon={<img onClick={() => togglePasswordVisibility('repeat')} className='w-4 h-4 cursor-pointer' src={showRepeatPassword ? BlindEye : Eye} alt='eye' />} />
                            <Typography ref={RepeatPasswordRef} variant="small" color="gray"
                                className="mt-2 items-center gap-1 font-normal text-xs text-[red] hidden"
                            >.</Typography>
                        </div>
                    </div>

                </DialogBody>

                <DialogFooter className='flex flex-row justify-around pt-0'>
                    <div>{timer > 0 ? <div className='text-xs'>Resend {timer} sec</div> : <Button variant="text" size='sm' onClick={resendOTP}>Resend</Button>}</div>
                    <div>
                        <Button variant="gradient" size='sm' color="#212121" onClick={submitResetPass}>
                            <span>Submit</span>
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog >

            <Footer />
        </>
    )
}

export default ResetPass