import { UilInstagram } from '@iconscout/react-unicons'
import { UilYoutube } from '@iconscout/react-unicons'
import { UilTwitter } from '@iconscout/react-unicons'
import { UilLinkedin } from '@iconscout/react-unicons'
import { NavLink } from 'react-router-dom'

const Footer = () => {


    return (
        <>
            <footer className="bg-white max-w-screen-xl mx-auto">
                <div className="pt-12 lg:pt-16">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
                            <div className="col-span-full lg:col-span-2">
                                <div className="flex gap-5">
                                    <div>
                                        <NavLink to='/' >
                                            <UilInstagram size='30' color='#1f2937' />
                                        </NavLink>
                                    </div>

                                    <div>
                                        <NavLink to='/' >
                                            <UilTwitter size='30' color='#1f2937' />
                                        </NavLink>
                                    </div>

                                    <div>
                                        <NavLink to='/' >
                                            <UilLinkedin size='30' color='#1f2937' />
                                        </NavLink>
                                    </div>

                                    <div>
                                        <NavLink to='/' >
                                            <UilYoutube size='30' color='#1f2937' />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Products</div>

                                <nav className="flex flex-col gap-4 font-[600]">
                                    <div>
                                        <NavLink to='/' className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Overview</NavLink>
                                    </div>

                                    <div>
                                        <NavLink to='/services' className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Services</NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/login" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Customers</NavLink>
                                    </div>
                                </nav>
                            </div>

                            <div>
                                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Company</div>

                                <nav className="flex flex-col gap-4 font-[600]">
                                    <div>
                                        <NavLink to="/about" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">About</NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/jobs" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Jobs</NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/blogs" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Blog</NavLink>
                                    </div>
                                </nav>
                            </div>

                            <div>
                                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Support</div>

                                <nav className="flex flex-col gap-4 font-[600]">
                                    <div>
                                        <NavLink to="/contact" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Contact</NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/contact" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Chat</NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/faq-outer" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">FAQ</NavLink>
                                    </div>
                                </nav>
                            </div>

                            <div>
                                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Legal</div>

                                <nav className="flex flex-col gap-4 font-[600]">
                                    <div>
                                        <NavLink to="/tnc" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Terms of Service</NavLink>
                                    </div>

                                    <div>
                                        <NavLink to="/privay-policy" className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</NavLink>
                                    </div>

                                </nav>
                            </div>
                        </div>

                        <div className="border-t py-8 text-center text-sm text-gray-400 font-[600]">© {new Date().getFullYear()} - Physio. All rights reserved.</div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer