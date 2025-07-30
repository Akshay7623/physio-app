import { ListItem, ListItemPrefix } from '@material-tailwind/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileMenu = (props) => {
    return (
        <>
            <NavLink to={`/${props?.navigateTo}`}>
                <ListItem className="my-2 flex flex-row justify-between text-sm md:text-base text-[#263238] font-[600]" style={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
                    <div className='flex flex-row'>
                        <ListItemPrefix>
                            {props?.children}
                        </ListItemPrefix>
                        {props?.title}
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </ListItem>
            </NavLink >
        </>
    )
}

export default ProfileMenu