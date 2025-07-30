import { useNavigate } from 'react-router-dom'

const HeaderWithBack = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={`bg-white w-[100%] px-4 flex flex-row gap-5 mt-2 text-[1rem] cursor-pointer `+ props.className}>
                <div onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className='font-semibold'>{props.title}</div>
            </div>

        </>
    )
}

export default HeaderWithBack