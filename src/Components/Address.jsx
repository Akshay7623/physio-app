const Address = () => {

    return (
        <>
            <h2 className="text-center text-lg font-bold text-gray-800 lg:text-[26px] mt-4">Contact us  </h2>

            <div className='max-w-screen-xl mx-auto'>
                <div className="flex flex-col mt-4 gap-2 py-4 px-2 mx-4 bg-[#ececec] rounded">
                    {/* <a href='' >
                        <div className='flex flex-row gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#212121" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <div className='text-[#424242] text-[14px] font-semibold'>Some address</div>
                        </div>
                    </a> */}
                    <a href="mailto:akshay@physio.com" >
                        <div className='flex flex-row gap-3'>
                            <svg className="w-[23px] h-[23px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="m3.5 5.5 7.9 6c.4.3.8.3 1.2 0l7.9-6M4 19h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z" />
                            </svg>
                            <div className='text-[#424242] text-[14px] font-semibold'>akshay@physio.com</div>
                        </div>
                    </a>
                    <a href='tel:9978111363' >
                        <div className='flex flex-row gap-3'>
                            <svg className="w-[30px] h-[30px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z" />
                            </svg>
                            <div className='text-[#424242] text-[14px] font-semibold'>9978111363</div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Address