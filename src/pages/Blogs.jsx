import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AuthUser from '../Components/AuthUser';
import LogginHeader from '../Components/LogginHeader';
import Blog1Img from '../assets/images/blog/blog1.jpg'
import Blog2Img from '../assets/images/blog/blog2.png'
import Blog3Img from '../assets/images/blog/blog3.png'
import Blog4Img from '../assets/images/blog/blog4.png'


const Blog = () => {
    const [isUserLoggedIn, setUserLoggedIn] = useState();


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

            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Blogs</h2>

                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg font-semibold">
                            "Empowering Movement, Restoring Health: Insights from Our Physiotherapy Blogs"
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
                        <div className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row">
                            <NavLink to="/blog/importance-stretching-physiotherapy" className="group relative block h-60 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48">
                                <img src={Blog1Img} loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </NavLink>

                            <div className="flex flex-col gap-2 p-4 lg:p-6">
                                <span className="text-sm text-gray-400 font-semibold">July 19, 2021</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <NavLink to="/blog/importance-stretching-physiotherapy" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">The Importance of Stretching in Physiotherapy</NavLink>
                                </h2>

                                <p className="text-gray-500 font-semibold">
                                    Stretching is a fundamental aspect of physiotherapy that is often overlooked but holds immense importance in rehabilitation and injury prevention. Whether you're an athlete recovering from a sports injury or an office worker experiencing muscle tightness, incorporating stretching exercises into your routine can have significant benefits.
                                </p>

                                <div>
                                    <NavLink to="/blog/importance-stretching-physiotherapy" className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read more</NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row">
                            <NavLink to="/blog/role-exercise-prescription-physiotherapy" className="group relative block h-60 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48">
                                <img src={Blog2Img} loading="lazy" alt="Photo by Lorenzo Herrera" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </NavLink>

                            <div className="flex flex-col gap-2 p-4 lg:p-6">
                                <span className="text-sm text-gray-400 font-semibold">April 07, 2021</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <NavLink to="/blog/role-exercise-prescription-physiotherapy" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">The Role of Exercise Prescription in Physiotherapy</NavLink>
                                </h2>

                                <p className="text-gray-500 font-semibold">
                                    Exercise prescription is a fundamental component of physiotherapy that involves designing customized exercise programs to address specific musculoskeletal issues and improve overall health and well-being. Whether you're recovering from an injury, managing a chronic condition, or aiming to enhance athletic performance, exercise prescription can play a pivotal role in achieving your goals.
                                </p>

                                <div>
                                    <NavLink to="/blog/role-exercise-prescription-physiotherapy" className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read more</NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row">
                            <NavLink to="/blog/benefits-aquatic-therapy-physiotherapy" className="group relative block h-60 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48">
                                <img src={Blog3Img} loading="lazy" alt="Photo by Magicle" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </NavLink>

                            <div className="flex flex-col gap-2 p-4 lg:p-6">
                                <span className="text-sm text-gray-400 font-semibold">March 15, 2021</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <NavLink to="/blog/benefits-aquatic-therapy-physiotherapy" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">The Benefits of Aquatic Therapy in Physiotherapy</NavLink>
                                </h2>

                                <p className="text-gray-500 font-semibold">
                                    Aquatic therapy, also known as hydrotherapy or water therapy, is a specialized form of physiotherapy that takes place in a pool or aquatic environment. This unique approach to rehabilitation offers a wide range of benefits for individuals recovering from injuries, managing chronic conditions, or seeking to improve their physical function and mobility.
                                </p>

                                <div>
                                    <NavLink to="/blog/benefits-aquatic-therapy-physiotherapy" className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read more</NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center overflow-hidden rounded-lg border md:flex-row">
                            <NavLink to="/blog/role-manual-therapy-physiotherapy" className="group relative block h-60 w-full shrink-0 self-start overflow-hidden bg-gray-100 md:h-full md:w-32 lg:w-48">
                                <img src={Blog4Img} loading="lazy" alt="Photo by Martin Sanchez" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </NavLink>

                            <div className="flex flex-col gap-2 p-4 lg:p-6">
                                <span className="text-sm text-gray-400 font-semibold">January 27, 2021</span>

                                <h2 className="text-xl font-bold text-gray-800">
                                    <NavLink to="/blog/role-manual-therapy-physiotherapy" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">The Role of Manual Therapy in Physiotherapy</NavLink>
                                </h2>

                                <p className="text-gray-500 font-semibold">
                                    Manual therapy is a hands-on treatment approach commonly used in physiotherapy to assess, diagnose, and treat musculoskeletal conditions and movement disorders. Through skilled manipulation and mobilization techniques, physiotherapists aim to restore mobility, alleviate pain, and improve overall function in their patients.
                                </p>

                                <div>
                                    <NavLink to="/blog/role-manual-therapy-physiotherapy" className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Read more</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />


        </>
    )
}

export default Blog