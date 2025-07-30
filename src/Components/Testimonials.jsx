import { Carousel } from '@material-tailwind/react'
import Pratik from '../assets/images/pratik.jpg';


const Testimonials = () => {
    return (
        <>
            <Carousel
                className='max-w-screen-xl mx-auto'
                autoplay={false}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                <div className="bg-[#212121] mx-4 py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                            
                            <svg viewBox="0 0 1024 1024" className="icon w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z"
                                    fill="white"
                                />
                                <path
                                    d="M262.4 307.2c0-19.2 19.2-38.4 38.4-38.4h435.2c19.2 0 38.4 12.8 38.4 38.4 0 19.2-19.2 38.4-38.4 38.4H294.4c-19.2 0-32-19.2-32-38.4z"
                                    fill="#353535"
                                />
                                <path
                                    d="M294.4 307.2v448c0 19.2 25.6 32 38.4 19.2l32-32 32 25.6c6.4 6.4 25.6 6.4 32 0l32-32 32 32c6.4 6.4 25.6 6.4 32 0l32-32 32 32c6.4 6.4 25.6 6.4 32 0l32-32 32 32c12.8 12.8 38.4 6.4 38.4-19.2V307.2H294.4z"
                                    fill="rgb(132 132 132)"
                                />
                                <path
                                    d="M371.2 403.2c0-6.4 6.4-12.8 12.8-12.8h217.6c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 473.6c0-6.4 6.4-12.8 12.8-12.8h166.4c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 550.4c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 620.8c0-6.4 6.4-12.8 12.8-12.8h217.6c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8z"
                                    fill="#353535"
                                />
                            </svg>

                            <div className="max-w-md text-center text-[#ececec] lg:text-lg font-semibold">
                                I'm proud to lead a team dedicated to pioneering advancements in physiotherapy, empowering individuals to thrive and reclaim their vitality.
                            </div>

                            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-3">
                                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-14 md:w-14">
                                    <img src={Pratik} loading="lazy" alt="Photo by Radu Florin" className="h-full w-full object-cover object-center" />
                                </div>

                                <div>
                                    <div className="text-center text-sm font-bold text-indigo-500 sm:text-left md:text-base">Pratik Makwana</div>
                                    <p className="text-center text-sm text-[#ececec] sm:text-left md:text-sm font-semibold">CEO / Dr. Physio</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#212121] mx-4 py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                           <svg viewBox="0 0 1024 1024" className="icon w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z"
                                    fill="white"
                                />
                                <path
                                    d="M262.4 307.2c0-19.2 19.2-38.4 38.4-38.4h435.2c19.2 0 38.4 12.8 38.4 38.4 0 19.2-19.2 38.4-38.4 38.4H294.4c-19.2 0-32-19.2-32-38.4z"
                                    fill="#353535"
                                />
                                <path
                                    d="M294.4 307.2v448c0 19.2 25.6 32 38.4 19.2l32-32 32 25.6c6.4 6.4 25.6 6.4 32 0l32-32 32 32c6.4 6.4 25.6 6.4 32 0l32-32 32 32c6.4 6.4 25.6 6.4 32 0l32-32 32 32c12.8 12.8 38.4 6.4 38.4-19.2V307.2H294.4z"
                                    fill="rgb(132 132 132)"
                                />
                                <path
                                    d="M371.2 403.2c0-6.4 6.4-12.8 12.8-12.8h217.6c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 473.6c0-6.4 6.4-12.8 12.8-12.8h166.4c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 550.4c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 620.8c0-6.4 6.4-12.8 12.8-12.8h217.6c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8z"
                                    fill="#353535"
                                />
                            </svg>

                            <div className="max-w-md text-center text-[#ececec] lg:text-lg font-semibold">
                                Our primary mission is to seamlessly connect individuals to our online platform, ensuring they experience a smooth and empowering journey toward better health and well-being.
                            </div>

                            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-3">
                                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-14 md:w-14">
                                    <img src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=112" loading="lazy" alt="Photo by Radu Florin" className="h-full w-full object-cover object-center" />
                                </div>

                                <div>
                                    <div className="text-center text-sm font-bold text-indigo-500 sm:text-left md:text-base">Akshay</div>
                                    <p className="text-center text-sm text-[#ececec] sm:text-left md:text-sm font-semibold">CTO </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#212121] mx-4 py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                            <svg viewBox="0 0 1024 1024" className="icon w-10 h-10" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z"
                                    fill="white"
                                />
                                <path
                                    d="M262.4 307.2c0-19.2 19.2-38.4 38.4-38.4h435.2c19.2 0 38.4 12.8 38.4 38.4 0 19.2-19.2 38.4-38.4 38.4H294.4c-19.2 0-32-19.2-32-38.4z"
                                    fill="#353535"
                                />
                                <path
                                    d="M294.4 307.2v448c0 19.2 25.6 32 38.4 19.2l32-32 32 25.6c6.4 6.4 25.6 6.4 32 0l32-32 32 32c6.4 6.4 25.6 6.4 32 0l32-32 32 32c6.4 6.4 25.6 6.4 32 0l32-32 32 32c12.8 12.8 38.4 6.4 38.4-19.2V307.2H294.4z"
                                    fill="rgb(132 132 132)"
                                />
                                <path
                                    d="M371.2 403.2c0-6.4 6.4-12.8 12.8-12.8h217.6c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 473.6c0-6.4 6.4-12.8 12.8-12.8h166.4c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 550.4c0-6.4 6.4-12.8 12.8-12.8h262.4c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8zM371.2 620.8c0-6.4 6.4-12.8 12.8-12.8h217.6c6.4 0 12.8 6.4 12.8 12.8s-6.4 12.8-12.8 12.8H377.6c-6.4 0-6.4-6.4-6.4-12.8z"
                                    fill="#353535"
                                />
                            </svg>

                            <div className="max-w-md text-center text-[#ececec] lg:text-lg font-semibold">“This is a section of some simple filler text, also known as placeholder text.”</div>

                            <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-3">
                                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-14 md:w-14">
                                    <img src="https://images.unsplash.com/photo-1567515004624-219c11d31f2e??auto=format&q=75&fit=crop&w=112" loading="lazy" alt="Photo by Radu Florin" className="h-full w-full object-cover object-center" />
                                </div>

                                <div>
                                    <div className="text-center text-sm font-bold text-indigo-500 sm:text-left md:text-base">John McCulling</div>
                                    <p className="text-center text-sm text-[#ececec] sm:text-left md:text-sm font-semibold">CEO / Datadrift</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </>
    )
}

export default Testimonials