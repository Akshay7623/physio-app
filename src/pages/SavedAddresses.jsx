import { useEffect, useState } from 'react'
import { Button, Dialog, DialogHeader, DialogFooter } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import HeaderWithBack from '../Components/HeaderWithBack'
import AuthUser from '../Components/AuthUser';
import { GET_SAVED_ADDRESS, DELETE_ADDRESS } from '../URLS';

const SavedAddresses = () => {
    const [size, setSize] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [currentItem, setCurrentItem] = useState();
    const navigate = useNavigate();

    const user_token = localStorage.getItem('user_token');

    const handleOpen = (value) => setSize(value);

    const copyToClipboard = (address) => {
        if ('clipboard' in navigator) {
            navigator.clipboard.writeText(address);
            toast('Address copied')
        }
    }

    const hanldeEdit = (id) => {
        navigate(`/edit-address/${id}`)
    }

    const hanldeDelete = (e) => {
        handleOpen("xs");
        setCurrentItem(e);
    }

    const confirmDelete = () => {
        handleOpen(null);
        const deleteAddress = new Promise((resolve, reject) => {
            fetch(DELETE_ADDRESS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user_token}`
                },
                body: JSON.stringify({ address_id: currentItem }),
            }).then((res) => res.json()).then((data) => {
                if (data.message === 'success') {
                    resolve(0)
                    let new_addresses = addresses.filter(address => address._id !== currentItem);
                    setAddresses(new_addresses)
                } else {
                    reject(0)
                }
            });
        })

        toast.promise(deleteAddress, {
            loading: 'Deleting address',
            success: 'Address Deleted Successfully ',
            error: 'Some error !'
        })
    }

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                navigate('/login')
            }

            fetch(GET_SAVED_ADDRESS, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user_token}`
                },
            }).then((res) => res.json()).then((data) => {
                setAddresses(data?.addresses || []);
            })
        })
    }, [])

    return (
        <>

            <div className='max-w-screen-xl mx-auto'>
                <HeaderWithBack className='sticky top-0 mt-0 py-3 z-30' title='My Addresses' />
                <Toaster />

                <NavLink to='/add-new-address'>
                    <div className='flex flex-row gap-2 justify-center mx-4 rounded mt-4 py-1' style={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#212121" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <div className='text-[12px] font-extrabold text-[#212121] mt-1'>ADD NEW ADDRESS</div>
                    </div>
                </NavLink>
                {addresses.map((val, index) => {
                    return (
                        <div key={val._id}>
                            <div className='flex flex-row gap-4 mx-4 mt-4 px-4 rounded-md py-4 text-sm' style={{ boxShadow: 'rgba(0, 0, 0, 0.18) 0px 2px 4px' }}>
                                <div className='my-auto'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#263238" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </div>
                                <div className='flex flex-col gap-2 text-[#263238]'>
                                    <div className='font-semibold'>{val.address}</div>
                                    <div className='flex flex-row gap-2'>
                                        <Menu placement="bottom-start">
                                            <div style={{ border: '1px solid #263238', borderRadius: '50%', padding: '3px' }}>
                                                <MenuHandler>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#3f51b5" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                                    </svg>
                                                </MenuHandler>
                                            </div>
                                            <MenuList>
                                                <MenuItem onClick={() => hanldeEdit(val._id)}>
                                                    <div className='flex flex-row gap-2 text-[#263238]'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                            </svg>
                                                        </div>
                                                        <div className='mt-1'>
                                                            Edit
                                                        </div>
                                                    </div>
                                                </MenuItem>
                                                <MenuItem onClick={() => hanldeDelete(val._id)}>
                                                    <div className='flex flex-row gap-2 text-[#263238]'>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div className='mt-1'>
                                                            Delete
                                                        </div>
                                                    </div>
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>

                                        <div onClick={() => copyToClipboard(val.address)} style={{ border: '1px solid #263238', borderRadius: '50%', padding: '3px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#3f51b5" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                })}

                <Dialog
                    open={size === "xs"}
                    size="xs"
                    handler={handleOpen}
                >
                    <DialogHeader className='text-base'>Are Sure Want to Delete this Address? </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => handleOpen(null)}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="#212121"
                            onClick={confirmDelete}
                        >
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </div>

        </>
    )
}

export default SavedAddresses
