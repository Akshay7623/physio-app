import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie';
import { Input, Button, Select, Option, Typography, IconButton, Drawer, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import HeaderWithBack from '../Components/HeaderWithBack';
import Eye from '../assets/images/eye.svg';
import BlindEye from '../assets/images/BlindEye.svg';
import AuthUser from '../Components/AuthUser';
import Done from '../assets/images/check-mark-icon.png';
import { GET_PROFILE_URL, SEND_OTP_UPDATE_MOBILE, UPDATE_PROFILE, SUBMIT_OTP_UPDATE_MOBILE, CHANGE_MAIL } from '../URLS';

const EditProfile = () => {

    const [gender, setGender] = useState();
    const [size, setSize] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [form, setForm] = useState({ firstName: '', lastName: '', mobile: '', email: '' });
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);
    const [timer, setTimer] = useState(90);
    const [newMobile, setNewMobile] = useState('');

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const mobileRef = useRef(null)
    const dateOfBirthRef = useRef(null)
    const emailRef = useRef(null)
    const genderRef = useRef(null)
    const NewMobileRef = useRef();
    const newPasswordRef = useRef();

    const dig1Ref = useRef();
    const dig2Ref = useRef();
    const dig3Ref = useRef();
    const dig4Ref = useRef();

    const otpErrorRef = useRef();
    const navigate = useNavigate();
    const user_token = localStorage.getItem('user_token');

    const handleOpen = (value) => setSize(value);

    const openDrawerBottom = () => setOpenBottom(true);
    const closeDrawerBottom = () => setOpenBottom(false);

    const togglePasswordVisibility = () => setShowNewPassword(!showNewPassword)

    function formatDateOfBirth(milliseconds) {
        let dob = new Date(milliseconds);
        let year = dob.getFullYear();
        let month = ('0' + (dob.getMonth() + 1)).slice(-2);
        let day = ('0' + dob.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }

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

    const changeEmail = () => {
        fetch(CHANGE_MAIL, {
            body: JSON.stringify({}),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user_token}`
            },
        }).then((res) => res.json()).then((data) => {
            Cookies.set('userId', data.userId);
            const popup = window.open(data.url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
            const interval = setInterval(() => {
                if (popup.closed) {
                    clearInterval(interval);
                    get_profile();
                }
            }, 500);
        });
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const removeError = () => {
        firstNameRef.current.classList.add('hidden');
        lastNameRef.current.classList.add('hidden');
        mobileRef.current.classList.add('hidden');
        dateOfBirthRef.current.classList.add('hidden');
        emailRef.current.classList.add('hidden');
        genderRef.current.classList.add('hidden');
        newPasswordRef.current?.classList.add('hidden');
    }

    const createError = (ele, message) => {
        ele.classList.add('flex');
        ele.classList.remove('hidden');
        ele.innerHTML = message;
    }

    const get_profile = () => {
        fetch(GET_PROFILE_URL, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user_token}`
            }
        }).then((res) => res.json()).then((data) => {
            if (data.message === 'success') {
                setForm({ firstName: data.user.first_name, lastName: data.user.last_name, email: data.user?.email || '', mobile: data.user?.mobile || '' })
                setDateOfBirth(dayjs(formatDateOfBirth(data.user?.date_of_birth || 0)));
                setGender(data.user?.gender || '')
            }
        })
    }

    const updateProfile = () => {

        if (form.firstName.toString().trim().length < 3) {
            return createError(firstNameRef.current, 'Please enter valid first name !');
        }

        if (form.lastName.toString().trim().length < 3) {
            return createError(lastNameRef.current, 'Please enter valid last name !')
        }

        if (dateOfBirth === null) {
            return createError(dateOfBirthRef.current, 'Please select date of Birth !');
        }

        if (!['male', 'female'].includes(gender)) {
            return createError(genderRef.current, 'Please select gender!')
        }

        const updateProfile = new Promise((resolve, reject) =>
            fetch(UPDATE_PROFILE, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user_token}`
                },
                body: JSON.stringify({ first_name: form.firstName, last_name: form.lastName, date_of_birth: dateOfBirth, gender: gender })
            }).then((res) => res.json()).then((data) => {

                if (data.message === 'USER_NOT_FOUND' || data.message === 'INVALID_DATA' || data.message === 'AUTH_FAILED') {
                    return reject(0)
                }

                if (data.message === 'success') {
                    return resolve(1)
                }
            }))
        toast.promise(updateProfile, { loading: 'Updating...', error: "Failed to update Profile!", success: "Profile Updated Successfully." })
    }

    const updateMobileSubmitOTP = () => {

        let OTP = dig1Ref.current.value + dig2Ref.current.value + dig3Ref.current.value + dig4Ref.current.value;
        if (OTP.trim().length !== 4) {
            otpErrorRef.current.classList.remove('hidden');
        } else {

            if (newPassword.toString().trim().length < 8 && form.mobile === '') {
                return createError(newPasswordRef.current, 'Password length must be at least 8 character');
            }

            fetch(SUBMIT_OTP_UPDATE_MOBILE, {
                method: "POST",
                body: JSON.stringify({ otp: OTP, mobile: newMobile, new_password: newPassword }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user_token}`
                },
            }).then((res) => res.json()).then((data) => {

                if (data.message === 'success') {
                    setForm({ ...form, mobile: newMobile })
                    setNewMobile('')
                    handleOpen(null)
                    toast.success('Mobile number changed successfully');
                }

                if (data.message === 'ERROR' || data.message === 'USER_NOT_EXIST' || data.message === 'AUTH_FAILED' || data.message === 'INVALID_DATA') {
                    handleOpen(null)
                    toast.error('Failed  to change mobile number')
                }

                if (data.message === 'INVALID_OTP') {
                    otpErrorRef.current.classList.remove('hidden')
                }
            });
        }
    }

    const sendOtp = () => {
        if (newMobile.toString().trim().length !== 10) {
            NewMobileRef.current.classList.remove('hidden');
            NewMobileRef.current.innerHTML = 'Please enter valid mobile !';
        } else {

            const sendChangeMobileOtpPromise = new Promise((resolve, reject) => {
                fetch(SEND_OTP_UPDATE_MOBILE, {
                    method: "POST",
                    body: JSON.stringify({ mobile: newMobile }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user_token}`
                    },
                }).then((res) => res.json()).then((data) => {

                    if (data.message === 'success') {
                        resolve()
                        setTimer(90)
                        handleOpen("xs")
                        closeDrawerBottom()
                    }

                    if (data.message === 'REQUEST_ALREADY_EXISTS') {
                        resolve()
                        setTimer(parseInt(90 - data.time_passed))
                        handleOpen("xs")
                        closeDrawerBottom()
                    }

                    if (data.message === 'DATA_EXIST') {
                        reject();
                        createError(NewMobileRef.current, 'Mobile number already exist !')
                    }

                    if (data.message === 'AUTH_FAILED' || data.message === 'INVALID_DATA' || data.message === 'FAILED_TO_SEND_OTP' || data.message === 'UNABLE_TO_VERIFY') {
                        reject();
                    }
                })
            })

            toast.promise(sendChangeMobileOtpPromise, { loading: 'Sending OTP', success: 'OTP sent successfully', error: 'Failed to send OTP !' })
        }
    }

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                navigate('/login');
            }
            get_profile()
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

            <div className='max-w-screen-xl mx-auto'>
                <HeaderWithBack title='Profile' />
                <Toaster />

                <div className='mx-auto text-center mt-4 flex flex-row justify-center'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#70797d" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                </div>

                <div className='max-w-[900px] mx-auto'>
                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Input name='firstName' className='font-semibold' label='First Name' type='text' value={form.firstName} onChange={handleChange} onFocus={removeError}
                            icon={
                                <svg onClick={() => setForm({ ...form, firstName: '' })} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                </svg>
                            } />

                        <Typography
                            ref={firstNameRef}
                            variant="small"
                            color="gray"
                            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Input name='lastName' className='font-semibold' label='Last Name' type='text' value={form.lastName} onChange={handleChange} onFocus={removeError}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setForm({ ...form, lastName: '' })} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                </svg>
                            } />
                        <Typography
                            ref={lastNameRef}
                            variant="small"
                            color="gray"
                            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Input className='custom_input font-semibold' name='mobile' label='Mobile' type='text' value={form.mobile} onChange={handleChange} onFocus={removeError} disabled
                            icon={
                                <svg onClick={openDrawerBottom} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>
                            } />
                        <Typography
                            ref={mobileRef}
                            variant="small"
                            color="gray"
                            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={dateOfBirth}
                                className='w-[100%]'
                                label="Date Of Birth"
                                slotProps={{
                                    textField: { size: 'small' },
                                }}
                                onChange={(val) => setDateOfBirth(val)}
                                onClose={removeError}
                                format="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                        <Typography
                            ref={dateOfBirthRef}
                            variant="small"
                            color="gray"
                            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Input className='custom_input font-semibold' name='email' label='Email' type='email' value={form.email} onChange={handleChange} onFocus={removeError} disabled
                            icon={
                                <svg onClick={changeEmail} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>
                            } />
                        <Typography
                            ref={emailRef}
                            variant="small"
                            color="gray"
                            className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Select className='font-semibolds' value={gender} label="Gender" onChange={(val) => setGender(val)} onBlur={removeError}>
                            <Option className='font-semibold' value="male">Male</Option>
                            <Option className='font-semibold' value="female">Female</Option>
                        </Select>
                        <Typography ref={genderRef} variant="small" color="gray" className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden">
                            .
                        </Typography>
                    </div>
                    <div className='px-4 md:px-8 lg:px-24 mt-4 flex flex-row justify-between'>
                        <Button fullWidth onClick={updateProfile}>Update Profile</Button>
                    </div>
                </div>

                <Dialog open={size === "xs"} size="xs" handler={handleOpen} >
                    <img className='w-14 mx-auto mt-4' src={Done} alt='done' />
                    <DialogHeader className='text-base md:text-lg pb-0'>Enter OTP</DialogHeader>
                    <DialogBody>
                        <div className='flex flex-row gap-4'>
                            <div>
                                <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig1Ref} className='w-[33px] text-sm h-[33px] text-center font-semibold' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} onChange={(e) => handleOtpChange(dig1Ref, dig2Ref, e)} onKeyDown={(e) => handleKeyDown(dig1Ref, null, e)} />
                            </div>
                            <div>
                                <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig2Ref} className='w-[33px] text-sm h-[33px] text-center font-semibold' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} onChange={(e) => handleOtpChange(dig2Ref, dig3Ref, e)} onKeyDown={(e) => handleKeyDown(dig2Ref, dig1Ref, e)} />
                            </div>
                            <div>
                                <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig3Ref} className='w-[33px] text-sm h-[33px] text-center font-semibold' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} onChange={(e) => handleOtpChange(dig3Ref, dig4Ref, e)} onKeyDown={(e) => handleKeyDown(dig3Ref, dig2Ref, e)} />
                            </div>
                            <div>
                                <input onFocus={() => otpErrorRef.current.classList.add('hidden')} ref={dig4Ref} className='w-[33px] text-sm h-[33px] text-center font-semibold' style={{ border: '1.5px solid rgb(176 190 197)', borderRadius: '5px' }} type='text' maxLength={1} max={1} onChange={(e) => handleOtpChange(dig4Ref, null, e)} onKeyDown={(e) => handleKeyDown(dig4Ref, dig3Ref, e)} />
                            </div>
                        </div>
                        <div ref={otpErrorRef} className='mt-4 text-xs hidden text-red-500 font-semibold'>
                            Invalid OTP !
                        </div>

                        {form.mobile === '' ? <div className='mt-4'>
                            <Input className='w-4 h-4 cursor-pointer font-semibold' onFocus={removeError} onChange={(e) => setNewPassword(e.target.value)} value={newPassword} label='Set Password' type={showNewPassword ? 'text' : 'password'} icon={<img onClick={() => togglePasswordVisibility()} src={showNewPassword ? BlindEye : Eye} alt='eye' />} />
                            <Typography
                                ref={newPasswordRef}
                                variant="small"
                                color="gray"
                                className="mt-2  items-center gap-1  text-xs font-normal text-[red] hidden"
                            >.</Typography>
                        </div> : ''}

                    </DialogBody>
                    <DialogFooter className='flex flex-row justify-around'>
                        <div>{timer > 0 ? <div className='text-xs'>Resend {timer} sec</div> : <Button variant="text" size='sm' onClick={sendOtp}>Resend</Button>}</div>
                        <div>
                            <Button variant="gradient" size='sm' color="#212121" onClick={updateMobileSubmitOTP}>
                                <span>Submit</span>
                            </Button>
                        </div>
                    </DialogFooter>
                </Dialog >

                <Drawer placement="bottom" open={openBottom} onClose={closeDrawerBottom} className="p-4">
                    <div className="mb-6 flex items-center justify-between">
                        <Typography variant="h6" color="blue-gray">
                            Change Mobile
                        </Typography>
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawerBottom}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </IconButton>
                    </div>

                    <Input className='font-semibold' name='new_mobile' label='New Mobile' type='number' value={newMobile} onChange={(e) => setNewMobile(e.target?.value)} onFocus={() => NewMobileRef.current.classList.add('hidden')} />
                    <Typography ref={NewMobileRef} variant="small" color="gray" className="mt-2  items-center gap-1  text-xs text-[red] hidden font-semibold">
                        .
                    </Typography>
                    <Button fullWidth onClick={sendOtp} className='mt-8'>Send OTP</Button>
                </Drawer>
            </div>
        </>
    )
}

export default EditProfile









