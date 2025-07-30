import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LogginHeader from '../Components/LogginHeader'
import Header from '../Components/Header'
import AuthUser from '../Components/AuthUser'
import Footer from '../Components/Footer'
import ScrollToTop from '../Components/ScrollToTop'

const NueroInDetails = () => {


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
            content goes here as welll






            <Footer />
        </>
    )
}

export default NueroInDetails