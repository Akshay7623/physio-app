import { useState } from 'react'
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import HeaderWithBack from '../Components/HeaderWithBack'

function Icon({ id, open }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`${id === open ? "rotate-180" : ""} h-4 w-4 transition-transform`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

const FAQ = () => {

    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <>


            <div className='max-w-screen-xl mx-auto'>
                <HeaderWithBack className='sticky top-0 mt-0 py-3 z-30' title='FAQ' />
                <div className='mx-auto text-center flex flex-row justify-center gap-3'>
                    <div className='text-[#70797d] font-medium text-base md:text-lg lg:text-xl'>
                        Frequently asked questions
                    </div>
                </div>

                <div className='px-4'>
                    <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(1)}>1. What is physiotherapy, and how can it help me?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            Physiotherapy is a healthcare profession focused on helping individuals recover from injury, manage pain, and improve their overall physical function and mobility. Our physiotherapy services include a range of techniques such as therapeutic exercises, manual therapy, and education on injury prevention and rehabilitation to address your specific needs and goals.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(2)}>2. Who can benefit from physiotherapy services?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            Physiotherapy services are suitable for individuals of all ages and fitness levels who are experiencing physical limitations, pain, or discomfort due to injury, illness, or other health conditions. Whether you are recovering from surgery, dealing with a sports injury, or managing a chronic condition, our physiotherapists can develop a personalized treatment plan to help you achieve your optimal level of function and well-being.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(3)}>3. What are home visit physiotherapy services?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            Home visit physiotherapy services involve bringing our physiotherapy expertise and treatments directly to your home or preferred location. Instead of visiting a clinic or healthcare facility, our qualified physiotherapists will travel to your residence to provide personalized care and support in the comfort of your own environment.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(4)}>4. Who can benefit from home visit physiotherapy services?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            Home visit physiotherapy services are suitable for individuals who may have difficulty accessing traditional clinic-based care due to mobility issues, transportation challenges, or other personal circumstances. This service is particularly beneficial for seniors, individuals recovering from surgery or injury, or those with chronic conditions who require ongoing rehabilitation and support.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(5)}>5. How do I schedule a home visit appointment?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            To schedule a home visit physiotherapy appointment, simply visit our website login/signup and book appointment. Our scheduling team will work with you to arrange a convenient appointment time and provide any necessary information or instructions.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(6)}>6. What should I expect during a home visit physiotherapy appointment?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            During a home visit physiotherapy appointment, our physiotherapist will conduct a comprehensive assessment of your condition, discuss your treatment goals and preferences, and develop a personalized treatment plan tailored to your needs. They will then provide hands-on treatment, therapeutic exercises, and education to help you achieve your goals.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(7)}>7. Do I need to provide any equipment or materials for my home visit appointment?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            Our physiotherapists will bring all necessary equipment and materials for your home visit appointment, including exercise equipment, and any other tools or supplies required for your treatment. You do not need to provide anything unless specifically requested by your physiotherapist.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(8)}>8. What types of treatments are available during home visits?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            Our physiotherapists can provide a wide range of treatments and interventions during home visits, including:
                            <div>
                                <li className='mt-1'>1. Therapeutic exercises and stretches</li>
                                <li className='mt-1'>2. Manual therapy techniques (e.g., massage, joint mobilization)</li>
                                <li className='mt-1'>3. Gait and balance training</li>
                                <li className='mt-1'>4. Pain management strategies</li>
                                <li className='mt-1'>5. Education on injury prevention and self-management techniques</li>
                            </div>
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 9} icon={<Icon id={9} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(9)}>9. What are the advantages of home visit physiotherapy services?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            <div>
                                <li className='mt-1'>1. Convenience: Eliminates the need for travel to a clinic, saving time and energy.</li>
                                <li className='mt-1'>2. Comfort: Receive treatment in the familiar and relaxed environment of your own home.</li>
                                <li className='mt-1'>3. Personalized Care: Our physiotherapists can assess your home environment and tailor treatments to your specific needs and goals.</li>
                                <li className='mt-1'>4. Enhanced Compliance: Home visits can improve treatment adherence and compliance, leading to better outcomes for patients.</li>
                            </div>
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 10} icon={<Icon id={10} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(10)}>10. How can I provide feedback about my experience with physiotherapy services?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            We value your feedback and strive to continuously improve our services to better meet your needs. You can provide feedback about your experience with our website or App Go to Appointment History and you can give us feedback. Your input is important to us, and we appreciate any comments or suggestions you may have.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 11} icon={<Icon id={11} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(11)}>11. How many physiotherapy sessions will I need?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            The number of physiotherapy sessions required will depend on various factors, including the nature and severity of your condition, your overall health and fitness level, and your response to treatment. Your physiotherapist will discuss your treatment plan with you and provide guidance on the expected duration and frequency of sessions based on your individual needs and goals.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 12} icon={<Icon id={12} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(12)}>12. Is physiotherapy covered by insurance?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            Many health insurance plans provide coverage for physiotherapy services, but coverage levels and eligibility criteria may vary. We recommend contacting your insurance provider to inquire about your specific coverage details and any requirements or limitations that may apply.
                        </AccordionBody>
                    </Accordion>

                    <Accordion open={open === 13} icon={<Icon id={13} open={open} />}>
                        <AccordionHeader className='text-sm md:text-base py-2 faq_header ' onClick={() => handleOpen(13)}>13. What safety measures are in place to protect clients during physiotherapy sessions?</AccordionHeader>
                        <AccordionBody className='py-2 md:text-base font-semibold'>
                            The safety and well-being of our clients are our top priorities. We adhere to strict hygiene and sanitation protocols to maintain a clean and safe environment for all physiotherapy sessions. Our physiotherapists are trained in infection control practices and use appropriate personal protective equipment as needed. We also encourage clients to follow any additional safety guidelines or recommendations provided by public health authorities.
                        </AccordionBody>
                    </Accordion>
                </div>
            </div>

        </>
    )
}

export default FAQ