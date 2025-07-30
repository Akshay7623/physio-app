import { useState, useEffect } from 'react';
import { UilAngleUp } from '@iconscout/react-unicons'

const ScrollToTop = () => {

    const [showButton, setShowButton] = useState(false)

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {

        const handleScroll = () => {
            setShowButton(window.scrollY > 1000)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [])

    return (
        <>
            {showButton ?
                <div onClick={handleClick} className='w-[50px] h-[50px] flex justify-center bg-[#1f1f1f] rounded-[50%] pt-[5px] fixed top-[90vh] right-1 scroll_to_top cursor-pointer'>
                    <UilAngleUp color='white' size='35' />
                </div>
                : null}
        </>


    );
};

export default ScrollToTop;
