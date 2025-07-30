import { useEffect, useState } from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import SideDrwer from './SideDrwer'
import AuthAdmin from '../../Components/Admin/AuthAdmin'
import { GET_USERS } from '../../URLS';

function calculateAge(birthdateMilliseconds) {
    const birthdate = new Date(birthdateMilliseconds);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthdate.getFullYear();

    if (currentDate.getMonth() < birthdate.getMonth() || (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}

const Users = () => {
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('admin_token');
    const navigate = useNavigate();

    const nextPage = () => {
        if (page > 0 && !isLoading) setPage((prev) => prev + 1)
    }

    const prevPage = () => {
        if (!isLoading) setPage((prev) => prev - 1)
    }

    useEffect(() => {
        setIsLoading(true)
        if (page > 0) {
            fetch(GET_USERS + `/?page=${page}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            }).then((res) => res.json()).then((data) => {
                if (data.Users[0]) {
                    setUsers(data.Users);
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
            <SideDrwer title='Users' />

            <div className='mt-2 max-w-screen-xl mx-auto z-0'>
                <div className='mx-4'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                        Joined
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Age
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {

                                    users.map((val, index) => {
                                        return (
                                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b font-semibold">
                                                <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                                    {index + 1}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {val.first_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.mobile}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {new Date(val.created_at).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                        hour12: false
                                                    })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val?.date_of_birth ? calculateAge(val.date_of_birth) : 'Not Available'}                                                </td>
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

export default Users 
