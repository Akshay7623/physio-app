import Service1 from '../assets/services/service-1.jpg'
import OrthopedicTherapy from './OrthopedicTherapy'

const Services = () => {
    return (
        <>
            <div className="bg-white py-6 sm:py-4 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="text-center text-[16px] font-semibold text-gray-800 md:mb-6 md:mt-6 lg:text-[18px] mt-2">Our Services Given By Our Physiotherapy Expert.</div>
                    
                    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                        <OrthopedicTherapy
                            img={Service1}
                            title='Orthopedic Physical Therapy'
                            redirect='/orthopedic'
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Services;