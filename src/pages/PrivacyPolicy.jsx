import { useEffect, useState } from 'react'
import Header from '../Components/Header'
import LogginHeader from '../Components/LogginHeader'
import Footer from '../Components/Footer'
import AuthUser from '../Components/AuthUser'


const PrivacyPolicy = () => {

    const [isUserLoggedIn, setUserLoggedIn] = useState();

    useEffect(() => {
        AuthUser().then((data) => {
            if (data.message === 'AUTH_FAILED') {
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
                Privacy Policy
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    1. Information We Collect
                </div>

                <p className='px-4'>
                    1.1. Personal Information: When you use our Service, we may collect personal information such as your name, contact information, address, medical history, and payment details.</p>
                <p className='px-4'>
                    1.2. Usage Data: We may also collect usage data, including information about your device, browser type, IP address, pages visited, and interactions with the Service.
                </p>
            </div>


            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    2. How We Use Your Information
                </div>

                <p className='px-4'>
                    2.1. We may use the information we collect for the following purposes:
                </p>
                <div className='px-4'>
                    <li>To provide and maintain the Service</li>
                    <li>To process appointments and payments</li>
                    <li>To communicate with you about your appointments and updates to our Service</li>
                    <li>To personalize your experience and improve our services</li>
                    <li>To comply with legal obligations.</li>
                </div>

            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    3. Sharing of Information
                </div>

                <p className='px-4'>
                    3.1. We may share your personal information with third-party service providers who assist us in providing the Service, such as payment processors and IT service providers. These service providers are contractually obligated to use your information only for the purpose of providing the services requested by us.
                </p>
                <p className='px-4'>
                    3.2. We may also disclose your information in response to a legal request or when required by law, such as to comply with a subpoena or other legal process.
                </p>
            </div>


            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    4. Data Security
                </div>

                <p className='px-4'>
                    4.1. We take reasonable measures to protect the security of your personal information and prevent unauthorized access, use, or disclosure. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    5. Retention of Information
                </div>

                <p className='px-4'>
                    5.1. We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law.
                </p>
            </div>


            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    6. Your Rights
                </div>

                <p className='px-4'>
                    6.1. You have the right to access, correct, or delete your personal information. You may also have the right to object to the processing of your personal information or request that we restrict the processing of your information in certain circumstances.
                </p>
            </div>


            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    7. Children&apos;s Privacy
                </div>

                <p className='px-4'>
                    7.1. Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete the information.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    8. Use of Cookies and Similar Technologies
                </div>

                <p className='px-4'>
                    8.1. We may use cookies, web beacons, and similar tracking technologies to collect information about your interactions with the Service. Cookies are small files that are stored on your device and allow us to recognize your browser and remember certain information.
                </p>
                <p className='px-4'>
                    8.2. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. However, if you disable or refuse cookies, some parts of the Service may become inaccessible or not function properly.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    9. Marketing Communications
                </div>

                <p className='px-4'>
                    9.1. With your consent, we may send you marketing communications about our products and services, as well as promotional offers and updates. You may opt out of receiving these communications at any time by following the unsubscribe instructions provided in the communication or by contacting us directly.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    10. Changes to this Policy
                </div>

                <p className='px-4'>
                    10.1. We reserve the right to update or change this Policy at any time. Any changes will be effective immediately upon posting the revised Policy on the Website. We encourage you to review this Policy periodically for changes.
                </p>
            </div>

            <div>
                <div className='px-4 font-semibold text-base md:text-lg py-3'>
                    11. Contact Us
                </div>

                <p className='px-4'>
                    11.1. If you have any questions about this Privacy Policy or our privacy practices, please contact us at [Our Contact Information].
                </p>
            </div>

            <p className='px-4 mt-4'>
                This Privacy Policy (&quot;Policy&quot;) outlines how [Company Name] (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and protects the personal information of users (&quot;you&quot; or &quot;your&quot;) who access or use the physiotherapy home visit services provided through the [Our Web] website (the &quot;Website&quot;).
            </p>


            <Footer />
        </>
    )
}

export default PrivacyPolicy