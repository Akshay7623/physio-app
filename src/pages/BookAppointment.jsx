import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, Popover, PopoverHandler, PopoverContent, Typography, Select, Option, Textarea, Button } from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import Appointment_img from '../assets/images/appointment.jpg';
import AuthUser from '../Components/AuthUser';
import { BOOK_APPOINTMENT, GET_SAVED_ADDRESS } from '../URLS';

const BookAppointment = () => {

    const [form, setForm] = useState({ patinentName: '', mobile: '', pincode: '', address: '', landmark: '' })
    const [date, setDate] = useState(null)
    const [therapy, setTherapy] = useState(null)
    const [appointmentTime, setAppointmentTime] = useState(null)
    const [submitBtn, setSubmitBtn] = useState(true)
    const [addresses, setAddresses] = useState([]);

    const patinentNameRef = useRef(null)
    const dateRef = useRef(null)
    const timeRef = useRef(null)
    const therapyRef = useRef(null)
    const mobileRef = useRef(null)
    const pincodeRef = useRef(null)
    const addressRef = useRef(null)
    const landmarkRef = useRef(null)
    const selectAddressRef = useRef(null)

    const user_token = localStorage.getItem('user_token');
    const navigate = useNavigate();

    const hanldeAddress = (e) => {
        setForm({ patinentName: form.patinentName, ...JSON.parse(e) });
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const removeError = () => {
        patinentNameRef.current.classList.add('hidden');
        dateRef.current.classList.add('hidden');
        timeRef.current.classList.add('hidden');
        therapyRef.current.classList.add('hidden');
        mobileRef.current.classList.add('hidden');
        pincodeRef.current.classList.add('hidden');
        addressRef.current.classList.add('hidden');
        landmarkRef.current.classList.add('hidden');
    }

    const createError = (ele, message) => {
        setSubmitBtn(true);
        ele.classList.add('flex');
        ele.classList.remove('hidden');
        ele.innerHTML = message;
    }

    const hanldeTime = (e) => {
        const date = new Date(e.$d);
        const new_time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setAppointmentTime(new_time);
    }

    const bookAppointment = () => {

        if (submitBtn) {

            setSubmitBtn(false)
            if (form.patinentName.trim().length < 3) {
                return createError(patinentNameRef.current, 'Please enter valid name !')
            }

            if (date === null) {
                return createError(dateRef.current, 'Please select the date !');
            }

            if (appointmentTime === null) {
                return createError(timeRef.current, 'Please select appointment time !');
            }

            if (therapy === null) {
                return createError(therapyRef.current, 'Please select therapy !');
            }

            if (form.mobile.toString().trim().length !== 10) {
                return createError(mobileRef.current, 'Please enter valid mobile number !')
            }

            if (form.pincode.toString().trim().length !== 6) {
                return createError(pincodeRef.current, 'Please enter valid pincode !')
            }

            if (form.address.toString().trim().length < 3) {
                return createError(addressRef.current, 'Please enter valid address !')
            }

            let date_time_in_millisecond;
            let am_or_pm = appointmentTime.split(" ")[1];
            let clock_time_hour = parseInt(appointmentTime.split(" ")[0].split(":")[0]);
            let clock_time_min = parseInt(appointmentTime.split(" ")[0].split(":")[1]);

            if (am_or_pm === 'AM') {
                date_time_in_millisecond = Date.parse(date) + (clock_time_hour * 3600000) + (clock_time_min * 60000);
            } else {
                date_time_in_millisecond = Date.parse(date) + (clock_time_hour * 3600000) + (clock_time_min * 60000) + 43200000;
            }

            if (am_or_pm === 'AM') {
                if (clock_time_hour >= 9 && clock_time_hour <= 11) {
                    console.log('.');
                } else {
                    return createError(timeRef.current, 'Please select time between 09:00 AM to 08:00 PM')
                }
            } else {
                if (clock_time_hour === 12 || (clock_time_hour >= 1 && clock_time_hour <= 8)) {
                    console.log('.');
                } else {
                    return createError(timeRef.current, 'Please select time between 09:00 AM to 08:00 PM')
                }
            }

            if ((date_time_in_millisecond - new Date().getTime()) < 18000000) {
                return createError(timeRef.current, 'Please select time after 5 hours from now !')
            }

            fetch(BOOK_APPOINTMENT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user_token}`
                },
                body: JSON.stringify({ ...form, date: date, therapy: therapy, time: appointmentTime }),
            }).then((res) => res.json()).then((data) => {
                setSubmitBtn(true)
                if (data.message === '5_HOUR_ERROR') {
                    return createError(timeRef.current, 'Please select time after 5 hours from now !')
                }

                if (data.message === 'TIME_RANGE_ERROR') {
                    return createError(timeRef.current, 'Please select time between 09:00 AM to 08:00 PM')
                }

                if (data.message === 'success') {
                    navigate(-1);
                }
            })
        }
    }

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                navigate('/login');
            }
        })
        fetch(GET_SAVED_ADDRESS, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user_token}`
            },
        }).then((res) => res.json()).then((data) => {
            setAddresses(data?.addresses || [])
        })
    }, [])

    return (
        <>

            <div className='max-w-screen-xl mx-auto'>
                <div className='mx-4 mt-4 cursor-pointer' onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#212121" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                </div>

                <img className='w-[70%] md:w-[50%] lg:w-[30%] mx-auto' src={Appointment_img} alt='appointment' />

                <h2 className="text-center text-[20px] font-bold text-gray-800 lg:text-[30px] mb-4 flex flex-row gap-2 justify-center">
                    <div>Book Appointment</div>
                    <div className='zoom-in-out mt-[15px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                        </svg>
                    </div>
                </h2>

                <div className='max-w-[900px] mx-auto'>

                    <div className="px-4 md:px-8 lg:px-24 mt-4">
                        <Input label="Patient name" className='font-semibold' name='patinentName' onChange={handleChange} value={form.patinentName} onFocus={removeError} />
                        <div className=''>
                            <Typography
                                ref={patinentNameRef}
                                variant="small"
                                color="gray"
                                className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                            >.</Typography>
                        </div>
                    </div>

                    <div className="px-4 md:px-8 lg:px-24 mt-4">
                        <Popover placement="bottom">
                            <PopoverHandler>
                                <Input
                                    className='font-semibold'
                                    label="Select a Date"
                                    onChange={() => null}
                                    value={date ? format(date, "PPP") : ""}
                                />
                            </PopoverHandler>
                            <PopoverContent>
                                <DayPicker
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    showOutsideDays
                                    className="border-0"
                                    classNames={{
                                        caption: "flex justify-center py-2 mb-4 relative items-center",
                                        caption_label: "text-sm font-medium text-gray-900",
                                        nav: "flex items-center",
                                        nav_button:
                                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                        nav_button_previous: "absolute left-1.5",
                                        nav_button_next: "absolute right-1.5",
                                        table: "w-full border-collapse",
                                        head_row: "flex font-medium text-gray-900",
                                        head_cell: "m-0.5 w-9 font-normal text-sm",
                                        row: "flex w-full mt-2",
                                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                        day: "h-9 w-9 p-0 font-normal",
                                        day_range_end: "day-range-end",
                                        day_selected:
                                            "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                        day_today: "rounded-md bg-gray-200 text-gray-900",
                                        day_outside:
                                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                        day_disabled: "text-gray-500 opacity-50",
                                        day_hidden: "invisible",
                                    }}
                                    components={{
                                        IconLeft: ({ ...props }) => (
                                            <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                        ),
                                        IconRight: ({ ...props }) => (
                                            <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                        ),
                                    }}
                                    onDayBlur={removeError}
                                />
                            </PopoverContent>
                        </Popover>
                        <Typography
                            ref={dateRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className="px-4 md:px-8 lg:px-24 mt-4">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    className='font-semibold'
                                    label="Time"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    onChange={hanldeTime}
                                    onAccept={removeError}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Typography
                            ref={timeRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className="px-4 md:px-8 lg:px-24 mt-4">
                        <Select label="Select" className='font-semibold' value={therapy}
                            onChange={(val) => setTherapy(val)} onBlur={removeError}>
                            <Option className='font-semibold' value='Neck Pain'>Neck Pain</Option>
                            <Option className='font-semibold' value='Frozen Shoulder'>Frozen Shoulder</Option>
                            <Option className='font-semibold' value='Shoudler Pain'>Shoudler Pain</Option>
                            <Option className='font-semibold' value='Tennis/Golf Elbow'>Tennis/Golf Elbow</Option>
                            <Option className='font-semibold' value='Low Back'>Low Back Pain</Option>
                            <Option className='font-semibold' value='Knee Pain'>Knee Pain</Option>
                            <Option className='font-semibold' value='Shin Splints'>Shin Splints</Option>
                            <Option className='font-semibold' value='Ankle Pain'>Ankle Pain</Option>
                            <Option className='font-semibold' value='Cruciate Injury'>Cruciate Injury</Option>
                            <Option className='font-semibold' value='Jaw Pain'>Jaw Pain</Option>
                            <Option className='font-semibold' value='Plantar Fasciitis'>Plantar Fasciitis</Option>
                            <Option className='font-semibold' value='Achilles Tendonosis'>Achilles Tendonosis</Option>
                            <Option className='font-semibold' value='Cronic Pain'>Cronic Pain</Option>
                            <Option className='font-semibold' value='Acute Pain'>Acute Pain</Option>
                            <Option className='font-semibold' value='Bed Posture'>Bed Posture</Option>
                            <Option className='font-semibold' value='Ligament Injury'>Ligament Injury</Option>
                            <Option className='font-semibold' value='Wrist Pain'>Wrist Pain</Option>
                            <Option className='font-semibold' value='Calf Pain'>Calf Pain</Option>
                            <Option className='font-semibold' value='Muscle strain'>Muscle strain Pain </Option>
                            <Option className='font-semibold' value='Post Op Rehab'><b>Post Op Rehab</b></Option>
                            <Option className='font-semibold' value='Total Knee/Hip Replacement'>Total Knee/Hip Replacement</Option>
                            <Option className='font-semibold' value='Bony Fracture Rehabilation'>Bony Fracture Rehabilation</Option>
                            <Option className='font-semibold' value='Tendon Repairs'>Tendon Repairs</Option>
                            <Option className='font-semibold' value='Post Surgical Joint Stiffness'>Post Surgical Joint Stiffness</Option>
                        </Select>
                        <Typography
                            ref={therapyRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className="px-4 md:px-8 lg:px-24 mt-4">
                        <Select label="Select Address from saved Addresses" className='font-semibold' onChange={(val) => hanldeAddress(val)} onBlur={removeError}>
                            {addresses.map((val, index) => {
                                return (
                                    <Option className='font-semibold' key={index} value={JSON.stringify({
                                        mobile: val.mobile,
                                        pincode: val.pincode,
                                        address: val.address,
                                        landmark: val.landmark
                                    })}>{val.address.slice(0, 20) + '...'}</Option>)
                            })}
                        </Select>
                        <Typography
                            ref={selectAddressRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Input label='Mobile' className='font-semibold' type='number' name='mobile' onChange={handleChange} value={form.mobile} onFocus={removeError} />
                        <Typography
                            ref={mobileRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Input label='Pincode' className='font-semibold' type='number' name='pincode' onChange={handleChange} value={form.pincode} onFocus={removeError} />
                        <Typography
                            ref={pincodeRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Textarea label='Address (Area and Street)' className='font-semibold' name='address' onChange={handleChange} value={form.address} onFocus={removeError} />
                        <Typography
                            ref={addressRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>
                    <div className="px-4 md:px-8 lg:px-24 mt-4">
                        <Select value="Gujarat" className='font-semibold' label="State" onChange={() => null}>
                            <Option value='Gujarat' className='font-semibold'>Gujarat</Option>
                        </Select>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4'>
                        <Input label='Landmark (Optional)' className='font-semibold' name='landmark' onChange={handleChange} value={form.landmark} onFocus={removeError} />
                        <Typography
                            ref={landmarkRef}
                            variant="small"
                            color="gray"
                            className="mt-2 items-center gap-1 font-semibold text-xs text-[red] hidden"
                        >.</Typography>
                    </div>

                    <div className='px-4 md:px-8 lg:px-24 mt-4 mb-6'>
                        <Button onClick={bookAppointment} fullWidth>Book Now</Button>
                    </div>
                </div >

            </div>

        </>
    )
}


export default BookAppointment