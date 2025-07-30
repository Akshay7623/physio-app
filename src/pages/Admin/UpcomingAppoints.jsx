import { useState, useEffect } from 'react'
import { Button } from "@material-tailwind/react";
import { NavLink, useNavigate } from 'react-router-dom';
import SideDrwer from './SideDrwer'
import AuthAdmin from '../../Components/Admin/AuthAdmin';
import { GET_APPOINTMENTS } from '../../URLS';

const UpcomingAppointments = () => {

    const [page, setPage] = useState(1);
    const [appointments, setAppointments] = useState([]);
    const [totalRow, setTotalRow] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const docsPerPage = 10;

    const token = localStorage.getItem('admin_token');
    const navigate = useNavigate();

    const nextPage = () => {
        if (page < Math.ceil(totalRow / docsPerPage) && !isLoading) setPage((prev) => prev + 1)
    }

    const prevPage = () => {
        if (page > 1 && !isLoading) setPage((prev) => prev - 1)
    }

    useEffect(() => {
        setIsLoading(true)
        if (page > 0) {
            fetch(GET_APPOINTMENTS + `/?page=${page}&appointment_type=upcoming`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            }).then((res) => res.json()).then((data) => {
                if (data.Appointments[0]) {
                    setTotalRow(data.totaldocs)
                    setAppointments(data.Appointments);
                }
                setIsLoading(false)
            });
        }
    }, [page]);

    useEffect(() => {
        AuthAdmin().then((data) => {
            if (data.message !== 'success') {
                navigate('/admin/login')
            }
        })
    }, []);
    return (
        <>
            <SideDrwer title='Upcoming Appointments' />
            <div className='mt-2 max-w-screen-xl mx-auto z-0'>

                <div className='mx-4'>

                    <div className='flex flex-row justify-between'>
                        <NavLink to='/admin/appointments/all'><Button variant="outlined" size='sm'>All</Button></NavLink>
                        <NavLink to='/admin/appointments/upcoming'><Button variant="gradient" size='sm'>Upcoming</Button></NavLink>
                        <NavLink to='/admin/appointments/completed'> <Button variant="outlined" size='sm'>Completed</Button></NavLink>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 z-0">
                            <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        SR.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mobile
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Appointment Date & Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Treatment
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    appointments.map((val, index) => {
                                        return (
                                            <tr key={val._id} className="odd:bg-white even:bg-gray-50 border-b font-semibold">
                                                <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                                    {(page - 1) * 10 + (index + 1)}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {val.patinent_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.mobile}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(Number(val.appointment_date)).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} {val.appointment_time}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.address + " " + val.landmark}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.therapy}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.appointment_status}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                        <div className='flex flex-row gap-4 ml-4 mb-4 mt-4'>
                            <Button className='flex flex-row gap-1' size='sm' onClick={prevPage}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </div>
                                <div className='mt-0.5'>
                                    Prev
                                </div>
                            </Button>
                            <Button className='flex flex-row gap-1' size='sm' onClick={nextPage}>
                                <div className='mt-0.5'>
                                    Next
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpcomingAppointments