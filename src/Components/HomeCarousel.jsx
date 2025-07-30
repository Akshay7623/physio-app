import { Carousel } from '@material-tailwind/react'
import Image1 from '../assets/images/carousol1.png'
import Image2 from '../assets/images/carousol2.png'
import Image3 from '../assets/images/carousol3.png'

const HomeCarousel = () => {
    return (
        <>
            <Carousel
                autoplay={false}
                className="rounded-xl overflow-y-hidden mt-3 z-0 max-w-screen-xl mx-auto"
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
                <div className="relative h-full w-full px-4">
                    <img src={Image1} alt="image 1" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 grid h-full w-full place-items-center">
                        <div className="w-3/4 text-center md:w-2/4">
                            {/* <Typography variant="h1" color="white" className="mb-4 text-[18px] md:text-[24px] lg:text-[30px]"></Typography>
                            <Typography variant="lead" color="white" className="mb-12 opacity-80 text-[16px]"></Typography> */}
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full px-4">
                    <img src={Image2} alt="image 2" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 grid h-full w-full items-center">
                        <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                            {/* <Typography variant="h1" color="white" className="mb-4 text-[18px] md:text-[24px] lg:text-[30px]"></Typography>
                            <Typography variant="lead" color="white" className="mb-12 opacity-80 text-[16px]"></Typography> */}
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full px-4">
                    <img src={Image3} alt="image 3" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 grid h-full w-full items-end">
                        <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
                            {/* <Typography variant="h1" color="white" className="mb-4 text-[18px] md:text-[24px] lg:text-[30px]"></Typography>
                            <Typography variant="lead" color="white" className="mb-12 opacity-80 text-[16px]"></Typography> */}
                        </div>
                    </div>
                </div>
            </Carousel>
        </>
    )
}

export default HomeCarousel