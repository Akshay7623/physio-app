import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import LogginHeader from '../Components/LogginHeader'
import UpcomingAppointment from '../assets/images/upcoming_appointment.svg'
import AuthUser from '../Components/AuthUser';

const Appointment = () => {

    const navigate = useNavigate();

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                navigate('/login');
            }
        })
    }, [])

    return (
        <>

            <LogginHeader />
            <img className='w-[70%] md:w-[50%] lg:w-[30%] mx-auto' src={UpcomingAppointment} alt='appointment' />
            
            <h2 className="text-center text-[20px] font-bold text-gray-800 lg:text-[30px] mb-4 flex flex-row gap-2 justify-center">
                <div>Upcoming Appointment</div>
                <div className='mt-[15px] zoom-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                    </svg>
                </div>
            </h2>

            <div className="flex mt-auto mx-auto justify-center">
                <NavLink to='/book-appointment' className="inline-block rounded-lg bg-[#212121] px-8 py-3 text-center text-sm font-semibold outline-none text-white transition duration-100 focus-visible:ring active:bg-gray-200 md:text-base">Book Now</NavLink>
            </div>

        </>
    )
}


export default Appointment