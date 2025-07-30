import { useEffect, useRef, useState } from 'react'
import HeaderWithBack from './HeaderWithBack'
import { Button, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react'
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_ADDRESS, GET_SINGLE_ADDRESS } from '../URLS';
import AuthUser from './AuthUser';

const EditAddress = () => {
    const [form, setForm] = useState({ mobile: null, pincode: null, address: null, landmark: null })
    const mobileRef = useRef();
    const pincodeRef = useRef();
    const addressRef = useRef();
    const landmarkRef = useRef();
    const navigate = useNavigate();
    const { id } = useParams();
    const user_token = localStorage.getItem('user_token');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const removeError = () => {
        mobileRef.current.classList.add('hidden');
        pincodeRef.current.classList.add('hidden');
        addressRef.current.classList.add('hidden');
        landmarkRef.current.classList.add('hidden');
    }

    const createError = (ele, message) => {
        ele.classList.add('flex');
        ele.classList.remove('hidden');
        ele.innerHTML = message;
    }

    const update_address = () => {

        if (form.mobile.toString().trim().length !== 10) {
            return createError(mobileRef.current, 'Please enter valid mobile number !');
        }

        if (form.pincode.toString().trim().length !== 6) {
            return createError(pincodeRef.current, 'Please enter valid pincode !')
        }

        if (form.address.toString().trim().length < 4) {
            return createError(addressRef.current, 'Please enter valid address !')
        }

        fetch(UPDATE_ADDRESS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user_token}`
            },
            body: JSON.stringify({ ...form, address_id: id }),
        }).then((res) => res.json()).then((data) => {
            if (data.message === 'success') {
                navigate(-1)
            }
        })
    }


    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                navigate('/login');
            }

            fetch(GET_SINGLE_ADDRESS, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user_token}`

                },
                body: JSON.stringify({ address_id: id }),
            }).then((res) => res.json()).then((data) => {
                setForm({ mobile: data.address.mobile, pincode: data.address.pincode, address: data.address.address, landmark: data.address?.landmark })
            });
        })
    }, [])

    return (
        <>

            <div className='max-w-screen-xl mx-auto'>

                <HeaderWithBack title='Update Address' />
                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Input label='Mobile' className='font-semibold' type='number' name='mobile' onChange={handleChange} value={form.mobile || ''} onFocus={removeError} />
                    <Typography
                        ref={mobileRef}
                        variant="small"
                        color="gray"
                        className="mt-2  items-center gap-1  text-xs font-semibold text-[red] hidden"
                    >.</Typography>
                </div>

                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Input label='Pincode' className='font-semibold' type='number' name='pincode' onChange={handleChange} value={form.pincode || ''} onFocus={removeError} />
                    <Typography
                        ref={pincodeRef}
                        variant="small"
                        color="gray"
                        className="mt-2  items-center gap-1  text-xs font-semibold text-[red] hidden"
                    >.</Typography>
                </div>

                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Textarea label='Address (Area and Street)' className='font-semibold' name='address' onChange={handleChange} value={form.address || ''} onFocus={removeError} />
                    <Typography
                        ref={addressRef}
                        variant="small"
                        color="gray"
                        className="mt-2  items-center gap-1  text-xs font-semibold text-[red] hidden"
                    >.</Typography>
                </div>

                <div className="px-4 md:px-8 lg:px-24 mt-4">
                    <Select className='font-semibold' value="Gujarat" label="State" onChange={() => null}>
                        <Option className='font-semibold' value='Gujarat'>Gujarat</Option>
                    </Select>
                </div>

                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Input label='Landmark (Optional)' className='font-semibold' name='landmark' onChange={handleChange} value={form.landmark || ''} onFocus={removeError} />
                    <Typography
                        ref={landmarkRef}
                        variant="small"
                        color="gray"
                        className="mt-2  items-center gap-1  text-xs font-semibold text-[red] hidden"
                    >.</Typography>
                </div>

                <div className='px-4 md:px-8 lg:px-24 mt-4'>
                    <Button fullWidth onClick={update_address}>Add</Button>
                </div>

            </div>
        </>
    )
}

export default EditAddress