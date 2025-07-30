import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import AuthUser from './AuthUser';
import LogginHeader from './LogginHeader';
import services from './TreantmentContent';

const SinglePostOperative = () => {

    const [isUserLoggedIn, setUserLoggedIn] = useState();
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === "AUTH_FAILED") {
                setUserLoggedIn(false);
            } else {
                setUserLoggedIn(true)
            }
        })
    }, [])

    return (
        <>

            {
                isUserLoggedIn ? <LogginHeader /> : <Header />
            }

            <main className="pt-6 pb-4 lg:pt-8 lg:pb-16 bg-white dark:bg-gray-900 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-4 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format flex flex-row gap-10">
                            <div onClick={() => navigate(-1)} className='cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(33 33 33)" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="mb-3 text-xl font-extrabold md:text-2xl leading-tight text-gray-900 lg:mb-4 lg:text-3xl dark:text-white">{id}</h1>
                            </div>
                        </header>

                        <img className='mx-auto' src={services[id].image} alt='therapy image' />

                        <div className='text-base md:text-lg lg:text-xl mt-4'>
                            <div className='leading-tight font-bold text-[#263238] md:mb-4'>Overview : </div>
                            <div className='mt-2 text-sm font-semibold md:text-base'>
                                {services[id].overview}
                            </div>
                        </div>

                        <div className='text-base md:text-lg lg:text-xl mt-4 md:mt-10'>
                            <div className='leading-tight font-bold text-[#263238] md:mb-4'>Why Is {id} Physiotherapy Needed ? :</div>
                            <div className='mt-2 text-sm font-semibold md:text-base'>
                                {services[id].needed.map((val) => {
                                    return (
                                        <li className='mb-2' key={val} style={{ listStyleType: 'disc' }}>
                                            <span className='font-bold'>{val.split(':')[0]} :</span> {val.split(':')[1]}
                                        </li>
                                    )
                                })
                                }
                            </div>
                        </div>

                        <div className='text-base md:text-lg lg:text-xl mt-4 md:mt-10'>
                            <div className='leading-tight font-bold text-[#263238] md:mb-4'>What to expect during {id} Physiotherapy :</div>
                            <div className='mt-2 text-sm font-semibold md:text-base'>
                                {services[id].expectation.map((val) => {
                                    return (
                                        <li className='mb-2' key={val} style={{ listStyleType: 'disc' }}>
                                            <span className='font-bold'>{val.split(':')[0]} :</span> {val.split(':')[1]}
                                        </li>
                                    )
                                })
                                }
                            </div>
                        </div>

                    </article>
                </div>
            </main>

            <Footer />

        </>
    )
}

export default SinglePostOperative