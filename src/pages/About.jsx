import { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Team from '../Components/Team'
import Pratik from '../assets/images/pratik.jpg';
import AuthUser from '../Components/AuthUser';
import LogginHeader from '../Components/LogginHeader';
import EducationImg from '../assets/images/about/education.svg';
import ScheduleImg from '../assets/images/about/schedule.svg';
import GoalSvg from '../assets/images/about/goal.svg';
import TeamSvg from '../assets/images/about/team.svg';
import LicenceSvg from '../assets/images/about/license.svg';
import TreatmentSvg from '../assets/images/about/treatment.svg';


const About = () => {

    const [isUserLoggedIn, setUserLoggedIn] = useState();

    const teamData = [
        { name: 'Dr Pratik Makwana', position: 'Founder / CEO', img: Pratik, twitter: '#', linkedin: '#' },
        { name: 'Kate Berg', position: 'CFO', img: 'https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'Greg Jackson', position: 'CTO', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'Robert Greyson', position: 'Creative Director', img: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'John Roberts', position: 'Investor Relations', img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'Judy Amandez', position: 'Senior Art Director', img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' }
    ]


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

            <div className='text-[#424242] font-bold text-lg md:text-xl lg:text-2xl title_lines mx-4 mt-3'>
                Meet Our Team
            </div>

            <div className="bg-white py-4">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <div className="mb-10 md:mb-16">
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg lg:text-xl font-semibold">Physiotherapy Services from Professional Therapist.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                        {teamData.map((val, index) => {
                            return <Team key={index} name={val.name} position={val.position} img={val.img} linkedin={val.linkedin} twitter={val.twitter} />
                        })}
                    </div>
                </div>
            </div>

            <div className='text-[#424242] font-bold text-lg md:text-xl lg:text-2xl title_lines mx-4 mt-3'>
                Why Choose Us
            </div>

            <div className="mt-3 py-4">
                <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg lg:text-xl font-semibold">Why Choose Us? Get Your Life Style Back</p>
            </div>

            <div>
                <div className="xl:container m-auto px-6 md:px-12 lg:px-20">
                    <div>
                        <h2 className="mt-4 text-center text-lg md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">A technology-first approach to Physiotherapy <br className="sm:block" hidden />and Health</h2>
                    </div>

                    <div className="mt-8 grid gap-8 sm:w-2/3 sm:mx-auto md:w-full md:grid-cols-2 md:-mx-8 lg:grid-cols-3">

                        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10" style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                            <div className="space-y-12 text-center">

                                <img
                                    src={LicenceSvg}
                                    className="w-20 mx-auto"
                                    alt="about illustration"
                                />

                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                                        Licensed Therapist
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                                        Our team is comprised of fully licensed therapists who have undergone rigorous training and certification. We adhere to the highest standards of professional practice to ensure you receive safe and effective care.
                                    </p>
                                    <div className="group relative flex mx-auto h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 text-gray-600 dark:text-white transition duration-300 group-hover:translate-x-1">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10" style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                            <div className="space-y-12 text-center">
                                <img
                                    src={TreatmentSvg}
                                    className="w-20 mx-auto"
                                    alt="burger illustration"
                                />
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                                        Personalized Treatment
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                                        We believe that every individual is unique, and so should be their treatment plan. Our personalized treatment approach is tailored to meet your specific needs, helping you achieve optimal health and wellness.
                                    </p>
                                    <div className="group relative flex mx-auto h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 text-gray-600 dark:text-white transition duration-300 group-hover:translate-x-1">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10" style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                            <div className="space-y-12 text-center">
                                <img
                                    src={TeamSvg}
                                    className="w-20 mx-auto"
                                    alt="burger illustration"
                                />

                                <div className="space-y-6">

                                    <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                                        Experienced Staff
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                                        Our staff brings a wealth of experience to our practice. With years of hands-on expertise in various physiotherapy techniques, we are equipped to handle a wide range of conditions with confidence and care.
                                    </p>

                                    <div className="group relative flex mx-auto h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 text-gray-600 dark:text-white transition duration-300 group-hover:translate-x-1">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10" style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                            <div className="space-y-12 text-center">
                                <img
                                    src={GoalSvg}
                                    className="w-20 mx-auto"
                                    alt="burger illustration"
                                />
                                <div className="space-y-6">

                                    <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                                        Therapy Goals
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                                        We create customized treatment plans tailored to each patient’s unique needs and goals.
                                    </p>

                                    <div className="group relative flex mx-auto h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 text-gray-600 dark:text-white transition duration-300 group-hover:translate-x-1">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10" style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                            <div className="space-y-12 text-center">
                                <img
                                    src={ScheduleImg}
                                    className="w-20 mx-auto"
                                    alt="about illustration"
                                />

                                <div className="space-y-6">

                                    <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                                        Flexible Scheduling
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                                        We offer convenient appointment times to accommodate our patients’ busy lifestyles.
                                    </p>

                                    <div className="group relative flex mx-auto h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 text-gray-600 dark:text-white transition duration-300 group-hover:translate-x-1">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10" style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}>
                            <div className="space-y-12 text-center">

                                <img
                                    src={EducationImg}
                                    className="w-20 mx-auto"
                                    alt="about illustration"
                                />

                                <div className="space-y-6">

                                    <h3 className="text-2xl font-semibold text-gray-800 transition dark:text-white">
                                        Patient Education
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 font-semibold">
                                        To empower patients with knowledge about their conditions and the importance of ongoing self-care.
                                    </p>

                                    <div className="group relative flex mx-auto h-12 w-12 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative w-5 h-5 text-gray-600 dark:text-white transition duration-300 group-hover:translate-x-1">
                                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                        </svg>
                                    </div>
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

export default About