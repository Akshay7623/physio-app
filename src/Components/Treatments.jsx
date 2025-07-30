import ServiceCard from './ServiceCard'
import Service1 from '../assets/services/service-1.jpg'
import Service2 from '../assets/services/service-2.jpg'
import Service3 from '../assets/services/service-3.jpg'
import Service4 from '../assets/services/service-4.jpg'
import ScrollToTop from './ScrollToTop'
import OrthopedicTherapy from './OrthopedicTherapy'
import NueroPhysiotherapy from './NueroPhysiotherapy'
import PostOperativeTherapy from './PostOperativeTherapy'
import SportsPhysiotherapy from './SportsPhysiotherapy'
import NueroImage from '../assets/images/nuero_image.png'
import OrthoImage from '../assets/images/orthopedic_img.png'

const Treatments = () => {

    return (
        <>

            <ScrollToTop />

            <h2 className="text-center text-[20px] font-bold text-gray-800 lg:text-[30px] flex flex-row gap-2 justify-center mt-6">
                <div>Treatments We Provide</div>
                <div className='mt-[15px] zoom-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                </div>
            </h2>

            <div className="bg-white sm:py-4 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="text-center text-[16px] font-semibold text-gray-800 md:mb-6 md:mt-6 lg:text-[18px] mt-2">Our Services Given By Our Physiotherapy Expert.</div>
                    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                        <OrthopedicTherapy
                            img={OrthoImage}
                            title='Orthopedic Physical Therapy'
                            redirect='/orthopedic'
                        />

                        <NueroPhysiotherapy
                            img={NueroImage}
                            title='Neurological Physical Therapy'
                            redirect='/nuero'
                        />

                        <SportsPhysiotherapy
                            img={Service4}
                            title='Sports Rehabilation'
                            redirect='/'
                        />
                        
                        <PostOperativeTherapy
                            img={Service4}
                            title='Common surgeries that require post-operative physiotherapy'
                            redirect='/'
                        />

                        <ServiceCard
                            img={Service3}
                            title='Fitness & Wellness Rehabilation'
                            redirect='/'
                            content='Heat and cold therapy, also known as thermotherapy and cryotherapy respectively, are therapeutic techniques commonly used to alleviate pain, reduce inflammation, and promote healing. Heres some information about both therapies'
                        />



                    </div>
                </div>
            </div>
        </>
    )
}

export default Treatments