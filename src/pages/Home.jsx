import { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ScrollToTop from '../Components/ScrollToTop'
import Teams from '../Components/Teams'
import AddressMap from '../Components/AddressMap'
import Address from '../Components/Address'
import AreasWeServe from '../Components/AreasWeServe'
import HomeBlog from '../Components/HomeBlog'
import CallToAction from '../Components/CallToAction'
import Testimonials from '../Components/Testimonials'
import HomeCarousel from '../Components/HomeCarousel'
import HomeStepper from '../Components/HomeStepper'
import DownloadApp from '../Components/DownloadApp'
import LogginHeader from '../Components/LogginHeader'
import AuthUser from '../Components/AuthUser'
import Treatments from '../Components/Treatments'


const Home = () => {

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

            <CallToAction />

            <HomeStepper />

            <HomeCarousel />

            <Treatments />

            <Teams />

            <HomeBlog />

            <DownloadApp />

            <Testimonials />

            {/* <AddressMap /> */}

            <Address />

            <AreasWeServe />

            <Footer />
        </>
    )
}

export default Home