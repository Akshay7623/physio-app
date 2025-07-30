import React from 'react'
import { useEffect, useState } from 'react'
import LogginHeader from '../../Components/LogginHeader'
import Header from '../../Components/Header'
import AuthUser from '../../Components/AuthUser'
import Footer from '../../Components/Footer'
import ScrollToTop from '../../Components/ScrollToTop'
import BlogImage1 from '../../assets/images/blog/blog1.jpg'

const Blog1 = () => {

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

            <ScrollToTop />

            <div className='text-[#424242] text-lg font-bold max-w-screen-xl mx-auto mt-4 md:text-xl lg:text-2xl'>
                <div className='mx-4'>
                    The Importance of Stretching in Physiotherapy
                </div>
            </div>

            <div className='mx-4 my-4'>
                <img className='mx-auto' src={BlogImage1} alt='blog image' />
            </div>

            <div className='mx-auto max-w-screen-xl text-[#9e9e9e] text-sm mt-4 md:text-base lg:text-lg'>
                <div className='mx-4'>

                    <p className='font-semibold'>
                        Stretching is a fundamental aspect of physiotherapy that is often overlooked but holds immense importance in rehabilitation and injury prevention. Whether you're an athlete recovering from a sports injury or an office worker experiencing muscle tightness, incorporating stretching exercises into your routine can have significant benefits.
                    </p>

                    <p className='font-semibold'>
                        One of the primary benefits of stretching is improved flexibility. Tight muscles can restrict movement and increase the risk of injury. Regular stretching helps to elongate muscles, allowing for a greater range of motion and reducing the likelihood of strains and sprains.
                    </p>

                    <p className='font-semibold'>
                        Additionally, stretching can help alleviate muscle tension and soreness. Many individuals experience tightness and discomfort due to poor posture, repetitive movements, or sedentary lifestyles. By stretching regularly, you can release tension in the muscles, promote blood flow, and relieve discomfort.
                    </p>

                    <p className='font-semibold'>
                        Moreover, stretching plays a crucial role in injury rehabilitation. Physiotherapists often prescribe specific stretching exercises to patients recovering from injuries such as strains, sprains, or joint dislocations. These exercises help to restore flexibility and strength to injured muscles and tissues, facilitating the recovery process.
                    </p>

                    <p className="font-semibold">
                        It's essential to perform stretches correctly to avoid causing further injury. Consulting with a physiotherapist can help you develop a personalized stretching routine tailored to your needs and goals. Whether you're recovering from an injury or aiming to improve your overall flexibility, incorporating stretching into your daily routine can have a profound impact on your physical well-being.
                    </p>

                </div>
            </div>

            <Footer />

        </>
    )
}

export default Blog1