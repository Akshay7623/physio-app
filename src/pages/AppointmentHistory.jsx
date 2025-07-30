import { useEffect, useState } from 'react'
import { Rating, Button as BTN, Textarea, Chip } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Drawer, Button } from 'rsuite';
import { SUBMIT_REVIEW, GET_APPOINTMENT_HISTORY } from '../URLS';
import HeaderWithBack from '../Components/HeaderWithBack'
import AuthUser from '../Components/AuthUser';
import 'rsuite/dist/rsuite.css'

const AppointmentHistory = () => {

    const [appointments, setAppointments] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState('');
    const [rate, SetRate] = useState(0);
    const [review, setReview] = useState();
    const navigate = useNavigate();

    const user_token = localStorage.getItem('user_token');
    const tagLines = ['', 'Service was very poor 😠', 'Service was poor 😑', 'Service was average 🙂', 'Service was good 🤗', 'Service was excellent 🤩'];

    const submitReview = () => {
        setOpen(false)
        const filtered = appointments.map((val) => {
            if (val._id === currentId) {
                return { ...val, appointment_rating: rate }
            } else {
                return val;
            }
        });
        const submitRe = new Promise((resolve, reject) => {
            fetch(SUBMIT_REVIEW, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user_token}`
                },
                body: JSON.stringify({ rate: rate, review: review, appointmentId: currentId }),
            }).then((res) => res.json()).then((data) => {
                if (data.message === 'success') {
                    setAppointments(filtered)
                    resolve(1)
                }

                if (data.message === 'INVALID_DATA' || data.message === 'AUTH_FAILED') {
                    reject(1)
                }

            })
        });
        toast.promise(submitRe, { loading: 'Submitting...', error: "Failed to submit review", success: "Thanks for the review." })
    }

    const OpenDrawer = (e, id) => {
        setCurrentId(id);
        SetRate(e)
        setOpen(true)
    }

    const handelInfiniteScroll = async () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAppointments = () => {
        fetch(GET_APPOINTMENT_HISTORY + `/${page}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user_token}`
            },
        }).then((res) => res.json()).then((data) => {
            setAppointments((prev) => [...prev, ...data.Appointments]);
        })
    }

    const closeDrawer = () => {
        setOpen(false);
        SetRate(0);
        let AllStars = document.getElementById(currentId).childNodes;
        AllStars.forEach((ele) => {
            ele.childNodes[0].setAttribute('stroke', '#607D8B')
            ele.childNodes[0].setAttribute('fill', 'transparent')
            ele.childNodes[0].setAttribute('stroke-width', '1.5')
            ele.childNodes[0].childNodes[0].setAttribute('d', 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z')
            ele.childNodes[0].childNodes[0].setAttribute('stroke-linejoin', 'round')
            ele.childNodes[0].childNodes[0].setAttribute('stroke-linecap', 'round')
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, [])

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                navigate('/login');
            }
        })
    }, [])

    useEffect(() => {
        getAppointments();
    }, [page])

    return (
        <>

            <div className='max-w-screen-xl mx-auto'>
                <HeaderWithBack className='sticky top-0 mt-0 py-3 z-30' title='Appointment History' />
                <Toaster />

                {appointments.map((val, index) => {
                    return (
                        <div key={index}>
                            <div className='flex flex-col gap-2 mx-4 mt-4 px-4 rounded-md py-4 text-[#263238] text-[1rem]' style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }}>
                                <div className='flex flex-row justify-between'>
                                    <div className='font-semibold text-base' >
                                        {val.assigned ? val.assigned_to : 'Waiting for Approval'}
                                    </div>
                                    <div >
                                        <Chip value={val.appointment_status} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                    </div>
                                </div>

                                <div className='flex flex-row text-sm font-semibold'>
                                    Address : {val.address}
                                </div>
                                <div className='text-sm text-[#455a64] font-semibold'>
                                    {new Date(Number(val.appointment_date)).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}  at {val.appointment_time}
                                </div>

                                {
                                    val.appointment_status === 'COMPLETED' ? val?.appointment_rating ?
                                        <div className='flex flex-row gap-2'>
                                            <div className='text-sm mt-1 font-semibold'>
                                                You Rated
                                            </div>
                                            <div>
                                                <Rating value={val.appointment_rating} readonly />
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className='flex flex-row gap-2'>
                                                <div className='text-sm mt-1 font-semibold'>
                                                    Rate
                                                </div>
                                                <div>
                                                    <Rating id={val._id} onChange={(e) => OpenDrawer(e, val._id)} value={0} />
                                                </div>
                                            </div>
                                        </div> : ''
                                }
                            </div>
                        </div>)
                })}

                <Drawer placement='bottom' open={open} onClose={() => closeDrawer()}>
                    <Drawer.Header>
                        <Drawer.Title className='text-[1rem] font-semibold'>Rating</Drawer.Title>
                        <Drawer.Actions>
                            <Button className='font-semibold' onClick={() => closeDrawer()}>Cancel</Button>
                            <Button className='font-semibold' onClick={submitReview}>
                                Confirm
                            </Button>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body className='mx-auto px-4 text-center'>
                        <div className='text-base font-semibold'>
                            {tagLines[rate]}
                        </div>

                        <div className='flex flex-row justify-center mb-4 mt-4'>
                            <Rating onChange={(e) => SetRate(e)} value={rate} />
                        </div>
                        <div className='mb-4'>
                            <Textarea className='font-semibold' label='Write Review (Optional)' onChange={(e) => setReview(e.target.value)} />
                        </div>

                        <BTN onClick={submitReview} fullWidth>Submit</BTN>
                    </Drawer.Body>
                </Drawer>

            </div>

        </>
    )
}

export default AppointmentHistory