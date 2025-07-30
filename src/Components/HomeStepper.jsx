import { useState } from 'react'
import { UserIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'
import { Step, Stepper, Typography, Button } from '@material-tailwind/react'

export const HomeStepper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    // const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


    return (
        <>
            <div className='max-w-screen-xl mx-auto'>
                <h2 className="text-center text-xl md:text-2xl font-bold text-gray-800 lg:text-[30px] mb-2">How it works  </h2>
                <div className="w-full px-4 py-4 lg:px-24">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                    >
                        <Step onClick={() => setActiveStep(0)} className='z-0'>
                            <UserIcon className="h-5 w-5" />
                            <div className="absolute -bottom-[4.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 0 ? "blue-gray" : "gray"}
                                >
                                    Step 1
                                </Typography>
                                <Typography
                                    color={activeStep === 0 ? "blue-gray" : "gray"}
                                    className="font-semibold ml-10 text-sm md:text-base"
                                >
                                    Login/Signup
                                </Typography>
                            </div>
                        </Step>
                        <Step onClick={() => setActiveStep(1)} className='z-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                            <div className="absolute -bottom-[4.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 1 ? "blue-gray" : "gray"}
                                >
                                    Step 2
                                </Typography>
                                <Typography
                                    color={activeStep === 1 ? "blue-gray" : "gray"}
                                    className="text-sm md:text-base font-semibold"
                                >
                                    Book Appointment
                                </Typography>
                            </div>
                        </Step>
                        <Step onClick={() => setActiveStep(2)} className='z-0'>
                            <BuildingLibraryIcon className="h-5 w-5" />
                            <div className="absolute -bottom-[4.5rem] w-max text-center">
                                <Typography
                                    variant="h6"
                                    color={activeStep === 2 ? "blue-gray" : "gray"}
                                >
                                    Step 3
                                </Typography>
                                <Typography
                                    color={activeStep === 2 ? "blue-gray" : "gray"}
                                    className="font-semibold text-sm md:text-base"
                                >
                                    Done.
                                </Typography>
                            </div>
                        </Step>
                    </Stepper>
                    <div className="mt-24 flex justify-center">
                        <Button onClick={handleNext} disabled={isLastStep}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default HomeStepper