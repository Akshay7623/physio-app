import { useState, useEffect } from 'react'
import { Button, Dialog, DialogHeader, Card, DialogFooter, CardBody, CardFooter, Typography, Input, } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SideDrwer from './SideDrwer'
import AuthAdmin from '../../Components/Admin/AuthAdmin';
import { GET_ALL_PHYSIO, ADD_PHYSIO, DELETE_PHYSIO, UPDATE_PHYSIO } from '../../URLS';

const AllPhysio = () => {

    const [form, setForm] = useState({
        name: '',
        mobile: '',
        password: ''
    });

    const [size, setSize] = useState(null);
    const [currentId, setCurrentId] = useState('');

    const [isUpdateOpen, setIsUpdateOpen] = useState(null);
    const [open, setOpen] = useState(false);
    const [physios, setPhysios] = useState([]);

    const token = localStorage.getItem('admin_token');
    const navigate = useNavigate();

    const handleOpenModal = (value) => setSize(value);
    const handleOpen = () => setOpen((cur) => !cur);
    const hanldeUpdateModal = () => setIsUpdateOpen((cur) => !cur)


    const openUpdateModal = (e) => {
        setCurrentId(e)
        let ele = physios.filter((val) => val._id === e)
        setForm({ ...ele[0], password: "" })
        hanldeUpdateModal()
    }

    const getAllPhysio = () => {
        fetch(GET_ALL_PHYSIO, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        }).then((res) => res.json()).then((data) => {
            setPhysios(data.physios);
        });
    }

    const deletePhysio = () => {
        fetch(DELETE_PHYSIO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: currentId }),
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            if (data.message === 'success') {
                getAllPhysio()
                toast.success('Updated successfully !');
                handleOpenModal(null);
            }
        })
    }

    const openDeleteModal = (id) => {
        setCurrentId(id);
        handleOpenModal('xs');
    }

    const addPhysio = () => {

        if (form.mobile.toString().trim().length !== 10) {
            return toast.error('Please enter valid mobile')
        }

        if (form.password.toString().trim().length <= 6) {
            return toast.error('Password lenth must be at least 6 characters  !')
        }

        let addPhysioPromise = new Promise((resolve, reject) => {
            fetch(ADD_PHYSIO, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(form),
            }).then((res) => res.json()).then((data) => {
                console.log(data)
                if (data.message === 'success') {
                    handleOpen(null);
                    getAllPhysio()
                    setForm({ name: '', mobile: '', password: '' })
                    resolve()
                } else {
                    reject()
                }
            });
        })

        toast.promise(addPhysioPromise, {
            loading: 'Adding physio',
            success: 'Added Successfully !',
            error: 'Failed to Add !'
        })
    }

    const hanldeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const updatePhysio = () => {

        if (form.mobile.toString().trim().length !== 10) {
            return toast.error('Please enter valid mobile !');
        }

        fetch(UPDATE_PHYSIO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ...form, id: currentId }),
        }).then((res) => res.json()).then((data) => {
            if (data.message === 'success') {
                getAllPhysio();
                hanldeUpdateModal(null)
                toast.success('Updated successfully !');
            }
        });
    }

    useEffect(() => {
        AuthAdmin().then((data) => {
            if (data.message !== 'success') {
                navigate('/admin/login')
            }
            getAllPhysio()
        })
    }, []);
    return (
        <>
            <SideDrwer title='All Physio' />
            <Toaster />

            <div className='mt-2 max-w-screen-xl mx-auto z-0'>
                <div className='mx-4'>
                    <Button size='sm' className='flex flex-row gap-2' onClick={handleOpen} >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div className='mt-1'>
                            Add Physio
                        </div>
                    </Button>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 z-0">
                            <thead className="text-xs font-semibold text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        SR No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mobile
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Appointments
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Delete
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    physios.map((val, index) => {
                                        return (
                                            <tr key={val._id} className="odd:bg-white even:bg-gray-50 border-b font-semibold">
                                                <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap font-semibold">
                                                    {(index + 1)}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {val.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.mobile}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {val.total_appointments}
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    <Button onClick={() => openUpdateModal(val._id)} size='sm' className='flex flex-row gap-1'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                        </div>
                                                        <div className='mt-1'>
                                                            Edit
                                                        </div>
                                                    </Button>
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    <Button onClick={() => openDeleteModal(val._id)} size='sm' className='flex flex-row gap-1'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </div>
                                                        <div className='mt-1'>
                                                            Delete
                                                        </div>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* <div className='mt-2 max-w-screen-xl mx-auto z-0'>
                <div className='mx-4'>
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
                                    <th scope="col" className="px-6 py-3">
                                        Assign
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Submit
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
                                                <td className="px-6 py-4">
                                                    <Select>
                                                        <Option >Dr Pratik Makwana </Option>
                                                        <Option >Dr Akshay Mer </Option>
                                                        <Option >Dr Akshay Rana </Option>
                                                    </Select>
                                                </td>
                                                <td>
                                                    <Button onClick={() => ''}>Submit</Button>
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
            </div> */}

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Add Physio
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Name
                        </Typography>
                        <Input name='name' onChange={hanldeForm} value={form.name} label="Name" size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Mobile
                        </Typography>
                        <Input name='mobile' onChange={hanldeForm} value={form.mobile} label="Mobile" size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Password
                        </Typography>
                        <Input name='password' onChange={hanldeForm} value={form.password} label="Password" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={addPhysio} fullWidth>
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>

            <Dialog
                open={
                    size === "xs" ||
                    size === "sm" ||
                    size === "md" ||
                    size === "lg" ||
                    size === "xl" ||
                    size === "xxl"
                }
                size={size || "md"}
                handler={handleOpenModal}
            >
                <DialogHeader>Are you sure want to delete ?</DialogHeader>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleOpenModal(null)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => deletePhysio()}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog
                size="xs"
                open={isUpdateOpen}
                handler={hanldeUpdateModal}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Update Physio
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Name
                        </Typography>
                        <Input name='name' onChange={hanldeForm} value={form.name} label="Name" size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Mobile
                        </Typography>
                        <Input name='mobile' onChange={hanldeForm} value={form.mobile} label="Mobile" size="lg" />
                        <Typography className="-mb-2" variant="h6">
                            Password
                        </Typography>
                        <Input name='password' onChange={hanldeForm} value={form.password} label="Password" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={updatePhysio} fullWidth>
                            UPDATE
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>


        </>
    )
}

export default AllPhysio