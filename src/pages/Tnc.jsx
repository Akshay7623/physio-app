import { useEffect, useState } from 'react'
import Header from '../Components/Header'
import LogginHeader from '../Components/LogginHeader'
import Footer from '../Components/Footer'
import AuthUser from '../Components/AuthUser'

const Tnc = () => {

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

            <div className='text-lg font-bold text-gray-800 text-center my-4 md:text-xl'>
                Terms of Service
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    1. Appointment Booking
                </div>

                <p className='px-4'>
                    1.1. The Service allows users to book appointments for physiotherapy home visits provided by our physiotherapists. Users agree to provide accurate and complete information when booking appointments.
                </p>
                <p className='px-4'>
                    1.2. Appointment availability may vary depending on the location and availability of our physiotherapists. We strive to provide timely and reliable service but cannot guarantee immediate availability.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    2. Payment and Fees
                </div>

                <p className='px-4'>
                    2.1. Users agree to pay the applicable fees for physiotherapy home visits as indicated on the Website. Fees may vary depending on factors such as location, duration of the session, and additional services provided.
                </p>
                <p className='px-4'>
                    2.2. Payment for appointments is processed through the Website using secure payment methods. Users agree to provide accurate billing and payment information and authorize us to charge the provided payment method for the total amount due.
                </p>
            </div>


            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    3. Physiotherapy Home Visits
                </div>

                <p className='px-4'>
                    3.1. Our physiotherapists will conduct home visits at the scheduled appointment time. Users agree to provide a suitable and safe environment for the physiotherapy session, including adequate space and necessary equipment.
                </p>
                <p className='px-4'>
                    3.2. Users are responsible for ensuring their own safety during the physiotherapy session and following any instructions provided by the physiotherapist. We are not liable for any injuries or accidents that occur during the session due to user negligence or failure to follow instructions.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    4. Cancellation and Rescheduling
                </div>

                <p className='px-4'>
                    4.1. Users may cancel or reschedule appointments through the Website up to a certain time before the scheduled appointment. Any cancellations or rescheduling requests after this time may be subject to a cancellation fee.
                </p>
                <p className='px-4'>
                    4.2. We reserve the right to cancel or reschedule appointments due to unforeseen circumstances, such as physiotherapist unavailability or inclement weather. In such cases, we will make reasonable efforts to notify affected users and reschedule the appointment at a mutually convenient time.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    5. Confidentiality
                </div>

                <p className='px-4'>
                    5.1. We respect the privacy and confidentiality of our users personal and health information. Any information collected during the booking process or physiotherapy session will be handled in accordance with our Privacy Policy.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    6. Limitation of Liability
                </div>

                <p className='px-4'>
                    6.1. In no event shall [Your Company Name] or its physiotherapists be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in any way connected with the use of the Service or the physiotherapy home visits, whether based on warranty, contract, tort (including negligence), or any other legal theory.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    7. Governing Law
                </div>

                <p className='px-4'>
                    7.1. These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    8. Changes
                </div>

                <p className='px-4'>
                    8.1. We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide notice through the Website prior to the changes taking effect.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    9. Contact Us
                </div>

                <p className='px-4'>
                    9.1. If you have any questions about these Terms or the Service, please contact us at [Your Contact Information].
                </p>
            </div>

            <p className='px-4 mt-4'>
                These Terms of Service &quot;Terms&quot;) govern your use of the physiotherapy home visit services provided by [Your Company Name] (the &quot;Service&quot;), accessed through the [Your Web App Name] website (the &quot;Website&quot;). Please read these Terms carefully before using the Service.
            </p>

            <p className='px-4'>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>


            <Footer />
        </>
    )
}

export default Tnc