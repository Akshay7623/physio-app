import Home_Img from '../assets/images/Home_img.jpg'
import { NavLink } from 'react-router-dom'

const CallToAction = () => {
    return (
        <>
            <div className="bg-white py-6 sm:py-8 lg:py-12 max-w-screen-xl mx-auto">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="flex flex-col overflow-hidden rounded-lg bg-gray-900 sm:flex-row md:h-80">
                        <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-2/5">
                            <h2 className="mb-4 text-lg font-bold text-white md:text-2xl lg:text-4xl typing-demo">50% off for First appointment.</h2>

                            <p className="mb-8 max-w-md text-gray-400 font-semibold">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.
                            </p>


                            <div className="mt-auto">
                                <NavLink to='/appointment' className="inline-block rounded-lg bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">Book Appointment</NavLink>
                            </div>
                        </div>

                        <div className="order-first h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-3/5">
                            <img src={Home_Img} loading="lazy" alt="Physical Therapy" className="h-full w-full object-cover object-center cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallToAction