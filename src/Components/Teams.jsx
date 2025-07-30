import Team from './Team'
import Praitk from '../assets/images/pratik.jpg';

const Teams = () => {

    const teamData = [
        { name: 'Dr. Pratik Makwana', position: 'Founder / CEO', img: Praitk, twitter: '#', linkedin: 'https://www.linkedin.com/in/dr-pratik-makwana-8b767a22a/' },
        { name: 'Kate Berg', position: 'CFO', img: 'https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'Greg Jackson', position: 'CTO', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'Robert Greyson', position: 'Creative Director', img: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'John Roberts', position: 'Investor Relations', img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' },
        { name: 'Judy Amandez', position: 'Senior Art Director', img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&q=75&fit=crop&w=500', twitter: '#', linkedin: '#' }
    ]
    return (
        <>
            <div className="bg-white py-4">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Meet our Team</h2>
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg font-semibold">
                            Our team is proud to introduce our dedicated physiotherapist, a healthcare professional committed to helping individuals recover and thrive.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                        {teamData.map((val, index) => {
                            return <Team key={index} name={val.name} position={val.position} img={val.img} linkedin={val.linkedin} twitter={val.twitter} />
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Teams