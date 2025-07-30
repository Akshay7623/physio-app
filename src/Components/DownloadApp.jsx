import QRCode from "react-qr-code";
import googlePlayimg from '../assets/images/googleplay.png';

const DownloadApp = () => {
    const appLink = 'https://play.google.com/store/apps/details?id=com.king.candycrushsaga&hl=en_IN&gl=US';

    return (
        <>
            <div className="max-w-screen-xl mx-auto">
                <div className="bg-[rgb(202 165 202)] mx-4 pb-4 mb-4" style={{ backgroundImage: 'linear-gradient(122deg, rgb(202 165 202) 6%, rgb(185 216 219) 73%)' }}>
                    <div>
                        <h2 className="text-indigo-500 text-center tracking-widest title-font mb-1 text-sm md:text-base lg:text-lg pt-4 font-semibold">Download our Android Application</h2>
                    </div>

                    <div>
                        <h2 className="text-center text-[#212121] tracking-widest font-medium title-font mb-1 text-sm md:text-base lg:text-lg pt-4" style={{ fontFamily: 'sans-serif' }}>GET THE APP</h2>
                    </div>

                    <QRCode className="mt-4 hidden md:block mx-auto" value={appLink} />
                    <a href={appLink} target="_blank">
                        <div className="flex justify-center mt-6 md:hidden mb-4">
                            <img src={googlePlayimg} alt='google play store' width={150} />
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default DownloadApp