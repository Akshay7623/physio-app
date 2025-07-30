import { useEffect, useRef, useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import HeaderWithBack from '../Components/HeaderWithBack';
import Eye from '../assets/images/eye.svg';
import BlindEye from '../assets/images/BlindEye.svg';
import AuthUser from '../Components/AuthUser';
import { CHANGE_PASSWORD } from '../URLS';

const SecuritySettings = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);

    const repeatPassRef = useRef(null);
    const oldPassRef = useRef(null);

    const navigate = useNavigate();

    const user_token = localStorage.getItem('user_token');

    const togglePasswordVisibility = (field) => {
        switch (field) {
            case 'oldPassword':
                setShowOldPassword(!showOldPassword);
                break;
            case 'newPassword':
                setShowNewPassword(!showNewPassword);
                break;
            case 'repeatNewPassword':
                setShowRepeatNewPassword(!showRepeatNewPassword);
                break;
            default:
                break;
        }
    }

    const removeError = () => {
        repeatPassRef.current.classList.add('hidden');
        oldPassRef.current.classList.add('hidden');
    }

    const createError = (ele, message) => {
        ele.classList.add('flex');
        ele.classList.remove('hidden');
        ele.innerHTML = message;
    }

    const changePassword = () => {

        if (oldPassword.toString().length < 8) {
            return createError(oldPassRef.current, "Password length must be 8 characters atleast !")
        }


        if (newPassword.toString().length < 8) {
            return createError(repeatPassRef.current, "Password length must be 8 characters atleast !")
        }

        if (newPassword === repeatNewPassword) {

            if (oldPassword === newPassword) {
                createError(repeatPassRef.current, "Old and new password are same !")
            } else {
                console.log('make fetch request here update the password here !!');
                const updatePassword = new Promise((resolve, reject) =>
                    fetch(CHANGE_PASSWORD, {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user_token}`
                        },
                        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
                    }).then((res) => res.json()).then((data) => {
                        if (data.message === 'success') {
                            setOldPassword('');
                            setNewPassword('');
                            setRepeatNewPassword('');
                            return resolve(1)
                        }

                        if (data.message === 'WRONG_PASSWORD') {
                            createError(oldPassRef.current, 'Old password is wrong !');
                            return reject(1)
                        }

                        if (data.message === 'USER_NOT_FOUND' || data.message === 'INVALID_DATA' || data.message === 'AUTH_FAILED') {
                            reject();
                        }
                    })
                )

                toast.promise(updatePassword, { loading: 'Changing...', error: "Failed to update Password!", success: "Password Changed Successfully." })
            }

        } else {
            console.log('Password does not match here ! Error');
            createError(repeatPassRef.current, "Password does not matched !");
        }
    }

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                navigate('/login')
            }
        })
    }, [])

    return (
        <>

            <div className='max-w-screen-xl mx-auto'>

                <HeaderWithBack title='Security & Settings' />
                <Toaster />

                <div className='mx-auto text-center mt-4 flex flex-row justify-center gap-3'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#70797d" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='text-[#70797d] font-semibold text-sm'>
                        Change Your Password
                    </div>
                </div>

                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Input onFocus={removeError} className='font-semibold' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} label='Old Password' type={showOldPassword ? 'text' : 'password'} icon={<img onClick={() => togglePasswordVisibility('oldPassword')} className='w-4 h-4 cursor-pointer' src={showOldPassword ? BlindEye : Eye} alt='eye' />} />
                    <Typography
                        ref={oldPassRef}
                        variant="small"
                        color="gray"
                        className="mt-2  items-center gap-1  text-xs font-semibold text-[red] hidden"
                    >.</Typography>
                </div>

                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Input onFocus={removeError} className='font-semibold' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} label='New Password' type={showNewPassword ? 'text' : 'password'} icon={<img onClick={() => togglePasswordVisibility('newPassword')} className='w-4 h-4 cursor-pointer' src={showNewPassword ? BlindEye : Eye} alt='eye' />} />
                </div>

                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Input onFocus={removeError} className='font-semibold' onChange={(e) => setRepeatNewPassword(e.target.value)} value={repeatNewPassword} label='Repeat New Password' type={showRepeatNewPassword ? 'text' : 'password'} icon={<img onClick={() => togglePasswordVisibility('repeatNewPassword')} className='w-4 h-4 cursor-pointer' src={showRepeatNewPassword ? BlindEye : Eye} alt='eye' />} />
                    <Typography
                        ref={repeatPassRef}
                        variant="small"
                        color="gray"
                        className="mt-2  items-center gap-1  text-xs font-semibold text-[red] hidden"
                    >.</Typography>
                </div>

                <div onClick={changePassword} className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Button fullWidth>Change Password</Button>
                </div>

            </div>
        </>
    );
};

export default SecuritySettings;
